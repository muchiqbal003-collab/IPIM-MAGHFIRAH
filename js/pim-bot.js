// =============================================
// IPIM Maghfirah - PIM-Bot AI Assistant v2.0
// Powered by Gemini 2.0 Flash
// Fitur: Voice input, dark mode, history, quick actions
// =============================================

const GEMINI_API_KEY = 'AQ.Ab8RN6K-NOedSq2LU9orFcjMGo5GMs6mog-cj1CmP__yytYmLw';

// System prompt (bisa jawab APA SAJA, tidak terbatas aplikasi)
const SYSTEM_PROMPT = `
Kamu adalah PIM-Bot, asisten AI cerdas dari IPIM Maghfirah (Institute Pendidikan Islam Maghfirah).
Kamu memiliki kepribadian ramah, Islami, helpful, dan bisa menjawab pertanyaan tentang APAPUN.

📱 INFORMASI APLIKASI (jika ditanya tentang IPIM):
- Nama: IPIM Maghfirah - Sistem Informasi Pesantren Terpadu
- Website: https://muchiqbal003-collab.github.io/IPIM-MAGHFIRAH/
- Fitur: Absensi digital, penilaian, rekap, jadwal, kalender akademik, absensi sholat, hafalan Al-Qur'an, ujian quran, notifikasi, dashboard

👥 ROLE: pusat-data, operator-akademik, operator-halaqoh, operator-bahasa, operator-pengasuhan, dosen, musyrif, dosen-musyrif, umum

🔧 PANDUAN FITUR:
- Dashboard: Rekap sholat, jadwal hari ini, motivasi, shortcut
- Absensi Sholat: Klik "Isi Absensi Sholat" di dashboard
- Absensi Kelas: Dosen absensi dari jadwal, hadir otomatis
- Absensi Halaqoh: Musyrif absensi anggota halaqoh
- Jadwal: Lihat jadwal mengajar di "Jadwal Saya"
- Kalender: Kalender akademik, bisa share ke WhatsApp
- Notifikasi: Ikon lonceng di header
- Profil: Upload foto, ubah nama, ganti password
- Menu Cepat: Semua fitur dalam satu halaman
- AI Bot: Kamu! Floating button di pojok kanan bawah

🎯 CARA MENJAWAB:
- Jawab SEMUA jenis pertanyaan (agama, sains, teknologi, kehidupan, dll)
- Jika user tanya fitur aplikasi, beri langkah-langkah jelas dengan emoji
- Gunakan bahasa Indonesia santun dan ramah
- Sesekali sisipkan kata Islami (InshaAllah, Alhamdulillah, dll)
- Beri semangat dan motivasi di akhir jawaban
- Jika tidak tahu, jujur katakan tidak tahu
- Format jawaban yang rapi dengan emoji dan paragraf yang enak dibaca
`;

// State
let pimBotOpen = false;
let pimBotMinimized = false;
let chatHistory = [];
let isTyping = false;
let isListening = false;
let darkMode = false;

// Posisi floating button (default)
let botX = window.innerWidth - 76;
let botY = window.innerHeight - 170;
let isDragging = false;
let dragStartX = 0;
let dragStartY = 0;
let dragMoved = false;

// Quick actions
const QUICK_ACTIONS = [
  { icon: 'fa-mosque', text: 'Cara absensi sholat?', color: '#00897b' },
  { icon: 'fa-calendar-check', text: 'Cek jadwal hari ini', color: '#1565c0' },
  { icon: 'fa-book-open', text: 'Input hafalan Al-Quran', color: '#6a1b9a' },
  { icon: 'fa-user-graduate', text: 'Cara lihat nilai', color: '#e65100' },
  { icon: 'fa-bell', text: 'Notifikasi tidak muncul', color: '#c62828' },
  { icon: 'fa-brain', text: 'Tips menghafal Al-Quran', color: '#2e7d32' },
];

// =============================================
// CREATE UI
// =============================================

function createPimBot() {
  // Inject CSS
  const style = document.createElement('style');
  style.textContent = `
    @keyframes pimPulse {
      0%, 100% { box-shadow: 0 0 0 0 rgba(0,77,64,0.4); }
      50% { box-shadow: 0 0 0 14px rgba(0,77,64,0); }
    }
    @keyframes pimTyping {
      0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
      30% { transform: translateY(-8px); opacity: 1; }
    }
    @keyframes pimSlideIn {
      from { opacity: 0; transform: translateY(20px) scale(0.95); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
    .pim-bot-fab {
      animation: pimPulse 2.5s infinite;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      touch-action: none;
    }
    .pim-bot-fab:active {
      animation: none;
    }
    .pim-bot-chat {
      animation: pimSlideIn 0.3s ease;
    }
    .pim-bot-message {
      animation: pimSlideIn 0.2s ease;
    }
    .pim-bot-quick-btn {
      transition: all 0.2s ease;
      cursor: pointer;
    }
    .pim-bot-quick-btn:active {
      transform: scale(0.95);
      background: #f0f0f0;
    }
    .pim-bot-messages::-webkit-scrollbar {
      width: 5px;
    }
    .pim-bot-messages::-webkit-scrollbar-track {
      background: transparent;
    }
    .pim-bot-messages::-webkit-scrollbar-thumb {
      background: #c0c0c0;
      border-radius: 5px;
    }
  `;
  document.head.appendChild(style);

  // Floating Action Button
  const fab = document.createElement('div');
  fab.id = 'pimBotFab';
  fab.className = 'pim-bot-fab';
  fab.innerHTML = `
    <i class="fa-solid fa-robot"></i>
    <span id="pimBotBadge" style="
      position: absolute; top: -3px; right: -3px; width: 18px; height: 18px;
      background: #ff1744; border-radius: 50%; font-size: 10px; display: none;
      align-items: center; justify-content: center; color: white; font-weight: bold;
      border: 2px solid white;
    ">1</span>
  `;
  fab.title = '🤖 PIM-Bot - Tanya apa saja';
  Object.assign(fab.style, {
    position: 'fixed', zIndex: '9999', width: '58px', height: '58px',
    background: 'linear-gradient(135deg, #004d40, #00897b)', color: 'white',
    borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '24px', cursor: 'grab', boxShadow: '0 4px 20px rgba(0,77,64,0.4)',
    left: botX + 'px', top: botY + 'px', userSelect: 'none',
    border: '2px solid rgba(255,255,255,0.3)',
    touchAction: 'none'
  });

  // Drag events (hanya di FAB)
  fab.addEventListener('pointerdown', startDrag);
  fab.addEventListener('pointermove', onDrag);
  fab.addEventListener('pointerup', endDrag);
  fab.addEventListener('pointerleave', endDrag);
  fab.addEventListener('pointercancel', endDrag);
  
  // Click event (hanya jika tidak drag)
  fab.addEventListener('click', (e) => {
    if (!dragMoved) toggleChat();
    dragMoved = false;
  });

  // Chat Panel
  const chat = document.createElement('div');
  chat.id = 'pimBotChat';
  chat.className = 'pim-bot-chat';
  Object.assign(chat.style, {
    position: 'fixed', zIndex: '9998', width: '380px', maxWidth: '92vw',
    height: '540px', maxHeight: '78vh', bottom: '80px', right: '16px',
    background: 'white', borderRadius: '18px',
    boxShadow: '0 12px 48px rgba(0,0,0,0.25)',
    display: 'none', flexDirection: 'column', overflow: 'hidden',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  });

  chat.innerHTML = `
    <!-- Header -->
    <div id="pimBotHeader" style="
      background: linear-gradient(135deg, #004d40, #00695c);
      color: white; padding: 14px 16px; display: flex; align-items: center; gap: 10px;
      flex-shrink: 0;
    ">
      <div style="
        width: 38px; height: 38px; border-radius: 50%; background: rgba(255,255,255,0.2);
        display: flex; align-items: center; justify-content: center; font-size: 18px;
      ">🤖</div>
      <div style="flex: 1; cursor: pointer;" id="pimBotHeaderInfo">
        <div style="font-weight: 700; font-size: 14px;">PIM-Bot AI</div>
        <div style="font-size: 10px; opacity: 0.8; display: flex; align-items: center; gap: 4px;">
          <span style="width: 6px; height: 6px; background: #4caf50; border-radius: 50%; display: inline-block;"></span>
          Online · Bisa jawab apa saja
        </div>
      </div>
      <button onclick="pimBotToggleDark()" title="Dark Mode" style="
        background: rgba(255,255,255,0.15); border: none; color: white; width: 32px; height: 32px;
        border-radius: 50%; cursor: pointer; font-size: 13px;
      ">🌙</button>
      <button onclick="pimBotClearChat()" title="Hapus Chat" style="
        background: rgba(255,255,255,0.15); border: none; color: white; width: 32px; height: 32px;
        border-radius: 50%; cursor: pointer; font-size: 13px;
      ">🗑️</button>
      <button onclick="toggleChat()" style="
        background: rgba(255,255,255,0.15); border: none; color: white; width: 32px; height: 32px;
        border-radius: 50%; cursor: pointer; font-size: 14px;
      ">✕</button>
    </div>

    <!-- Messages -->
    <div id="pimBotMessages" class="pim-bot-messages" style="
      flex: 1; overflow-y: auto; padding: 12px; background: #f5f5f5;
      display: flex; flex-direction: column; gap: 8px;
    ">
      <!-- Welcome message -->
      <div class="pim-bot-message" style="display: flex; gap: 8px; align-items: flex-start;">
        <div style="
          width: 34px; height: 34px; border-radius: 50%; background: linear-gradient(135deg, #004d40, #00897b);
          display: flex; align-items: center; justify-content: center; color: white;
          font-size: 16px; flex-shrink: 0;
        ">🤖</div>
        <div style="
          background: white; padding: 14px 18px; border-radius: 16px;
          font-size: 13px; line-height: 1.7; color: #333; max-width: 85%;
          border: 1px solid #e0e0e0; box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        ">
          <strong>Assalamu'alaikum! 👋</strong><br><br>
          Aku <strong>PIM-Bot</strong>, asisten AI IPIM Maghfirah.<br><br>
          🗣️ <strong>Tanya apa saja:</strong> agama, sains, teknologi, kehidupan, atau bantuan aplikasi. InshaAllah aku bantu!<br><br>
          💡 <strong>Tips:</strong> Kamu bisa pakai voice input 🎤 atau klik quick actions di bawah.
        </div>
      </div>

      <!-- Quick Actions -->
      <div id="pimBotQuickActions" style="
        display: flex; flex-wrap: wrap; gap: 6px; padding: 4px 0;
      ">
        ${QUICK_ACTIONS.map(qa => `
          <button class="pim-bot-quick-btn" onclick="pimBotQuickAsk('${qa.text}')" style="
            background: white; border: 1px solid #e0e0e0; border-radius: 20px;
            padding: 8px 14px; font-size: 11.5px; cursor: pointer;
            display: flex; align-items: center; gap: 6px;
            font-family: inherit; color: #333;
            border-left: 3px solid ${qa.color};
          ">
            <i class="fa-solid ${qa.icon}" style="color: ${qa.color}; font-size: 11px;"></i>
            ${qa.text}
          </button>
        `).join('')}
      </div>
    </div>

    <!-- Input Area -->
    <div style="
      padding: 10px 12px; background: white; border-top: 1px solid #e0e0e0;
      display: flex; gap: 8px; align-items: center; flex-shrink: 0;
    ">
      <button id="pimBotVoiceBtn" onclick="pimBotVoiceInput()" style="
        width: 38px; height: 38px; border-radius: 50%; background: #f5f5f5;
        border: 1px solid #e0e0e0; font-size: 16px; cursor: pointer; flex-shrink: 0;
      " title="Voice Input">🎤</button>
      <input id="pimBotInput" type="text" placeholder="Tanya apa saja..."
        style="
          flex: 1; padding: 11px 16px; border: 1.5px solid #e0e0e0; border-radius: 24px;
          font-size: 13px; font-family: inherit; outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        "
      >
      <button id="pimBotSend" onclick="pimBotSendMessage()" style="
        width: 40px; height: 40px; border-radius: 50%; background: #004d40;
        color: white; border: none; font-size: 16px; cursor: pointer; flex-shrink: 0;
        transition: transform 0.2s, background 0.2s;
      ">▶</button>
    </div>

    <!-- Footer -->
    <div style="
      text-align: center; padding: 6px; font-size: 9px; color: #999;
      background: #fafafa; border-top: 1px solid #eee; flex-shrink: 0;
    ">
      Powered by Gemini 2.0 Flash · 1.500 req/hari gratis
    </div>
  `;

  document.body.appendChild(fab);
  document.body.appendChild(chat);

  // Event listeners
  const input = document.getElementById('pimBotInput');
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') pimBotSendMessage();
  });
  input.addEventListener('focus', () => {
    input.style.borderColor = '#004d40';
    input.style.boxShadow = '0 0 0 3px rgba(0,77,64,0.1)';
  });
  input.addEventListener('blur', () => {
    input.style.borderColor = '#e0e0e0';
    input.style.boxShadow = 'none';
  });

  // Minimize/maximize via header click
  document.getElementById('pimBotHeaderInfo').addEventListener('click', () => {
    pimBotMinimized = !pimBotMinimized;
    const msgs = document.getElementById('pimBotMessages');
    const quick = document.getElementById('pimBotQuickActions');
    const inputArea = chat.querySelectorAll('div')[2];
    const footer = chat.querySelectorAll('div')[3];
    
    const display = pimBotMinimized ? 'none' : 'flex';
    msgs.style.display = display;
    if (quick) quick.style.display = display === 'none' ? 'none' : 'flex';
    inputArea.style.display = display === 'none' ? 'none' : 'flex';
    footer.style.display = display === 'none' ? 'none' : 'block';
  });
}

// =============================================
// DRAG LOGIC (HANYA FAB, MULUS)
// =============================================

function startDrag(e) {
  dragMoved = false;
  dragStartX = e.clientX;
  dragStartY = e.clientY;
  const fab = document.getElementById('pimBotFab');
  fab.style.cursor = 'grabbing';
  fab.style.animation = 'none';
  fab.style.transition = 'none';
  fab.setPointerCapture(e.pointerId);
  e.preventDefault();
  e.stopPropagation();
}

function onDrag(e) {
  const fab = document.getElementById('pimBotFab');
  if (!fab.hasPointerCapture(e.pointerId)) return;
  
  const dx = e.clientX - dragStartX;
  const dy = e.clientY - dragStartY;
  
  if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
    dragMoved = true;
    
    botX += dx;
    botY += dy;
    
    // Batasi dalam viewport
    botX = Math.max(0, Math.min(botX, window.innerWidth - 58));
    botY = Math.max(0, Math.min(botY, window.innerHeight - 58));
    
    fab.style.left = botX + 'px';
    fab.style.top = botY + 'px';
    
    dragStartX = e.clientX;
    dragStartY = e.clientY;
  }
}

function endDrag(e) {
  const fab = document.getElementById('pimBotFab');
  fab.style.cursor = 'grab';
  fab.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';
  fab.style.animation = 'pimPulse 2.5s infinite';
  if (e) {
    fab.releasePointerCapture(e.pointerId);
  }
}

// =============================================
// TOGGLE CHAT
// =============================================

function toggleChat() {
  const chat = document.getElementById('pimBotChat');
  pimBotOpen = !pimBotOpen;
  chat.style.display = pimBotOpen ? 'flex' : 'none';
  
  if (pimBotOpen) {
    document.getElementById('pimBotMessages').style.display = 'flex';
    document.getElementById('pimBotQuickActions').style.display = 'flex';
    const inputArea = chat.querySelectorAll('div')[2];
    const footer = chat.querySelectorAll('div')[3];
    inputArea.style.display = 'flex';
    footer.style.display = 'block';
    pimBotMinimized = false;
    setTimeout(() => document.getElementById('pimBotInput').focus(), 300);
  }
}

// =============================================
// SEND MESSAGE (BISA JAWAB APA SAJA)
// =============================================

async function pimBotSendMessage() {
  if (isTyping) return;
  
  const input = document.getElementById('pimBotInput');
  const message = input.value.trim();
  if (!message) return;
  
  input.value = '';
  input.focus();
  isTyping = true;

  pimBotAddMessage(message, 'user');
  document.getElementById('pimBotQuickActions').style.display = 'none';

  const typingId = pimBotAddTyping();

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: SYSTEM_PROMPT }]
          },
          contents: [{
            parts: [{ text: message }]
          }],
          generationConfig: {
            temperature: 0.8,
            maxOutputTokens: 1000,
            topP: 0.95,
          }
        })
      }
    );

    pimBotRemoveTyping(typingId);
    const data = await response.json();

    if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
      pimBotAddMessage(data.candidates[0].content.parts[0].text, 'bot');
    } else if (data.error) {
      pimBotAddMessage('⚠️ Maaf, terjadi kesalahan: ' + data.error.message, 'bot');
    } else {
      pimBotAddMessage('⚠️ Maaf, aku tidak bisa menjawab sekarang. Coba lagi ya. 😅', 'bot');
    }
  } catch (error) {
    pimBotRemoveTyping(typingId);
    console.error('PIM-Bot error:', error);
    pimBotAddMessage('❌ Gagal terhubung. Periksa koneksi internetmu ya!', 'bot');
  }

  isTyping = false;
}

// =============================================
// QUICK ASK
// =============================================

function pimBotQuickAsk(text) {
  if (!pimBotOpen) toggleChat();
  document.getElementById('pimBotInput').value = text;
  pimBotSendMessage();
}

// =============================================
// VOICE INPUT
// =============================================

function pimBotVoiceInput() {
  const btn = document.getElementById('pimBotVoiceBtn');
  
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    alert('⚠️ Voice input tidak didukung di browser ini. Gunakan Chrome ya!');
    return;
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.lang = 'id-ID';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  if (isListening) {
    recognition.stop();
    btn.style.background = '#f5f5f5';
    btn.innerHTML = '🎤';
    isListening = false;
    return;
  }

  isListening = true;
  btn.style.background = '#ff1744';
  btn.style.color = 'white';
  btn.innerHTML = '🔴';
  recognition.start();

  recognition.onresult = (event) => {
    const text = event.results[0][0].transcript;
    document.getElementById('pimBotInput').value = text;
    btn.style.background = '#4caf50';
    btn.innerHTML = '✅';
    isListening = false;
    setTimeout(() => {
      btn.style.background = '#f5f5f5';
      btn.style.color = 'black';
      btn.innerHTML = '🎤';
    }, 1000);
    pimBotSendMessage();
  };

  recognition.onerror = () => {
    btn.style.background = '#f5f5f5';
    btn.style.color = 'black';
    btn.innerHTML = '🎤';
    isListening = false;
    alert('⚠️ Gagal mendengar. Coba lagi ya!');
  };
}

// =============================================
// DARK MODE
// =============================================

function pimBotToggleDark() {
  darkMode = !darkMode;
  const chat = document.getElementById('pimBotChat');
  const input = document.getElementById('pimBotInput');
  const msgs = document.getElementById('pimBotMessages');
  
  if (darkMode) {
    chat.style.background = '#1e1e1e';
    msgs.style.background = '#1a1a1a';
    input.style.background = '#2d2d2d';
    input.style.color = '#e0e0e0';
    input.style.borderColor = '#3d3d3d';
  } else {
    chat.style.background = 'white';
    msgs.style.background = '#f5f5f5';
    input.style.background = 'white';
    input.style.color = '#333';
    input.style.borderColor = '#e0e0e0';
  }
}

// =============================================
// CLEAR CHAT
// =============================================

function pimBotClearChat() {
  if (confirm('Hapus semua percakapan?')) {
    const msgs = document.getElementById('pimBotMessages');
    msgs.innerHTML = '';
    document.getElementById('pimBotQuickActions').style.display = 'flex';
    
    const welcomeDiv = document.createElement('div');
    welcomeDiv.className = 'pim-bot-message';
    welcomeDiv.style.cssText = 'display: flex; gap: 8px; align-items: flex-start;';
    welcomeDiv.innerHTML = `
      <div style="width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,#004d40,#00897b);display:flex;align-items:center;justify-content:center;color:white;font-size:16px;flex-shrink:0;">🤖</div>
      <div style="background:white;padding:12px 16px;border-radius:14px;font-size:12.5px;line-height:1.6;color:#333;max-width:85%;border:1px solid #e0e0e0;">
        <strong>Chat dihapus! 😊</strong><br><br>Tanyakan apa saja, aku siap bantu!
      </div>
    `;
    msgs.appendChild(welcomeDiv);
  }
}

// =============================================
// ADD MESSAGE
// =============================================

function pimBotAddMessage(text, sender) {
  const msgs = document.getElementById('pimBotMessages');
  
  const div = document.createElement('div');
  div.className = 'pim-bot-message';
  div.style.cssText = `
    display: flex; gap: 8px; align-items: flex-start;
    flex-direction: ${sender === 'user' ? 'row-reverse' : 'row'};
  `;

  const avatar = document.createElement('div');
  avatar.style.cssText = `
    width: 30px; height: 30px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 14px; flex-shrink: 0;
    ${sender === 'user' 
      ? 'background: linear-gradient(135deg, #00897b, #4db6ac); color: white;' 
      : 'background: linear-gradient(135deg, #004d40, #00897b); color: white;'}
  `;
  avatar.innerHTML = sender === 'user' ? '👤' : '🤖';

  const bubble = document.createElement('div');
  bubble.style.cssText = `
    padding: 10px 15px; border-radius: 14px;
    font-size: 13px; line-height: 1.6; max-width: 82%;
    word-break: break-word; white-space: pre-wrap;
    ${sender === 'user'
      ? 'background: #004d40; color: white;'
      : 'background: white; color: #333; border: 1px solid #e0e0e0; box-shadow: 0 1px 3px rgba(0,0,0,0.05);'}
  `;
  bubble.textContent = text;

  div.appendChild(avatar);
  div.appendChild(bubble);
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

// =============================================
// TYPING INDICATOR
// =============================================

function pimBotAddTyping() {
  const id = 'typing-' + Date.now();
  const msgs = document.getElementById('pimBotMessages');
  
  const div = document.createElement('div');
  div.id = id;
  div.style.cssText = 'display: flex; gap: 8px; align-items: flex-start;';
  div.innerHTML = `
    <div style="width:30px;height:30px;border-radius:50%;background:linear-gradient(135deg,#004d40,#00897b);display:flex;align-items:center;justify-content:center;color:white;font-size:14px;flex-shrink:0;">🤖</div>
    <div style="background:white;padding:14px 18px;border-radius:14px;border:1px solid #e0e0e0;display:flex;gap:6px;align-items:center;">
      <span style="width:8px;height:8px;border-radius:50%;background:#999;animation:pimTyping 1.4s infinite;display:block;"></span>
      <span style="width:8px;height:8px;border-radius:50%;background:#999;animation:pimTyping 1.4s 0.2s infinite;display:block;"></span>
      <span style="width:8px;height:8px;border-radius:50%;background:#999;animation:pimTyping 1.4s 0.4s infinite;display:block;"></span>
    </div>
  `;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
  return id;
}

function pimBotRemoveTyping(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

// =============================================
// INIT
// =============================================

document.addEventListener('DOMContentLoaded', () => {
  createPimBot();
  console.log('🤖 PIM-Bot AI siap! (Bisa jawab apa saja)');
});

// Export ke global scope
window.toggleChat = toggleChat;
window.pimBotSendMessage = pimBotSendMessage;
window.pimBotQuickAsk = pimBotQuickAsk;
window.pimBotVoiceInput = pimBotVoiceInput;
window.pimBotToggleDark = pimBotToggleDark;
window.pimBotClearChat = pimBotClearChat;
