// ============================================
// IPIM Duty Lecturer - Bottom Nav + Swipe
// ============================================

(function() {
  'use strict';

  const DUTY_PAGES = [
    { id: 'dashboard', label: 'Home', page: 'dashboard.html', icon: 'home', badge: null },
    { id: 'jadwal', label: 'Jadwal', page: 'jadwal-harian.html', icon: 'calendar', badge: null },
    { id: 'pantau', label: 'Pantau', page: 'pantau-dosen.html', icon: 'eye', badge: null },
    { id: 'hadir', label: 'Hadir', page: 'kehadiran-mhs.html', icon: 'users', badge: null }
  ];

  const SVG_ICONS = {
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12l9-9 9 9"/><path d="M5 10v9a1 1 0 001 1h3v-5h6v5h3a1 1 0 001-1v-9"/></svg>',
    calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
    eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
    users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>'
  };

  function getCurrentPage() {
    const path = window.location.pathname;
    const filename = path.split('/').pop();
    return filename || 'dashboard.html';
  }

  function getCurrentIndex() {
    const current = getCurrentPage();
    return DUTY_PAGES.findIndex(p => p.page === current);
  }

  function createBottomNav() {
    // Cek apakah sudah ada
    if (document.getElementById('dutyBottomNav')) return;

    const nav = document.createElement('nav');
    nav.id = 'dutyBottomNav';
    
    const currentIndex = getCurrentIndex();
    const activeIndex = currentIndex >= 0 ? currentIndex : 0;

    DUTY_PAGES.forEach((item, index) => {
      const btn = document.createElement('button');
      btn.className = 'duty-nav-item' + (index === activeIndex ? ' active' : '');
      btn.innerHTML = SVG_ICONS[item.icon] + `<span>${item.label}</span>`;
      
      // Badge
      if (item.badge !== null) {
        const badge = document.createElement('span');
        badge.className = 'duty-nav-badge';
        badge.id = `dutyBadge_${item.id}`;
        badge.textContent = item.badge;
        badge.style.display = 'none';
        btn.appendChild(badge);
      }
      
      btn.addEventListener('click', () => {
        navigateTo(index);
      });
      
      nav.appendChild(btn);
    });

    document.body.appendChild(nav);
  }

  function navigateTo(index) {
    if (index < 0 || index >= DUTY_PAGES.length) return;
    const target = DUTY_PAGES[index];
    window.location.href = target.page;
  }

  // ═══ SWIPE GESTURE ═══
  function initSwipe() {
    let touchStartX = 0;
    let touchEndX = 0;
    const threshold = 50;

    document.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      
      // Swipe kiri → kanan (gesture ke kiri = pindah ke halaman BERIKUTNYA)
      if (diff > threshold) {
        const currentIndex = getCurrentIndex();
        if (currentIndex < DUTY_PAGES.length - 1) {
          navigateTo(currentIndex + 1);
        }
      }
      
      // Swipe kanan → kiri (gesture ke kanan = pindah ke halaman SEBELUMNYA)
      if (diff < -threshold) {
        const currentIndex = getCurrentIndex();
        if (currentIndex > 0) {
          navigateTo(currentIndex - 1);
        }
      }
    }, { passive: true });
  }

  // ═══ UPDATE BADGE ═══
  window.updateDutyBadge = function(menuId, count) {
    const badge = document.getElementById(`dutyBadge_${menuId}`);
    if (!badge) return;
    
    if (count > 0) {
      badge.textContent = count > 99 ? '99+' : count;
      badge.style.display = 'flex';
    } else {
      badge.style.display = 'none';
    }
  };

  // Init
  document.addEventListener('DOMContentLoaded', () => {
    createBottomNav();
    initSwipe();
  });

  // Kalau DOM sudah ready
  if (document.readyState !== 'loading') {
    createBottomNav();
    initSwipe();
  }
})();