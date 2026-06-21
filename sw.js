const CACHE_NAME = 'ipim-v5';

self.addEventListener('install', (event) => {
  console.log('✅ SW Installed (v4)');
  self.skipWaiting();
});

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

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Biarkan semua Firebase lolos tanpa intercept
  if (
    url.hostname.includes('firestore') ||
    url.hostname.includes('googleapis') ||
    url.hostname.includes('identitytoolkit') ||
    url.hostname.includes('firebaseauth') ||
    url.hostname.includes('firebasestorage')
  ) {
    return;
  }

  // Hanya intercept request di dalam scope repo ini
  if (!url.pathname.startsWith('/IPIM-MAGHFIRAH/')) {
    return;
  }

  // Network only untuk semua request lainnya
  event.respondWith(fetch(event.request));
});
