// sw.js - Service Worker IPIM Maghfirah (Stabil & PWA)

const CACHE_NAME = 'ipim-v4';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/firebase-config.js',
  '/js/auth.js',
  '/js/app.js',
  '/assets/icons/icon-192.png',
  '/assets/icons/icon-512.png',
  '/manifest.json'
];

// Install - Cache aset statis penting
self.addEventListener('install', (event) => {
  console.log('✅ SW Installed (v4)');
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
  console.log('✅ SW Activated (v4)');
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// Fetch - NETWORK FIRST
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // JANGAN cache request ke Firebase
  if (
    url.hostname.includes('firestore') ||
    url.hostname.includes('googleapis') ||
    url.hostname.includes('identitytoolkit') ||
    url.hostname.includes('firebaseauth')
  ) {
    return; // Biarkan fetch normal (tidak di-cache)
  }

  // JANGAN cache halaman HTML dan JavaScript (selalu ambil dari network)
  if (
    url.pathname.endsWith('.html') ||
    url.pathname.endsWith('.js') ||
    url.pathname === '/' ||
    url.pathname.includes('/pages/')
  ) {
    event.respondWith(
      fetch(event.request)
        .then(response => response)
        .catch(() => {
          // Jika gagal fetch (offline), tampilkan halaman offline atau fallback
          return caches.match('/index.html');
        })
    );
    return;
  }

  // Untuk aset statis: Cache First
  event.respondWith(
    caches.match(event.request).then((cached) => {
      const fetchPromise = fetch(event.request).then((response) => {
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, clone);
          });
        }
        return response;
      }).catch(() => cached);
      
      return cached || fetchPromise;
    })
  );
});
