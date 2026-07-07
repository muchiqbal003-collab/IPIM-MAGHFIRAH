// =============================================
// IPIM Maghfirah - FCM Token Manager
// =============================================

// Minta izin + daftarkan token
async function setupFCM() {
  try {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      console.log('Izin notifikasi ditolak');
      return false;
    }

    // Daftarkan sw dulu
    const swReg = await navigator.serviceWorker.register(
      '/IPIM-MAGHFIRAH/sw.js'
    );

    // Inisialisasi messaging SETELAH sw terdaftar
    const messaging = firebase.messaging();

    const token = await messaging.getToken({
      vapidKey: 'BE7Ay6FCEtmvjaSb_8JXHBmuGi_YWAKpFfxKYU6xycd5S5CtdioO2lg0idVjTFWrcHHYxrTS6s9GQO_lD7Ce1aI',
      serviceWorkerRegistration: swReg
    });

    console.log('✅ Token FCM didapat');

    const uid = localStorage.getItem('userUid');
    if (uid) {
      await db.collection('users').doc(uid).update({
        fcmToken: token,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      console.log('✅ Token tersimpan ke Firestore');
    }
    return true;
  } catch (error) {
    console.error('Gagal setup FCM:', error);
    return false;
  }
}
