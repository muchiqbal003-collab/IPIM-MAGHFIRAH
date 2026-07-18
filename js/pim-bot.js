// =============================================
// IPIM Maghfirah - PIM-Bot AI Assistant v2.0
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
      0%, 100% { box-shadow: 0 0 0 0 rgba(0,77,64,0.4); }
      50% { box-shadow: 0 0 0 12px rgba(0,77,64,0); }
    }
    @keyframes pimRotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    .pim-bot-fab {
      animation: pimPulse 2s infinite;
      transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    .pim-bot-fab:hover {
      animation: none;
      transform: scale(1.1) !important;
      box-shadow: 0 8px 30px rgba(0,0,0,0.4) !important;
    }
    .pim-bot-chat {
      animation: pimSlideIn 0.3s ease;
    }
    .pim-bot-message {
      animation: pimSlideIn 0.2s ease;
    }
    .pim-bot-quick-btn {
      transition: all 0.2s ease;
    }
    .pim-bot-quick-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
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
      border-color: #004d40 !important;
      box-shadow: 0 0 0 3px rgba(0,77,64,0.1) !important;
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
      background: #004d40 !important;
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
    <i class="fa-solid fa-robot"></i>
    <span id="pimBotBadge" style="
      position: absolute; top: -2px; right: -2px; width: 16px; height: 16px;
      background: #ff1744; border-radius: 50%; font-size: 9px; display: none;
      align-items: center; justify-content: center; color: white; font-weight: bold;
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
  });

  fab.addEventListener('pointerdown', startDrag);
  window.addEventListener('pointermove', onDrag);
  window.addEventListener('pointerup', endDrag);
  fab.addEventListener('click', (e) => {
    if (!dragMoved) toggleChat();
    dragMoved = false;
  });

  // Chat Panel
  const chat = document.createElement('div');
  chat.id = 'pimBotChat';
  chat.className = 'pim-bot-chat';
  Object.assign(chat.style, {
    position: 'fixed', zIndex: '9998', width: '370px', maxWidth: '92vw',
    height: '520px', maxHeight: '75vh', bottom: '80px', right: '16px',
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
    ">
      <div style="
        width: 38px; height: 38px; border-radius: 50%; background: rgba(255,255,255,0.2);
        display: flex; align-items: center; justify-content: center; font-size: 18px;
      ">🤖</div>
      <div style="flex: 1; cursor: pointer;" id="pimBotHeaderInfo">
        <div style="font-weight: 700; font-size: 14px;">PIM-Bot AI</div>
        <div style="font-size: 10px; opacity: 0.8; display: flex; align-items: center; gap: 4px;">
          <span style="width: 6px; height: 6px; background: #4caf50; border-radius: 50%; display: inline-block;"></span>
          Online · Gemini 2.0 Flash
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
          width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, #004d40, #00897b);
          display: flex; align-items: center; justify-content: center; color: white;
          font-size: 14px; flex-shrink: 0;
        ">🤖</div>
        <div class="pim-bot-bubble-bot" style="
          background: white; padding: 12px 16px; border-radius: 14px;
          font-size: 12.5px; line-height: 1.6; color: #333; max-width: 85%;
          border: 1px solid #e0e0e0; box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        ">
          <strong>Assalamu'alaikum warahmatullahi wabarakatuh! 👋</strong><br><br>
          Aku <strong>PIM-Bot</strong>, asisten AI IPIM Maghfirah.<br>
          Tanyakan apa saja tentang aplikasi ini, atau butuh bantuan lainnya. InshaAllah aku siap bantu! 😊<br><br>
          <span style="font-size: 10px; color: #999;">💡 Tips: Kamu juga bisa pakai voice input 🎤</span>
        </div>
      </div>

      <!-- Quick Actions -->
      <div id="pimBotQuickActions" style="
        display: flex; flex-wrap: wrap; gap: 6px; padding: 4px 0;
      ">
        ${QUICK_ACTIONS.map((qa, i) => `
          <button class="pim-bot-quick-btn" onclick="pimBotQuickAsk('${qa.text}')" style="
            background: white; border: 1px solid #e0e0e0; border-radius: 18px;
            padding: 7px 12px; font-size: 11px; cursor: pointer;
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
      display: flex; gap: 8px; align-items: center;
    ">
      <button id="pimBotVoiceBtn" onclick="pimBotVoiceInput()" style="
        width: 36px; height: 36px; border-radius: 50%; background: #f5f5f5;
        border: 1px solid #e0e0e0; font-size: 15px; cursor: pointer; flex-shrink: 0;
        transition: all 0.2s;
      " title="Voice Input">🎤</button>
      <input id="pimBotInput" class="pim-bot-input" type="text" placeholder="Ketik pesan..."
        style="
          flex: 1; padding: 10px 16px; border: 1px solid #e0e0e0; border-radius: 24px;
          font-size: 13px; font-family: inherit; outline: none; transition: all 0.2s;
        "
      >
      <button id="pimBotSend" onclick="pimBotSendMessage()" style="
        width: 40px; height: 40px; border-radius: 50%; background: #004d40;
        color: white; border: none; font-size: 15px; cursor: pointer; flex-shrink: 0;
        transition: all 0.2s;
      ">▶</button>
    </div>

    <!-- Footer -->
    <div style="
      text-align: center; padding: 5px; font-size: 9px; color: #999;
      background: #fafafa; border-top: 1px solid #eee;
    ">
      Powered by Gemini AI · 1.500 req/hari gratis
    </div>
  `;

  document.body.appendChild(fab);
  document.body.appendChild(chat);

  // Event listeners
  document.getElementById('pimBotInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') pimBotSendMessage();
  });

  document.getElementById('pimBotHeaderInfo').addEventListener('click', () => {
    const msgs = document.getElementById('pimBotMessages');
    const quick = document.getElementById('pimBotQuickActions');
    const inputArea = document.getElementById('pimBotChat').querySelectorAll('div')[2];
    const footer = document.getElementById('pimBotChat').querySelectorAll('div')[3];
    
    pimBotMinimized = !pimBotMinimized;
    const display = pimBotMinimized ? 'none' : 'flex';
    msgs.style.display = display;
    if (quick) quick.style.display = display === 'none' ? 'none' : 'flex';
    inputArea.style.display = display === 'none' ? 'none' : 'flex';
    footer.style.display = display === 'none' ? 'none' : 'block';
  });
}

// =============================================
// DRAG LOGIC
// =============================================

function startDrag(e) {
  dragMoved = false;
  dragStartX = e.clientX;
  dragStartY = e.clientY;
  document.getElementById('pimBotFab').style.cursor = 'grabbing';
  document.getElementById('pimBotFab').style.animation = 'none';
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

function endDrag() {
  const fab = document.getElementById('pimBotFab');
  fab.style.cursor = 'grab';
  fab.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
  fab.style.animation = 'pimPulse 2s infinite';
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
  
  // Sembunyikan quick actions setelah user kirim pesan
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

  recognition.onend = () => {
    btn.style.background = '#f5f5f5';
    btn.style.color = 'black';
    btn.innerHTML = '🎤';
    isListening = false;
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
    chat.style.color = '#e0e0e0';
    document.getElementById('pimBotInput').style.background = '#2d2d2d';
    document.getElementById('pimBotInput').style.color = '#e0e0e0';
    document.getElementById('pimBotInput').style.borderColor = '#3d3d3d';
  } else {
    chat.style.background = 'white';
    chat.style.color = '#333';
    document.getElementById('pimBotInput').style.background = 'white';
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
    
    // Re-add welcome message
    const welcomeDiv = document.createElement('div');
    welcomeDiv.className = 'pim-bot-message';
    welcomeDiv.style.cssText = 'display: flex; gap: 8px; align-items: flex-start;';
    welcomeDiv.innerHTML = `
      <div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#004d40,#00897b);display:flex;align-items:center;justify-content:center;color:white;font-size:14px;flex-shrink:0;">🤖</div>
      <div class="pim-bot-bubble-bot" style="background:white;padding:12px 16px;border-radius:14px;font-size:12.5px;line-height:1.6;color:#333;max-width:85%;border:1px solid #e0e0e0;">
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
    font-size: 13px; flex-shrink: 0;
    ${sender === 'user' 
      ? 'background: linear-gradient(135deg, #00897b, #4db6ac); color: white;' 
      : 'background: linear-gradient(135deg, #004d40, #00897b); color: white;'}
  `;
  avatar.innerHTML = sender === 'user' ? '👤' : '🤖';

  const bubble = document.createElement('div');
  bubble.className = sender === 'user' ? 'pim-bot-bubble-user' : 'pim-bot-bubble-bot';
  bubble.style.cssText = `
    padding: 10px 15px; border-radius: 14px;
    font-size: 12.5px; line-height: 1.6; max-width: 82%;
    word-break: break-word;
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
    <div style="width:30px;height:30px;border-radius:50%;background:linear-gradient(135deg,#004d40,#00897b);display:flex;align-items:center;justify-content:center;color:white;font-size:13px;flex-shrink:0;">🤖</div>
    <div style="background:white;padding:12px 16px;border-radius:14px;border:1px solid #e0e0e0;display:flex;gap:5px;align-items:center;">
      <span style="width:7px;height:7px;border-radius:50%;background:#999;animation:pimTyping 1.4s infinite;display:block;"></span>
      <span style="width:7px;height:7px;border-radius:50%;background:#999;animation:pimTyping 1.4s 0.2s infinite;display:block;"></span>
      <span style="width:7px;height:7px;border-radius:50%;background:#999;animation:pimTyping 1.4s 0.4s infinite;display:block;"></span>
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
  console.log('🤖 PIM-Bot AI siap!');
});

// Export fungsi ke global scope
window.toggleChat = toggleChat;
window.pimBotSendMessage = pimBotSendMessage;
window.pimBotQuickAsk = pimBotQuickAsk;
window.pimBotVoiceInput = pimBotVoiceInput;
window.pimBotToggleDark = pimBotToggleDark;
window.pimBotClearChat = pimBotClearChat;
