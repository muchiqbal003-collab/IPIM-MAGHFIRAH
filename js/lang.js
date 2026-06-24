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
    gagalMemuat: 'Gagal memuat',
    memuat: 'Memuat...',
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
    rekapSholat: 'سجل الصلاة الجماعية',
    hariIni: '📅 اليوم',
    pekanIni: '🗓️ هذا الأسبوع',
    berjamaah: 'جماعة',
    isiAbsensi: 'تسجيل حضور الصلاة اليوم',
    memuatSholat: 'جارٍ تحميل بيانات الصلاة...',
    belumAdaSholat: 'لا توجد بيانات صلاة.',
    isiSekarang: 'سجّل الآن',
    // Card Ringkasan
    ringkasan: 'ملخص',
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
    memuatJadwal: 'جارٍ التحميل...',
    jam: 'س',
    menit: 'د',
    // Error
    gagalMemuat: 'فشل التحميل',
    memuat: 'جارٍ التحميل...',
  }
};

function getLang() {
  return localStorage.getItem('appLang') || 'id';
}

function t(key) {
  const lang = getLang();
  return LANG[lang][key] || LANG['id'][key] || key;
}

function applyLangDir() {
  const lang = getLang();
  document.documentElement.lang = lang;
  document.documentElement.dir  = lang === 'ar' ? 'rtl' : 'ltr';
  // Font Arab
  if (lang === 'ar') {
    document.body.style.fontFamily = "'Noto Sans Arabic', 'Plus Jakarta Sans', sans-serif";
  } else {
    document.body.style.fontFamily = "'Plus Jakarta Sans', sans-serif";
  }
}
