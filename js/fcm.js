// =============================================
// IPIM Maghfirah - FCM Token Manager
// =============================================

let messaging = null;

// Init Firebase Messaging
function initMessaging() {
  try {
    messaging = firebase.messaging();
    return true;
  } catch (e) {
    console.warn('Browser tidak mendukung notifikasi');
    return false;
  }
}

// Minta izin + daftarkan token
async function setupFCM() {
  if (!messaging && !initMessaging()) return false;

  try {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      console.log('Izin notifikasi ditolak');
      return false;
    }

    const token = await messaging.getToken({
      vapidKey: 'BE7Ay6FCEtmvjaSb_8JXHBmuGi_YWAKpFfxKYU6xycd5S5CtdioO2lg0idVjTFWrcHHYxrTS6s9GQO_lD7Ce1aI'
    });

    console.log('✅ Token FCM didapat');

    const uid = localStorage.getItem('userUid');
    if (uid) {
      const db = firebase.firestore();
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
