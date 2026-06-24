const CACHE_NAME = 'ipim-v6';

// Hanya cache halaman user + file inti
const FILES_TO_CACHE = [
  // Root
  '/IPIM-MAGHFIRAH/',
  '/IPIM-MAGHFIRAH/index.html',
  '/IPIM-MAGHFIRAH/manifest.json',

  // Halaman user
  '/IPIM-MAGHFIRAH/pages/user/dashboard.html',
  '/IPIM-MAGHFIRAH/pages/user/absensi-halaqoh.html',
  '/IPIM-MAGHFIRAH/pages/user/absensi-kelas.html',
  '/IPIM-MAGHFIRAH/pages/user/absensi.html',
  '/IPIM-MAGHFIRAH/pages/user/anggota-halaqohku.html',
  '/IPIM-MAGHFIRAH/pages/user/dzikir.html',
  '/IPIM-MAGHFIRAH/pages/user/hafalan.html',
  '/IPIM-MAGHFIRAH/pages/user/jadwal-saya.html',
  '/IPIM-MAGHFIRAH/pages/user/kalender.html',
  '/IPIM-MAGHFIRAH/pages/user/kinerja.html',
  '/IPIM-MAGHFIRAH/pages/user/mahasiswa-bimbingan.html',
  '/IPIM-MAGHFIRAH/pages/user/menu-cepat.html',
  '/IPIM-MAGHFIRAH/pages/user/nilai.html',
  '/IPIM-MAGHFIRAH/pages/user/notifikasi.html',
  '/IPIM-MAGHFIRAH/pages/user/pencapaian.html',
  '/IPIM-MAGHFIRAH/pages/user/profil.html',
  '/IPIM-MAGHFIRAH/pages/user/quran.html',
  '/IPIM-MAGHFIRAH/pages/user/rekap-absensi-halaqoh.html',
  '/IPIM-MAGHFIRAH/pages/user/rekap-absensi-kelas.html',
  '/IPIM-MAGHFIRAH/pages/user/rekap-halaqoh.html',
  '/IPIM-MAGHFIRAH/pages/user/rekap-nilai-matkul.html',
  '/IPIM-MAGHFIRAH/pages/user/rekap-nilai-quran.html',
  '/IPIM-MAGHFIRAH/pages/user/rekap.html',
  '/IPIM-MAGHFIRAH/pages/user/sholat.html',
  '/IPIM-MAGHFIRAH/pages/user/silabus.html',
  '/IPIM-MAGHFIRAH/pages/user/ujian-quran.html',
];

// =============================================
// INSTALL - cache semua file saat SW dipasang
// =============================================
self.addEventListener('install', (event) => {
  console.log('✅ SW Installed (v6)');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// =============================================
// ACTIVATE - hapus cache lama
// =============================================
self.addEventListener('activate', (event) => {
  console.log('✅ SW Activated (v6)');
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => {
            console.log('🗑️ Hapus cache lama:', key);
            return caches.delete(key);
          })
      );
    })
  );
  self.clients.claim();
});

// =============================================
// FETCH - strategi: cache dulu, fallback network
// Firebase TIDAK disentuh sama sekali
// =============================================
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // ✅ Bypass semua request Firebase - biarkan langsung ke network
  if (
    url.hostname.includes('firestore') ||
    url.hostname.includes('googleapis') ||
    url.hostname.includes('identitytoolkit') ||
    url.hostname.includes('firebaseauth') ||
    url.hostname.includes('firebasestorage') ||
    url.hostname.includes('firebase') ||
    url.hostname.includes('gstatic')
  ) {
    return; // tidak diintercept sama sekali
  }

  // ✅ Bypass API eksternal (sholat, quran, dll)
  if (
    url.hostname.includes('aladhan.com') ||
    url.hostname.includes('equran.id') ||
    url.hostname.includes('api.')
  ) {
    return;
  }

  // Hanya intercept request dalam scope repo ini
  if (!url.pathname.startsWith('/IPIM-MAGHFIRAH/')) {
    return;
  }

  // Strategi: Cache First → fallback ke Network
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) {
        return cached; // ada di cache, langsung pakai
      }
      // Tidak ada di cache, ambil dari network
      return fetch(event.request).catch(() => {
        // Kalau network juga gagal (offline & tidak di cache)
        console.warn('⚠️ Offline & tidak ada cache untuk:', url.pathname);
      });
    })
  );
});
