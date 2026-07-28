// =============================================
// IPIM Maghfirah - PIM-Bot AI Agent v6.0
// Fitur: Lihat Data + Input Jadwal Cepat + API Key localStorage
// =============================================

const DEFAULT_KEY = '';
let GEMINI_API_KEY = localStorage.getItem('pimBotApiKey') || DEFAULT_KEY;
const GEMINI_MODEL = 'gemini-flash-latest';

const SYSTEM_PROMPT = `
Kamu adalah PIM-Bot, AGENT AI IPIM Maghfirah.
Kamu bisa menjawab pertanyaan APAPUN dan juga MENAMBAHKAN JADWAL langsung.

🎯 FORMAT INPUT JADWAL (jika user minta tambah jadwal):
Gunakan format JSON di dalam \`\`\`agent:

\`\`\`agent
{"action":"TAMBAH_JADWAL_BATCH","data":[{"hari":"Senin","jamKe":[1,2,3],"mkNama":"Fiqih","kelasNama":["A","B","C"]}]}
\`\`\`

📋 ATURAN:
- Jawab pertanyaan umum dengan singkat, jelas, dan Islami
- Maksimal 3-5 kalimat
- Gunakan emoji secukupnya
`;

// State
let pimBotOpen = false, pimBotMinimized = false, isTyping = false, darkMode = false;
let botX = window.innerWidth - 76, botY = window.innerHeight - 170;
let isDragging = false, dragStartX = 0, dragStartY = 0, dragMoved = false;

const QUICK_ACTIONS = [
  { icon: 'fa-list', text: 'Lihat matakuliah', color: '#00897b', action: 'listMK' },
  { icon: 'fa-school', text: 'Lihat kelas', color: '#6a1b9a', action: 'listKelas' },
  { icon: 'fa-calendar-plus', text: 'Input jadwal cepat', color: '#1565c0', action: 'helpJadwal' },
  { icon: 'fa-calendar-days', text: 'Jadwal saya', color: '#e65100', action: 'myJadwal' },
  { icon: 'fa-key', text: 'Atur API Key', color: '#c62828', action: 'setKey' },
];

// =============================================
// CREATE UI
// =============================================
function createPimBot() {
  if (document.getElementById('pimBotFab')) return;

  const style = document.createElement('style');
  style.id = 'pimBotStyle';
  style.textContent = `
    @keyframes pimPulse{0%,100%{box-shadow:0 0 0 0 rgba(0,77,64,0.4)}50%{box-shadow:0 0 0 14px rgba(0,77,64,0)}}
    @keyframes pimTyping{0%,60%,100%{transform:translateY(0);opacity:0.4}30%{transform:translateY(-8px);opacity:1}}
    @keyframes pimSlideIn{from{opacity:0;transform:translateY(20px) scale(0.95)}to{opacity:1;transform:translateY(0) scale(1)}}
    .pim-bot-fab{animation:pimPulse 2.5s infinite;transition:transform 0.2s ease,box-shadow 0.2s ease;touch-action:none}
    .pim-bot-fab:active{animation:none}
    .pim-bot-chat{animation:pimSlideIn 0.3s ease}
    .pim-bot-message{animation:pimSlideIn 0.2s ease}
    .pim-bot-quick-btn{transition:all 0.2s ease;cursor:pointer}
    .pim-bot-quick-btn:active{transform:scale(0.95)}
    .pim-bot-messages::-webkit-scrollbar{width:5px}
    .pim-bot-messages::-webkit-scrollbar-thumb{background:#c0c0c0;border-radius:5px}
  `;
  document.head.appendChild(style);

  // FAB
  const fab = document.createElement('div');
  fab.id = 'pimBotFab'; fab.className = 'pim-bot-fab';
  fab.innerHTML = '<i class="fa-solid fa-robot"></i>';
  fab.title = '🤖 PIM-Bot v6.0';
  Object.assign(fab.style, {
    position:'fixed',zIndex:'9999',width:'58px',height:'58px',
    background:'linear-gradient(135deg,#004d40,#00897b)',color:'white',
    borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',
    fontSize:'24px',cursor:'grab',boxShadow:'0 4px 20px rgba(0,77,64,0.4)',
    left:botX+'px',top:botY+'px',userSelect:'none',
    border:'2px solid rgba(255,255,255,0.3)',touchAction:'none'
  });

  fab.addEventListener('pointerdown', startDrag);
  fab.addEventListener('pointermove', onDrag);
  fab.addEventListener('pointerup', endDrag);
  fab.addEventListener('pointerleave', endDrag);
  fab.addEventListener('pointercancel', endDrag);
  fab.addEventListener('click', (e) => { if(!dragMoved) toggleChat(); dragMoved=false; });

  // Chat panel
  const chat = document.createElement('div');
  chat.id = 'pimBotChat'; chat.className = 'pim-bot-chat';
  Object.assign(chat.style, {
    position:'fixed',zIndex:'9998',width:'400px',maxWidth:'94vw',
    height:'560px',maxHeight:'80vh',bottom:'80px',right:'16px',
    background:'white',borderRadius:'18px',
    boxShadow:'0 12px 48px rgba(0,0,0,0.25)',
    display:'none',flexDirection:'column',overflow:'hidden',
    fontFamily:"'Plus Jakarta Sans',sans-serif"
  });

  chat.innerHTML = `
    <div style="background:linear-gradient(135deg,#004d40,#00695c);color:white;padding:14px 16px;display:flex;align-items:center;gap:10px;flex-shrink:0">
      <div style="width:38px;height:38px;border-radius:50%;background:rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;font-size:18px">🤖</div>
      <div style="flex:1;cursor:pointer" id="pimBotHeaderInfo">
        <div style="font-weight:700;font-size:14px">PIM-Bot v6.0</div>
        <div style="font-size:10px;opacity:0.8"><span style="width:6px;height:6px;background:#4caf50;border-radius:50%;display:inline-block;margin-right:4px"></span>${GEMINI_API_KEY?'Online':'⚠️ Set API Key'}</div>
      </div>
      <button onclick="pimBotSetApiKey()" title="Atur API Key" style="background:rgba(255,255,255,0.15);border:none;color:white;width:32px;height:32px;border-radius:50%;cursor:pointer;font-size:13px">⚙️</button>
      <button onclick="pimBotToggleDark()" title="Dark Mode" style="background:rgba(255,255,255,0.15);border:none;color:white;width:32px;height:32px;border-radius:50%;cursor:pointer;font-size:13px">🌙</button>
      <button onclick="pimBotClearChat()" title="Hapus Chat" style="background:rgba(255,255,255,0.15);border:none;color:white;width:32px;height:32px;border-radius:50%;cursor:pointer;font-size:13px">🗑️</button>
      <button onclick="toggleChat()" style="background:rgba(255,255,255,0.15);border:none;color:white;width:32px;height:32px;border-radius:50%;cursor:pointer;font-size:14px">✕</button>
    </div>
    <div id="pimBotMessages" class="pim-bot-messages" style="flex:1;overflow-y:auto;padding:12px;background:#f5f5f5;display:flex;flex-direction:column;gap:8px">
      <div class="pim-bot-message" style="display:flex;gap:8px;align-items:flex-start">
        <div style="width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,#004d40,#00897b);display:flex;align-items:center;justify-content:center;color:white;font-size:16px;flex-shrink:0">🤖</div>
        <div style="background:white;padding:14px 18px;border-radius:16px;font-size:13px;line-height:1.7;color:#333;max-width:85%;border:1px solid #e0e0e0">
          <strong>Assalamu'alaikum! 👋</strong><br><br>
          Aku <strong>PIM-Bot v6.0</strong>! 🚀<br><br>
          🎯 <strong>Aku bisa:</strong><br>
          • Lihat daftar matakuliah & kelas<br>
          • Input jadwal cepat: <em>"Mengajar Fiqih kelas A,B Senin JP 1-3"</em><br>
          • Tanya apa saja<br><br>
          💡 Klik quick actions di bawah atau ketik langsung!
        </div>
      </div>
      <div id="pimBotQuickActions" style="display:flex;flex-wrap:wrap;gap:6px;padding:4px 0">
        ${QUICK_ACTIONS.map(qa => `
          <button class="pim-bot-quick-btn" onclick="pimBotQuickAction('${qa.action}')" style="background:white;border:1px solid #e0e0e0;border-radius:20px;padding:8px 14px;font-size:11.5px;cursor:pointer;display:flex;align-items:center;gap:6px;font-family:inherit;color:#333;border-left:3px solid ${qa.color}">
            <i class="fa-solid ${qa.icon}" style="color:${qa.color};font-size:11px"></i>${qa.text}
          </button>
        `).join('')}
      </div>
    </div>
    <div style="padding:10px 12px;background:white;border-top:1px solid #e0e0e0;display:flex;gap:8px;align-items:center;flex-shrink:0">
      <input id="pimBotInput" type="text" placeholder="Ketik: Mengajar Fiqih kelas A,B Senin JP 1-3..." style="flex:1;padding:11px 16px;border:1.5px solid #e0e0e0;border-radius:24px;font-size:13px;font-family:inherit;outline:none">
      <button id="pimBotSend" onclick="pimBotSendMessage()" style="width:40px;height:40px;border-radius:50%;background:#004d40;color:white;border:none;font-size:16px;cursor:pointer;flex-shrink:0">▶</button>
    </div>
    <div style="text-align:center;padding:6px;font-size:9px;color:#999;background:#fafafa;border-top:1px solid #eee;flex-shrink:0">PIM-Bot v6.0 · API Key di localStorage</div>
  `;

  document.body.appendChild(fab);
  document.body.appendChild(chat);

  document.getElementById('pimBotInput').addEventListener('keydown', (e) => { if(e.key==='Enter') pimBotSendMessage(); });
  document.getElementById('pimBotHeaderInfo').addEventListener('click', () => {
    pimBotMinimized=!pimBotMinimized;
    const d=pimBotMinimized?'none':'flex';
    document.getElementById('pimBotMessages').style.display=d;
    document.getElementById('pimBotQuickActions').style.display=d==='none'?'none':'flex';
    chat.querySelectorAll('div')[2].style.display=d==='none'?'none':'flex';
    chat.querySelectorAll('div')[3].style.display=d==='none'?'none':'block';
  });

  console.log('🤖 PIM-Bot v6.0 ready!');
}

// =============================================
// DRAG
// =============================================
function startDrag(e){dragMoved=false;dragStartX=e.clientX;dragStartY=e.clientY;const fab=document.getElementById('pimBotFab');fab.style.cursor='grabbing';fab.style.animation='none';fab.style.transition='none';fab.setPointerCapture(e.pointerId);e.preventDefault();e.stopPropagation()}
function onDrag(e){const fab=document.getElementById('pimBotFab');if(!fab||!fab.hasPointerCapture(e.pointerId))return;const dx=e.clientX-dragStartX,dy=e.clientY-dragStartY;if(Math.abs(dx)>2||Math.abs(dy)>2){dragMoved=true;botX+=dx;botY+=dy;botX=Math.max(0,Math.min(botX,window.innerWidth-58));botY=Math.max(0,Math.min(botY,window.innerHeight-58));fab.style.left=botX+'px';fab.style.top=botY+'px';dragStartX=e.clientX;dragStartY=e.clientY}}
function endDrag(e){const fab=document.getElementById('pimBotFab');if(!fab)return;fab.style.cursor='grab';fab.style.transition='transform 0.2s ease,box-shadow 0.2s ease';fab.style.animation='pimPulse 2.5s infinite';if(e)fab.releasePointerCapture(e.pointerId)}

// =============================================
// TOGGLE
// =============================================
function toggleChat(){const chat=document.getElementById('pimBotChat');if(!chat)return;pimBotOpen=!pimBotOpen;chat.style.display=pimBotOpen?'flex':'none';if(pimBotOpen){document.getElementById('pimBotMessages').style.display='flex';document.getElementById('pimBotQuickActions').style.display='flex';chat.querySelectorAll('div')[2].style.display='flex';chat.querySelectorAll('div')[3].style.display='block';pimBotMinimized=false;setTimeout(()=>{const inp=document.getElementById('pimBotInput');if(inp)inp.focus()},300)}}

// =============================================
// API KEY
// =============================================
function pimBotSetApiKey() {
  const current = GEMINI_API_KEY || '';
  const key = prompt('🔑 Masukkan Gemini API Key:\n\n(Dapatkan gratis di https://aistudio.google.com/apikey)', current);
  if (key !== null && key.trim()) {
    GEMINI_API_KEY = key.trim();
    localStorage.setItem('pimBotApiKey', GEMINI_API_KEY);
    document.getElementById('pimBotHeaderInfo').querySelector('div:last-child').innerHTML = '<span style="width:6px;height:6px;background:#4caf50;border-radius:50%;display:inline-block;margin-right:4px"></span>Online';
    alert('✅ API Key disimpan!');
  } else if (key === '') {
    localStorage.removeItem('pimBotApiKey');
    GEMINI_API_KEY = '';
    document.getElementById('pimBotHeaderInfo').querySelector('div:last-child').innerHTML = '<span style="width:6px;height:6px;background:#e53935;border-radius:50%;display:inline-block;margin-right:4px"></span>⚠️ Set API Key';
    alert('🗑️ API Key dihapus!');
  }
}

// =============================================
// QUICK ACTIONS
// =============================================
function pimBotQuickAction(action) {
  if (!pimBotOpen) toggleChat();
  switch(action) {
    case 'listMK': showMKList(''); break;
    case 'listKelas': showKelasList(); break;
    case 'helpJadwal': pimBotAddMessage('📋 <strong>Cara Input Jadwal:</strong><br><br>Ketik: <em>"Mengajar [MK] kelas [A,B] hari [Senin] JP [1-3]"</em><br><br>Contoh:<br>"Mengajar Fiqih kelas A,B,C Senin JP 1-3, Selasa JP 4-5"', 'bot'); break;
    case 'myJadwal': showMyJadwal(); break;
    case 'setKey': pimBotSetApiKey(); break;
  }
}

// =============================================
// SEND MESSAGE
// =============================================
async function pimBotSendMessage() {
  if (isTyping) return;
  const input = document.getElementById('pimBotInput');
  if (!input) return;
  const msg = input.value.trim();
  if (!msg) return;
  input.value = ''; input.focus();

  // Tanpa API Key → hanya perintah lokal
  if (!GEMINI_API_KEY) {
    pimBotAddMessage(msg, 'user');
    document.getElementById('pimBotQuickActions').style.display = 'none';
    const handled = await detectViewCommand(msg);
    if (!handled) {
      const jadwalParsed = await parseJadwalManual(msg);
      if (jadwalParsed && jadwalParsed.length > 0) {
        showJadwalPreview(jadwalParsed);
      } else {
        pimBotAddMessage('⚠️ API Key belum diatur! Klik ⚙️ atau tombol "Atur API Key" di atas.\n\nDapatkan gratis di: https://aistudio.google.com/apikey\n\nAtau gunakan perintah: Lihat matakuliah, Lihat kelas, Jadwal saya', 'bot');
      }
    }
    return;
  }

  isTyping = true;
  pimBotAddMessage(msg, 'user');
  document.getElementById('pimBotQuickActions').style.display = 'none';

  // Cek perintah lokal dulu
  const handled = await detectViewCommand(msg);
  if (handled) { isTyping = false; return; }

  // Parse jadwal manual
  const jadwalParsed = await parseJadwalManual(msg);
  if (jadwalParsed && jadwalParsed.length > 0) {
    showJadwalPreview(jadwalParsed);
    isTyping = false;
    return;
  }

  // Gunakan Gemini AI
  const tid = pimBotAddTyping();
  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-goog-api-key': GEMINI_API_KEY },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: [{ parts: [{ text: msg }] }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 500, topP: 0.95 }
      })
    });
    pimBotRemoveTyping(tid);
    if (!res.ok) {
      const ed = await res.json();
      if (res.status === 429) pimBotAddMessage('⚠️ Terlalu banyak request. Tunggu sebentar!', 'bot');
      else if (res.status === 400 && ed.error?.message?.includes('API key')) {
        pimBotAddMessage('❌ API Key tidak valid! Klik ⚙️ untuk atur ulang.', 'bot');
        GEMINI_API_KEY = ''; localStorage.removeItem('pimBotApiKey');
      } else pimBotAddMessage('❌ Error: ' + (ed.error?.message || 'Gagal'), 'bot');
    } else {
      const data = await res.json();
      if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
        pimBotAddMessage(data.candidates[0].content.parts[0].text, 'bot');
      } else pimBotAddMessage('⚠️ Maaf, coba lagi ya 😅', 'bot');
    }
  } catch(e) { pimBotRemoveTyping(tid); pimBotAddMessage('❌ Gagal terhubung.', 'bot'); }
  isTyping = false;
}

// =============================================
// DETECT VIEW COMMANDS
// =============================================
async function detectViewCommand(msg) {
  const lower = msg.toLowerCase();
  
  if (/tampilkan|lihat|daftar|list|semua/i.test(lower) && /matakuliah|mk|mata kuliah/i.test(lower)) {
    await showMKList(msg); return true;
  }
  if (/tampilkan|lihat|daftar|list|semua/i.test(lower) && /kelas/i.test(lower) && !/matakuliah|mk|mata kuliah/i.test(lower)) {
    await showKelasList(); return true;
  }
  if (/tampilkan|lihat|jadwal\s*saya|jadwalku/i.test(lower)) {
    await showMyJadwal(); return true;
  }
  if (/bantuan|help|cara|bagaimana/i.test(lower) && /input|tambah|buat/i.test(lower) && /jadwal/i.test(lower)) {
    pimBotAddMessage('📋 <strong>Cara Input Jadwal:</strong><br><br>Ketik: <em>"Mengajar [MK] kelas [A,B] hari [Senin] JP [1-3]"</em><br><br>Contoh:<br>"Mengajar Fiqih kelas A,B,C Senin JP 1-3, Selasa JP 4-5"<br><br>Bisa juga multi-hari dan multi-JP sekaligus!', 'bot');
    return true;
  }
  return false;
}

// =============================================
// SHOW MK LIST
// =============================================
async function showMKList(msg) {
  try {
    const lower = msg.toLowerCase();
    const snap = await db.collection('matakuliah').get();
    let mkList = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    
    if (/semester\s*(\d+)/i.test(lower)) {
      const sem = lower.match(/semester\s*(\d+)/i)[1];
      mkList = mkList.filter(m => String(m.semester) === sem);
    }
    if (/i'dad/i.test(lower)) {
      mkList = mkList.filter(m => String(m.semester).toLowerCase() === "i'dad");
    }
    
    const searchMatch = lower.match(/cari\s+(.+)/i);
    if (searchMatch) {
      const search = searchMatch[1].toLowerCase();
      mkList = mkList.filter(m => (m.nama||'').toLowerCase().includes(search) || (m.kode||'').toLowerCase().includes(search));
    }
    
    if (mkList.length === 0) { pimBotAddMessage('📭 Tidak ada matakuliah ditemukan.', 'bot'); return; }
    
    mkList.sort((a,b) => (a.nama||'').localeCompare(b.nama||''));
    let html = `<strong>📚 Matakuliah (${mkList.length}):</strong><br><br>`;
    mkList.slice(0, 20).forEach((m, i) => {
      html += `${i+1}. <strong>${m.kode||'-'}</strong> - ${m.nama||'-'} (${m.sks||0} SKS, Sem ${m.semester||'-'})<br>`;
    });
    if (mkList.length > 20) html += `<br>...dan ${mkList.length - 20} lainnya`;
    pimBotAddMessage(html, 'bot');
  } catch(e) { pimBotAddMessage('❌ Gagal memuat matakuliah.', 'bot'); }
}

async function showKelasList() {
  try {
    const snap = await db.collection('kelas').get();
    const kelasList = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    kelasList.sort((a,b) => (a.nama||'').localeCompare(b.nama||''));
    
    let html = `<strong>🏫 Kelas (${kelasList.length}):</strong><br><br>`;
    kelasList.forEach((k, i) => {
      html += `${i+1}. <strong>${k.nama||'-'}</strong> (Sem ${k.semester==="i'dad"?"I'dad":k.semester||'-'})<br>`;
    });
    pimBotAddMessage(html, 'bot');
  } catch(e) { pimBotAddMessage('❌ Gagal memuat kelas.', 'bot'); }
}

async function showMyJadwal() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (!user.uid) { pimBotAddMessage('⚠️ Kamu harus login dulu.', 'bot'); return; }
  
  try {
    const snap = await db.collection('jadwal').where('dosenId','==',user.uid).get();
    const jadwal = snap.docs.map(d => d.data());
    if (jadwal.length === 0) { pimBotAddMessage('📭 Kamu belum punya jadwal.', 'bot'); return; }
    
    const grouped = {};
    jadwal.forEach(j => {
      if (!grouped[j.hari]) grouped[j.hari] = [];
      grouped[j.hari].push(j);
    });
    
    let html = `<strong>📅 Jadwal Kamu (${jadwal.length} JP):</strong><br><br>`;
    ['Sabtu','Ahad','Senin','Selasa','Rabu','Kamis'].forEach(hari => {
      if (grouped[hari]) {
        html += `<strong>${hari}:</strong><br>`;
        grouped[hari].sort((a,b)=>(a.jamKe||0)-(b.jamKe||0)).forEach(j => {
          html += `  • JP ${j.jamKe} — ${j.mkNama||'-'} — ${j.kelasNama||'-'}<br>`;
        });
        html += '<br>';
      }
    });
    pimBotAddMessage(html, 'bot');
  } catch(e) { pimBotAddMessage('❌ Gagal memuat jadwal.', 'bot'); }
}

// =============================================
// PARSE JADWAL MANUAL
// =============================================
async function parseJadwalManual(msg) {
  const lower = msg.toLowerCase();
  if (!/mengajar|jadwal|jp|hari|kelas/i.test(lower)) return null;
  if (!/\d/.test(lower)) return null;
  
  let mkMap = {}, kelasMap = {};
  try {
    const [mkSnap, kelasSnap] = await Promise.all([
      db.collection('matakuliah').get(), db.collection('kelas').get()
    ]);
    mkSnap.forEach(d => { mkMap[d.data().nama?.toLowerCase()] = d.id; });
    kelasSnap.forEach(d => { kelasMap[d.data().nama?.toLowerCase()] = d.id; });
  } catch(e) { return null; }
  
  const jadwalList = [];
  const segments = msg.split(/[.;\n]+/).filter(s => s.trim());
  
  for (const seg of segments) {
    const s = seg.toLowerCase().trim();
    if (!s.includes('jp') && !s.includes('hari')) continue;
    
    let mkId = '', mkNama = '';
    for (const [nama, id] of Object.entries(mkMap)) {
      if (s.includes(nama)) { mkId = id; mkNama = nama; break; }
    }
    if (!mkId) continue;
    
    const hariList = ['senin','selasa','rabu','kamis','sabtu','ahad'];
    let hari = '';
    for (const h of hariList) { if (s.includes(h)) { hari = h.charAt(0).toUpperCase() + h.slice(1); break; } }
    if (!hari) continue;
    
    const jpMatch = s.match(/jp\s*(\d+)\s*[-–]\s*(\d+)/i);
    let jamKeList = [];
    if (jpMatch) {
      for (let j = parseInt(jpMatch[1]); j <= parseInt(jpMatch[2]); j++) jamKeList.push(j);
    } else {
      const jpSingle = s.match(/jp\s*(\d+)/gi);
      if (jpSingle) jamKeList = jpSingle.map(m => parseInt(m.replace(/[^0-9]/g, '')));
    }
    if (jamKeList.length === 0) continue;
    
    const kelasMatch = s.match(/kelas\s*:?\s*([a-g, ]+)/i);
    let kelasNamaList = [];
    if (kelasMatch) {
      kelasNamaList = kelasMatch[1].split(/[, ]+/).filter(k => k.trim()).map(k => k.trim().toUpperCase());
    } else {
      const hurufMatch = s.match(/\b([A-Ga-g])\b/g);
      if (hurufMatch) kelasNamaList = [...new Set(hurufMatch.map(h => h.toUpperCase()))];
    }
    
    const kelasIds = [], kelasNamas = [];
    for (const kn of kelasNamaList) {
      const matched = Object.entries(kelasMap).find(([nama]) => nama.toLowerCase().includes(kn.toLowerCase()) || nama.toUpperCase() === kn);
      if (matched) { kelasIds.push(matched[1]); kelasNamas.push(matched[0]); }
    }
    if (kelasIds.length === 0) continue;
    
    const JP_WAKTU = {1:'07:15-08:05',2:'08:10-09:00',3:'09:05-09:55',4:'10:10-11:00',5:'11:05-11:55',6:'13:00-13:50',7:'13:55-14:45',8:'14:50-15:40'};
    
    for (const jamKe of jamKeList) {
      if (!JP_WAKTU[jamKe]) continue;
      jadwalList.push({
        hari, jamKe, waktu: JP_WAKTU[jamKe],
        mkId, mkNama, kelasIds: [...kelasIds], kelasNama: kelasNamas.join(', '), kelasId: kelasIds[0]
      });
    }
  }
  return jadwalList.length > 0 ? jadwalList : null;
}

function showJadwalPreview(jadwalList) {
  const grouped = {};
  jadwalList.forEach(j => { if(!grouped[j.hari]) grouped[j.hari] = []; grouped[j.hari].push(j); });
  
  let html = `<strong>📋 ${jadwalList.length} slot jadwal:</strong><br><br>`;
  for (const [hari, slots] of Object.entries(grouped)) {
    html += `<strong>📅 ${hari}:</strong><br>`;
    slots.sort((a,b)=>a.jamKe-b.jamKe).forEach(s => {
      html += `  • JP ${s.jamKe} (${s.waktu}) — ${s.mkNama} — Kelas ${s.kelasNama}<br>`;
    });
    html += '<br>';
  }
  html += `<button onclick="pimBotSimpanJadwal(${JSON.stringify(jadwalList).replace(/"/g,'&quot;')})" style="background:#004d40;color:white;border:none;padding:8px 16px;border-radius:20px;font-weight:600;cursor:pointer;margin-right:6px;">✅ Simpan Semua</button>`;
  html += `<button onclick="pimBotAddMessage('❌ Dibatalkan.','bot')" style="background:#e53935;color:white;border:none;padding:8px 16px;border-radius:20px;font-weight:600;cursor:pointer;">❌ Batal</button>`;
  
  pimBotAddMessage(html, 'bot');
}

async function pimBotSimpanJadwal(jadwalList) {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (!user.uid) { pimBotAddMessage('❌ Kamu harus login dulu!', 'bot'); return; }
  
  const batch = db.batch(); let count = 0;
  for (const j of jadwalList) {
    const kelas = await db.collection('kelas').doc(j.kelasId).get();
    const ref = db.collection('jadwal').doc();
    batch.set(ref, {
      hari: j.hari, jamKe: j.jamKe, waktu: j.waktu,
      dosenId: user.uid, dosenNama: user.nama || '-',
      mkId: j.mkId, mkNama: j.mkNama,
      kelasId: j.kelasId, kelasIds: j.kelasIds, kelasNama: j.kelasNama,
      semester: kelas.exists ? kelas.data().semester : '1',
      totalPertemuan: 16, minKehadiran: 75,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    count++;
  }
  try { await batch.commit(); pimBotAddMessage(`✅ <strong>${count} jadwal berhasil disimpan!</strong>`, 'bot'); }
  catch(e) { pimBotAddMessage('❌ Gagal: ' + e.message, 'bot'); }
}

// =============================================
// DARK, CLEAR, MESSAGE
// =============================================
function pimBotToggleDark(){darkMode=!darkMode;const c=document.getElementById('pimBotChat');const m=document.getElementById('pimBotMessages');const i=document.getElementById('pimBotInput');if(!c||!m||!i)return;if(darkMode){c.style.background='#1e1e1e';m.style.background='#1a1a1a';i.style.background='#2d2d2d';i.style.color='#e0e0e0';i.style.borderColor='#3d3d3d'}else{c.style.background='white';m.style.background='#f5f5f5';i.style.background='white';i.style.color='#333';i.style.borderColor='#e0e0e0'}}

function pimBotClearChat(){if(confirm('Hapus percakapan?')){document.getElementById('pimBotMessages').innerHTML='';document.getElementById('pimBotQuickActions').style.display='flex';pimBotAddMessage('Chat dihapus! Siap membantu 😊','bot')}}

function pimBotAddMessage(text,sender){const msgs=document.getElementById('pimBotMessages');if(!msgs)return;const div=document.createElement('div');div.className='pim-bot-message';div.style.cssText=`display:flex;gap:8px;align-items:flex-start;flex-direction:${sender==='user'?'row-reverse':'row'}`;const av=document.createElement('div');av.style.cssText=`width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0;${sender==='user'?'background:linear-gradient(135deg,#00897b,#4db6ac);color:white':'background:linear-gradient(135deg,#004d40,#00897b);color:white'}`;av.innerHTML=sender==='user'?'👤':'🤖';const bb=document.createElement('div');bb.style.cssText=`padding:10px 15px;border-radius:14px;font-size:13px;line-height:1.6;max-width:82%;word-break:break-word;white-space:pre-wrap;${sender==='user'?'background:#004d40;color:white':'background:white;color:#333;border:1px solid #e0e0e0'}`;bb.innerHTML=text;div.appendChild(av);div.appendChild(bb);msgs.appendChild(div);msgs.scrollTop=msgs.scrollHeight}

function pimBotAddTyping(){const id='typing-'+Date.now();const msgs=document.getElementById('pimBotMessages');if(!msgs)return id;const div=document.createElement('div');div.id=id;div.style.cssText='display:flex;gap:8px;align-items:flex-start';div.innerHTML='<div style="width:30px;height:30px;border-radius:50%;background:linear-gradient(135deg,#004d40,#00897b);display:flex;align-items:center;justify-content:center;color:white;font-size:14px;flex-shrink:0">🤖</div><div style="background:white;padding:14px 18px;border-radius:14px;border:1px solid #e0e0e0;display:flex;gap:6px"><span style="width:8px;height:8px;border-radius:50%;background:#999;animation:pimTyping 1.4s infinite;display:block"></span><span style="width:8px;height:8px;border-radius:50%;background:#999;animation:pimTyping 1.4s .2s infinite;display:block"></span><span style="width:8px;height:8px;border-radius:50%;background:#999;animation:pimTyping 1.4s .4s infinite;display:block"></span></div>';msgs.appendChild(div);msgs.scrollTop=msgs.scrollHeight;return id}
function pimBotRemoveTyping(id){const el=document.getElementById(id);if(el)el.remove()}

// =============================================
// INIT
// =============================================
(function initPimBot(){if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',()=>{createPimBot();console.log('🤖 PIM-Bot v6.0 siap!')})}else{createPimBot();console.log('🤖 PIM-Bot v6.0 siap!')}})();

window.toggleChat=toggleChat;window.pimBotSendMessage=pimBotSendMessage;
window.pimBotToggleDark=pimBotToggleDark;window.pimBotClearChat=pimBotClearChat;
window.pimBotSetApiKey=pimBotSetApiKey;window.pimBotSimpanJadwal=pimBotSimpanJadwal;
window.pimBotAddMessage=pimBotAddMessage;window.pimBotQuickAction=pimBotQuickAction;
