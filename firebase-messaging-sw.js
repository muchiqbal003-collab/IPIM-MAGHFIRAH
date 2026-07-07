// firebase-messaging-sw.js
// Taruh di ROOT repo IPIM-MAGHFIRAH (sejajar dengan sw.js dan index.html)
// File ini WAJIB ada untuk FCM Web Push Notification

importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

// Konfigurasi Firebase — sama dengan firebase-config.js kamu
// Isi sesuai config Firebase project kamu
firebase.initializeApp({
  apiKey           : "GANTI_API_KEY",
  authDomain       : "pesantren-app.firebaseapp.com",
  projectId        : "pesantren-app",
  storageBucket    : "pesantren-app.appspot.com",
  messagingSenderId: "806725819640",
  appId            : "GANTI_APP_ID"
});

const messaging = firebase.messaging();

// Handle notifikasi saat app di background / tertutup
messaging.onBackgroundMessage(payload => {
  console.log('Background message received:', payload);

  const title = payload.notification?.title || 'IPIM Maghfirah';
  const body  = payload.notification?.body  || '';
  const icon  = payload.notification?.icon  || '/IPIM-MAGHFIRAH/assets/icons/icon-192.png';
  const type  = payload.data?.type || '';

  const urlMap = {
    reminder_jadwal       : '/IPIM-MAGHFIRAH/pages/user/jadwal-saya.html',
    reminder_mulai        : '/IPIM-MAGHFIRAH/pages/user/jadwal-saya.html',
    reminder_mulai_now    : '/IPIM-MAGHFIRAH/pages/user/jadwal-saya.html',
    reminder_hampir_selesai: '/IPIM-MAGHFIRAH/pages/user/absensi-kelas.html',
    reminder_selesai      : '/IPIM-MAGHFIRAH/pages/user/absensi-kelas.html',
    reminder_sholat       : '/IPIM-MAGHFIRAH/pages/user/sholat.html',
    pengumuman            : '/IPIM-MAGHFIRAH/pages/user/dashboard.html'
  };
  const clickUrl = urlMap[type] || '/IPIM-MAGHFIRAH/pages/user/dashboard.html';

  self.registration.showNotification(title, {
    body,
    icon,
    badge  : '/IPIM-MAGHFIRAH/assets/icons/icon-72.png',
    data   : { url: clickUrl },
    vibrate: [200, 100, 200],
    actions: type.includes('jadwal') || type.includes('selesai')
      ? [{ action: 'buka', title: 'Buka Aplikasi' }]
      : []
  });
});

// Handle klik notifikasi
self.addEventListener('notificationclick', event => {
  event.notification.close();
  const url = event.notification.data?.url || '/IPIM-MAGHFIRAH/pages/user/dashboard.html';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
      for (const client of clientList) {
        if (client.url.includes('IPIM-MAGHFIRAH') && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) return clients.openWindow('https://muchiqbal003-collab.github.io' + url);
    })
  );
});
