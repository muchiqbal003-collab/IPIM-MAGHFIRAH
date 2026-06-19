// js/auth.js
// Logika Login - IPIM Maghfirah

document.addEventListener('DOMContentLoaded', function() {

  const loginForm = document.getElementById('loginForm');
  const messageBox = document.getElementById('messageBox');
  const loginBtn = document.getElementById('loginBtn');
  const btnText = loginBtn.querySelector('.btn-text');

  function showMessage(text, type) {
    messageBox.textContent = text;
    messageBox.className = 'message-box ' + type;
  }

  function setLoading(loading) {
    if (loading) {
      loginBtn.disabled = true;
      loginBtn.classList.add('loading');
      btnText.textContent = 'Memproses...';
    } else {
      loginBtn.disabled = false;
      loginBtn.classList.remove('loading');
      btnText.textContent = 'Masuk';
    }
  }

  loginForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if (!email || !password) {
      showMessage('Mohon isi email dan kata sandi.', 'error');
      return;
    }

    setLoading(true);
    messageBox.className = 'message-box';

    try {
      // Login Firebase Auth
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      const user = userCredential.user;

      // Ambil data dari Firestore berdasarkan UID
      const userDoc = await db.collection('users').doc(user.uid).get();

      // Jika tidak ditemukan, coba cari berdasarkan email (fallback)
      let userData = userDoc.exists ? userDoc.data() : null;
      
      if (!userData) {
        // Fallback: cari berdasarkan email
        const emailSnap = await db.collection('users').where('email', '==', email).get();
        if (!emailSnap.empty) {
          userData = emailSnap.docs[0].data();
          // Update dokumen dengan UID yang benar
          await db.collection('users').doc(emailSnap.docs[0].id).update({ uid: user.uid });
          // Pindahkan data ke dokumen dengan UID sebagai ID
          await db.collection('users').doc(user.uid).set({ ...userData, uid: user.uid });
          await db.collection('users').doc(emailSnap.docs[0].id).delete();
        }
      }

      if (!userData) {
        showMessage('Akun belum terdaftar di sistem. Hubungi Pusat Data.', 'error');
        await auth.signOut();
        setLoading(false);
        return;
      }

      // Simpan ke localStorage (TERMASUK UID)
      localStorage.setItem('user', JSON.stringify({
        uid: user.uid,
        email: user.email,
        role: userData.role,
        nama: userData.nama || 'Pengguna',
        jabatan: userData.jabatan || '',
        foto: userData.foto || ''
      }));

      showMessage('✅ Login berhasil! Mengalihkan...', 'success');

      // Redirect sesuai role
      setTimeout(() => {
        redirectByRole(userData.role);
      }, 800);

    } catch (error) {
      console.error('Login error:', error);

      let message = 'Login gagal. Silakan coba lagi.';

      switch (error.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          message = 'Email atau kata sandi salah.';
          break;
        case 'auth/invalid-email':
          message = 'Format email tidak valid.';
          break;
        case 'auth/user-disabled':
          message = 'Akun ini telah dinonaktifkan.';
          break;
        case 'auth/too-many-requests':
          message = 'Terlalu banyak percobaan. Silakan coba lagi nanti.';
          break;
        default:
          message = 'Terjadi kesalahan: ' + error.message;
      }

      showMessage(message, 'error');
      setLoading(false);
    }
  });

  // Fungsi redirect berdasarkan role
  function redirectByRole(role) {
    let targetPage = '';

    switch (role) {
      case 'pusat-data':
        targetPage = 'pages/pusat-data/dashboard.html';
        break;
      case 'operator-akademik':
        targetPage = 'pages/operator-akademik/dashboard.html';
        break;
      case 'operator-halaqoh':
        targetPage = 'pages/operator-halaqoh/dashboard.html';
        break;
      case 'operator-bahasa':
        targetPage = 'pages/operator-bahasa/dashboard.html';
        break;
      case 'operator-pengasuhan':
        targetPage = 'pages/operator-pengasuhan/dashboard.html';
        break;
      case 'dosen':
      case 'musyrif':
      case 'dosen-musyrif':
      case 'umum':
        targetPage = 'pages/user/dashboard.html';
        break;
      default:
        targetPage = 'index.html';
    }

    window.location.href = targetPage;
  }

  // Cek jika sudah login
  auth.onAuthStateChanged(function(user) {
    if (user) {
      console.log('✅ User sudah login:', user.email);
    }
  });

});