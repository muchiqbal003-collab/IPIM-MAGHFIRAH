// js/firebase-config.js
// Konfigurasi Firebase - IPIM Maghfirah
// JANGAN SHARE FILE INI KE PUBLIK

const firebaseConfig = {
    apiKey: "AIzaSyD0UVef3nqiWiG0CtLezxlRKk_bWxq4Fes",
    authDomain: "ipim-7b437.firebaseapp.com",
    databaseURL: "https://ipim-7b437-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "ipim-7b437",
    storageBucket: "ipim-7b437.firebasestorage.app",
    messagingSenderId: "806725819640",
    appId: "1:806725819640:web:1a9208d7fe8457d4852f0d",
    measurementId: "G-BWW6807D9B"
  };
  
  // Inisialisasi Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Inisialisasi Firestore & Auth
  const db = firebase.firestore();
  const auth = firebase.auth();
  
  console.log("✅ Firebase IPIM siap!");