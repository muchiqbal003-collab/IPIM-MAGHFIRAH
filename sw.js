// sw.js - Service Worker IPIM Maghfirah (Versi Network First)

const CACHE_NAME = 'ipim-v4';

// Daftar file yang BOLEH di-cache (hanya aset statis)
const STATIC_ASSETS = [
  '/IPIM-MAGHFIRAH/css/style.css',
  '/IPIM-MAGHFIRAH/assets/icons/icon-192.png',
  '/IPIM-MAGHFIRAH/assets/icons/icon-512.png'
];

// Install - Cache aset statis saja
self.addEventListener('install', (event) => {
  console.log('✅ SW Installed (v3)');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('⚠️ Beberapa aset gagal di-cache:', err);
      });
    })
  );
  self.skipWaiting();
});

// Activate - Hapus cache lama
self.addEventListener('activate', (event) => {
  console.log('✅ SW Activated (v3)');
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// Fetch - NETWORK FIRST, jangan cache HTML/JS
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // JANGAN cache request ke Firebase
  if (
    url.hostname.includes('firestore') ||
    url.hostname.includes('googleapis') ||
    url.hostname.includes('identitytoolkit')
  ) {
    return; // Biarkan fetch normal
  }

  // JANGAN cache halaman HTML dan JavaScript (selalu ambil dari network)
  if (
    url.pathname.endsWith('.html') ||
    url.pathname.endsWith('.js') ||
    url.pathname === '/' ||
    url.pathname.includes('/pages/')
  ) {
    // Network only — jangan cache
    event.respondWith(fetch(event.request));
    return;
  }

  // Untuk aset statis (CSS, gambar, font): Cache First
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request).then((response) => {
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, clone);
          });
        }
        return response;
      }).catch(() => {
        // Fallback untuk gambar jika offline
        if (url.pathname.includes('/assets/')) {
          return caches.match('/assets/icons/icon-192.png');
        }
      });
    })
  );
});
