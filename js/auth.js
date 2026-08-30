// js/auth.js
// Logika Login - IPIM Maghfirah
// Multi-Role Support

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
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      const user = userCredential.user;

      const userDoc = await db.collection('users').doc(user.uid).get();
      let userData = userDoc.exists ? userDoc.data() : null;
      
      if (!userData) {
        const emailSnap = await db.collection('users').where('email', '==', email).get();
        if (!emailSnap.empty) {
          userData = emailSnap.docs[0].data();
          await db.collection('users').doc(emailSnap.docs[0].id).update({ uid: user.uid });
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

      try {
        await db.collection('loginLogs').add({
          uid: user.uid,
          nama: userData.nama || email,
          email: email,
          role: userData.role || 'unknown',
          roles: userData.roles || [userData.role || 'unknown'],
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
      } catch(logError) {
        console.warn('⚠️ Gagal simpan login log:', logError.message);
      }

      const defaultRole = userData.role || 'duty-lecturer';
      const roles = userData.roles || [defaultRole];
      const uniqueRoles = [...new Set(roles)];
      
      localStorage.removeItem('roleAktif');

      localStorage.setItem('user', JSON.stringify({
        uid: user.uid,
        email: user.email,
        role: defaultRole,
        roles: uniqueRoles,
        nama: userData.nama || 'Pengguna',
        jabatan: userData.jabatan || '',
        foto: userData.foto || ''
      }));

      showMessage('✅ Login berhasil! Mengalihkan...', 'success');

      setTimeout(() => {
        redirectByRole(uniqueRoles);
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

  function redirectByRole(roles) {
    const uniqueRoles = [...new Set(roles || [])];
    
    if (uniqueRoles.length === 0) {
      window.location.href = 'index.html';
      return;
    }
    
    if (uniqueRoles.length > 1) {
      window.location.href = 'pages/pilih-role.html';
    } else {
      const rolePages = {
        'pusat-data': 'pages/pusat-data/dashboard.html',
        'operator-akademik': 'pages/operator-akademik/dashboard.html',
        'operator-halaqoh': 'pages/operator-halaqoh/dashboard.html',
        'operator-bahasa': 'pages/operator-bahasa/dashboard.html',
        'operator-pengasuhan': 'pages/operator-pengasuhan/dashboard.html',
        'dosen': 'pages/user/dashboard.html',
        'musyrif': 'pages/user/dashboard.html',
        'dosen-musyrif': 'pages/user/dashboard.html',
        'duty-lecturer': 'pages/duty-lecturer/dashboard.html'
      };
      
      window.location.href = rolePages[uniqueRoles[0]] || 'pages/duty-lecturer/dashboard.html';
    }
  }

  auth.onAuthStateChanged(function(user) {
    if (user) {
      console.log('✅ User sudah login:', user.email);
      const storedUser = localStorage.getItem('user');
      if (storedUser && !window.location.pathname.includes('pilih-role.html')) {
        const parsedUser = JSON.parse(storedUser);
        const path = window.location.pathname;
        if (path.endsWith('index.html') || path.endsWith('/')) {
          const roles = parsedUser.roles || [parsedUser.role || 'duty-lecturer'];
          redirectByRole(roles);
        }
      }
    }
  });

});
