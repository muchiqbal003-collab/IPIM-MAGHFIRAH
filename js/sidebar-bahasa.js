// ============================================
// SIDEBAR OPERATOR BAHASA — DENGAN MENU DROPDOWN
// Lokasi: /js/sidebar-bahasa.js
// 
// Cara pakai di setiap halaman:
// 1. <body data-page="nama-halaman">
// 2. <div id="sidebarContainer"></div>
// 3. <button class="burger-btn" id="burgerToggle">
// 4. <button class="theme-toggle" id="themeToggle">
// 5. Include script ini setelah firebase-config.js & app.js
// ============================================

(function() {
    'use strict';
  
    // ============ KONFIGURASI MENU ============
    const MENU_GROUPS = [
      {
        section: 'Utama',
        items: [
          { id: 'dashboard', label: 'Dashboard', href: 'dashboard.html', icon: 'icon-home' }
        ]
      },
      {
        section: 'Nilai',
        icon: 'icon-chart',
        collapsible: true,
        items: [
          { id: 'nilai-toafl', label: 'Nilai Semi TOAFL', href: 'nilai-toafl.html', icon: 'icon-pen' },
          { id: 'nilai-bulanan', label: 'Nilai Ujian Bulanan', href: 'nilai-bulanan.html', icon: 'icon-calendar' },
          { id: 'dashboard-nilai', label: 'Dashboard Nilai', href: 'dashboard-nilai.html', icon: 'icon-chart' }
        ]
      },
      {
        section: 'Program',
        icon: 'icon-list-check',
        collapsible: true,
        items: [
          { id: 'program-bahasa', label: 'Program Bahasa', href: 'program-bahasa.html', icon: 'icon-list-check' }
        ]
      },
      {
        section: 'Rekap',
        icon: 'icon-clipboard',
        collapsible: true,
        items: [
          { id: 'rekap-nilai-toafl', label: 'Rekap Nilai TOAFL', href: 'rekap-nilai-toafl.html', icon: 'icon-chart' },
          { id: 'rekap-bahasa', label: 'Rekap Pelanggaran', href: 'rekap-bahasa.html', icon: 'icon-clipboard' }
        ]
      },
      {
        section: 'Pelanggaran',
        icon: 'icon-warning',
        collapsible: true,
        items: [
          { id: 'input-pelanggaran', label: 'Input Pelanggaran', href: 'input-pelanggaran.html', icon: 'icon-warning' }
        ]
      }
    ];
  
    // ============ SVG ICONS ============
    const SVG_ICONS = {
      'icon-grad': '<path d="M22 10.5L12 3 2 10.5 12 18l4-2.5"/><path d="M6 12.5v4l6 3 6-3v-4"/><circle cx="12" cy="10.5" r="1.5" fill="currentColor" stroke="none"/>',
      'icon-home': '<path d="M3 12l9-9 9 9"/><path d="M5 10v9a1 1 0 001 1h3v-5h6v5h3a1 1 0 001-1v-9"/>',
      'icon-pen': '<path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>',
      'icon-calendar': '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
      'icon-list-check': '<path d="M11 17H21M11 12H21M11 7H21M6 7L4 9L2 7M6 12L4 14L2 12M6 17L4 19L2 17"/>',
      'icon-chart': '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
      'icon-clipboard': '<path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/>',
      'icon-warning': '<path d="M12 2L2 22h20L12 2z"/><line x1="12" y1="9" x2="12" y2="13"/><circle cx="12" cy="17" r="0.5" fill="currentColor"/>',
      'icon-logout': '<path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16,17 21,12 16,7"/><line x1="21" y1="12" x2="9" y2="12"/>',
      'icon-burger': '<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>',
      'icon-moon': '<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>',
      'icon-sun': '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>',
      'icon-chevron-down': '<polyline points="6,9 12,15 18,9"/>',
      'icon-filter': '<polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46 22,3"/>',
      'icon-list': '<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>',
      'icon-save': '<path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17,21 17,13 7,13 7,21"/><polyline points="7,3 7,8 15,8"/>',
      'icon-export': '<path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/>',
      'icon-import': '<path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17,8 12,3 7,8"/><line x1="12" y1="3" x2="12" y2="15"/>',
      'icon-plus': '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
      'icon-users': '<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>',
      'icon-trophy': '<path d="M6 9H4.5a2.5 2.5 0 010-5H6"/><path d="M18 9h1.5a2.5 2.5 0 000-5H18"/><path d="M4 22h16"/><path d="M10 18v4"/><path d="M14 18v4"/><path d="M8 5h8a4 4 0 014 4v1a8 8 0 01-8 8 8 8 0 01-8-8V9a4 4 0 014-4z"/>',
      'icon-star': '<polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>',
      'icon-search': '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
      'icon-edit': '<path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>',
      'icon-trash': '<polyline points="3,6 5,6 21,6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>'
    };
  
    // ============ CSS SIDEBAR ============
    const SIDEBAR_CSS = `
      .sidebar { width: 270px; background: var(--sidebar-bg, rgba(255,255,255,0.7)); backdrop-filter: blur(28px) saturate(180%); -webkit-backdrop-filter: blur(28px) saturate(180%); border-right: 1px solid var(--border-glass, rgba(0,77,64,0.08)); box-shadow: 0 20px 40px rgba(0,0,0,0.12); height: 100vh; position: fixed; left: 0; top: 0; display: flex; flex-direction: column; z-index: 100; transform: translateX(0); transition: transform 0.4s cubic-bezier(0.4,0,0.2,1); border-radius: 0 28px 28px 0; }
      .sidebar.closed { transform: translateX(-100%); }
      .sidebar-header { padding: 28px 20px 20px; border-bottom: 1px solid var(--border-glass, rgba(0,77,64,0.08)); display: flex; align-items: center; gap: 14px; }
      .sidebar-logo { width: 48px; height: 48px; background: linear-gradient(135deg, #004d40, #00695c); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: white; flex-shrink: 0; box-shadow: 0 8px 20px rgba(0,77,64,0.25); }
      .sidebar-logo svg { width: 24px; height: 24px; fill: white; }
      .sidebar-brand h2 { font-size: 17px; font-weight: 700; color: var(--text-primary, #1e293b); letter-spacing: -0.3px; }
      .sidebar-brand span { font-size: 11px; color: var(--text-muted, #94a3b8); font-weight: 500; }
      .sidebar-nav { flex: 1; overflow-y: auto; padding: 18px 12px; }
      .nav-section { margin-bottom: 6px; }
      .nav-section-title { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: var(--text-muted, #94a3b8); padding: 10px 14px 8px; }
      .nav-group-header { display: flex; align-items: center; gap: 12px; padding: 10px 16px; border-radius: 40px; color: var(--text-secondary, #475569); font-size: 13.5px; font-weight: 600; cursor: pointer; transition: all 0.3s; margin-bottom: 2px; user-select: none; }
      .nav-group-header:hover { background: var(--nav-hover, rgba(0,77,64,0.06)); color: var(--text-primary, #1e293b); }
      .nav-group-header svg { width: 18px; height: 18px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; flex-shrink: 0; }
      .nav-group-header .chevron { margin-left: auto; transition: transform 0.3s ease; }
      .nav-group-header.open .chevron { transform: rotate(180deg); }
      .nav-submenu { max-height: 0; overflow: hidden; transition: max-height 0.4s cubic-bezier(0.4,0,0.2,1); }
      .nav-submenu.open { max-height: 300px; }
      .nav-submenu .nav-item { padding-left: 46px; font-size: 12.5px; }
      .nav-item { display: flex; align-items: center; gap: 12px; padding: 10px 16px; border-radius: 40px; color: var(--text-secondary, #475569); text-decoration: none; font-size: 13.5px; font-weight: 500; transition: all 0.3s; margin-bottom: 2px; cursor: pointer; }
      .nav-item svg { width: 18px; height: 18px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; flex-shrink: 0; }
      .nav-item:hover { background: var(--nav-hover, rgba(0,77,64,0.06)); color: var(--text-primary, #1e293b); }
      .nav-item.active { background: var(--nav-active, rgba(212,168,67,0.15)); color: var(--accent, #d4a843); font-weight: 700; }
      .sidebar-footer { padding: 18px 20px; border-top: 1px solid var(--border-glass, rgba(0,77,64,0.08)); display: flex; align-items: center; gap: 12px; }
      .user-avatar { width: 40px; height: 40px; background: linear-gradient(135deg, #fdf6e3, #d4a843); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #00332b; font-weight: 700; font-size: 16px; flex-shrink: 0; }
      .user-info-sidebar .name { font-size: 13px; font-weight: 600; color: var(--text-primary, #1e293b); }
      .user-info-sidebar .role { font-size: 10px; color: var(--text-muted, #94a3b8); }
      .burger-btn, .theme-toggle { position: fixed; top: 20px; z-index: 200; background: var(--surface-glass-strong, rgba(255,255,255,0.85)); backdrop-filter: blur(20px); border: 1px solid var(--border-glass, rgba(0,77,64,0.08)); width: 46px; height: 46px; border-radius: 50%; box-shadow: 0 10px 25px rgba(0,0,0,0.1); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.3s; color: var(--primary, #004d40); }
      .burger-btn { left: 20px; display: none; }
      .theme-toggle { right: 20px; color: var(--accent, #d4a843); }
      .burger-btn svg, .theme-toggle svg { width: 22px; height: 22px; fill: none; stroke: currentColor; stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; }
      .main-content { margin-left: 270px; transition: margin-left 0.4s cubic-bezier(0.4,0,0.2,1); }
      @media (max-width: 768px) {
        .sidebar { transform: translateX(-100%); border-radius: 0; }
        .sidebar.open { transform: translateX(0); border-radius: 0 18px 18px 0; }
        .main-content { margin-left: 0 !important; }
        .burger-btn { display: flex; }
        .theme-toggle { right: 14px; }
      }
    `;
  
    // ============ BUILD SIDEBAR ============
    function buildSidebar() {
      const container = document.getElementById('sidebarContainer');
      if (!container) return;
  
      const activePage = document.body.getAttribute('data-page') || '';
  
      // Inject CSS
      const styleEl = document.createElement('style');
      styleEl.textContent = SIDEBAR_CSS;
      document.head.appendChild(styleEl);
  
      // Build SVG sprites
      let svgSprites = '<svg style="display:none;">';
      Object.entries(SVG_ICONS).forEach(([id, path]) => {
        svgSprites += `<symbol id="${id}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${path}</symbol>`;
      });
      svgSprites += '</svg>';
  
      // Build nav HTML
      let navHtml = '';
      
      MENU_GROUPS.forEach(group => {
        const hasActive = group.items.some(item => item.id === activePage);
        
        if (group.collapsible) {
          navHtml += `<div class="nav-section">`;
          navHtml += `<div class="nav-group-header ${hasActive ? 'open' : ''}" onclick="toggleGroup(this)">
            <svg><use href="#${group.icon}"/></svg>
            <span>${group.section}</span>
            <svg class="chevron"><use href="#icon-chevron-down"/></svg>
          </div>`;
          navHtml += `<div class="nav-submenu ${hasActive ? 'open' : ''}">`;
          
          group.items.forEach(item => {
            const isActive = activePage === item.id ? ' active' : '';
            navHtml += `<a href="${item.href}" class="nav-item${isActive}" data-page="${item.id}">
              <svg><use href="#${item.icon}"/></svg> ${item.label}
            </a>`;
          });
          
          navHtml += '</div></div>';
        } else {
          navHtml += `<div class="nav-section"><div class="nav-section-title">${group.section}</div>`;
          group.items.forEach(item => {
            const isActive = activePage === item.id ? ' active' : '';
            navHtml += `<a href="${item.href}" class="nav-item${isActive}" data-page="${item.id}">
              <svg><use href="#${item.icon}"/></svg> ${item.label}
            </a>`;
          });
          navHtml += '</div>';
        }
      });
  
      // Build full sidebar
      container.innerHTML = `
        ${svgSprites}
        <aside class="sidebar" id="sidebar">
          <div class="sidebar-header">
            <div class="sidebar-logo"><svg><use href="#icon-grad"/></svg></div>
            <div class="sidebar-brand"><h2>IPIM Panel</h2><span>Operator Bahasa</span></div>
          </div>
          <nav class="sidebar-nav">${navHtml}</nav>
          <div class="sidebar-footer">
            <div class="user-avatar" id="avatarLetter">B</div>
            <div class="user-info-sidebar"><div class="name" id="sidebarName">Operator</div><div class="role">Bahasa</div></div>
          </div>
        </aside>
      `;
  
      // Update user info
      let user;
      try { user = checkRole(['operator-bahasa', 'pusat-data']); } catch(e) {}
      if (!user) user = { nama: 'Operator' };
      document.getElementById('sidebarName').textContent = user.nama || 'Operator';
      document.getElementById('avatarLetter').textContent = (user.nama || 'B')[0].toUpperCase();
  
      initSidebarBehavior();
    }
  
    // ============ SIDEBAR BEHAVIOR ============
    function initSidebarBehavior() {
      const sidebar = document.getElementById('sidebar');
      const burgerBtn = document.getElementById('burgerToggle');
      const themeToggle = document.getElementById('themeToggle');
      const themeIcon = document.getElementById('themeIcon');
      const mainContent = document.getElementById('mainContent');
  
      // Theme init
      const savedTheme = localStorage.getItem('theme') || 'light';
      document.documentElement.setAttribute('data-theme', savedTheme);
      if (themeIcon) {
        const use = themeIcon.querySelector('use');
        if (use) use.setAttribute('href', savedTheme === 'dark' ? '#icon-sun' : '#icon-moon');
      }
  
      if (themeToggle) {
        themeToggle.addEventListener('click', () => {
          const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
          document.documentElement.setAttribute('data-theme', next);
          localStorage.setItem('theme', next);
          if (themeIcon) {
            const use = themeIcon.querySelector('use');
            if (use) use.setAttribute('href', next === 'dark' ? '#icon-sun' : '#icon-moon');
          }
        });
      }
  
      // Burger toggle
      function isMobile() { return window.innerWidth <= 768; }
  
      if (burgerBtn) {
        burgerBtn.addEventListener('click', () => {
          if (isMobile()) {
            sidebar.classList.toggle('open');
          } else {
            sidebar.classList.toggle('closed');
            if (mainContent) mainContent.style.marginLeft = sidebar.classList.contains('closed') ? '0' : '270px';
          }
        });
      }
  
      // Close sidebar on nav click (mobile)
      document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
          if (isMobile()) sidebar.classList.remove('open');
        });
      });
  
      // Reset on resize
      window.addEventListener('resize', () => {
        if (!isMobile()) {
          sidebar.classList.remove('open');
          if (!sidebar.classList.contains('closed') && mainContent) mainContent.style.marginLeft = '270px';
        } else {
          sidebar.classList.add('closed');
          if (mainContent) mainContent.style.marginLeft = '0';
        }
      });
  
      // Init mobile
      if (isMobile()) {
        sidebar.classList.add('closed');
        if (mainContent) mainContent.style.marginLeft = '0';
      }
    }
  
    // ============ GLOBAL: Toggle Dropdown ============
    window.toggleGroup = function(header) {
      header.classList.toggle('open');
      const submenu = header.nextElementSibling;
      if (submenu && submenu.classList.contains('nav-submenu')) {
        submenu.classList.toggle('open');
      }
    };
  
    // ============ INIT ============
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', buildSidebar);
    } else {
      buildSidebar();
    }
  })();
