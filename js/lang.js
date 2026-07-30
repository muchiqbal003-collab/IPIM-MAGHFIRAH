// js/lang.js - Kamus Bahasa Dashboard IPIM (Updated)
const LANG = {
  id: {
    // Header
    greeting: 'Assalamu\'alaikum',
    greetingSub: 'Semoga aktivitas hari ini dimudahkan Alloh',
    
    // Shortcut
    quran: 'Al-Qur\'an',
    tilawahBadge: 'Tilawahku',
    hlm: 'hlm',
    dzikirPagi: 'Dzikir Pagi',
    dzikirPetang: 'Dzikir Petang',
    selesai: 'selesai',
    
    // Card Sholat
    rekapSholat: 'Rekap Sholat Berjamaah',
    hariIni: '📅 Hari Ini',
    pekanIni: '🗓️ Pekan Ini',
    berjamaah: 'berjamaah',
    isiAbsensi: 'Isi Absensi Sholat Hari Ini',
    memuatSholat: 'Memuat data sholat...',
    belumAdaSholat: 'Belum ada data sholat.',
    isiSekarang: 'Isi Sekarang',
    
    // Card Ringkasan
    ringkasan: 'Ringkasan',
    mahasiswa: 'Mahasiswa',
    dosen: 'Dosen',
    musyrif: 'Musyrif',
    halaqoh: 'Halaqoh',
    
    // Card Jadwal
    jadwalHariIni: 'Jadwalku Hari Ini',
    libur: 'Tidak ada jadwal (libur)',
    tidakAdaJadwal: 'Tidak ada jadwal mengajar',
    tidakAdaJadwalHariIni: 'Tidak ada jadwal hari ini',
    absensi: 'Absensi',
    
    // Rekap Ketidakhadiran
    tidakHadir: 'Rekap Ketidakhadiran Hari Ini',
    tidakHadirHalaqoh: 'Kehadiran Halaqoh Hari Ini',
    hadir: 'Hadir',
    sakit: 'Sakit',
    izin: 'Izin',
    alfa: 'Alfa',
    jaga: 'Jaga',
    semuaHadir: '✅ Semua hadir hari ini',
    belumAdaData: 'Belum ada data absensi hari ini',
    belumPunyaHalaqoh: 'Anda belum memiliki halaqoh',
    
    // Card Motivasi
    motivasi: 'Motivasi',
    
    // Card Visi Misi
    visi: 'Visi',
    misi: 'Misi',
    visiMisi: 'Visi & Misi',
    
    // Card YouTube
    videoInspirasi: 'Video Inspirasi',
    bukaYoutube: 'Buka di YouTube',
    kunjungiChannel: 'Kunjungi Channel YouTube',
    
    // Bottom Nav
    home: 'Home',
    kalender: 'Kalender',
    menu: 'Menu',
    rekap: 'Rekap',
    profil: 'Profil',
    
    // Sholat mini
    lihatJadwal: 'Lihat Jadwal Sholat',
    memuatJadwal: 'Memuat...',
    jam: 'j',
    menit: 'm',
    
    // Error
    gagalMemuat: 'Gagal memuat data',
    memuat: 'Memuat...',
    dataTidakDitemukan: 'Data tidak ditemukan',
    
    // ═══ PROFIL ═══
    profilSaya: 'Profil Saya',
    akun: 'Akun',
    ubahNama: 'Ubah Nama',
    ubahNamaSub: 'Perbarui nama tampilan',
    ubahPassword: 'Ubah Password',
    ubahPasswordSub: 'Ganti kata sandi akun',
    namaBaru: 'Nama Baru',
    inputNamaPlaceholder: 'Masukkan nama baru',
    passwordBaru: 'Password Baru (min. 6 karakter)',
    inputPasswordPlaceholder: 'Masukkan password baru',
    simpanNama: 'Simpan Nama',
    simpanPassword: 'Simpan Password',
    
    // Bahasa Sistem
    bahasaSistem: 'Bahasa Sistem',
    bahasaSub: 'Pilih bahasa tampilan aplikasi',
    pilihBahasa: 'Pilih Bahasa',
    bahasaIndonesia: '🇮🇩 Bahasa Indonesia',
    bahasaInggris: '🇬🇧 English',
    bahasaArab: '🇸🇦 العربية',
    bahasaDiubah: '✅ Bahasa diubah! Refresh untuk menerapkan.',
    
    // Bantuan & Rating
    bantuanRating: 'Bantuan & Rating',
    hubungiAdmin: 'Hubungi Admin / Call Center',
    hubungiAdminSub: 'Chat WhatsApp atau telepon',
    beriRating: 'Beri Rating',
    beriRatingSub: 'Nilai aplikasi IPIM',
    klikBintang: 'Klik bintang untuk menilai',
    ratingTersimpan: '✅ Terima kasih! Rating tersimpan.',
    pilihRating: 'Pilih rating dulu!',
    
    // Foto Profil
    gantiFoto: 'Ganti Foto',
    hapusFoto: 'Hapus',
    fotoProfil: 'Foto Profil',
    fotoBerhasil: '✅ Foto berhasil disimpan!',
    fotoTerlaluBesar: 'Foto terlalu besar, coba foto lebih kecil',
    fotoDihapus: 'Foto dihapus',
    
    // Logout
    keluar: 'Keluar dari Akun',
    konfirmasiKeluar: 'Apakah Anda yakin ingin keluar?',
    
    // Toast / Notifikasi
    berhasilDisimpan: '✅ Berhasil disimpan!',
    gagalDisimpan: '❌ Gagal disimpan',
    berhasilDihapus: '🗑️ Berhasil dihapus',
    gagalDihapus: '❌ Gagal dihapus',
    dataBerhasilDimuat: 'Data berhasil dimuat',
    namaBerhasil: '✅ Nama berhasil diubah!',
    passwordBerhasil: '✅ Password berhasil diubah!',
    sesiLama: 'Sesi terlalu lama, silakan login ulang',
    
    // Status
    aktif: 'Aktif',
    nonaktif: 'Nonaktif',
    pending: 'Menunggu',
    batal: 'Batal',
  },
  
  en: {
    // Header
    greeting: 'Assalamu\'alaikum',
    greetingSub: 'May your activities today be made easy by Allah',
    
    // Shortcut
    quran: 'Al-Qur\'an',
    tilawahBadge: 'My Tilawah',
    hlm: 'pg',
    dzikirPagi: 'Morning Dhikr',
    dzikirPetang: 'Evening Dhikr',
    selesai: 'done',
    
    // Card Sholat
    rekapSholat: 'Prayer Attendance Recap',
    hariIni: '📅 Today',
    pekanIni: '🗓️ This Week',
    berjamaah: 'congregational',
    isiAbsensi: 'Fill Today\'s Prayer Attendance',
    memuatSholat: 'Loading prayer data...',
    belumAdaSholat: 'No prayer data yet.',
    isiSekarang: 'Fill Now',
    
    // Card Ringkasan
    ringkasan: 'Summary',
    mahasiswa: 'Students',
    dosen: 'Lecturers',
    musyrif: 'Mentors',
    halaqoh: 'Halaqoh',
    
    // Card Jadwal
    jadwalHariIni: 'My Schedule Today',
    libur: 'No schedule (holiday)',
    tidakAdaJadwal: 'No teaching schedule',
    tidakAdaJadwalHariIni: 'No schedule today',
    absensi: 'Attendance',
    
    // Rekap Ketidakhadiran
    tidakHadir: 'Today\'s Absence Recap',
    tidakHadirHalaqoh: 'Halaqoh Attendance Today',
    hadir: 'Present',
    sakit: 'Sick',
    izin: 'Permit',
    alfa: 'Absent',
    jaga: 'Guard',
    semuaHadir: '✅ All present today',
    belumAdaData: 'No attendance data yet today',
    belumPunyaHalaqoh: 'You don\'t have a halaqoh yet',
    
    // Card Motivasi
    motivasi: 'Motivation',
    
    // Card Visi Misi
    visi: 'Vision',
    misi: 'Mission',
    visiMisi: 'Vision & Mission',
    
    // Card YouTube
    videoInspirasi: 'Inspirational Videos',
    bukaYoutube: 'Open on YouTube',
    kunjungiChannel: 'Visit YouTube Channel',
    
    // Bottom Nav
    home: 'Home',
    kalender: 'Calendar',
    menu: 'Menu',
    rekap: 'Recap',
    profil: 'Profile',
    
    // Sholat mini
    lihatJadwal: 'View Prayer Schedule',
    memuatJadwal: 'Loading...',
    jam: 'h',
    menit: 'm',
    
    // Error
    gagalMemuat: 'Failed to load data',
    memuat: 'Loading...',
    dataTidakDitemukan: 'Data not found',
    
    // ═══ PROFIL ═══
    profilSaya: 'My Profile',
    akun: 'Account',
    ubahNama: 'Change Name',
    ubahNamaSub: 'Update display name',
    ubahPassword: 'Change Password',
    ubahPasswordSub: 'Change account password',
    namaBaru: 'New Name',
    inputNamaPlaceholder: 'Enter new name',
    passwordBaru: 'New Password (min. 6 characters)',
    inputPasswordPlaceholder: 'Enter new password',
    simpanNama: 'Save Name',
    simpanPassword: 'Save Password',
    
    // Bahasa Sistem
    bahasaSistem: 'System Language',
    bahasaSub: 'Select app display language',
    pilihBahasa: 'Select Language',
    bahasaIndonesia: '🇮🇩 Bahasa Indonesia',
    bahasaInggris: '🇬🇧 English',
    bahasaArab: '🇸🇦 العربية',
    bahasaDiubah: '✅ Language changed! Refresh to apply.',
    
    // Bantuan & Rating
    bantuanRating: 'Help & Rating',
    hubungiAdmin: 'Contact Admin / Call Center',
    hubungiAdminSub: 'Chat via WhatsApp or call',
    beriRating: 'Rate App',
    beriRatingSub: 'Rate IPIM application',
    klikBintang: 'Tap stars to rate',
    ratingTersimpan: '✅ Thank you! Rating saved.',
    pilihRating: 'Please select a rating first!',
    
    // Foto Profil
    gantiFoto: 'Change Photo',
    hapusFoto: 'Delete',
    fotoProfil: 'Profile Photo',
    fotoBerhasil: '✅ Photo saved successfully!',
    fotoTerlaluBesar: 'Photo too large, try a smaller photo',
    fotoDihapus: 'Photo deleted',
    
    // Logout
    keluar: 'Sign Out',
    konfirmasiKeluar: 'Are you sure you want to sign out?',
    
    // Toast / Notifikasi
    berhasilDisimpan: '✅ Saved successfully!',
    gagalDisimpan: '❌ Failed to save',
    berhasilDihapus: '🗑️ Deleted successfully',
    gagalDihapus: '❌ Failed to delete',
    dataBerhasilDimuat: 'Data loaded successfully',
    namaBerhasil: '✅ Name updated successfully!',
    passwordBerhasil: '✅ Password updated successfully!',
    sesiLama: 'Session expired, please login again',
    
    // Status
    aktif: 'Active',
    nonaktif: 'Inactive',
    pending: 'Pending',
    batal: 'Cancel',
  },
  
  ar: {
    // Header
    greeting: 'السلام عليكم',
    greetingSub: 'نسأل الله أن ييسر أنشطتك اليوم',
    
    // Shortcut
    quran: 'القرآن الكريم',
    tilawahBadge: 'تلاوتي',
    hlm: 'صفحة',
    dzikirPagi: 'أذكار الصباح',
    dzikirPetang: 'أذكار المساء',
    selesai: 'مكتمل',
    
    // Card Sholat
    rekapSholat: 'سجل صلاة الجماعة',
    hariIni: '📅 اليوم',
    pekanIni: '🗓️ هذا الأسبوع',
    berjamaah: 'جماعة',
    isiAbsensi: 'تسجيل حضور الصلاة اليوم',
    memuatSholat: 'جاري تحميل بيانات الصلاة...',
    belumAdaSholat: 'لا توجد بيانات صلاة.',
    isiSekarang: 'سجّل الآن',
    
    // Card Ringkasan
    ringkasan: 'الملخص',
    mahasiswa: 'الطلاب',
    dosen: 'الأساتذة',
    musyrif: 'المشرفون',
    halaqoh: 'الحلقات',
    
    // Card Jadwal
    jadwalHariIni: 'جدولي اليوم',
    libur: 'لا يوجد جدول (إجازة)',
    tidakAdaJadwal: 'لا يوجد جدول تدريس',
    tidakAdaJadwalHariIni: 'لا يوجد جدول اليوم',
    absensi: 'تسجيل الحضور',
    
    // Rekap Ketidakhadiran
    tidakHadir: 'ملخص الغياب اليوم',
    tidakHadirHalaqoh: 'حضور الحلقة اليوم',
    hadir: 'حاضر',
    sakit: 'مريض',
    izin: 'إذن',
    alfa: 'غائب',
    jaga: 'حارس',
    semuaHadir: '✅ الجميع حاضر اليوم',
    belumAdaData: 'لا توجد بيانات حضور اليوم',
    belumPunyaHalaqoh: 'ليس لديك حلقة بعد',
    
    // Card Motivasi
    motivasi: 'كلمات الحكمة',
    
    // Card Visi Misi
    visi: 'الرؤية',
    misi: 'الرسالة',
    visiMisi: 'الرؤية والرسالة',
    
    // Card YouTube
    videoInspirasi: 'فيديو ملهم',
    bukaYoutube: 'افتح في يوتيوب',
    kunjungiChannel: 'زيارة قناة يوتيوب',
    
    // Bottom Nav
    home: 'الرئيسية',
    kalender: 'التقويم',
    menu: 'القائمة',
    rekap: 'التقارير',
    profil: 'الملف',
    
    // Sholat mini
    lihatJadwal: 'عرض جدول الصلاة',
    memuatJadwal: 'جاري التحميل...',
    jam: 'س',
    menit: 'د',
    
    // Error
    gagalMemuat: 'فشل تحميل البيانات',
    memuat: 'جاري التحميل...',
    dataTidakDitemukan: 'البيانات غير موجودة',
    
    // ═══ PROFIL ═══
    profilSaya: 'ملفي الشخصي',
    akun: 'الحساب',
    ubahNama: 'تغيير الاسم',
    ubahNamaSub: 'تحديث اسم العرض',
    ubahPassword: 'تغيير كلمة المرور',
    ubahPasswordSub: 'تغيير كلمة سر الحساب',
    namaBaru: 'الاسم الجديد',
    inputNamaPlaceholder: 'أدخل الاسم الجديد',
    passwordBaru: 'كلمة المرور الجديدة (٦ أحرف على الأقل)',
    inputPasswordPlaceholder: 'أدخل كلمة المرور الجديدة',
    simpanNama: 'حفظ الاسم',
    simpanPassword: 'حفظ كلمة المرور',
    
    // Bahasa Sistem
    bahasaSistem: 'لغة النظام',
    bahasaSub: 'اختر لغة عرض التطبيق',
    pilihBahasa: 'اختر اللغة',
    bahasaIndonesia: '🇮🇩 Bahasa Indonesia',
    bahasaInggris: '🇬🇧 English',
    bahasaArab: '🇸🇦 العربية',
    bahasaDiubah: '✅ تم تغيير اللغة! قم بالتحديث للتطبيق.',
    
    // Bantuan & Rating
    bantuanRating: 'المساعدة والتقييم',
    hubungiAdmin: 'اتصل بالمشرف / مركز الاتصال',
    hubungiAdminSub: 'محادثة واتساب أو اتصال',
    beriRating: 'قيم التطبيق',
    beriRatingSub: 'تقييم تطبيق IPIM',
    klikBintang: 'اضغط على النجوم للتقييم',
    ratingTersimpan: '✅ شكرا لك! تم حفظ التقييم.',
    pilihRating: 'الرجاء اختيار تقييم أولاً!',
    
    // Foto Profil
    gantiFoto: 'تغيير الصورة',
    hapusFoto: 'حذف',
    fotoProfil: 'الصورة الشخصية',
    fotoBerhasil: '✅ تم حفظ الصورة بنجاح!',
    fotoTerlaluBesar: 'الصورة كبيرة جداً، جرب صورة أصغر',
    fotoDihapus: 'تم حذف الصورة',
    
    // Logout
    keluar: 'تسجيل الخروج',
    konfirmasiKeluar: 'هل أنت متأكد من تسجيل الخروج؟',
    
    // Toast / Notifikasi
    berhasilDisimpan: '✅ تم الحفظ بنجاح!',
    gagalDisimpan: '❌ فشل الحفظ',
    berhasilDihapus: '🗑️ تم الحذف بنجاح',
    gagalDihapus: '❌ فشل الحذف',
    dataBerhasilDimuat: 'تم تحميل البيانات بنجاح',
    namaBerhasil: '✅ تم تحديث الاسم بنجاح!',
    passwordBerhasil: '✅ تم تحديث كلمة المرور بنجاح!',
    sesiLama: 'انتهت الجلسة، يرجى تسجيل الدخول مرة أخرى',
    
    // Status
    aktif: 'نشط',
    nonaktif: 'غير نشط',
    pending: 'قيد الانتظار',
    batal: 'إلغاء',
  }
};

// ═══════════════════════════════════════════
// FUNGSI UTAMA
// ═══════════════════════════════════════════

let currentLang = 'id';

function getLang() {
  const saved = localStorage.getItem('appLang');
  if (saved && LANG[saved]) {
    currentLang = saved;
  } else {
    const browserLang = navigator.language?.split('-')[0];
    if (browserLang === 'ar') currentLang = 'ar';
    else if (browserLang === 'en') currentLang = 'en';
    else currentLang = 'id';
    localStorage.setItem('appLang', currentLang);
  }
  return currentLang;
}

function t(key) {
  const lang = getLang();
  return LANG[lang]?.[key] || LANG['id']?.[key] || key;
}

function setLang(lang) {
  if (!LANG[lang]) {
    console.warn('Bahasa "' + lang + '" tidak tersedia');
    return false;
  }
  currentLang = lang;
  localStorage.setItem('appLang', lang);
  applyLang();
  return true;
}

function applyLang() {
  const lang = getLang();
  
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  
  if (lang === 'ar') {
    document.body.style.fontFamily = "'Noto Sans Arabic', 'Plus Jakarta Sans', sans-serif";
  } else {
    document.body.style.fontFamily = "'Plus Jakarta Sans', sans-serif";
  }
  
  document.body.classList.toggle('lang-ar', lang === 'ar');
  document.body.classList.toggle('lang-id', lang === 'id');
  document.body.classList.toggle('lang-en', lang === 'en');
  
  document.querySelectorAll('[data-lang]').forEach(el => {
    const key = el.getAttribute('data-lang');
    el.textContent = t(key);
  });
  
  document.querySelectorAll('[data-lang-placeholder]').forEach(el => {
    const key = el.getAttribute('data-lang-placeholder');
    el.placeholder = t(key);
  });
  
  console.log('🌍 Bahasa:', lang);
}

function applyLangDir() {
  applyLang();
}

function getAvailableLangs() {
  return Object.keys(LANG).map(code => ({
    code: code,
    name: code === 'id' ? 'Indonesia' : code === 'en' ? 'English' : 'العربية'
  }));
}

// Auto init
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', applyLang);
} else {
  applyLang();
}

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { LANG, getLang, t, setLang, applyLang, applyLangDir, getAvailableLangs };
}
