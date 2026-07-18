// =============================================
// IPIM Maghfirah - PIM-Bot AI Assistant v2.1
// Powered by Gemini 2.0 Flash
// Fitur: Voice input, dark mode, history, quick actions
// =============================================

const GEMINI_API_KEY = 'AQ.Ab8RN6K-NOedSq2LU9orFcjMGo5GMs6mog-cj1CmP__yytYmLw';

// Knowledge base IPIM
const IPIM_KNOWLEDGE = `
Kamu adalah PIM-Bot, asisten AI cerdas dari IPIM Maghfirah (Institute Pendidikan Islam Maghfirah).
Kamu memiliki kepribadian ramah, Islami, dan helpful.

📱 INFORMASI APLIKASI:
- Nama: IPIM Maghfirah - Sistem Informasi Pesantren Terpadu
- Website: https://muchiqbal003-collab.github.io/IPIM-MAGHFIRAH/
- Fitur: Absensi digital, penilaian, rekap, jadwal, kalender akademik, absensi sholat, hafalan Al-Qur'an, ujian quran, notifikasi, dashboard

👥 ROLE PENGGUNA:
1. pusat-data - Super admin, kelola semua
2. operator-akademik - Master data akademik, jadwal, rekap
3. operator-halaqoh - Musyrif, halaqoh, rekap tahfidz
4. operator-bahasa - Rekap pelanggaran bahasa
5. operator-pengasuhan - Rekap pelanggaran pengasuhan
6. dosen - Absensi kelas, penilaian, silabus
7. musyrif - Absensi halaqoh, hafalan, ujian quran
8. dosen-musyrif - Gabungan dosen + musyrif
9. umum - Absensi sholat, kinerja, lapor

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

📚 ATURAN PESANTREN:
- Nama hari: Ahad (bukan Minggu)
- Semua dropdown dosen/musyrif ambil dari koleksi users
- Role menentukan akses halaman

🎯 CARA MENJAWAB:
- Jika user tanya fitur, beri langkah-langkah jelas dengan emoji
- Jika user tanya di luar aplikasi, jawab dengan ramah dan Islami
- Gunakan bahasa Indonesia santun, kadang sisipkan kata Islami
- Jika tidak tahu, jujur katakan tidak tahu
- Beri semangat dan motivasi Islami di akhir jawaban
`;

// State
let pimBotOpen = false;
let pimBotMinimized = false;
let chatHistory = [];
let isTyping = false;
let isListening = false;
let darkMode = false;

// Posisi floating button
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
  { icon: 'fa-share-alt', text: 'Bagikan kalender', color: '#2e7d32' },
];

// =============================================
// CREATE UI
// =============================================

function createPimBot() {
  // Inject CSS
  const style = document.createElement('style');
  style.textContent = `
    @keyframes pimBounce {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.08); }
    }
    @keyframes pimTyping {
      0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
      30% { transform: translateY(-8px); opacity: 1; }
    }
    @keyframes pimSlideIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes pimPulse {
      0%, 100% { box-shadow: 0 0 0 0 rgba(0,150,136,0.5); }
      50% { box-shadow: 0 0 0 16px rgba(0,150,136,0); }
    }
    @keyframes pimGlow {
      0%, 100% { filter: brightness(1); }
      50% { filter: brightness(1.15); }
    }
    @keyframes pimFloat {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-6px); }
    }
    @keyframes pimSparkle {
      0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
      50% { opacity: 1; transform: scale(1) rotate(180deg); }
    }
    .pim-bot-fab {
      animation: pimPulse 2.5s infinite, pimFloat 3s ease-in-out infinite;
      transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      overflow: visible;
    }
    .pim-bot-fab::after {
      content: '';
      position: absolute;
      inset: -4px;
      border-radius: 50%;
      background: conic-gradient(from 0deg, #00e676, #00c853, #00bfa5, #00e676);
      animation: pimSparkle 2s linear infinite;
      opacity: 0.3;
      z-index: -1;
    }
    .pim-bot-fab:hover {
      animation: none;
      transform: scale(1.12) !important;
      box-shadow: 0 12px 36px rgba(0,150,136,0.6) !important;
    }
    .pim-bot-fab:active {
      transform: scale(0.95) !important;
    }
    .pim-bot-chat {
      animation: pimSlideIn 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    .pim-bot-message {
      animation: pimSlideIn 0.25s ease;
    }
    .pim-bot-quick-btn {
      transition: all 0.25s ease;
      cursor: pointer;
    }
    .pim-bot-quick-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 14px rgba(0,0,0,0.12);
    }
    .pim-bot-quick-btn:active {
      transform: scale(0.96);
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
    .pim-bot-input:focus {
      border-color: #009688 !important;
      box-shadow: 0 0 0 4px rgba(0,150,136,0.12) !important;
    }
    .pim-bot-dark .pim-bot-messages {
      background: #1a1a1a !important;
    }
    .pim-bot-dark .pim-bot-bubble-bot {
      background: #2d2d2d !important;
      color: #e0e0e0 !important;
      border-color: #3d3d3d !important;
    }
    .pim-bot-dark .pim-bot-bubble-user {
      background: #00695c !important;
    }
    .pim-bot-dark .pim-bot-input {
      background: #2d2d2d !important;
      color: #e0e0e0 !important;
      border-color: #3d3d3d !important;
    }
  `;
  document.head.appendChild(style);

  // Floating Action Button
  const fab = document.createElement('div');
  fab.id = 'pimBotFab';
  fab.className = 'pim-bot-fab';
  fab.innerHTML = `
    <svg viewBox="0 0 40 40" width="28" height="28" style="position: relative; z-index: 2;">
      <!-- Outer ring -->
      <circle cx="20" cy="20" r="18" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
      <!-- Head -->
      <rect x="9" y="13" width="22" height="16" rx="7" fill="white" opacity="0.95"/>
      <!-- Antenna -->
      <line x1="20" y1="8" x2="20" y2="13" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="20" cy="7" r="2.5" fill="#ffeb3b"/>
      <!-- Eyes -->
      <circle cx="15" cy="20" r="2.5" fill="#009688"/>
      <circle cx="25" cy="20" r="2.5" fill="#009688"/>
      <!-- Eye glow -->
      <circle cx="15" cy="20" r="1.2" fill="white"/>
      <circle cx="25" cy="20" r="1.2" fill="white"/>
      <!-- Mouth (smile) -->
      <path d="M14 26 Q20 31 26 26" fill="none" stroke="#009688" stroke-width="2" stroke-linecap="round"/>
      <!-- Cheeks -->
      <circle cx="11" cy="24" r="1.5" fill="rgba(255,183,77,0.4)"/>
      <circle cx="29" cy="24" r="1.5" fill="rgba(255,183,77,0.4)"/>
    </svg>
  `;
  fab.title = '🤖 PIM-Bot AI - Tanya apa saja';
  Object.assign(fab.style, {
    position: 'fixed', zIndex: '9999', width: '58px', height: '58px',
    background: 'linear-gradient(135deg, #00695c, #00bfa5)', color: 'white',
    borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'grab', boxShadow: '0 6px 24px rgba(0,150,136,0.45)',
    left: botX + 'px', top: botY + 'px', userSelect: 'none',
    border: '2px solid rgba(255,255,255,0.4)',
  });

  // Drag events — ATTACHED TO FAB ONLY
  fab.addEventListener('pointerdown', startDrag);
  fab.addEventListener('pointermove', onDrag);
  fab.addEventListener('pointerup', endDrag);
  fab.addEventListener('pointerleave', endDrag);
  fab.addEventListener('pointercancel', endDrag);
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
    height: '540px', maxHeight: '78vh', bottom: '85px', right: '16px',
    background: 'white', borderRadius: '20px',
    boxShadow: '0 16px 56px rgba(0,0,0,0.28)',
    display: 'none', flexDirection: 'column', overflow: 'hidden',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  });

  chat.innerHTML = `
    <!-- Header -->
    <div id="pimBotHeader" style="
      background: linear-gradient(135deg, #004d40, #009688);
      color: white; padding: 14px 16px; display: flex; align-items: center; gap: 10px;
    ">
      <div style="
        width: 40px; height: 40px; border-radius: 50%; background: rgba(255,255,255,0.18);
        display: flex; align-items: center; justify-content: center;
        border: 2px solid rgba(255,255,255,0.25);
      ">
        <svg viewBox="0 0 30 30" width="20" height="20">
          <rect x="6" y="9" width="18" height="13" rx="6" fill="white"/>
          <line x1="15" y1="5" x2="15" y2="9" stroke="white" stroke-width="2" stroke-linecap="round"/>
          <circle cx="15" cy="4" r="2" fill="#ffeb3b"/>
          <circle cx="10.5" cy="15" r="2" fill="#009688"/>
          <circle cx="19.5" cy="15" r="2" fill="#009688"/>
          <circle cx="10.5" cy="15" r="0.8" fill="white"/>
          <circle cx="19.5" cy="15" r="0.8" fill="white"/>
          <path d="M10 20 Q15 24 20 20" fill="none" stroke="#009688" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </div>
      <div style="flex: 1; cursor: pointer;" id="pimBotHeaderInfo">
        <div style="font-weight: 700; font-size: 14px;">PIM-Bot AI</div>
        <div style="font-size: 10px; opacity: 0.85; display: flex; align-items: center; gap: 5px;">
          <span style="width: 7px; height: 7px; background: #69f0ae; border-radius: 50%; display: inline-block; animation: pimPulse 1.5s infinite;"></span>
          Online · Gemini 2.0 Flash
        </div>
      </div>
      <button onclick="pimBotToggleDark()" title="Dark Mode" style="
        background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.2);
        color: white; width: 34px; height: 34px;
        border-radius: 50%; cursor: pointer; font-size: 14px; transition: all 0.2s;
      ">🌙</button>
      <button onclick="pimBotClearChat()" title="Hapus Chat" style="
        background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.2);
        color: white; width: 34px; height: 34px;
        border-radius: 50%; cursor: pointer; font-size: 14px; transition: all 0.2s;
      ">🗑️</button>
      <button onclick="toggleChat()" style="
        background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.2);
        color: white; width: 34px; height: 34px;
        border-radius: 50%; cursor: pointer; font-size: 15px; transition: all 0.2s;
      ">✕</button>
    </div>

    <!-- Messages -->
    <div id="pimBotMessages" class="pim-bot-messages" style="
      flex: 1; overflow-y: auto; padding: 14px; background: #f8f9fa;
      display: flex; flex-direction: column; gap: 10px;
    ">
      <!-- Welcome -->
      <div class="pim-bot-message" style="display: flex; gap: 10px; align-items: flex-start;">
        <div style="
          width: 34px; height: 34px; border-radius: 50%; background: linear-gradient(135deg, #00695c, #00bfa5);
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
          border: 2px solid rgba(255,255,255,0.3);
        ">
          <svg viewBox="0 0 24 24" width="16" height="16">
            <rect x="5" y="7" width="14" height="10" rx="5" fill="white"/>
            <line x1="12" y1="4" x2="12" y2="7" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
            <circle cx="12" cy="3" r="1.5" fill="#ffeb3b"/>
            <circle cx="8.5" cy="11.5" r="1.5" fill="#009688"/>
            <circle cx="15.5" cy="11.5" r="1.5" fill="#009688"/>
          </svg>
        </div>
        <div class="pim-bot-bubble-bot" style="
          background: white; padding: 12px 16px; border-radius: 16px;
          font-size: 13px; line-height: 1.65; color: #333; max-width: 85%;
          border: 1px solid #e8e8e8; box-shadow: 0 2px 6px rgba(0,0,0,0.04);
        ">
          <strong>✨ Assalamu'alaikum warahmatullah!</strong><br><br>
          Aku <strong>PIM-Bot</strong>, asisten AI-mu di IPIM Maghfirah.<br>
          Tanyakan apa saja — dari cara pakai aplikasi sampai pertanyaan umum. InshaAllah aku bantu! 😊<br><br>
          <span style="font-size: 10px; color: #999;">💡 Kamu bisa ketik atau pakai voice input 🎤</span>
        </div>
      </div>

      <!-- Quick Actions -->
      <div id="pimBotQuickActions" style="
        display: flex; flex-wrap: wrap; gap: 7px; padding: 2px 0;
      ">
        ${QUICK_ACTIONS.map((qa) => `
          <button class="pim-bot-quick-btn" onclick="pimBotQuickAsk('${qa.text}')" style="
            background: white; border: 1px solid #e8e8e8; border-radius: 20px;
            padding: 8px 14px; font-size: 11.5px; cursor: pointer;
            display: flex; align-items: center; gap: 7px;
            font-family: inherit; color: #444; font-weight: 500;
            border-left: 3.5px solid ${qa.color};
          ">
            <i class="fa-solid ${qa.icon}" style="color: ${qa.color}; font-size: 12px;"></i>
            ${qa.text}
          </button>
        `).join('')}
      </div>
    </div>

    <!-- Input Area -->
    <div style="
      padding: 12px 14px; background: white; border-top: 1px solid #eee;
      display: flex; gap: 8px; align-items: center;
    ">
      <button id="pimBotVoiceBtn" onclick="pimBotVoiceInput()" style="
        width: 38px; height: 38px; border-radius: 50%; background: #f5f5f5;
        border: 1px solid #e0e0e0; font-size: 15px; cursor: pointer; flex-shrink: 0;
        transition: all 0.25s;
      " title="Voice Input">🎤</button>
      <input id="pimBotInput" class="pim-bot-input" type="text" placeholder="Ketik pesanmu di sini..."
        style="
          flex: 1; padding: 11px 18px; border: 1.5px solid #e0e0e0; border-radius: 24px;
          font-size: 13px; font-family: inherit; outline: none; transition: all 0.25s;
          background: #fafafa;
        "
      >
      <button id="pimBotSend" onclick="pimBotSendMessage()" style="
        width: 42px; height: 42px; border-radius: 50%; background: linear-gradient(135deg, #00695c, #00bfa5);
        color: white; border: none; font-size: 16px; cursor: pointer; flex-shrink: 0;
        transition: all 0.25s; box-shadow: 0 3px 12px rgba(0,150,136,0.35);
        display: flex; align-items: center; justify-content: center;
      ">▶</button>
    </div>

    <!-- Footer -->
    <div style="
      text-align: center; padding: 6px; font-size: 9px; color: #aaa;
      background: #fafafa; border-top: 1px solid #f0f0f0;
    ">
      ⚡ Powered by Gemini AI · 1.500 req/hari gratis
    </div>
  `;

  document.body.appendChild(fab);
  document.body.appendChild(chat);

  // Enter key
  document.getElementById('pimBotInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') pimBotSendMessage();
  });

  // Minimize on header click
  document.getElementById('pimBotHeaderInfo').addEventListener('click', () => {
    const msgs = document.getElementById('pimBotMessages');
    const quick = document.getElementById('pimBotQuickActions');
    const inputArea = chat.querySelectorAll('div')[2];
    const footer = chat.querySelectorAll('div')[3];
    
    pimBotMinimized = !pimBotMinimized;
    const display = pimBotMinimized ? 'none' : 'flex';
    msgs.style.display = display;
    if (quick) quick.style.display = display === 'none' ? 'none' : 'flex';
    inputArea.style.display = display === 'none' ? 'none' : 'flex';
    footer.style.display = display === 'none' ? 'none' : 'block';
  });
}

// =============================================
// DRAG LOGIC (FIXED — only FAB, not whole screen)
// =============================================

function startDrag(e) {
  dragMoved = false;
  dragStartX = e.clientX;
  dragStartY = e.clientY;
  const fab = document.getElementById('pimBotFab');
  fab.style.cursor = 'grabbing';
  fab.style.animation = 'none';
  fab.setPointerCapture(e.pointerId);
  e.preventDefault();
  e.stopPropagation();
}

function onDrag(e) {
  if (Math.abs(e.clientX - dragStartX) > 3 || Math.abs(e.clientY - dragStartY) > 3) {
    dragMoved = true;
    const fab = document.getElementById('pimBotFab');
    botX = e.clientX - 29;
    botY = e.clientY - 29;
    botX = Math.max(0, Math.min(botX, window.innerWidth - 58));
    botY = Math.max(0, Math.min(botY, window.innerHeight - 58));
    fab.style.left = botX + 'px';
    fab.style.top = botY + 'px';
    fab.style.transition = 'none';
  }
}

function endDrag(e) {
  const fab = document.getElementById('pimBotFab');
  fab.style.cursor = 'grab';
  fab.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
  fab.style.animation = 'pimPulse 2.5s infinite, pimFloat 3s ease-in-out infinite';
  try { fab.releasePointerCapture(e.pointerId); } catch(ex) {}
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
    setTimeout(() => document.getElementById('pimBotInput').focus(), 350);
  }
}

// =============================================
// SEND MESSAGE
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
            parts: [{ text: IPIM_KNOWLEDGE }]
          },
          contents: [{
            parts: [{ text: message }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 800,
            topP: 0.9,
          }
        })
      }
    );

    pimBotRemoveTyping(typingId);
    const data = await response.json();

    if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
      pimBotAddMessage(data.candidates[0].content.parts[0].text, 'bot');
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
    }, 1200);
    pimBotSendMessage();
  };

  recognition.onerror = () => {
    btn.style.background = '#f5f5f5';
    btn.style.color = 'black';
    btn.innerHTML = '🎤';
    isListening = false;
    alert('⚠️ Gagal mendengar. Coba lagi ya!');
  };

  recognition.onend = () => {
    if (isListening) {
      btn.style.background = '#f5f5f5';
      btn.style.color = 'black';
      btn.innerHTML = '🎤';
      isListening = false;
    }
  };
}

// =============================================
// DARK MODE
// =============================================

function pimBotToggleDark() {
  darkMode = !darkMode;
  const chat = document.getElementById('pimBotChat');
  chat.classList.toggle('pim-bot-dark', darkMode);
  
  if (darkMode) {
    chat.style.background = '#1a1a1a';
    document.getElementById('pimBotInput').style.background = '#2d2d2d';
    document.getElementById('pimBotInput').style.color = '#e0e0e0';
    document.getElementById('pimBotInput').style.borderColor = '#3d3d3d';
  } else {
    chat.style.background = 'white';
    document.getElementById('pimBotInput').style.background = '#fafafa';
    document.getElementById('pimBotInput').style.color = '#333';
    document.getElementById('pimBotInput').style.borderColor = '#e0e0e0';
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
    welcomeDiv.style.cssText = 'display: flex; gap: 10px; align-items: flex-start;';
    welcomeDiv.innerHTML = `
      <div style="width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,#00695c,#00bfa5);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
        <svg viewBox="0 0 24 24" width="16" height="16"><rect x="5" y="7" width="14" height="10" rx="5" fill="white"/><line x1="12" y1="4" x2="12" y2="7" stroke="white" stroke-width="1.5" stroke-linecap="round"/><circle cx="12" cy="3" r="1.5" fill="#ffeb3b"/><circle cx="8.5" cy="11.5" r="1.5" fill="#009688"/><circle cx="15.5" cy="11.5" r="1.5" fill="#009688"/></svg>
      </div>
      <div class="pim-bot-bubble-bot" style="background:white;padding:12px 16px;border-radius:16px;font-size:13px;line-height:1.6;color:#333;max-width:85%;border:1px solid #e8e8e8;">
        <strong>✨ Chat dihapus!</strong><br><br>Tanyakan apa saja, aku siap bantu! 😊
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
    display: flex; gap: 10px; align-items: flex-start;
    flex-direction: ${sender === 'user' ? 'row-reverse' : 'row'};
  `;

  const avatar = document.createElement('div');
  avatar.style.cssText = `
    width: 30px; height: 30px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; flex-shrink: 0;
    ${sender === 'user' 
      ? 'background: linear-gradient(135deg, #4db6ac, #26a69a);' 
      : 'background: linear-gradient(135deg, #00695c, #00bfa5);'}
    border: 2px solid rgba(255,255,255,0.3);
  `;
  avatar.innerHTML = sender === 'user' ? '👤' : '🤖';

  const bubble = document.createElement('div');
  bubble.className = sender === 'user' ? 'pim-bot-bubble-user' : 'pim-bot-bubble-bot';
  bubble.style.cssText = `
    padding: 11px 16px; border-radius: 16px;
    font-size: 12.5px; line-height: 1.65; max-width: 82%;
    word-break: break-word;
    ${sender === 'user'
      ? 'background: #00695c; color: white;'
      : 'background: white; color: #333; border: 1px solid #e8e8e8; box-shadow: 0 2px 6px rgba(0,0,0,0.04);'}
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
  div.style.cssText = 'display: flex; gap: 10px; align-items: flex-start;';
  div.innerHTML = `
    <div style="width:30px;height:30px;border-radius:50%;background:linear-gradient(135deg,#00695c,#00bfa5);display:flex;align-items:center;justify-content:center;border:2px solid rgba(255,255,255,0.3);flex-shrink:0;">🤖</div>
    <div style="background:white;padding:12px 16px;border-radius:16px;border:1px solid #e8e8e8;display:flex;gap:6px;align-items:center;">
      <span style="width:7px;height:7px;border-radius:50%;background:#aaa;animation:pimTyping 1.4s infinite;display:block;"></span>
      <span style="width:7px;height:7px;border-radius:50%;background:#aaa;animation:pimTyping 1.4s 0.2s infinite;display:block;"></span>
      <span style="width:7px;height:7px;border-radius:50%;background:#aaa;animation:pimTyping 1.4s 0.4s infinite;display:block;"></span>
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
  console.log('🤖 PIM-Bot AI v2.1 ready!');
});

// Global exports
window.toggleChat = toggleChat;
window.pimBotSendMessage = pimBotSendMessage;
window.pimBotQuickAsk = pimBotQuickAsk;
window.pimBotVoiceInput = pimBotVoiceInput;
window.pimBotToggleDark = pimBotToggleDark;
window.pimBotClearChat = pimBotClearChat;
