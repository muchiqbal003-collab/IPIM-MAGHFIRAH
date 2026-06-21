// sw.js - Service Worker IPIM Maghfirah (Stabil v4)

const CACHE_NAME = 'ipim-v4';

// Install - Jangan cache apapun dulu (biar tidak bentrok)
self.addEventListener('install', (event) => {
  console.log('✅ SW Installed (v4)');
  self.skipWaiting();
});

// Activate - Hapus semua cache lama
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

// Fetch - NETWORK ONLY (TIDAK ADA CACHE)
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // SEMUA request ke Firebase: biarkan lolos (jangan cache)
  if (
    url.hostname.includes('firestore') ||
    url.hostname.includes('googleapis') ||
    url.hostname.includes('identitytoolkit') ||
    url.hostname.includes('firebaseauth')
  ) {
    return; // Tidak di-intercept
  }

  // Untuk SEMUA request lainnya: network only, jangan cache
  event.respondWith(fetch(event.request));
});
