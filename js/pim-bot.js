// js/pim-bot.js
// PIM Bot — Asisten virtual IPIM Maghfirah
// Menggunakan Google Gemini API (free tier)

const PIM_BOT_CONFIG = {
  // Ganti dengan API key Gemini kamu
  // Dapatkan di: https://aistudio.google.com/app/apikey
  API_KEY: 'GANTI_DENGAN_GEMINI_API_KEY',
  // Model gratis Gemini
  MODEL: 'gemini-1.5-flash',
  // Endpoint — API key pakai query param, BUKAN header Authorization
  get ENDPOINT() {
    return `https://generativelanguage.googleapis.com/v1beta/models/${this.MODEL}:generateContent?key=${this.API_KEY}`;
  }
};

// Konteks aplikasi IPIM — bot akan paham fitur-fitur yang ada
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
  widget.innerHTML = `
    <style>
      #pimBotWidget * { box-sizing: border-box; font-family: 'Plus Jakarta Sans', 'Poppins', sans-serif; }

      /* FLOATING BUTTON */
      #pimBotToggle {
        position: fixed;
        bottom: 84px;
        right: 16px;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: linear-gradient(135deg, #003d33, #006644);
        color: white;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        z-index: 999;
        box-shadow: 0 4px 16px rgba(0,61,51,0.35);
      }
      #pimBotToggle .notif-dot {
        position: absolute;
        top: 2px;
        right: 2px;
        width: 10px;
        height: 10px;
        background: #f5c842;
        border-radius: 50%;
        border: 2px solid white;
      }

      /* CHAT WINDOW */
      #pimBotWindow {
        position: fixed;
        bottom: 144px;
        right: 16px;
        width: 320px;
        height: 440px;
        background: #ffffff;
        border-radius: 18px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.15);
        display: none;
        flex-direction: column;
        z-index: 998;
        overflow: hidden;
        border: 1px solid #d1ead8;
      }
      #pimBotWindow.open { display: flex; }

      /* HEADER */
      .pim-header {
        background: linear-gradient(135deg, #003d33, #006644);
        padding: 12px 14px;
        display: flex;
        align-items: center;
        gap: 10px;
        flex-shrink: 0;
      }
      .pim-avatar {
        width: 34px;
        height: 34px;
        border-radius: 50%;
        background: rgba(245,200,66,0.2);
        border: 2px solid rgba(245,200,66,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        flex-shrink: 0;
      }
      .pim-header-info { flex: 1; }
      .pim-header-name { font-size: 13px; font-weight: 700; color: white; }
      .pim-header-status { font-size: 10px; color: rgba(255,255,255,0.7); display: flex; align-items: center; gap: 4px; margin-top: 1px; }
      .pim-status-dot { width: 6px; height: 6px; background: #4ade80; border-radius: 50%; }
      .pim-close {
        background: rgba(255,255,255,0.12);
        border: none;
        color: white;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 13px;
        flex-shrink: 0;
      }

      /* MESSAGES */
      .pim-messages {
        flex: 1;
        overflow-y: auto;
        padding: 14px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        background: #f8fdf9;
      }
      .pim-messages::-webkit-scrollbar { width: 3px; }
      .pim-messages::-webkit-scrollbar-thumb { background: #c8e6d4; border-radius: 3px; }

      .pim-msg {
        max-width: 85%;
        font-size: 12.5px;
        line-height: 1.55;
      }
      .pim-msg.bot { align-self: flex-start; }
      .pim-msg.user { align-self: flex-end; }

      .pim-bubble {
        padding: 9px 12px;
        border-radius: 14px;
        word-break: break-word;
      }
      .pim-msg.bot .pim-bubble {
        background: white;
        color: #222;
        border: 1px solid #e8f5e9;
        border-bottom-left-radius: 4px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.05);
      }
      .pim-msg.user .pim-bubble {
        background: linear-gradient(135deg, #006644, #00a859);
        color: white;
        border-bottom-right-radius: 4px;
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
        border-radius: 14px;
        border-bottom-left-radius: 4px;
        padding: 10px 14px;
        display: flex;
        gap: 4px;
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
        padding: 10px 12px;
        background: white;
        border-top: 1px solid #e8f5e9;
        display: flex;
        gap: 8px;
        align-items: flex-end;
        flex-shrink: 0;
      }
      .pim-input {
        flex: 1;
        border: 1.5px solid #d1ead8;
        border-radius: 20px;
        padding: 8px 14px;
        font-size: 12.5px;
        font-family: inherit;
        outline: none;
        resize: none;
        max-height: 80px;
        line-height: 1.4;
        color: #222;
        background: #f8fdf9;
      }
      .pim-input:focus { border-color: #00a859; background: white; }
      .pim-input::placeholder { color: #aaa; }
      .pim-send {
        width: 34px;
        height: 34px;
        border-radius: 50%;
        background: linear-gradient(135deg, #006644, #00a859);
        border: none;
        color: white;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 13px;
        flex-shrink: 0;
      }
      .pim-send:disabled { opacity: 0.5; cursor: not-allowed; }

      /* QUICK REPLIES */
      .pim-quick {
        display: flex;
        gap: 6px;
        flex-wrap: wrap;
        padding: 0 14px 10px;
        background: #f8fdf9;
      }
      .pim-quick-btn {
        font-size: 11px;
        padding: 5px 10px;
        border-radius: 20px;
        border: 1px solid #c8e6d4;
        background: white;
        color: #006644;
        cursor: pointer;
        font-family: inherit;
        font-weight: 500;
        white-space: nowrap;
      }
      .pim-quick-btn:active { background: #e8f5e9; }

      /* RESPONSIVE */
      @media (max-width: 400px) {
        #pimBotWindow {
          width: calc(100vw - 20px);
          right: 10px;
          bottom: 134px;
          height: 400px;
        }
        #pimBotToggle { bottom: 78px; right: 12px; }
      }
    </style>

    <!-- FLOATING BUTTON -->
    <button id="pimBotToggle" onclick="pimBotToggle()" title="PIM Bot">
      <i class="fa-solid fa-robot"></i>
      <span class="notif-dot"></span>
    </button>

    <!-- CHAT WINDOW -->
    <div id="pimBotWindow">
      <div class="pim-header">
        <div class="pim-avatar">🤖</div>
        <div class="pim-header-info">
          <div class="pim-header-name">PIM Bot</div>
          <div class="pim-header-status"><span class="pim-status-dot"></span> Siap membantu</div>
        </div>
        <button class="pim-close" onclick="pimBotToggle()">✕</button>
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
    // Hapus notif dot
    const dot = document.querySelector('#pimBotToggle .notif-dot');
    if (dot) dot.style.display = 'none';
  }
};

// ── QUICK REPLY ──
window.pimQuickSend = function(text) {
  document.getElementById('pimInput').value = text;
  pimSendMessage();
  // Sembunyikan quick replies setelah dipakai
  document.getElementById('pimQuick').style.display = 'none';
};

// ── AUTO RESIZE TEXTAREA ──
window.pimAutoResize = function(el) {
  el.style.height = 'auto';
  el.style.height = Math.min(el.scrollHeight, 80) + 'px';
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
  div.innerHTML = `<div class="pim-bubble">${text.replace(/\n/g, '<br>')}</div>`;
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

// ── KIRIM PESAN ──
window.pimSendMessage = async function() {
  const input = document.getElementById('pimInput');
  const text  = input.value.trim();
  if (!text || isTyping) return;

  // Tampilkan pesan user
  pimAddMessage(text, 'user');
  input.value = '';
  input.style.height = 'auto';

  // Simpan ke history
  chatHistory.push({ role: 'user', parts: [{ text }] });

  // Tampilkan typing
  pimSetTyping(true);

  try {
    // Panggil Gemini API
    // API key pakai query param, BUKAN Authorization header
    const res = await fetch(PIM_BOT_CONFIG.ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: SYSTEM_CONTEXT }]
        },
        contents: chatHistory,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 300,
          topP: 0.9
        },
        safetySettings: [
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' }
        ]
      })
    });

    if (!res.ok) {
      const errData = await res.json();
      console.error('Gemini error:', errData);
      throw new Error(errData.error?.message || 'Gemini API error');
    }

    const data   = await res.json();
    const reply  = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Maaf, saya tidak bisa menjawab saat ini.';

    // Simpan response ke history
    chatHistory.push({ role: 'model', parts: [{ text: reply }] });

    // Batasi history agar tidak terlalu panjang (max 10 giliran)
    if (chatHistory.length > 20) chatHistory = chatHistory.slice(-20);

    pimSetTyping(false);
    pimAddMessage(reply, 'bot');

  } catch(err) {
    pimSetTyping(false);
    console.error('PIM Bot error:', err);
    pimAddMessage('Maaf, terjadi gangguan koneksi. Silakan coba lagi.', 'bot');
  }
};

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  renderPimBot();
});
