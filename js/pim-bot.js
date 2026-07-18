// js/pim-bot.js
// PIM Bot — Asisten virtual IPIM Maghfirah
// Menggunakan Google Gemini API (free tier)

const PIM_BOT_CONFIG = {
  // Ganti dengan API key Gemini kamu
  // Dapatkan di: https://aistudio.google.com/app/apikey
  API_KEY: 'GANTI_DENGAN_GEMINI_API_KEY',
  MODEL: 'gemini-1.5-flash',
  get ENDPOINT() {
    return `https://generativelanguage.googleapis.com/v1beta/models/${this.MODEL}:generateContent?key=${this.API_KEY}`;
  }
};

const SYSTEM_CONTEXT = `Kamu adalah PIM Bot, asisten virtual aplikasi IPIM Maghfirah (Institut Pendidikan Islam Maghfirah).

TENTANG APLIKASI:
IPIM Maghfirah adalah sistem informasi manajemen pesantren berbasis web (PWA) yang bisa diinstall di HP.

FITUR UTAMA APLIKASI:
1. Dashboard — ringkasan kehadiran sholat, jadwal mengajar hari ini, motivasi, visi misi, video YouTube
2. Jadwal Sholat — jadwal sholat otomatis sesuai lokasi GPS
3. Al-Qur'an — baca Al-Qur'an offline, tracking tilawah harian otomatis
4. Dzikir — dzikir pagi dan petang dengan counter dan checklist (23 dzikir pagi, 18 dzikir petang)
5. Absensi Sholat — isi kehadiran sholat berjamaah harian
6. Absensi Kelas — dosen isi absensi mahasiswa per matakuliah
7. Jadwal Mengajar — lihat jadwal mengajar per hari
8. Kalender Akademik — event akademik dengan kode warna
9. Profil — ubah nama, password, foto profil, pilih bahasa (Indonesia/Arab), lapor pelanggaran, saran & masukan
10. Notifikasi — reminder otomatis jadwal mengajar, waktu sholat, pengumuman dari pusat data

ROLE PENGGUNA:
- Dosen: mengajar, isi absensi kelas, lihat jadwal
- Musyrif: kelola halaqoh, absensi halaqoh
- Dosen-Musyrif: kombinasi keduanya
- Operator Akademik: kelola data mahasiswa, jadwal, nilai, kalender
- Pusat Data: admin utama, kelola semua data dan notifikasi
- Umum: akses dasar

PREDIKAT NILAI:
- Mumtaz: ≥ 90
- Jayyid Jiddan: 80–89
- Jayyid: 70–79
- Maqbul: 60–69
- Rasib: < 60

PANDUAN PENGGUNAAN:
- Untuk isi absensi sholat: buka Dashboard → klik "Isi Absensi Sholat Hari Ini"
- Untuk baca Al-Qur'an: klik ikon Qur'an di Dashboard → pilih surat
- Untuk dzikir: klik ikon Dzikir di Dashboard → pilih pagi/petang
- Untuk ganti bahasa ke Arab: buka Profil → scroll ke bawah → pilih bahasa Arab
- Untuk laporan pelanggaran: buka Profil → bagian Laporan
- Untuk hubungi admin: buka Profil → Hubungi via WhatsApp

CARA MENJAWAB:
- Jawab dalam bahasa yang sama dengan pertanyaan (Indonesia atau Arab)
- Jawaban singkat, jelas, maksimal 3-4 kalimat
- Kalau pertanyaan tidak berkaitan dengan aplikasi, tetap jawab dengan ramah dan singkat
- Sapa dengan "Assalamu'alaikum" hanya di pesan pertama
- Gunakan bahasa yang sopan dan islami`;

// ── STATE ──
let chatHistory = [];
let isOpen = false;
let isTyping = false;

// ── RENDER WIDGET ──
function renderPimBot() {
  const existing = document.getElementById('pimBotWidget');
  if (existing) return;

  const widget = document.createElement('div');
  widget.id = 'pimBotWidget';
  
  // Perhatikan CSS untuk floating button yang sudah di-redesign
  widget.innerHTML = `
    <style>
      @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
      
      #pimBotWidget * { box-sizing: border-box; font-family: 'Plus Jakarta Sans', 'Poppins', sans-serif; }

      /* FLOATING BUTTON - REDESIGN */
      #pimBotToggle {
        position: fixed;
        bottom: 24px;
        right: 24px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(135deg, #003d33, #006644);
        color: white;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 26px;
        z-index: 9999;
        box-shadow: 0 6px 20px rgba(0,61,51,0.4);
        transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      }
      #pimBotToggle:hover {
        transform: scale(1.08);
      }
      #pimBotToggle .notif-dot {
        position: absolute;
        top: 4px;
        right: 4px;
        width: 12px;
        height: 12px;
        background: #f5c842;
        border-radius: 50%;
        border: 2px solid white;
      }

      /* CHAT WINDOW */
      #pimBotWindow {
        position: fixed;
        bottom: 100px;
        right: 24px;
        width: 340px;
        height: 480px;
        background: #ffffff;
        border-radius: 20px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.15);
        display: none;
        flex-direction: column;
        z-index: 9998;
        overflow: hidden;
        border: 1px solid #d1ead8;
      }
      #pimBotWindow.open { display: flex; }

      /* HEADER */
      .pim-header {
        background: linear-gradient(135deg, #003d33, #006644);
        padding: 16px;
        display: flex;
        align-items: center;
        gap: 12px;
        flex-shrink: 0;
      }
      .pim-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: rgba(245,200,66,0.2);
        border: 2px solid rgba(245,200,66,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        color: white;
        flex-shrink: 0;
      }
      .pim-header-info { flex: 1; }
      .pim-header-name { font-size: 15px; font-weight: 700; color: white; margin-bottom: 2px; }
      .pim-header-status { font-size: 11px; color: rgba(255,255,255,0.8); display: flex; align-items: center; gap: 4px; }
      .pim-status-dot { width: 6px; height: 6px; background: #4ade80; border-radius: 50%; }
      .pim-close {
        background: rgba(255,255,255,0.15);
        border: none;
        color: white;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        flex-shrink: 0;
        transition: background 0.2s;
      }
      .pim-close:hover { background: rgba(255,255,255,0.3); }

      /* MESSAGES */
      .pim-messages {
        flex: 1;
        overflow-y: auto;
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 12px;
        background: #f8fdf9;
      }
      .pim-messages::-webkit-scrollbar { width: 4px; }
      .pim-messages::-webkit-scrollbar-thumb { background: #c8e6d4; border-radius: 4px; }

      .pim-msg {
        max-width: 85%;
        font-size: 13px;
        line-height: 1.5;
      }
      .pim-msg.bot { align-self: flex-start; }
      .pim-msg.user { align-self: flex-end; }

      .pim-bubble {
        padding: 10px 14px;
        border-radius: 16px;
        word-break: break-word;
      }
      .pim-msg.bot .pim-bubble {
        background: white;
        color: #222;
        border: 1px solid #e8f5e9;
        border-bottom-left-radius: 4px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.02);
      }
      .pim-msg.user .pim-bubble {
        background: linear-gradient(135deg, #006644, #00a859);
        color: white;
        border-bottom-right-radius: 4px;
        box-shadow: 0 2px 5px rgba(0,102,68,0.2);
      }

      /* TYPING INDICATOR */
      .pim-typing {
        display: none;
        align-self: flex-start;
      }
      .pim-typing.show { display: flex; }
      .pim-typing-bubble {
        background: white;
        border: 1px solid #e8f5e9;
        border-radius: 16px;
        border-bottom-left-radius: 4px;
        padding: 12px 16px;
        display: flex;
        gap: 5px;
        align-items: center;
      }
      .pim-dot {
        width: 6px;
        height: 6px;
        background: #00a859;
        border-radius: 50%;
        opacity: 0.4;
      }
      .pim-dot:nth-child(1) { animation: pimDot 1.2s ease infinite 0s; }
      .pim-dot:nth-child(2) { animation: pimDot 1.2s ease infinite 0.2s; }
      .pim-dot:nth-child(3) { animation: pimDot 1.2s ease infinite 0.4s; }
      @keyframes pimDot { 0%,80%,100%{opacity:0.4;transform:scale(1)} 40%{opacity:1;transform:scale(1.2)} }

      /* INPUT */
      .pim-input-wrap {
        padding: 12px 16px;
        background: white;
        border-top: 1px solid #e8f5e9;
        display: flex;
        gap: 10px;
        align-items: flex-end;
        flex-shrink: 0;
      }
      .pim-input {
        flex: 1;
        border: 1.5px solid #d1ead8;
        border-radius: 24px;
        padding: 10px 16px;
        font-size: 13px;
        font-family: inherit;
        outline: none;
        resize: none;
        max-height: 90px;
        line-height: 1.4;
        color: #222;
        background: #f8fdf9;
        transition: border 0.2s;
      }
      .pim-input:focus { border-color: #00a859; background: white; }
      .pim-input::placeholder { color: #aaa; }
      .pim-send {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: linear-gradient(135deg, #006644, #00a859);
        border: none;
        color: white;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 15px;
        flex-shrink: 0;
        transition: transform 0.2s, box-shadow 0.2s;
      }
      .pim-send:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,102,68,0.3);
      }
      .pim-send:disabled { opacity: 0.5; cursor: not-allowed; }

      /* QUICK REPLIES */
      .pim-quick {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        padding: 0 16px 12px;
        background: #f8fdf9;
      }
      .pim-quick-btn {
        font-size: 11px;
        padding: 6px 12px;
        border-radius: 20px;
        border: 1px solid #c8e6d4;
        background: white;
        color: #006644;
        cursor: pointer;
        font-family: inherit;
        font-weight: 500;
        transition: background 0.2s, color 0.2s;
      }
      .pim-quick-btn:hover { background: #006644; color: white; border-color: #006644; }

      /* RESPONSIVE */
      @media (max-width: 400px) {
        #pimBotWindow {
          width: calc(100vw - 32px);
          right: 16px;
          bottom: 90px;
          height: 75vh;
        }
        #pimBotToggle { bottom: 16px; right: 16px; }
      }
    </style>

    <!-- FLOATING BUTTON (Menggunakan FontAwesome Icon Robot) -->
    <button id="pimBotToggle" onclick="pimBotToggle()" title="PIM Bot">
      <i class="fa-solid fa-robot"></i>
      <span class="notif-dot"></span>
    </button>

    <!-- CHAT WINDOW -->
    <div id="pimBotWindow">
      <div class="pim-header">
        <div class="pim-avatar"><i class="fa-solid fa-robot"></i></div>
        <div class="pim-header-info">
          <div class="pim-header-name">PIM Bot</div>
          <div class="pim-header-status"><span class="pim-status-dot"></span> Siap membantu</div>
        </div>
        <button class="pim-close" onclick="pimBotToggle()">
          <i class="fa-solid fa-times"></i>
        </button>
      </div>

      <div class="pim-messages" id="pimMessages">
        <div class="pim-msg bot">
          <div class="pim-bubble">Assalamu'alaikum! Saya PIM Bot 👋<br>Saya siap membantu kamu menggunakan aplikasi IPIM Maghfirah. Ada yang bisa saya bantu?</div>
        </div>
      </div>

      <div class="pim-typing" id="pimTyping">
        <div class="pim-typing-bubble">
          <div class="pim-dot"></div>
          <div class="pim-dot"></div>
          <div class="pim-dot"></div>
        </div>
      </div>

      <div class="pim-quick" id="pimQuick">
        <button class="pim-quick-btn" onclick="pimQuickSend('Cara isi absensi sholat')">Absensi sholat</button>
        <button class="pim-quick-btn" onclick="pimQuickSend('Cara baca Al-Quran offline')">Al-Qur\'an</button>
        <button class="pim-quick-btn" onclick="pimQuickSend('Cara ganti bahasa ke Arab')">Ganti bahasa</button>
        <button class="pim-quick-btn" onclick="pimQuickSend('Cara lapor pelanggaran')">Laporan</button>
      </div>

      <div class="pim-input-wrap">
        <textarea
          class="pim-input"
          id="pimInput"
          placeholder="Ketik pesan..."
          rows="1"
          onkeydown="pimHandleKey(event)"
          oninput="pimAutoResize(this)"
        ></textarea>
        <button class="pim-send" id="pimSend" onclick="pimSendMessage()">
          <i class="fa-solid fa-paper-plane"></i>
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(widget);
}

// ── TOGGLE ──
window.pimBotToggle = function() {
  isOpen = !isOpen;
  const win = document.getElementById('pimBotWindow');
  win.classList.toggle('open', isOpen);
  if (isOpen) {
    document.getElementById('pimInput').focus();
    const dot = document.querySelector('#pimBotToggle .notif-dot');
    if (dot) dot.style.display = 'none';
  }
};

// ── QUICK REPLY ──
window.pimQuickSend = function(text) {
  document.getElementById('pimInput').value = text;
  pimSendMessage();
  document.getElementById('pimQuick').style.display = 'none';
};

// ── AUTO RESIZE TEXTAREA ──
window.pimAutoResize = function(el) {
  el.style.height = 'auto';
  el.style.height = Math.min(el.scrollHeight, 90) + 'px';
};

// ── HANDLE ENTER ──
window.pimHandleKey = function(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    pimSendMessage();
  }
};

// ── TAMBAH PESAN KE UI ──
function pimAddMessage(text, role) {
  const container = document.getElementById('pimMessages');
  const div = document.createElement('div');
  div.className = `pim-msg ${role}`;
  
  // Clean up formatting untuk tampilan HTML sederhana
  let formattedText = text.replace(/\n/g, '<br>');
  // Hapus bintang tebal markdown jika AI menggunakannya
  formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  div.innerHTML = `<div class="pim-bubble">${formattedText}</div>`;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

// ── SET TYPING ──
function pimSetTyping(show) {
  isTyping = show;
  document.getElementById('pimTyping').classList.toggle('show', show);
  document.getElementById('pimSend').disabled = show;
  const messages = document.getElementById('pimMessages');
  messages.scrollTop = messages.scrollHeight;
}

// ── KIRIM PESAN (STRUKTUR JSON SUDAH DIPERBAIKI) ──
window.pimSendMessage = async function() {
  const input = document.getElementById('pimInput');
  const text  = input.value.trim();
  if (!text || isTyping) return;

  pimAddMessage(text, 'user');
  input.value = '';
  input.style.height = 'auto';

  pimSetTyping(true);

  // Siapkan payload dengan system_instruction di root
  const requestBody = {
    system_instruction: {
      parts: [{ text: SYSTEM_CONTEXT }]
    },
    contents: chatHistory.concat([{ role: 'user', parts: [{ text }] }]),
    generationConfig: {
      temperature: 0.3,       // Diturunkan agar AI lebih konsisten
      maxOutputTokens: 250,   // Dibatasi agar hemat dan tetap ringkas
      topP: 0.95
    }
  };

  try {
    const res = await fetch(PIM_BOT_CONFIG.ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });

    const data = await res.json();
    
    if (!res.ok) {
      throw new Error(data.error?.message || 'Gagal terhubung ke AI');
    }

    // Ambil teks balasan
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Maaf, saya tidak mengerti.';

    // Simpan history agar percakapan bersambung
    chatHistory.push({ role: 'user', parts: [{ text }] });
    chatHistory.push({ role: 'model', parts: [{ text: reply }] });

    // Batasi history maksimal 10 giliran (20 pesan)
    if (chatHistory.length > 20) chatHistory = chatHistory.slice(-20);

    pimSetTyping(false);
    pimAddMessage(reply, 'bot');

  } catch(err) {
    pimSetTyping(false);
    console.error('PIM Bot error:', err);
    pimAddMessage('Maaf, terjadi gangguan sistem. Silakan coba beberapa saat lagi.', 'bot');
  }
};

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  renderPimBot();
});
