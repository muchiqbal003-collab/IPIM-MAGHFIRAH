// js/sidebars.js
// Semua sidebar dalam satu file untuk memudahkan maintenance

function renderSidebar(role, activePage) {
  const sidebarContainer = document.getElementById('sidebarContainer');
  if (!sidebarContainer) return;

  let html = '';

  // ========== PUSAT DATA ==========
  if (role === 'pusat-data') {
    html = `
      <aside class="sidebar">
        <div class="sidebar-header">
          <div class="sidebar-logo"><i class="fa-solid fa-graduation-cap"></i></div>
          <div class="sidebar-brand"><h2>IPIM Panel</h2><span>Pusat Data</span></div>
        </div>
        <nav class="sidebar-nav">
          <div class="nav-section">
            <div class="nav-section-title">Utama</div>
            <a href="dashboard.html" class="nav-item ${activePage==='dashboard'?'active':''}"><i class="fa-solid fa-grid-2"></i> Dashboard</a>
            <a href="users.html" class="nav-item ${activePage==='users'?'active':''}"><i class="fa-solid fa-users-gear"></i> Manajemen User</a>
            <a href="pengaturan.html" class="nav-item ${activePage==='pengaturan'?'active':''}"><i class="fa-solid fa-gear"></i> Pengaturan</a>
          </div>
          <div class="nav-section">
            <div class="nav-section-title">Monitoring</div>
            <a href="#" class="nav-item"><i class="fa-solid fa-chart-line"></i> Rekap Akademik</a>
            <a href="#" class="nav-item"><i class="fa-solid fa-book-quran"></i> Rekap Halaqoh</a>
            <a href="#" class="nav-item"><i class="fa-solid fa-language"></i> Rekap Bahasa</a>
            <a href="#" class="nav-item"><i class="fa-solid fa-shield-halved"></i> Rekap Pengasuhan</a>
            <a href="#" class="nav-item"><i class="fa-solid fa-mosque"></i> Rekap Sholat</a>
            <a href="#" class="nav-item"><i class="fa-solid fa-clipboard-list"></i> Rekap Kinerja</a>
          </div>
        </nav>
        <div class="sidebar-footer">
          <div class="user-avatar" id="avatarLetter">A</div>
          <div class="user-info-sidebar"><div class="name" id="sidebarName">Admin</div><div class="role">Pusat Data</div></div>
        </div>
      </aside>`;
  }

  // ========== OPERATOR AKADEMIK ==========
  else if (role === 'operator-akademik') {
    html = `
      <aside class="sidebar">
        <div class="sidebar-header">
          <div class="sidebar-logo"><i class="fa-solid fa-graduation-cap"></i></div>
          <div class="sidebar-brand"><h2>IPIM Panel</h2><span>Operator Akademik</span></div>
        </div>
        <nav class="sidebar-nav">
          <div class="nav-section">
            <div class="nav-section-title">Utama</div>
            <a href="dashboard.html" class="nav-item ${activePage==='dashboard'?'active':''}"><i class="fa-solid fa-grid-2"></i> Home</a>
          </div>
          <div class="nav-section">
            <div class="nav-section-title">Master Data</div>
            <a href="dosen.html" class="nav-item ${activePage==='dosen'?'active':''}"><i class="fa-solid fa-chalkboard-user"></i> Data Dosen</a>
            <a href="mahasiswa.html" class="nav-item ${activePage==='mahasiswa'?'active':''}"><i class="fa-solid fa-user-graduate"></i> Data Mahasiswa</a>
            <a href="prodi.html" class="nav-item ${activePage==='prodi'?'active':''}"><i class="fa-solid fa-building-columns"></i> Data Prodi</a>
            <a href="matakuliah.html" class="nav-item ${activePage==='matakuliah'?'active':''}"><i class="fa-solid fa-book"></i> Data Matakuliah</a>
            <a href="kelas.html" class="nav-item ${activePage==='kelas'?'active':''}"><i class="fa-solid fa-school"></i> Data Kelas</a>
            <a href="jadwal.html" class="nav-item ${activePage==='jadwal'?'active':''}"><i class="fa-solid fa-clock"></i> Data Jadwal</a>
          </div>
          <div class="nav-section">
            <div class="nav-section-title">Akademik</div>
            <a href="rekap-absensi.html" class="nav-item ${activePage==='rekap-absensi'?'active':''}"><i class="fa-solid fa-clipboard-check"></i> Rekap Absensi</a>
            <a href="rekap-laporan-dosen.html" class="nav-item ${activePage==='rekap-laporan'?'active':''}"><i class="fa-solid fa-file-lines"></i> Rekap Laporan Dosen</a>
            <a href="kalender.html" class="nav-item ${activePage==='kalender'?'active':''}"><i class="fa-solid fa-calendar-days"></i> Kalender Akademik</a>
          </div>
        </nav>
        <div class="sidebar-footer">
          <div class="user-avatar" id="avatarLetter">A</div>
          <div class="user-info-sidebar"><div class="name" id="sidebarName">Operator</div><div class="role">Akademik</div></div>
        </div>
      </aside>`;
  }

  // ========== OPERATOR HALAQOH ==========
  else if (role === 'operator-halaqoh') {
    html = `
      <aside class="sidebar">
        <div class="sidebar-header">
          <div class="sidebar-logo"><i class="fa-solid fa-graduation-cap"></i></div>
          <div class="sidebar-brand"><h2>IPIM Panel</h2><span>Operator Halaqoh</span></div>
        </div>
        <nav class="sidebar-nav">
          <div class="nav-section">
            <div class="nav-section-title">Utama</div>
            <a href="dashboard.html" class="nav-item ${activePage==='dashboard'?'active':''}"><i class="fa-solid fa-grid-2"></i> Home</a>
          </div>
          <div class="nav-section">
            <div class="nav-section-title">Master Data</div>
            <a href="musyrif.html" class="nav-item ${activePage==='musyrif'?'active':''}"><i class="fa-solid fa-user-shield"></i> Data Musyrif</a>
            <a href="halaqoh.html" class="nav-item ${activePage==='halaqoh'?'active':''}"><i class="fa-solid fa-mosque"></i> Data Halaqoh</a>
            <a href="mahasiswa.html" class="nav-item ${activePage==='mahasiswa'?'active':''}"><i class="fa-solid fa-user-graduate"></i> Data Mahasiswa</a>
            <a href="pembagian.html" class="nav-item ${activePage==='pembagian'?'active':''}"><i class="fa-solid fa-people-arrows"></i> Pembagian Halaqoh</a>
          </div>
          <div class="nav-section">
            <div class="nav-section-title">Halaqoh</div>
            <a href="rekap-absensi.html" class="nav-item ${activePage==='rekap-absensi'?'active':''}"><i class="fa-solid fa-clipboard-check"></i> Rekap Absensi</a>
            <a href="rekap-hafalan.html" class="nav-item ${activePage==='rekap-hafalan'?'active':''}"><i class="fa-solid fa-chart-line"></i> Rekap Hafalan</a>
            <a href="rekap-ujian.html" class="nav-item ${activePage==='rekap-ujian'?'active':''}"><i class="fa-solid fa-file-lines"></i> Rekap Ujian Bulanan</a>
            <a href="rekap-laporan.html" class="nav-item ${activePage==='rekap-laporan'?'active':''}"><i class="fa-solid fa-note-sticky"></i> Rekap Laporan Musyrif</a>
          </div>
        </nav>
        <div class="sidebar-footer">
          <div class="user-avatar" id="avatarLetter">A</div>
          <div class="user-info-sidebar"><div class="name" id="sidebarName">Operator</div><div class="role">Halaqoh</div></div>
        </div>
      </aside>`;
  }

  // ========== OPERATOR BAHASA ==========
  else if (role === 'operator-bahasa') {
    html = `
      <aside class="sidebar">
        <div class="sidebar-header">
          <div class="sidebar-logo"><i class="fa-solid fa-graduation-cap"></i></div>
          <div class="sidebar-brand"><h2>IPIM Panel</h2><span>Operator Bahasa</span></div>
        </div>
        <nav class="sidebar-nav">
          <div class="nav-section">
            <div class="nav-section-title">Utama</div>
            <a href="dashboard.html" class="nav-item ${activePage==='dashboard'?'active':''}"><i class="fa-solid fa-grid-2"></i> Home</a>
            <a href="rekap.html" class="nav-item ${activePage==='rekap'?'active':''}"><i class="fa-solid fa-list"></i> Rekap Pelanggaran</a>
          </div>
        </nav>
        <div class="sidebar-footer">
          <div class="user-avatar" id="avatarLetter">A</div>
          <div class="user-info-sidebar"><div class="name" id="sidebarName">Operator</div><div class="role">Bahasa</div></div>
        </div>
      </aside>`;
  }

  // ========== OPERATOR PENGASUHAN ==========
  else if (role === 'operator-pengasuhan') {
    html = `
      <aside class="sidebar">
        <div class="sidebar-header">
          <div class="sidebar-logo"><i class="fa-solid fa-graduation-cap"></i></div>
          <div class="sidebar-brand"><h2>IPIM Panel</h2><span>Operator Pengasuhan</span></div>
        </div>
        <nav class="sidebar-nav">
          <div class="nav-section">
            <div class="nav-section-title">Utama</div>
            <a href="dashboard.html" class="nav-item ${activePage==='dashboard'?'active':''}"><i class="fa-solid fa-grid-2"></i> Home</a>
            <a href="rekap.html" class="nav-item ${activePage==='rekap'?'active':''}"><i class="fa-solid fa-list"></i> Rekap Pelanggaran</a>
          </div>
        </nav>
        <div class="sidebar-footer">
          <div class="user-avatar" id="avatarLetter">A</div>
          <div class="user-info-sidebar"><div class="name" id="sidebarName">Operator</div><div class="role">Pengasuhan</div></div>
        </div>
      </aside>`;
  }

  // Inject ke container
  sidebarContainer.innerHTML = html;
}