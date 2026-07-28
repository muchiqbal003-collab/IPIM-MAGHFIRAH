// =============================================
// IPIM Maghfirah - PIM-Bot AI Agent v6.0
// Fitur: API Key localStorage + Input Jadwal Cepat
// =============================================

// API Key — disimpan di localStorage
let GEMINI_API_KEY = localStorage.getItem('pimBotApiKey') || '';
const GEMINI_MODEL = 'gemini-flash-latest';

// System prompt
const SYSTEM_PROMPT = `
Kamu adalah PIM-Bot, AGENT AI IPIM Maghfirah.
Kamu bisa menjawab pertanyaan APAPUN dan juga MENAMBAHKAN JADWAL langsung.

🎯 FORMAT INPUT JADWAL (jika user minta tambah jadwal):
Gunakan format JSON di dalam \`\`\`agent:

\`\`\`agent
{"action":"TAMBAH_JADWAL_BATCH","data":[{"hari":"Senin","jamKe":[1,2,3],"mkNama":"Fiqih","kelasNama":["A","B","C"]},{"hari":"Selasa","jamKe":[4,5],"mkNama":"Bahasa Arab","kelasNama":["D","E"]}]}
\`\`\`

📋 ATURAN:
- Jika user minta tambah jadwal, TANYAKAN dulu MK, kelas, hari, dan JP sampai lengkap
- Setelah lengkap, keluarkan AGENT COMMAND dalam format di atas
- Jangan lupa konfirmasi sebelum eksekusi
- Gunakan bahasa Indonesia santai & Islami
- Jawab pertanyaan umum dengan singkat & jelas
`;

// State
let pimBotOpen = false, pimBotMinimized = false, isTyping = false, isListening = false, darkMode = false;
let conversationHistory = [], pendingAction = null;
let botX = window.innerWidth - 76, botY = window.innerHeight - 170;
let isDragging = false, dragStartX = 0, dragStartY = 0, dragMoved = false;

const QUICK_ACTIONS = [
  { icon: 'fa-calendar-plus', text: 'Input jadwal cepat', color: '#1565c0' },
  { icon: 'fa-mosque', text: 'Cara absensi sholat?', color: '#00897b' },
  { icon: 'fa-book-open', text: 'Input hafalan Quran', color: '#6a1b9a' },
  { icon: 'fa-lightbulb', text: 'Tips produktif belajar', color: '#f57c00' },
  { icon: 'fa-key', text: 'Atur API Key', color: '#e65100', action: 'setKey' },
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
    .agent-confirm{background:#fff8e1!important;border:2px solid #ffc107!important}
    .agent-success{background:#e8f5e9!important;border:2px solid #4caf50!important}
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
    height:'580px',maxHeight:'80vh',bottom:'80px',right:'16px',
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
        <div style="font-size:10px;opacity:0.8"><span style="width:6px;height:6px;background:#4caf50;border-radius:50%;display:inline-block;margin-right:4px"></span>${GEMINI_API_KEY?'Online · Siap bantu':'⚠️ API Key belum diatur'}</div>
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
          🎯 <strong>Fitur baru:</strong><br>
          • Input jadwal cepat: "Saya mengajar Fiqih kelas A,B,C Senin JP 1-3"<br>
          • API Key disimpan di browser<br><br>
          💬 Coba ketik atau pakai voice input 🎤
        </div>
      </div>
      <div id="pimBotQuickActions" style="display:flex;flex-wrap:wrap;gap:6px;padding:4px 0">
        ${QUICK_ACTIONS.map(qa => `
          <button class="pim-bot-quick-btn" onclick="${qa.action ? "pimBotSetApiKey()" : `pimBotQuickAsk('${qa.text}')`}" style="background:white;border:1px solid #e0e0e0;border-radius:20px;padding:8px 14px;font-size:11.5px;cursor:pointer;display:flex;align-items:center;gap:6px;font-family:inherit;color:#333;border-left:3px solid ${qa.color}">
            <i class="fa-solid ${qa.icon}" style="color:${qa.color};font-size:11px"></i>${qa.text}
          </button>
        `).join('')}
      </div>
    </div>
    <div id="pimBotConfirmArea" style="display:none;padding:10px 12px;background:#fff8e1;border-top:2px solid #ffc107">
      <div style="font-size:12px;font-weight:600;margin-bottom:6px">⚠️ Konfirmasi:</div>
      <div id="pimBotConfirmText" style="font-size:11px;margin-bottom:8px;color:#333"></div>
      <div style="display:flex;gap:6px">
        <button onclick="pimBotConfirmYes()" style="flex:1;padding:8px;background:#004d40;color:white;border:none;border-radius:8px;font-weight:600;cursor:pointer;font-size:12px">✅ Ya, Jalankan</button>
        <button onclick="pimBotConfirmNo()" style="flex:1;padding:8px;background:#e53935;color:white;border:none;border-radius:8px;font-weight:600;cursor:pointer;font-size:12px">❌ Batal</button>
      </div>
    </div>
    <div style="padding:10px 12px;background:white;border-top:1px solid #e0e0e0;display:flex;gap:8px;align-items:center;flex-shrink:0">
      <button id="pimBotVoiceBtn" onclick="pimBotVoiceInput()" style="width:38px;height:38px;border-radius:50%;background:#f5f5f5;border:1px solid #e0e0e0;font-size:16px;cursor:pointer;flex-shrink:0" title="Voice Input">🎤</button>
      <input id="pimBotInput" type="text" placeholder="Contoh: Saya mengajar Fiqih kelas A,B,C Senin JP 1-3..." style="flex:1;padding:11px 16px;border:1.5px solid #e0e0e0;border-radius:24px;font-size:13px;font-family:inherit;outline:none">
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
    chat.querySelectorAll('div')[3].style.display=d==='none'?'none':'flex';
    chat.querySelectorAll('div')[4].style.display=d==='none'?'none':'flex';
    chat.querySelectorAll('div')[5].style.display=d==='none'?'none':'block';
  });

  console.log('🤖 PIM-Bot v6.0 ready! API Key:', GEMINI_API_KEY ? '✅ Set' : '⚠️ Not set');
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
function toggleChat(){const chat=document.getElementById('pimBotChat');if(!chat)return;pimBotOpen=!pimBotOpen;chat.style.display=pimBotOpen?'flex':'none';if(pimBotOpen){document.getElementById('pimBotMessages').style.display='flex';document.getElementById('pimBotQuickActions').style.display='flex';chat.querySelectorAll('div')[3].style.display='flex';chat.querySelectorAll('div')[4].style.display='flex';chat.querySelectorAll('div')[5].style.display='block';pimBotMinimized=false;setTimeout(()=>{const inp=document.getElementById('pimBotInput');if(inp)inp.focus()},300)}}

// =============================================
// API KEY MANAGEMENT
// =============================================
function pimBotSetApiKey() {
  const current = GEMINI_API_KEY || '';
  const key = prompt('🔑 Masukkan Gemini API Key:\n\n(Dapatkan gratis di https://aistudio.google.com/apikey)\n\nKalau sudah ada, klik OK untuk tetap pakai yang lama.', current);
  if (key !== null && key.trim()) {
    GEMINI_API_KEY = key.trim();
    localStorage.setItem('pimBotApiKey', GEMINI_API_KEY);
    // Update header status
    const headerInfo = document.getElementById('pimBotHeaderInfo');
    if (headerInfo) {
      headerInfo.querySelector('div:last-child').innerHTML = '<span style="width:6px;height:6px;background:#4caf50;border-radius:50%;display:inline-block;margin-right:4px"></span>Online · Siap bantu';
    }
    alert('✅ API Key disimpan!');
  } else if (key === '') {
    localStorage.removeItem('pimBotApiKey');
    GEMINI_API_KEY = '';
    alert('🗑️ API Key dihapus!');
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
  
  // ═══ JIKA API KEY BELUM DIATUR ═══
  if (!GEMINI_API_KEY) {
    pimBotAddMessage(msg, 'user');
    pimBotAddMessage('⚠️ API Key belum diatur!\n\nKlik tombol ⚙️ di header chat untuk memasukkan Gemini API Key.\n\nDapatkan gratis di: https://aistudio.google.com/apikey', 'bot');
    return;
  }
  
  isTyping = true;
  pimBotAddMessage(msg, 'user');
  document.getElementById('pimBotQuickActions').style.display = 'none';
  
  const tid = pimBotAddTyping();
  
  try {
    // ═══ DETEKSI INPUT JADWAL CEPAT (TANPA AI) ═══
    const jadwalParsed = parseJadwalManual(msg);
    if (jadwalParsed && jadwalParsed.length > 0) {
      pimBotRemoveTyping(tid);
      // Tampilkan preview
      showJadwalPreview(jadwalParsed);
      isTyping = false;
      return;
    }
    
    // ═══ GUNAKAN GEMINI AI ═══
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-goog-api-key': GEMINI_API_KEY },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: [{ parts: [{ text: msg }] }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 600, topP: 0.95 }
      })
    });
    
    pimBotRemoveTyping(tid);
    
    if (!res.ok) {
      const ed = await res.json();
      if (res.status === 429) {
        pimBotAddMessage('⚠️ Terlalu banyak request. Tunggu sebentar ya!', 'bot');
      } else if (res.status === 400 && ed.error?.message?.includes('API key')) {
        pimBotAddMessage('❌ API Key tidak valid! Klik ⚙️ untuk mengatur ulang.', 'bot');
        GEMINI_API_KEY = '';
        localStorage.removeItem('pimBotApiKey');
      } else {
        pimBotAddMessage('❌ Error: ' + (ed.error?.message || 'Gagal'), 'bot');
      }
      isTyping = false;
      return;
    }
    
    const data = await res.json();
    if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
      let reply = data.candidates[0].content.parts[0].text;
      reply = await pimBotExecuteAgent(reply);
      pimBotAddMessage(reply, 'bot');
    } else {
      pimBotAddMessage('⚠️ Maaf, coba lagi ya 😅', 'bot');
    }
  } catch(e) {
    pimBotRemoveTyping(tid);
    console.error(e);
    pimBotAddMessage('❌ Gagal terhubung. Cek internetmu ya!', 'bot');
  }
  
  isTyping = false;
}

// =============================================
// PARSE JADWAL MANUAL (TANPA AI)
// =============================================
async function parseJadwalManual(msg) {
  // Pattern: MK kelas A,B,C hari Senin JP 1-3
  const lower = msg.toLowerCase();
  
  // Cek apakah ini perintah jadwal
  if (!/mengajar|jadwal|jp|hari|kelas/i.test(lower)) return null;
  if (!/\d/.test(lower)) return null; // harus ada angka JP
  
  // Load data dari Firestore
  let mkMap = {}, kelasMap = {};
  try {
    const [mkSnap, kelasSnap] = await Promise.all([
      db.collection('matakuliah').get(),
      db.collection('kelas').get()
    ]);
    mkSnap.forEach(d => { mkMap[d.data().nama?.toLowerCase()] = d.id; });
    kelasSnap.forEach(d => { kelasMap[d.data().nama?.toLowerCase()] = d.id; });
  } catch(e) { console.error(e); return null; }
  
  const jadwalList = [];
  
  // Split per baris atau per "hari"
  const segments = msg.split(/[.;\n]+/).filter(s => s.trim());
  
  for (const seg of segments) {
    const s = seg.toLowerCase().trim();
    if (!s.includes('jp') && !s.includes('hari')) continue;
    
    // Cari MK
    let mkId = '', mkNama = '';
    for (const [nama, id] of Object.entries(mkMap)) {
      if (s.includes(nama)) { mkId = id; mkNama = nama; break; }
    }
    if (!mkId) continue;
    
    // Cari hari
    const hariList = ['senin','selasa','rabu','kamis','sabtu','ahad'];
    let hari = '';
    for (const h of hariList) {
      if (s.includes(h)) { hari = h.charAt(0).toUpperCase() + h.slice(1); break; }
    }
    if (!hari) continue;
    
    // Cari JP (format: JP 1-3 atau JP 1,2,3)
    const jpMatch = s.match(/jp\s*(\d+)\s*[-–]\s*(\d+)/i);
    let jamKeList = [];
    if (jpMatch) {
      const start = parseInt(jpMatch[1]), end = parseInt(jpMatch[2]);
      for (let j = start; j <= end; j++) jamKeList.push(j);
    } else {
      const jpSingle = s.match(/jp\s*(\d+)/gi);
      if (jpSingle) {
        jamKeList = jpSingle.map(m => parseInt(m.replace(/[^0-9]/g, '')));
      }
    }
    if (jamKeList.length === 0) continue;
    
    // Cari kelas (format: kelas A,B,C atau A,B,C setelah "kelas")
    const kelasMatch = s.match(/kelas\s*:?\s*([a-g, ]+)/i);
    let kelasNamaList = [];
    if (kelasMatch) {
      kelasNamaList = kelasMatch[1].split(/[, ]+/).filter(k => k.trim()).map(k => k.trim().toUpperCase());
    } else {
      // Coba cari huruf tunggal A-G
      const hurufMatch = s.match(/\b([A-Ga-g])\b/g);
      if (hurufMatch) {
        kelasNamaList = [...new Set(hurufMatch.map(h => h.toUpperCase()))];
      }
    }
    
    // Cocokkan kelas dengan database
    const kelasIds = [];
    const kelasNamas = [];
    for (const kn of kelasNamaList) {
      const matchedKelas = Object.entries(kelasMap).find(([nama, id]) => 
        nama.toLowerCase().includes(kn.toLowerCase()) || nama.toUpperCase() === kn
      );
      if (matchedKelas) {
        kelasIds.push(matchedKelas[1]);
        kelasNamas.push(matchedKelas[0]);
      }
    }
    if (kelasIds.length === 0) continue;
    
    // Hitung JP waktu
    const JP_WAKTU = {
      1: '07:15-08:05', 2: '08:10-09:00', 3: '09:05-09:55',
      4: '10:10-11:00', 5: '11:05-11:55'
    };
    
    // Buat jadwal entries
    for (const jamKe of jamKeList) {
      if (!JP_WAKTU[jamKe]) continue;
      jadwalList.push({
        hari, jamKe, waktu: JP_WAKTU[jamKe],
        mkId, mkNama,
        kelasIds: [...kelasIds],
        kelasNama: kelasNamas.join(', '),
        kelasId: kelasIds[0]
      });
    }
  }
  
  return jadwalList.length > 0 ? jadwalList : null;
}

// =============================================
// SHOW JADWAL PREVIEW
// =============================================
function showJadwalPreview(jadwalList) {
  const totalSlot = jadwalList.length;
  
  let html = '<div style="font-size:12px;line-height:1.6;">';
  html += `<strong>📋 Ditemukan ${totalSlot} slot jadwal:</strong><br><br>`;
  
  // Group by hari
  const grouped = {};
  jadwalList.forEach(j => {
    if (!grouped[j.hari]) grouped[j.hari] = [];
    grouped[j.hari].push(j);
  });
  
  for (const [hari, slots] of Object.entries(grouped)) {
    html += `<strong>📅 ${hari}:</strong><br>`;
    slots.forEach(s => {
      html += `  • JP ${s.jamKe} (${s.waktu}) — ${s.mkNama} — Kelas ${s.kelasNama}<br>`;
    });
    html += '<br>';
  }
  html += '</div>';
  
  // Tombol simpan
  html += `<div style="margin-top:8px;display:flex;gap:8px;">
    <button class="pim-bot-quick-btn" onclick="pimBotSimpanJadwal(${JSON.stringify(jadwalList).replace(/"/g, '&quot;')})" style="background:#004d40;color:white;border:none;padding:8px 16px;border-radius:20px;font-weight:600;cursor:pointer;">✅ Simpan ${totalSlot} Jadwal</button>
    <button class="pim-bot-quick-btn" onclick="pimBotAddMessage('❌ Dibatalkan.','bot')" style="background:#e53935;color:white;border:none;padding:8px 16px;border-radius:20px;font-weight:600;cursor:pointer;">❌ Batal</button>
  </div>`;
  
  pimBotAddMessage(html, 'bot');
}

// =============================================
// SIMPAN JADWAL
// =============================================
async function pimBotSimpanJadwal(jadwalList) {
  if (!jadwalList || jadwalList.length === 0) return;
  
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const uid = user.uid || '';
  const nama = user.nama || 'Dosen';
  
  if (!uid) {
    pimBotAddMessage('❌ Kamu harus login dulu untuk menyimpan jadwal!', 'bot');
    return;
  }
  
  let count = 0;
  const batch = db.batch();
  
  for (const j of jadwalList) {
    const kelas = await db.collection('kelas').doc(j.kelasId).get();
    const semester = kelas.exists ? kelas.data().semester : '1';
    
    const ref = db.collection('jadwal').doc();
    batch.set(ref, {
      hari: j.hari, jamKe: j.jamKe, waktu: j.waktu,
      dosenId: uid, dosenNama: nama,
      mkId: j.mkId, mkNama: j.mkNama,
      kelasId: j.kelasId, kelasIds: j.kelasIds,
      kelasNama: j.kelasNama,
      semester: semester,
      totalPertemuan: 16, minKehadiran: 75,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    count++;
  }
  
  try {
    await batch.commit();
    pimBotAddMessage(`✅ <strong>${count} jadwal berhasil disimpan!</strong>\n\nCek halaman <em>Jadwal Saya</em> untuk melihatnya.`, 'bot');
  } catch(e) {
    pimBotAddMessage('❌ Gagal menyimpan: ' + e.message, 'bot');
  }
}

// =============================================
// AGENT EXECUTOR
// =============================================
async function pimBotExecuteAgent(responseText) {
  const agentMatch = responseText.match(/```agent\n([\s\S]*?)\n```/);
  if (!agentMatch) return responseText;
  
  try {
    const command = JSON.parse(agentMatch[1]);
    if (command.action === 'TAMBAH_JADWAL_BATCH' && command.data) {
      const jadwalList = [];
      const JP_WAKTU = {1:'07:15-08:05',2:'08:10-09:00',3:'09:05-09:55',4:'10:10-11:00',5:'11:05-11:55'};
      
      for (const item of command.data) {
        for (const jamKe of item.jamKe) {
          jadwalList.push({
            hari: item.hari, jamKe, waktu: JP_WAKTU[jamKe] || '',
            mkNama: item.mkNama, kelasNama: (item.kelasNama||[]).join(', '),
            mkId: '', kelasIds: [], kelasId: ''
          });
        }
      }
      
      // Tampilkan preview
      const preview = responseText.replace(/```agent\n[\s\S]*?\n```/, '⏳ _Menampilkan preview..._');
      showJadwalPreview(jadwalList);
      return preview;
    }
    return responseText;
  } catch(e) {
    return responseText;
  }
}

// =============================================
// QUICK ASK, VOICE, DARK, CLEAR, MESSAGE
// =============================================
function pimBotQuickAsk(text){if(!pimBotOpen)toggleChat();const input=document.getElementById('pimBotInput');if(input)input.value=text;pimBotSendMessage()}

function pimBotVoiceInput(){const btn=document.getElementById('pimBotVoiceBtn');const SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SR){alert('⚠️ Voice input butuh Chrome ya!');return}
const r=new SR();r.lang='id-ID';r.interimResults=false;
if(isListening){r.stop();btn.style.background='#f5f5f5';btn.innerHTML='🎤';isListening=false;return}
isListening=true;btn.style.background='#ff1744';btn.style.color='white';btn.innerHTML='🔴';r.start();
r.onresult=e=>{const input=document.getElementById('pimBotInput');if(input)input.value=e.results[0][0].transcript;btn.style.background='#4caf50';btn.innerHTML='✅';isListening=false;setTimeout(()=>{btn.style.background='#f5f5f5';btn.style.color='black';btn.innerHTML='🎤'},1000);pimBotSendMessage()}
r.onerror=()=>{btn.style.background='#f5f5f5';btn.style.color='black';btn.innerHTML='🎤';isListening=false}}

function pimBotToggleDark(){darkMode=!darkMode;const c=document.getElementById('pimBotChat');const m=document.getElementById('pimBotMessages');const i=document.getElementById('pimBotInput');
if(!c||!m||!i)return;
if(darkMode){c.style.background='#1e1e1e';m.style.background='#1a1a1a';i.style.background='#2d2d2d';i.style.color='#e0e0e0';i.style.borderColor='#3d3d3d'}
else{c.style.background='white';m.style.background='#f5f5f5';i.style.background='white';i.style.color='#333';i.style.borderColor='#e0e0e0'}}

function pimBotClearChat(){if(confirm('Hapus percakapan?')){document.getElementById('pimBotMessages').innerHTML='';document.getElementById('pimBotQuickActions').style.display='flex';conversationHistory=[];pendingAction=null;document.getElementById('pimBotConfirmArea').style.display='none';pimBotAddMessage('Chat dihapus! Siap membantu 😊','bot')}}

function pimBotAddMessage(text,sender){const msgs=document.getElementById('pimBotMessages');if(!msgs)return;const div=document.createElement('div');div.className='pim-bot-message';div.style.cssText=`display:flex;gap:8px;align-items:flex-start;flex-direction:${sender==='user'?'row-reverse':'row'}`;
const av=document.createElement('div');av.style.cssText=`width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0;${sender==='user'?'background:linear-gradient(135deg,#00897b,#4db6ac);color:white':'background:linear-gradient(135deg,#004d40,#00897b);color:white'}`;av.innerHTML=sender==='user'?'👤':'🤖';
const bb=document.createElement('div');bb.style.cssText=`padding:10px 15px;border-radius:14px;font-size:13px;line-height:1.6;max-width:82%;word-break:break-word;white-space:pre-wrap;${sender==='user'?'background:#004d40;color:white':'background:white;color:#333;border:1px solid #e0e0e0'}`;bb.innerHTML=text;
div.appendChild(av);div.appendChild(bb);msgs.appendChild(div);msgs.scrollTop=msgs.scrollHeight}

function pimBotAddTyping(){const id='typing-'+Date.now();const msgs=document.getElementById('pimBotMessages');if(!msgs)return id;const div=document.createElement('div');div.id=id;div.style.cssText='display:flex;gap:8px;align-items:flex-start';div.innerHTML='<div style="width:30px;height:30px;border-radius:50%;background:linear-gradient(135deg,#004d40,#00897b);display:flex;align-items:center;justify-content:center;color:white;font-size:14px;flex-shrink:0">🤖</div><div style="background:white;padding:14px 18px;border-radius:14px;border:1px solid #e0e0e0;display:flex;gap:6px"><span style="width:8px;height:8px;border-radius:50%;background:#999;animation:pimTyping 1.4s infinite;display:block"></span><span style="width:8px;height:8px;border-radius:50%;background:#999;animation:pimTyping 1.4s .2s infinite;display:block"></span><span style="width:8px;height:8px;border-radius:50%;background:#999;animation:pimTyping 1.4s .4s infinite;display:block"></span></div>';msgs.appendChild(div);msgs.scrollTop=msgs.scrollHeight;return id}
function pimBotRemoveTyping(id){const el=document.getElementById(id);if(el)el.remove()}

// =============================================
// CONFIRM
// =============================================
function pimBotConfirmYes(){document.getElementById('pimBotConfirmArea').style.display='none';if(pendingAction){pimBotAddMessage('⏳ Mengeksekusi...','bot');setTimeout(()=>pimBotAddMessage('✅ Selesai!','bot'),1000);pendingAction=null}}
function pimBotConfirmNo(){document.getElementById('pimBotConfirmArea').style.display='none';pendingAction=null;pimBotAddMessage('❌ Dibatalkan.','bot')}

// =============================================
// INIT
// =============================================
(function initPimBot(){if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',()=>{createPimBot();console.log('🤖 PIM-Bot v6.0 siap!')})}else{createPimBot();console.log('🤖 PIM-Bot v6.0 siap!')}})();

// Export global
window.toggleChat=toggleChat;window.pimBotSendMessage=pimBotSendMessage;window.pimBotQuickAsk=pimBotQuickAsk;
window.pimBotVoiceInput=pimBotVoiceInput;window.pimBotToggleDark=pimBotToggleDark;window.pimBotClearChat=pimBotClearChat;
window.pimBotSetApiKey=pimBotSetApiKey;window.pimBotSimpanJadwal=pimBotSimpanJadwal;
window.pimBotConfirmYes=pimBotConfirmYes;window.pimBotConfirmNo=pimBotConfirmNo;
window.pimBotAddMessage=pimBotAddMessage;
