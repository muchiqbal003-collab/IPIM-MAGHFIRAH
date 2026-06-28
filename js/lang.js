// js/lang.js - Kamus Bahasa Dashboard IPIM
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
    
    // ⭐ TAMBAHAN: Untuk Rekap Ketidakhadiran
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
    
    // ⭐ TAMBAHAN: Untuk Edit Profil
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
    
    // ⭐ TAMBAHAN: Laporan
    laporan: 'Laporan',
    laporBahasa: 'Lapor Bahasa',
    laporBahasaSub: 'Laporkan pelanggaran bahasa',
    laporPengasuhan: 'Lapor Pengasuhan',
    laporPengasuhanSub: 'Laporkan pelanggaran pengasuhan',
    namaMahasiswa: 'Nama Mahasiswa',
    jenisPelanggaran: 'Jenis Pelanggaran',
    deskripsi: 'Deskripsi',
    kirimLaporan: 'Kirim Laporan',
    
    // ⭐ TAMBAHAN: Saran & Bantuan
    bantuanKeluhan: 'Bantuan & Keluhan',
    saranMasukan: 'Saran & Masukan',
    saranMasukanSub: 'Sampaikan saran untuk pengembangan',
    hubungiWA: 'Hubungi via WhatsApp',
    hubungiWASub: 'Klik untuk langsung chat',
    kategoriSaran: 'Kategori',
    pesanSaran: 'Pesan / Saran',
    pesanSaranPlaceholder: 'Tulis saran atau masukan kamu...',
    kirimSaran: 'Kirim Saran',
    
    // ⭐ TAMBAHAN: Pengaturan
    bahasa: 'Bahasa / اللغة',
    bahasaSub: 'Pilih bahasa tampilan aplikasi',
    keluar: 'Keluar dari Akun',
    
    // ⭐ TAMBAHAN: Foto Profil
    gantiFoto: 'Ganti Foto',
    hapusFoto: 'Hapus',
    fotoProfil: 'Foto Profil',
    
    // ⭐ TAMBAHAN: Kategori
    katFitur: 'Fitur Aplikasi',
    katAkademik: 'Akademik',
    katFasilitas: 'Fasilitas',
    katLainnya: 'Lainnya',
    
    // ⭐ TAMBAHAN: Toast / Notifikasi
    berhasilDisimpan: '✅ Berhasil disimpan!',
    gagalDisimpan: '❌ Gagal disimpan',
    berhasilDihapus: '🗑️ Berhasil dihapus',
    gagalDihapus: '❌ Gagal dihapus',
    dataBerhasilDimuat: 'Data berhasil dimuat',
    
    // ⭐ TAMBAHAN: Status
    aktif: 'Aktif',
    nonaktif: 'Nonaktif',
    pending: 'Menunggu',
    selesai: 'Selesai',
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
    
    // Profil
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
    
    // Laporan
    laporan: 'Reports',
    laporBahasa: 'Language Report',
    laporBahasaSub: 'Report language violations',
    laporPengasuhan: 'Mentoring Report',
    laporPengasuhanSub: 'Report mentoring violations',
    namaMahasiswa: 'Student Name',
    jenisPelanggaran: 'Violation Type',
    deskripsi: 'Description',
    kirimLaporan: 'Send Report',
    
    // Saran & Bantuan
    bantuanKeluhan: 'Help & Complaints',
    saranMasukan: 'Suggestions & Feedback',
    saranMasukanSub: 'Share suggestions for development',
    hubungiWA: 'Contact via WhatsApp',
    hubungiWASub: 'Click to chat directly',
    kategoriSaran: 'Category',
    pesanSaran: 'Message / Suggestion',
    pesanSaranPlaceholder: 'Write your suggestion or feedback here...',
    kirimSaran: 'Send Suggestion',
    
    // Pengaturan
    bahasa: 'Language / اللغة',
    bahasaSub: 'Select app display language',
    keluar: 'Logout',
    
    // Foto Profil
    gantiFoto: 'Change Photo',
    hapusFoto: 'Delete',
    fotoProfil: 'Profile Photo',
    
    // Kategori
    katFitur: 'App Features',
    katAkademik: 'Academic',
    katFasilitas: 'Facilities',
    katLainnya: 'Others',
    
    // Toast / Notifikasi
    berhasilDisimpan: '✅ Saved successfully!',
    gagalDisimpan: '❌ Failed to save',
    berhasilDihapus: '🗑️ Deleted successfully',
    gagalDihapus: '❌ Failed to delete',
    dataBerhasilDimuat: 'Data loaded successfully',
    
    // Status
    aktif: 'Active',
    nonaktif: 'Inactive',
    pending: 'Pending',
    selesai: 'Done',
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
    
    // Profil
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
    
    // Laporan
    laporan: 'البلاغات',
    laporBahasa: 'الإبلاغ عن مخالفة لغوية',
    laporBahasaSub: 'رصد مخالفات اللغة',
    laporPengasuhan: 'الإبلاغ عن مخالفة تربوية',
    laporPengasuhanSub: 'رصد مخالفات الرعاية',
    namaMahasiswa: 'اسم الطالب',
    jenisPelanggaran: 'نوع المخالفة',
    deskripsi: 'الوصف',
    kirimLaporan: 'إرسال البلاغ',
    
    // Saran & Bantuan
    bantuanKeluhan: 'المساعدة والشكاوى',
    saranMasukan: 'الاقتراحات والملاحظات',
    saranMasukanSub: 'شاركنا اقتراحاتك للتطوير',
    hubungiWA: 'التواصل عبر واتساب',
    hubungiWASub: 'انقر للمحادثة المباشرة',
    kategoriSaran: 'الفئة',
    pesanSaran: 'الرسالة / الاقتراح',
    pesanSaranPlaceholder: 'اكتب اقتراحك أو ملاحظتك هنا...',
    kirimSaran: 'إرسال الاقتراح',
    
    // Pengaturan
    bahasa: 'اللغة / Bahasa',
    bahasaSub: 'اختر لغة عرض التطبيق',
    keluar: 'تسجيل الخروج',
    
    // Foto Profil
    gantiFoto: 'تغيير الصورة',
    hapusFoto: 'حذف',
    fotoProfil: 'الصورة الشخصية',
    
    // Kategori
    katFitur: 'ميزات التطبيق',
    katAkademik: 'الأكاديمية',
    katFasilitas: 'المرافق',
    katLainnya: 'أخرى',
    
    // Toast / Notifikasi
    berhasilDisimpan: '✅ تم الحفظ بنجاح!',
    gagalDisimpan: '❌ فشل الحفظ',
    berhasilDihapus: '🗑️ تم الحذف بنجاح',
    gagalDihapus: '❌ فشل الحذف',
    dataBerhasilDimuat: 'تم تحميل البيانات بنجاح',
    
    // Status
    aktif: 'نشط',
    nonaktif: 'غير نشط',
    pending: 'قيد الانتظار',
    selesai: 'مكتمل',
    batal: 'إلغاء',
  }
};

// ═══════════════════════════════════════════
// FUNGSI UTAMA
// ═══════════════════════════════════════════

let currentLang = 'id';

/**
 * Mendapatkan bahasa yang aktif
 */
function getLang() {
  const saved = localStorage.getItem('appLang');
  if (saved && LANG[saved]) {
    currentLang = saved;
  } else {
    // Deteksi bahasa browser
    const browserLang = navigator.language?.split('-')[0];
    if (browserLang === 'ar') currentLang = 'ar';
    else if (browserLang === 'en') currentLang = 'en';
    else currentLang = 'id';
    localStorage.setItem('appLang', currentLang);
  }
  return currentLang;
}

/**
 * Menerjemahkan key ke bahasa aktif
 */
function t(key) {
  const lang = getLang();
  // Cari di bahasa aktif, jika tidak ada cari di Indonesia, jika tidak ada return key
  return LANG[lang]?.[key] || LANG['id']?.[key] || key;
}

/**
 * Mengganti bahasa aplikasi
 */
function setLang(lang) {
  if (!LANG[lang]) {
    console.warn('Bahasa "' + lang + '" tidak tersedia');
    return false;
  }
  currentLang = lang;
  localStorage.setItem('appLang', lang);
  applyLang(); // Terapkan perubahan ke UI
  return true;
}

/**
 * Menerapkan bahasa ke seluruh elemen di halaman
 * Fungsi ini menggantikan applyLangDir() yang lebih sederhana
 */
function applyLang() {
  const lang = getLang();
  
  // Set atribut HTML
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  
  // Set font untuk bahasa Arab
  if (lang === 'ar') {
    document.body.style.fontFamily = "'Noto Sans Arabic', 'Plus Jakarta Sans', sans-serif";
  } else {
    document.body.style.fontFamily = "'Plus Jakarta Sans', sans-serif";
  }
  
  // Class untuk styling tambahan
  document.body.classList.toggle('lang-ar', lang === 'ar');
  document.body.classList.toggle('lang-id', lang === 'id');
  document.body.classList.toggle('lang-en', lang === 'en');
  
  // Terjemahkan elemen dengan data-lang attribute
  document.querySelectorAll('[data-lang]').forEach(el => {
    const key = el.getAttribute('data-lang');
    el.textContent = t(key);
  });
  
  // Terjemahkan placeholder dengan data-lang-placeholder
  document.querySelectorAll('[data-lang-placeholder]').forEach(el => {
    const key = el.getAttribute('data-lang-placeholder');
    el.placeholder = t(key);
  });
  
  console.log('🌍 Bahasa diubah ke:', lang);
}

/**
 * Versi sederhana untuk kompatibilitas dengan kode lama
 */
function applyLangDir() {
  applyLang();
}

/**
 * Mendapatkan daftar bahasa yang tersedia
 */
function getAvailableLangs() {
  return Object.keys(LANG).map(code => ({
    code: code,
    name: code === 'id' ? 'Indonesia' : code === 'en' ? 'English' : 'العربية'
  }));
}

// ═══════════════════════════════════════════
// AUTO INIT - Jalankan saat script dimuat
// ═══════════════════════════════════════════

// Terapkan bahasa saat halaman dimuat
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', applyLang);
} else {
  applyLang();
}

// ═══════════════════════════════════════════
// EKSPOR untuk penggunaan di file lain
// ═══════════════════════════════════════════

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { LANG, getLang, t, setLang, applyLang, applyLangDir, getAvailableLangs };
}
