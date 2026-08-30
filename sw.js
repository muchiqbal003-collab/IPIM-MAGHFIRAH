// =============================================
// IPIM Maghfirah - Service Worker v7
// Cache + Push Notification
// =============================================

// ── IMPORT FIREBASE MESSAGING ──
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

// ── INIT FIREBASE ──
firebase.initializeApp({
  apiKey: "AIzaSyD0UVef3nqiWiG0CtLezxlRKk_bWxq4Fes",
  authDomain: "ipim-7b437.firebaseapp.com",
  projectId: "ipim-7b437",
  storageBucket: "ipim-7b437.firebasestorage.app",
  messagingSenderId: "806725819640",
  appId: "1:806725819640:web:1a9208d7fe8457d4852f0d"
});

const messaging = firebase.messaging();

// ── HANDLE PUSH NOTIFICATION (BACKGROUND) ──
messaging.onBackgroundMessage(function(payload) {
  console.log('📩 Notifikasi background:', payload);

  const title = payload.notification?.title || 'IPIM Maghfirah';
  const options = {
    body: payload.notification?.body || '',
    icon: '/IPIM-MAGHFIRAH/assets/icons/icon-192.png',
    badge: '/IPIM-MAGHFIRAH/assets/icons/icon-192.png',
    tag: payload.data?.type || 'ipim',
    data: payload.data || {},
    requireInteraction: true,
    vibrate: [200, 100, 200]
  };

  self.registration.showNotification(title, options);
});

// ── HANDLE KLIK NOTIFIKASI ──
self.addEventListener('notificationclick', function(event) {
  event.notification.close();

  const data = event.notification.data || {};
  let targetUrl = '/IPIM-MAGHFIRAH/pages/user/dashboard.html';

  if (data.type && data.type.includes('jadwal')) {
    targetUrl = '/IPIM-MAGHFIRAH/pages/user/jadwal-saya.html';
  } else if (data.type === 'reminder_sholat') {
    targetUrl = '/IPIM-MAGHFIRAH/pages/user/sholat.html';
  }

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      for (const client of clientList) {
        if (client.url.includes('/IPIM-MAGHFIRAH/') && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});

// =============================================
// CACHE (sama seperti sebelumnya)
// =============================================

const CACHE_NAME = 'ipim-v15';

const FILES_TO_CACHE = [
  '/IPIM-MAGHFIRAH/',
  '/IPIM-MAGHFIRAH/index.html',
  '/IPIM-MAGHFIRAH/manifest.json',
  '/IPIM-MAGHFIRAH/pages/user/dashboard.html',
  '/IPIM-MAGHFIRAH/pages/user/absensi.html',
  '/IPIM-MAGHFIRAH/pages/user/jadwal-saya.html',
  '/IPIM-MAGHFIRAH/pages/user/sholat.html',
  '/IPIM-MAGHFIRAH/pages/user/profil.html',
  '/IPIM-MAGHFIRAH/pages/user/notifikasi.html',
  '/IPIM-MAGHFIRAH/pages/user/menu-cepat.html',
  '/IPIM-MAGHFIRAH/pages/user/kalender.html',
  '/IPIM-MAGHFIRAH/pages/user/kinerja.html'
];

self.addEventListener('install', function(event) {
  console.log('✅ SW Installed v7');
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  console.log('✅ SW Activated v7');
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(key) { return key !== CACHE_NAME; })
            .map(function(key) { return caches.delete(key); })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  const url = new URL(event.request.url);

  // Bypass Firebase
  if (url.hostname.includes('firebase') || url.hostname.includes('googleapis') || url.hostname.includes('gstatic')) {
    return;
  }

  // Bypass API eksternal
  if (url.hostname.includes('aladhan.com') || url.hostname.includes('equran.id')) {
    return;
  }

  if (!url.pathname.startsWith('/IPIM-MAGHFIRAH/')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(function(cached) {
      return cached || fetch(event.request);
    })
  );
});
