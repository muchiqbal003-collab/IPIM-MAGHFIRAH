// js/app.js
// Global App Logic - IPIM Maghfirah

(function() {
  'use strict';

  // ============================================
  // REGISTER SERVICE WORKER
  // ============================================
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((reg) => console.log('✅ Service Worker registered:', reg.scope))
        .catch((err) => console.log('❌ Service Worker failed:', err));
    });
  }

  // ============================================
  // FUNGSI UMUM
  // ============================================

  // Ambil data user dari localStorage (dengan fallback UID)
  window.getUser = function() {
    const data = localStorage.getItem('user');
    if (!data) return null;

    const parsed = JSON.parse(data);

    // Jika uid tidak ada, coba ambil dari Firebase Auth
    if (!parsed.uid && firebase.auth().currentUser) {
      parsed.uid = firebase.auth().currentUser.uid;
      // Perbarui localStorage
      localStorage.setItem('user', JSON.stringify(parsed));
    }

    return parsed;
  };

  // Cek login
  window.checkAuth = function() {
    const user = getUser();
    if (!user) {
      window.location.href = '../../index.html';
      return null;
    }
    return user;
  };

  // Cek role akses
  window.checkRole = function(allowedRoles) {
    const user = getUser();
    if (!user) {
      window.location.href = '../../index.html';
      return null;
    }
    if (!allowedRoles.includes(user.role)) {
      alert('Anda tidak memiliki akses ke halaman ini.');
      history.back();
      return null;
    }
    return user;
  };

  // Logout
  window.logout = function() {
    if (confirm('Apakah Anda yakin ingin keluar?')) {
      auth.signOut().then(() => {
        localStorage.removeItem('user');
        window.location.href = '../../index.html';
      });
    }
  };

  // Format tanggal Indonesia
  window.formatTanggal = function(date) {
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(date).toLocaleDateString('id-ID', options);
  };

  // Format tanggal pendek
  window.formatTanggalPendek = function(date) {
    return new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  // Ambil nama hari dalam Bahasa Indonesia
  window.getNamaHari = function(date) {
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    return days[new Date(date).getDay()];
  };

  // Konversi tanggal ke Hijriah (perkiraan sederhana)
  window.getHijriDate = function() {
    const today = new Date();
    const hijriMonths = [
      'Muharram', 'Safar', 'Rabiul Awal', 'Rabiul Akhir',
      'Jumadil Awal', 'Jumadil Akhir', 'Rajab', 'Syaban',
      'Ramadhan', 'Syawal', 'Dzulqaidah', 'Dzulhijjah'
    ];
    const jd = Math.floor((today.getTime() / 86400000) - (today.getTimezoneOffset() / 1440)) + 2440587.5;
    const islamicDate = Math.floor((jd - 1948439.5) / 29.530588) + 1;
    const monthIndex = Math.floor((islamicDate % 354.36) / 29.5) % 12;
    const day = Math.floor((islamicDate % 354.36) % 29.5) + 1;
    const year = Math.floor(islamicDate / 354.36) + 1;
    return `${day} ${hijriMonths[monthIndex]} ${year} H`;
  };

  // Escape HTML
  window.escapeHtml = function(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  };

  // Generate random ID
  window.generateId = function(length = 20) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };
  
 (function loadPimBot() {
  const path = window.location.pathname;
  let botPath;
  
  // Cukup mundur 1 tingkat ('../') asalkan struktur foldernya standar:
  // - index.html
  // - pages/dashboard.html
  // - js/pim-bot.js
  if (path.includes('/pages/')) {
    botPath = '../js/pim-bot.js'; 
  } else {
    botPath = 'js/pim-bot.js';         
  }
  
  const script = document.createElement('script');
  script.src = botPath;
  
  // Tambahkan defer agar script tidak memblokir render UI utama
  script.defer = true; 
  
  script.onload = () => console.log('🤖 PIM-Bot loaded successfully!');
  script.onerror = () => console.warn('⚠️ PIM-Bot gagal dimuat dari path:', botPath);
  
  document.body.appendChild(script); // Memasukkan ke body biasanya lebih aman untuk widget UI
})();

  
  console.log('✅ IPIM App siap!');
  console.log('👤 User:', getUser());
  console.log('📅 Hari ini:', formatTanggal(new Date()));
  console.log('🕌 Hijriah:', getHijriDate());

})();
