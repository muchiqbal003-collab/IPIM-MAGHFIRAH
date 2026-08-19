// js/app.js
// Global App Logic - IPIM Maghfirah
// Multi-Role Support

(function() {
  'use strict';

  // ============================================
  // REGISTER SERVICE WORKER
  // ============================================
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/IPIM-MAGHFIRAH/sw.js')
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

  // ═══ CEK ROLE AKSES (MULTI-ROLE SUPPORT) ═══
  window.checkRole = function(allowedRoles) {
    const user = getUser();
    if (!user) {
      window.location.href = '../../index.html';
      return null;
    }

    // Cek role aktif dari localStorage
    const roleAktif = localStorage.getItem('roleAktif');
    const userRole = roleAktif || user.role || 'umum';

    // Cek semua roles yang dimiliki user
    const allRoles = user.roles || [user.role || 'umum'];

    // Cek apakah user punya akses
    const hasAccess = allRoles.some(r => allowedRoles.includes(r));

    if (!hasAccess) {
      alert('Anda tidak memiliki akses ke halaman ini.');
      history.back();
      return null;
    }

    // Update user.role ke role aktif
    user.role = userRole;
    return user;
  };

  // Logout
  window.logout = function() {
    if (confirm('Apakah Anda yakin ingin keluar?')) {
      auth.signOut().then(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('roleAktif');
        window.location.href = '../../index.html';
      });
    }
  };

  // Format tanggal Indonesia
  window.formatTanggal = function(date) {
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(date).toLocaleDateString('id-ID', options);
  };

  window.formatTanggalPendek = function(date) {
    return new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  window.getNamaHari = function(date) {
    const days = ['Ahad', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    return days[new Date(date).getDay()];
  };

  window.getHijriDate = function() {
    const today = new Date();
    const hijriMonths = ['Muharram','Safar','Rabiul Awal','Rabiul Akhir','Jumadil Awal','Jumadil Akhir','Rajab','Syaban','Ramadhan','Syawal','Dzulqaidah','Dzulhijjah'];
    const jd = Math.floor((today.getTime()/86400000)-(today.getTimezoneOffset()/1440))+2440587.5;
    const islamicDate = Math.floor((jd-1948439.5)/29.530588)+1;
    const monthIndex = Math.floor((islamicDate%354.36)/29.5)%12;
    const day = Math.floor((islamicDate%354.36)%29.5)+1;
    const year = Math.floor(islamicDate/354.36)+1;
    return `${day} ${hijriMonths[monthIndex]} ${year} H`;
  };

  window.escapeHtml = function(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  };

  window.generateId = function(length=20) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for(let i=0;i<length;i++) result += chars.charAt(Math.floor(Math.random()*chars.length));
    return result;
  };

  // ============================================
  // MULTI-BAHASA (FIX)
  // ============================================

  window.changeLanguage = function(lang) {
    localStorage.setItem('appLang', lang);
    window.location.reload();
  };

  window.getCurrentLang = function() {
    return localStorage.getItem('appLang') || 'id';
  };

  function initLanguage() {
    const lang = localStorage.getItem('appLang') || 'id';
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.body.classList.toggle('lang-ar', lang === 'ar');
    
    if (typeof applyLang === 'function') {
      setTimeout(applyLang, 100);
    }
    
    console.log('🌍 Bahasa:', lang);
  }

  if (document.readyState === 'complete') {
    initLanguage();
  } else {
    window.addEventListener('load', initLanguage);
  }

  // ============================================
  // LOAD PIM-BOT AI
  // ============================================
  

  console.log('✅ IPIM App siap!');
  console.log('👤 User:', getUser());
  console.log('📅 Hari ini:', formatTanggal(new Date()));
  console.log('🕌 Hijriah:', getHijriDate());
})();
