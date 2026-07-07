// =============================================
// IPIM Maghfirah - FCM Token Manager
// =============================================

async function setupFCM() {
  try {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      console.log('Izin notifikasi ditolak');
      return false;
    }

    // Daftarkan Service Worker
    const swReg = await navigator.serviceWorker.register('/IPIM-MAGHFIRAH/sw.js');

    // Pakai window.messaging dari firebase-config.js
    const msg = window.messaging || firebase.messaging();

    const token = await msg.getToken({
      vapidKey: 'BE7Ay6FCEtmvjaSb_8JXHBmuGi_YWAKpFfxKYU6xycd5S5CtdioO2lg0idVjTFWrcHHYxrTS6s9GQO_lD7Ce1aI',
      serviceWorkerRegistration: swReg
    });

    console.log('✅ Token FCM:', token);

    // Ambil UID
    const userStr = localStorage.getItem('user');
    let uid = null;
    if (userStr) {
      try { uid = JSON.parse(userStr).uid; } catch (e) { uid = userStr; }
    }
    if (!uid) uid = localStorage.getItem('userUid');
    if (!uid) { console.error('❌ UID tidak ditemukan'); return false; }

    await db.collection('users').doc(uid).update({
      fcmToken: token,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    console.log('✅ Token tersimpan untuk:', uid);
    return true;

  } catch (error) {
    console.error('Gagal setup FCM:', error);
    return false;
  }
}
