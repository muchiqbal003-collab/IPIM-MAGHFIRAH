// Data Dzikir Pagi & Petang
// Sumber: Hisnul Muslim (Sa'id bin Ali bin Wahf Al-Qahtani)
// waktu: "pagi" | "petang" | "keduanya"

const DZIKIR_DATA = {
  pagi: [
    {
      id: 1,
      judul: "Ayat Kursi",
      arab: "اللَّهُ لاَ إِلَهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ لاَ تَأْخُذُهُ سِنَةٌ وَلاَ نَوْمٌ لَّهُ مَا فِي السَّمَوَاتِ وَمَا فِي الأَرْضِ مَن ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلاَّ بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلاَ يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلاَّ بِمَا شَاء وَسِعَ كُرْسِيُّهُ السَّمَوَاتِ وَالْأَرْضَ وَلاَ يَؤُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ",
      latin: "Allahu laa ilaaha illaa huwal hayyul qayyuum, laa ta'khudzuhuu sinatuw wa laa nauum, lahuu maa fis samaawaati wa maa fil ardh, man dzal ladzii yasyfa'u 'indahuu illaa bi idznih, ya'lamu maa baina aidiihim wa maa khalfahum, wa laa yuhiithuuna bisyai'im min 'ilmihii illaa bimaa syaa, wasi'a kursiyyuhus samaawaati wal ardh, wa laa ya'uuduhuu hifzhuhumaa wa huwal 'aliyyul 'azhiim",
      arti: "Allah, tidak ada Tuhan (yang berhak disembah) melainkan Dia, Yang Hidup kekal lagi terus menerus mengurus (makhluk-Nya), tidak mengantuk dan tidak tidur. Kepunyaan-Nya apa yang di langit dan di bumi. Tiada yang dapat memberi syafaat di sisi-Nya tanpa izin-Nya. Dia mengetahui apa yang di hadapan dan di belakang mereka. Mereka tidak mengetahui apa-apa dari ilmu Allah melainkan apa yang dikehendaki-Nya. Kursi-Nya meliputi langit dan bumi. Dan Dia tidak merasa berat memelihara keduanya, dan Dia Maha Tinggi lagi Maha Besar.",
      ulang: 1,
      catatan: "QS. Al-Baqarah: 255"
    },
    {
      id: 2,
      judul: "Tiga Surat Perlindungan (Al-Ikhlas, Al-Falaq, An-Nas)",
      arab: "قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُن لَّهُ كُفُواً أَحَدٌ. قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝ مِن شَرِّ مَا خَلَقَ ۝ وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ ۝ وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ۝ وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ. قُلْ أَعُوذُ بِرَبِّ النَّاسِ ۝ مَلِكِ النَّاسِ ۝ إِلَهِ النَّاسِ ۝ مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ۝ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ۝ مِنَ الْجِنَّةِ وَ النَّاسِ",
      latin: "Qul huwallahu ahad, allahush shamad, lam yalid wa lam yuulad, wa lam yakul lahuu kufuwan ahad. Qul a'uudzu birabbil falaq, min syarri maa khalaq, wa min syarri ghaasiqin idzaa waqab, wa min syarrin naffaatsaati fil 'uqad, wa min syarri haasidin idzaa hasad. Qul a'uudzu birabbin naas, malikin naas, ilaahin naas, min syarril waswaasil khannaas, alladzii yuwaswisu fii shuduurin naas, minal jinnati wan naas",
      arti: "Katakanlah: Dialah Allah, Yang Maha Esa. Allah tempat meminta segala sesuatu. Dia tidak beranak dan tiada pula diperanakkan. Tidak ada sesuatu yang setara dengan Dia. (Al-Ikhlas) — Katakanlah: Aku berlindung kepada Tuhan Yang Menguasai subuh, dari kejahatan makhluk-Nya, dari kejahatan malam apabila gelap gulita, dari kejahatan wanita tukang sihir yang menghembus buhul-buhul, dari kejahatan pendengki bila ia dengki. (Al-Falaq) — Katakanlah: Aku berlindung kepada Tuhan manusia, Raja manusia, Sembahan manusia, dari kejahatan syaitan yang membisikkan, yang membisikkan ke dalam dada manusia, dari golongan jin dan manusia. (An-Nas)",
      ulang: 3,
      catatan: "Dibaca 3x"
    },
    {
      id: 3,
      judul: "Doa Pagi (Petang Diganti Sesuai Waktu)",
      arab: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَهَ إلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذَا الْيَوْمِ وَخَيرَ مَا بَعْدَهُ، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذَا الْيَوْمِ وَشَرِّ مَا بَعْدَهُ، رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ، رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ",
      latin: "Ashbahnaa wa ashbahal mulku lillaah, walhamdu lillaah, laa ilaaha illallaahu wahdahu laa syariika lah, lahul mulku wa lahul hamdu wa huwa 'alaa kulli syai'in qadiir, rabbi as-aluka khaira maa fii haadzal yaum wa khaira maa ba'dah, wa a'uudzu bika min syarri maa fii haadzal yaum wa syarri maa ba'dah, rabbi a'uudzu bika minal kasali wa suu'il kibar, rabbi a'uudzu bika min 'adzaabin fin naari wa 'adzaabin fil qabr",
      arti: "Kami memasuki waktu pagi dan kerajaan hanya milik Allah, segala puji bagi Allah, tidak ada Tuhan selain Allah Yang Maha Esa, tidak ada sekutu bagi-Nya, bagi-Nya kerajaan dan bagi-Nya segala puji, Dia Maha berkuasa atas segala sesuatu. Wahai Tuhanku, aku memohon kepada-Mu kebaikan hari ini dan kebaikan setelahnya, aku berlindung kepada-Mu dari kejahatan hari ini dan kejahatan setelahnya. Wahai Tuhanku, aku berlindung kepada-Mu dari kemalasan dan kejelekan masa tua. Wahai Tuhanku, aku berlindung kepada-Mu dari siksa neraka dan siksa kubur.",
      ulang: 1
    },
    {
      id: 4,
      judul: "Doa Hidup dan Mati Karena Allah",
      arab: "اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ",
      latin: "Allaahumma bika ashbahnaa, wa bika amsainaa, wa bika nahyaa, wa bika namuutu wa ilaikan nusyuur",
      arti: "Ya Allah, dengan rahmat-Mu kami memasuki waktu pagi, dan dengan rahmat-Mu kami memasuki waktu sore, dengan rahmat-Mu kami hidup dan dengan kehendak-Mu kami mati. Dan kepada-Mu kami akan kembali.",
      ulang: 1
    },
    {
      id: 5,
      judul: "Doa Sayyidul Istighfar",
      arab: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلاَّ أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لاَ يَغْفِرُ الذُّنوبَ إِلاَّ أَنْتَ",
      latin: "Allaahumma anta rabbii laa ilaaha illaa anta, khalaqtanii wa ana 'abduka, wa ana 'alaa 'ahdika wa wa'dika mas tatha'tu, a'uudzu bika min syarri maa shana'tu, abuu'u laka bini'matika 'alayya, wa abuu'u bidzanbii faghfir lii fa innahu laa yaghfirudz dzunuuba illaa anta",
      arti: "Ya Allah, Engkau adalah Tuhanku, tidak ada Tuhan selain Engkau. Engkau telah menciptakanku dan aku adalah hamba-Mu. Aku berada di atas perjanjian dan janji-Mu semampuku. Aku berlindung kepada-Mu dari kejahatan yang telah aku perbuat. Aku mengakui nikmat-Mu kepadaku dan aku mengakui dosaku, maka ampunilah aku, sesungguhnya tidak ada yang dapat mengampuni dosa kecuali Engkau.",
      ulang: 1,
      catatan: "Barangsiapa membacanya di pagi hari dengan penuh yakin lalu meninggal pada hari itu, ia masuk surga"
    },
    {
      id: 6,
      judul: "Doa Bersaksi atas Keesaan Allah",
      arab: "اللَّهُمَّ إِنِّي أَصْبَحْتُ أُشْهِدُكَ، وَأُشْهِدُ حَمَلَةَ عَرْشِكَ، وَمَلاَئِكَتِكَ، وَجَمِيعَ خَلْقِكَ، أَنَّكَ أَنْتَ اللَّهُ لَا إِلَهَ إِلاَّ أَنْتَ وَحْدَكَ لاَ شَرِيكَ لَكَ، وَأَنَّ مُحَمَّداً عَبْدُكَ وَرَسُولُكَ",
      latin: "Allaahumma innii ashbahtu ushhiduka, wa ushhidu hamalata 'arsyika, wa malaa-ikataka, wa jamii'a khalqika, annaka antallaahu laa ilaaha illaa anta wahdaka laa syariika laka, wa anna muhammadan 'abduka wa rasuuluka",
      arti: "Ya Allah, sesungguhnya aku memasuki waktu pagi ini dengan mempersaksikan-Mu, mempersaksikan para malaikat pembawa 'Arsy-Mu, para malaikat-Mu, dan seluruh makhluk-Mu, bahwa Engkau adalah Allah, tidak ada Tuhan selain Engkau Yang Maha Esa, tidak ada sekutu bagi-Mu, dan bahwa Muhammad adalah hamba dan Rasul-Mu.",
      ulang: 4
    },
    {
      id: 7,
      judul: "Doa Mengakui Nikmat Allah",
      arab: "اللَّهُمَّ مَا أَصْبَحَ بِي مِنْ نِعْمَةٍ أَوْ بِأَحَدٍ مِنْ خَلْقِكَ فَمِنْكَ وَحْدَكَ لاَ شَرِيكَ لَكَ، فَلَكَ الْحَمْدُ وَلَكَ الشُّكْرُ",
      latin: "Allaahumma maa ashbaha bii min ni'matin au bi ahadin min khalqika faminka wahdaka laa syariika laka, falakal hamdu wa lakasy syukru",
      arti: "Ya Allah, nikmat apa saja yang aku atau salah seorang dari makhluk-Mu peroleh pada pagi ini adalah dari-Mu semata, tidak ada sekutu bagi-Mu, maka bagi-Mu segala puji dan bagi-Mu segala syukur.",
      ulang: 1
    },
    {
      id: 8,
      judul: "Doa Memohon Keselamatan",
      arab: "اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لاَ إِلَهَ إِلاَّ أَنْتَ. اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكُفْرِ، وَالفَقْرِ، وَأَعُوذُ بِكَ مِنْ عَذَابِ القَبْرِ، لاَ إِلَهَ إِلاَّ أَنْتَ",
      latin: "Allaahumma 'aafinii fii badanii, allaahumma 'aafinii fii sam'ii, allaahumma 'aafinii fii basharii, laa ilaaha illaa anta. Allaahumma innii a'uudzu bika minal kufri, wal faqri, wa a'uudzu bika min 'adzaabil qabri, laa ilaaha illaa anta",
      arti: "Ya Allah, selamatkanlah badanku, selamatkanlah pendengaranku, selamatkanlah penglihatanku, tidak ada Tuhan selain Engkau. Ya Allah, aku berlindung kepada-Mu dari kekufuran dan kefakiran, dan aku berlindung kepada-Mu dari siksa kubur, tidak ada Tuhan selain Engkau.",
      ulang: 3
    },
    {
      id: 9,
      judul: "Doa Hasbiyallah",
      arab: "حَسْبِيَ اللَّهُ لاَ إِلَهَ إِلاَّ هُوَ عَلَيهِ تَوَكَّلتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ",
      latin: "Hasbiyallaahu laa ilaaha illaa huwa 'alaihi tawakkaltu wa huwa rabbul 'arsyil 'azhiim",
      arti: "Cukuplah Allah bagiku, tidak ada Tuhan selain Dia, hanya kepada-Nya aku bertawakal, dan Dia adalah Tuhan yang memiliki 'Arsy yang agung.",
      ulang: 7
    },
    {
      id: 10,
      judul: "Doa Memohon Ampunan dan Keselamatan",
      arab: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالآخِرَةِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي، وَمَالِي، اللَّهُمَّ اسْتُرْ عَوْرَاتِي، وَآمِنْ رَوْعَاتِي، اللَّهُمَّ احْفَظْنِي مِنْ بَينِ يَدَيَّ، وَمِنْ خَلْفِي، وَعَنْ يَمِينِي، وَعَنْ شِمَالِي، وَمِنْ فَوْقِي، وَأَعُوذُ بِعَظَمَتِكَ أَنْ أُغْتَالَ مِنْ تَحْتِي",
      latin: "Allaahumma innii as-alukal 'afwa wal 'aafiyata fid dunyaa wal aakhirah, allaahumma innii as-alukal 'afwa wal 'aafiyata fii diinii wa dunyaaya wa ahlii wa maalii, allaahummastur 'auraatii, wa aamin rau'aatii, allaahummahfazhnii min baini yadayya, wa min khalfii, wa 'an yamiinii, wa 'an syimaalii, wa min fauqii, wa a'uudzu bi'azhamatika an ughtaala min tahtii",
      arti: "Ya Allah, sesungguhnya aku memohon kepada-Mu ampunan dan keselamatan di dunia dan akhirat. Ya Allah, sesungguhnya aku memohon kepada-Mu ampunan dan keselamatan dalam agamaku, duniaku, keluargaku, dan hartaku. Ya Allah, tutupilah auratku (kekuranganku) dan amankanlah aku dari ketakutan. Ya Allah, jagalah aku dari arah depan, belakang, kanan, kiri, dan atasku. Aku berlindung dengan keagungan-Mu dari ditimpa keburukan dari arah bawahku.",
      ulang: 1
    },
    {
      id: 11,
      judul: "Doa Berlindung dari Keburukan Diri",
      arab: "اللَّهُمَّ عَالِمَ الغَيْبِ وَالشَّهَادَةِ فَاطِرَ السَّمَوَاتِ وَالْأَرْضِ، رَبَّ كُلِّ شَيْءٍ وَمَلِيكَهُ، أَشْهَدُ أَنْ لاَ إِلَهَ إِلاَّ أَنْتَ، أَعُوذُ بِكَ مِنْ شَرِّ نَفْسِي، وَمِنْ شَرِّ الشَّيْطانِ وَشَرَكِهِ، وَأَنْ أَقْتَرِفَ عَلَى نَفْسِي سُوءاً، أَوْ أَجُرَّهُ إِلَى مُسْلِمٍ",
      latin: "Allaahumma 'aalimal ghaibi was syahaadati faathiras samaawaati wal ardhi, rabba kulli syai-in wa maliikahu, asyhadu allaa ilaaha illaa anta, a'uudzu bika min syarri nafsii, wa min syarrisy syaithaani wa syarakihi, wa an aqtarifa 'alaa nafsii suu-an, au ajurrahuu ilaa muslim",
      arti: "Ya Allah, Yang Mengetahui yang gaib dan yang nyata, Pencipta langit dan bumi, Tuhan dan Penguasa segala sesuatu, aku bersaksi tidak ada Tuhan selain Engkau. Aku berlindung kepada-Mu dari kejahatan diriku, dari kejahatan syaitan dan sekutu-sekutunya, dan dari melakukan kejahatan terhadap diriku sendiri atau menyeretnya kepada seorang muslim.",
      ulang: 1
    },
    {
      id: 12,
      judul: "Doa Perlindungan dengan Nama Allah",
      arab: "بِسْمِ اللَّهِ الَّذِي لاَ يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلاَ فِي السّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
      latin: "Bismillaahil ladzii laa yadhurru ma'asmihii syai-un fil ardhi wa laa fis samaa-i wa huwas samii'ul 'aliim",
      arti: "Dengan nama Allah yang tidak ada sesuatu pun di bumi dan di langit yang dapat membahayakan bersama nama-Nya, dan Dia Maha Mendengar lagi Maha Mengetahui.",
      ulang: 3
    },
    {
      id: 13,
      judul: "Doa Ridha terhadap Allah, Islam, dan Nabi Muhammad",
      arab: "رَضِيتُ بِاللَّهِ رَبَّاً، وَبِالْإِسْلاَمِ دِيناً، وَبِمُحَمَّدٍ صلى الله عليه وسلم نَبِيّاً",
      latin: "Radhiitu billaahi rabbaa, wa bil islaami diinaa, wa bi muhammadin shallallaahu 'alaihi wa sallama nabiyyaa",
      arti: "Aku ridha Allah sebagai Tuhanku, Islam sebagai agamaku, dan Muhammad shallallahu 'alaihi wasallam sebagai Nabiku.",
      ulang: 3
    },
    {
      id: 14,
      judul: "Doa Memohon Pertolongan",
      arab: "يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغيثُ أَصْلِحْ لِي شَأْنِيَ كُلَّهُ وَلاَ تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ",
      latin: "Yaa hayyu yaa qayyuumu birahmatika astaghiitsu ashlih lii sya'nii kullahu wa laa takilnii ilaa nafsii tharfata 'ain",
      arti: "Wahai Yang Maha Hidup, wahai Yang Maha Berdiri Sendiri (mengurus semua makhluk), dengan rahmat-Mu aku memohon pertolongan, perbaikilah seluruh urusanku dan janganlah Engkau biarkan aku bergantung pada diriku sendiri sekejap mata pun.",
      ulang: 1
    },
    {
      id: 15,
      judul: "Doa Memohon Kebaikan Hari",
      arab: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ رَبِّ الْعَالَمِينَ، اللَّهُـمَّ إِنِّي أَسْأَلُكَ خَيْرَ هَذَا الْيَوْمِ: فَتْحَهُ، وَنَصْرَهُ، وَنورَهُ، وَبَرَكَتَهُ، وَهُدَاهُ، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِيهِ وَشَرِّ مَا بَعْدَهُ",
      latin: "Ashbahnaa wa ashbahal mulku lillaahi rabbil 'aalamiin, allaahumma innii as-aluka khaira haadzal yaum: fathahu, wa nashrahu, wa nuurahu, wa barakatahu, wa hudaahu, wa a'uudzu bika min syarri maa fiihi wa syarri maa ba'dah",
      arti: "Kami memasuki waktu pagi dan kerajaan hanya milik Allah Tuhan semesta alam. Ya Allah, sesungguhnya aku memohon kepada-Mu kebaikan hari ini: kemenangannya, pertolongannya, cahayanya, berkahnya, dan petunjuknya, dan aku berlindung kepada-Mu dari kejahatan hari ini dan kejahatan setelahnya.",
      ulang: 1
    },
    {
      id: 16,
      judul: "Doa Berada di Atas Fitrah Islam",
      arab: "أَصْبَحْنا عَلَى فِطْرَةِ الْإِسْلاَمِ، وَعَلَى كَلِمَةِ الْإِخْلاَصِ، وَعَلَى دِينِ نَبِيِّنَا مُحَمَّدٍ صلى الله عليه وسلم، وَعَلَى مِلَّةِ أَبِينَا إِبْرَاهِيمَ، حَنِيفاً مُسْلِماً وَمَا كَانَ مِنَ الْمُشرِكِينَ",
      latin: "Ashbahnaa 'alaa fithratil islaami, wa 'alaa kalimatil ikhlaashi, wa 'alaa diini nabiyyinaa muhammadin shallallaahu 'alaihi wa sallama, wa 'alaa millati abiinaa ibraahiima, haniifan musliman wa maa kaana minal musyrikiin",
      arti: "Kami memasuki waktu pagi di atas fitrah Islam, kalimat ikhlas, agama Nabi kami Muhammad shallallahu 'alaihi wasallam, dan di atas agama bapak kami Ibrahim, yang berserah diri dengan lurus, dan beliau tidak termasuk orang-orang yang musyrik.",
      ulang: 1
    },
    {
      id: 17,
      judul: "Tasbih: Subhanallahi wa Bihamdihi",
      arab: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
      latin: "Subhaanallaahi wa bihamdihi",
      arti: "Maha Suci Allah dan segala puji bagi-Nya.",
      ulang: 100,
      catatan: "Barangsiapa membacanya 100x, akan diampuni dosa-dosanya"
    },
    {
      id: 18,
      judul: "Tahlil: La ilaha illallah",
      arab: "لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
      latin: "Laa ilaaha illallaahu wahdahu laa syariika lahu, lahul mulku wa lahul hamdu, wa huwa 'alaa kulli syai-in qadiir",
      arti: "Tidak ada Tuhan selain Allah Yang Maha Esa, tidak ada sekutu bagi-Nya, bagi-Nya kerajaan dan bagi-Nya segala puji, dan Dia Maha Berkuasa atas segala sesuatu.",
      ulang: 10,
      catatan: "10x, atau 1x saat malas. Setara membebaskan 4 hamba dari keturunan Ismail"
    },
    {
      id: 19,
      judul: "Tahlil Pagi (Pahala Besar)",
      arab: "لاَ إِلَهَ إِلاَّ اللَّهُ، وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
      latin: "Laa ilaaha illallaahu, wahdahu laa syariika lahu, lahul mulku wa lahul hamdu wa huwa 'alaa kulli syai-in qadiir",
      arti: "Tidak ada Tuhan selain Allah Yang Maha Esa, tidak ada sekutu bagi-Nya, bagi-Nya kerajaan dan bagi-Nya segala puji, dan Dia Maha Berkuasa atas segala sesuatu.",
      ulang: 100,
      catatan: "100x di waktu pagi, pahalanya seperti memerdekakan 10 hamba dan dihapus 100 kesalahan"
    },
    {
      id: 20,
      judul: "Tasbih Lengkap",
      arab: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ: عَدَدَ خَلْقِهِ، وَرِضَا نَفْسِهِ، وَزِنَةَ عَرْشِهِ، وَمِدَادَ كَلِمَاتِهِ",
      latin: "Subhaanallaahi wa bihamdihi: 'adada khalqihi, wa ridhaa nafsihi, wa zinata 'arsyihi, wa midaada kalimaatihi",
      arti: "Maha Suci Allah dan segala puji bagi-Nya, sebanyak bilangan makhluk-Nya, sesuai keridhaan-Nya, seberat timbangan 'Arsy-Nya, dan sebanyak tinta (yang menulis) kalimat-kalimat-Nya.",
      ulang: 3
    },
    {
      id: 21,
      judul: "Doa Memohon Ilmu dan Rezeki",
      arab: "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْماً نَافِعاً، وَرِزْقاً طَيِّباً، وَعَمَلاً مُتَقَبَّلاً",
      latin: "Allaahumma innii as-aluka 'ilman naafi'an, wa rizqan thayyiban, wa 'amalan mutaqabbalan",
      arti: "Ya Allah, sesungguhnya aku memohon kepada-Mu ilmu yang bermanfaat, rezeki yang baik, dan amal yang diterima.",
      ulang: 1
    },
    {
      id: 22,
      judul: "Istighfar",
      arab: "أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ",
      latin: "Astaghfirullaaha wa atuubu ilaih",
      arti: "Aku memohon ampun kepada Allah dan bertaubat kepada-Nya.",
      ulang: 100,
      catatan: "Dibaca 100x sehari"
    },
    {
      id: 23,
      judul: "Shalawat Nabi",
      arab: "اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبَيِّنَا مُحَمَّدٍ",
      latin: "Allaahumma shalli wa sallim 'alaa nabiyyinaa muhammad",
      arti: "Ya Allah, limpahkanlah shalawat dan salam kepada Nabi kami, Muhammad.",
      ulang: 10
    }
  ],

  petang: [
    {
      id: 101,
      judul: "Ayat Kursi",
      arab: "اللَّهُ لاَ إِلَهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ لاَ تَأْخُذُهُ سِنَةٌ وَلاَ نَوْمٌ لَّهُ مَا فِي السَّمَوَاتِ وَمَا فِي الأَرْضِ مَن ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلاَّ بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلاَ يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلاَّ بِمَا شَاء وَسِعَ كُرْسِيُّهُ السَّمَوَاتِ وَالْأَرْضَ وَلاَ يَؤُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ",
      latin: "Allahu laa ilaaha illaa huwal hayyul qayyuum, laa ta'khudzuhuu sinatuw wa laa nauum, lahuu maa fis samaawaati wa maa fil ardh, man dzal ladzii yasyfa'u 'indahuu illaa bi idznih, ya'lamu maa baina aidiihim wa maa khalfahum, wa laa yuhiithuuna bisyai'im min 'ilmihii illaa bimaa syaa, wasi'a kursiyyuhus samaawaati wal ardh, wa laa ya'uuduhuu hifzhuhumaa wa huwal 'aliyyul 'azhiim",
      arti: "Allah, tidak ada Tuhan (yang berhak disembah) melainkan Dia, Yang Hidup kekal lagi terus menerus mengurus (makhluk-Nya), tidak mengantuk dan tidak tidur. Kepunyaan-Nya apa yang di langit dan di bumi. Tiada yang dapat memberi syafaat di sisi-Nya tanpa izin-Nya. Dia mengetahui apa yang di hadapan dan di belakang mereka. Mereka tidak mengetahui apa-apa dari ilmu Allah melainkan apa yang dikehendaki-Nya. Kursi-Nya meliputi langit dan bumi. Dan Dia tidak merasa berat memelihara keduanya, dan Dia Maha Tinggi lagi Maha Besar.",
      ulang: 1,
      catatan: "QS. Al-Baqarah: 255"
    },
    {
      id: 102,
      judul: "Tiga Surat Perlindungan (Al-Ikhlas, Al-Falaq, An-Nas)",
      arab: "قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُن لَّهُ كُفُواً أَحَدٌ. قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝ مِن شَرِّ مَا خَلَقَ ۝ وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ ۝ وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ۝ وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ. قُلْ أَعُوذُ بِرَبِّ النَّاسِ ۝ مَلِكِ النَّاسِ ۝ إِلَهِ النَّاسِ ۝ مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ۝ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ۝ مِنَ الْجِنَّةِ وَ النَّاسِ",
      latin: "Qul huwallahu ahad, allahush shamad, lam yalid wa lam yuulad, wa lam yakul lahuu kufuwan ahad. Qul a'uudzu birabbil falaq, min syarri maa khalaq, wa min syarri ghaasiqin idzaa waqab, wa min syarrin naffaatsaati fil 'uqad, wa min syarri haasidin idzaa hasad. Qul a'uudzu birabbin naas, malikin naas, ilaahin naas, min syarril waswaasil khannaas, alladzii yuwaswisu fii shuduurin naas, minal jinnati wan naas",
      arti: "Katakanlah: Dialah Allah, Yang Maha Esa. Allah tempat meminta segala sesuatu. Dia tidak beranak dan tiada pula diperanakkan. Tidak ada sesuatu yang setara dengan Dia. (Al-Ikhlas) — Katakanlah: Aku berlindung kepada Tuhan Yang Menguasai subuh, dari kejahatan makhluk-Nya, dari kejahatan malam apabila gelap gulita, dari kejahatan wanita tukang sihir yang menghembus buhul-buhul, dari kejahatan pendengki bila ia dengki. (Al-Falaq) — Katakanlah: Aku berlindung kepada Tuhan manusia, Raja manusia, Sembahan manusia, dari kejahatan syaitan yang membisikkan, yang membisikkan ke dalam dada manusia, dari golongan jin dan manusia. (An-Nas)",
      ulang: 3,
      catatan: "Dibaca 3x"
    },
    {
      id: 103,
      judul: "Doa Petang",
      arab: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَهَ إلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذِهِ اللَّيْلَةِ وَخَيرَ مَا بَعْدَهَا، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذِهِ اللَّيْلَةِ وَشَرِّ مَا بَعْدَهَا، رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ، رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ",
      latin: "Amsainaa wa amsal mulku lillaah, walhamdu lillaah, laa ilaaha illallaahu wahdahu laa syariika lah, lahul mulku wa lahul hamdu wa huwa 'alaa kulli syai'in qadiir, rabbi as-aluka khaira maa fii haadzihil lailati wa khaira maa ba'dahaa, wa a'uudzu bika min syarri maa fii haadzihil lailati wa syarri maa ba'dahaa, rabbi a'uudzu bika minal kasali wa suu'il kibar, rabbi a'uudzu bika min 'adzaabin fin naari wa 'adzaabin fil qabr",
      arti: "Kami memasuki waktu sore dan kerajaan hanya milik Allah, segala puji bagi Allah, tidak ada Tuhan selain Allah Yang Maha Esa, tidak ada sekutu bagi-Nya, bagi-Nya kerajaan dan bagi-Nya segala puji, Dia Maha berkuasa atas segala sesuatu. Wahai Tuhanku, aku memohon kepada-Mu kebaikan malam ini dan kebaikan setelahnya, aku berlindung kepada-Mu dari kejahatan malam ini dan kejahatan setelahnya. Wahai Tuhanku, aku berlindung kepada-Mu dari kemalasan dan kejelekan masa tua. Wahai Tuhanku, aku berlindung kepada-Mu dari siksa neraka dan siksa kubur.",
      ulang: 1
    },
    {
      id: 104,
      judul: "Doa Hidup dan Mati Karena Allah",
      arab: "اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ وَإِلَيْكَ المَصِيرُ",
      latin: "Allaahumma bika amsainaa, wa bika ashbahnaa, wa bika nahyaa, wa bika namuutu wa ilaikal mashiir",
      arti: "Ya Allah, dengan rahmat-Mu kami memasuki waktu sore, dan dengan rahmat-Mu kami memasuki waktu pagi, dengan rahmat-Mu kami hidup dan dengan kehendak-Mu kami mati. Dan kepada-Mu kami akan kembali.",
      ulang: 1
    },
    {
      id: 105,
      judul: "Doa Sayyidul Istighfar",
      arab: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلاَّ أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لاَ يَغْفِرُ الذُّنوبَ إِلاَّ أَنْتَ",
      latin: "Allaahumma anta rabbii laa ilaaha illaa anta, khalaqtanii wa ana 'abduka, wa ana 'alaa 'ahdika wa wa'dika mas tatha'tu, a'uudzu bika min syarri maa shana'tu, abuu'u laka bini'matika 'alayya, wa abuu'u bidzanbii faghfir lii fa innahu laa yaghfirudz dzunuuba illaa anta",
      arti: "Ya Allah, Engkau adalah Tuhanku, tidak ada Tuhan selain Engkau. Engkau telah menciptakanku dan aku adalah hamba-Mu. Aku berada di atas perjanjian dan janji-Mu semampuku. Aku berlindung kepada-Mu dari kejahatan yang telah aku perbuat. Aku mengakui nikmat-Mu kepadaku dan aku mengakui dosaku, maka ampunilah aku, sesungguhnya tidak ada yang dapat mengampuni dosa kecuali Engkau.",
      ulang: 1,
      catatan: "Barangsiapa membacanya di sore hari dengan penuh yakin lalu meninggal pada malam itu, ia masuk surga"
    },
    {
      id: 106,
      judul: "Doa Bersaksi atas Keesaan Allah",
      arab: "اللَّهُمَّ إِنِّي أَمْسَيْتُ أُشْهِدُكَ، وَأُشْهِدُ حَمَلَةَ عَرْشِكَ، وَمَلاَئِكَتِكَ، وَجَمِيعَ خَلْقِكَ، أَنَّكَ أَنْتَ اللَّهُ لَا إِلَهَ إِلاَّ أَنْتَ وَحْدَكَ لاَ شَرِيكَ لَكَ، وَأَنَّ مُحَمَّداً عَبْدُكَ وَرَسُولُكَ",
      latin: "Allaahumma innii amsaitu ushhiduka, wa ushhidu hamalata 'arsyika, wa malaa-ikataka, wa jamii'a khalqika, annaka antallaahu laa ilaaha illaa anta wahdaka laa syariika laka, wa anna muhammadan 'abduka wa rasuuluka",
      arti: "Ya Allah, sesungguhnya aku memasuki waktu sore ini dengan mempersaksikan-Mu, mempersaksikan para malaikat pembawa 'Arsy-Mu, para malaikat-Mu, dan seluruh makhluk-Mu, bahwa Engkau adalah Allah, tidak ada Tuhan selain Engkau Yang Maha Esa, tidak ada sekutu bagi-Mu, dan bahwa Muhammad adalah hamba dan Rasul-Mu.",
      ulang: 4
    },
    {
      id: 107,
      judul: "Doa Mengakui Nikmat Allah",
      arab: "اللَّهُمَّ مَا أَمْسَى بِي مِنْ نِعْمَةٍ أَوْ بِأَحَدٍ مِنْ خَلْقِكَ فَمِنْكَ وَحْدَكَ لاَ شَرِيكَ لَكَ، فَلَكَ الْحَمْدُ وَلَكَ الشُّكْرُ",
      latin: "Allaahumma maa amsaa bii min ni'matin au bi ahadin min khalqika faminka wahdaka laa syariika laka, falakal hamdu wa lakasy syukru",
      arti: "Ya Allah, nikmat apa saja yang aku atau salah seorang dari makhluk-Mu peroleh pada sore ini adalah dari-Mu semata, tidak ada sekutu bagi-Mu, maka bagi-Mu segala puji dan bagi-Mu segala syukur.",
      ulang: 1
    },
    {
      id: 108,
      judul: "Doa Memohon Keselamatan",
      arab: "اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لاَ إِلَهَ إِلاَّ أَنْتَ. اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكُفْرِ، وَالفَقْرِ، وَأَعُوذُ بِكَ مِنْ عَذَابِ القَبْرِ، لاَ إِلَهَ إِلاَّ أَنْتَ",
      latin: "Allaahumma 'aafinii fii badanii, allaahumma 'aafinii fii sam'ii, allaahumma 'aafinii fii basharii, laa ilaaha illaa anta. Allaahumma innii a'uudzu bika minal kufri, wal faqri, wa a'uudzu bika min 'adzaabil qabri, laa ilaaha illaa anta",
      arti: "Ya Allah, selamatkanlah badanku, selamatkanlah pendengaranku, selamatkanlah penglihatanku, tidak ada Tuhan selain Engkau. Ya Allah, aku berlindung kepada-Mu dari kekufuran dan kefakiran, dan aku berlindung kepada-Mu dari siksa kubur, tidak ada Tuhan selain Engkau.",
      ulang: 3
    },
    {
      id: 109,
      judul: "Doa Hasbiyallah",
      arab: "حَسْبِيَ اللَّهُ لاَ إِلَهَ إِلاَّ هُوَ عَلَيهِ تَوَكَّلتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ",
      latin: "Hasbiyallaahu laa ilaaha illaa huwa 'alaihi tawakkaltu wa huwa rabbul 'arsyil 'azhiim",
      arti: "Cukuplah Allah bagiku, tidak ada Tuhan selain Dia, hanya kepada-Nya aku bertawakal, dan Dia adalah Tuhan yang memiliki 'Arsy yang agung.",
      ulang: 7
    },
    {
      id: 110,
      judul: "Doa Memohon Ampunan dan Keselamatan",
      arab: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالآخِرَةِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي، وَمَالِي، اللَّهُمَّ اسْتُرْ عَوْرَاتِي، وَآمِنْ رَوْعَاتِي، اللَّهُمَّ احْفَظْنِي مِنْ بَينِ يَدَيَّ، وَمِنْ خَلْفِي، وَعَنْ يَمِينِي، وَعَنْ شِمَالِي، وَمِنْ فَوْقِي، وَأَعُوذُ بِعَظَمَتِكَ أَنْ أُغْتَالَ مِنْ تَحْتِي",
      latin: "Allaahumma innii as-alukal 'afwa wal 'aafiyata fid dunyaa wal aakhirah, allaahumma innii as-alukal 'afwa wal 'aafiyata fii diinii wa dunyaaya wa ahlii wa maalii, allaahummastur 'auraatii, wa aamin rau'aatii, allaahummahfazhnii min baini yadayya, wa min khalfii, wa 'an yamiinii, wa 'an syimaalii, wa min fauqii, wa a'uudzu bi'azhamatika an ughtaala min tahtii",
      arti: "Ya Allah, sesungguhnya aku memohon kepada-Mu ampunan dan keselamatan di dunia dan akhirat. Ya Allah, sesungguhnya aku memohon kepada-Mu ampunan dan keselamatan dalam agamaku, duniaku, keluargaku, dan hartaku. Ya Allah, tutupilah auratku (kekuranganku) dan amankanlah aku dari ketakutan. Ya Allah, jagalah aku dari arah depan, belakang, kanan, kiri, dan atasku. Aku berlindung dengan keagungan-Mu dari ditimpa keburukan dari arah bawahku.",
      ulang: 1
    },
    {
      id: 111,
      judul: "Doa Berlindung dari Keburukan Diri",
      arab: "اللَّهُمَّ عَالِمَ الغَيْبِ وَالشَّهَادَةِ فَاطِرَ السَّمَوَاتِ وَالْأَرْضِ، رَبَّ كُلِّ شَيْءٍ وَمَلِيكَهُ، أَشْهَدُ أَنْ لاَ إِلَهَ إِلاَّ أَنْتَ، أَعُوذُ بِكَ مِنْ شَرِّ نَفْسِي، وَمِنْ شَرِّ الشَّيْطانِ وَشَرَكِهِ، وَأَنْ أَقْتَرِفَ عَلَى نَفْسِي سُوءاً، أَوْ أَجُرَّهُ إِلَى مُسْلِمٍ",
      latin: "Allaahumma 'aalimal ghaibi was syahaadati faathiras samaawaati wal ardhi, rabba kulli syai-in wa maliikahu, asyhadu allaa ilaaha illaa anta, a'uudzu bika min syarri nafsii, wa min syarrisy syaithaani wa syarakihi, wa an aqtarifa 'alaa nafsii suu-an, au ajurrahuu ilaa muslim",
      arti: "Ya Allah, Yang Mengetahui yang gaib dan yang nyata, Pencipta langit dan bumi, Tuhan dan Penguasa segala sesuatu, aku bersaksi tidak ada Tuhan selain Engkau. Aku berlindung kepada-Mu dari kejahatan diriku, dari kejahatan syaitan dan sekutu-sekutunya, dan dari melakukan kejahatan terhadap diriku sendiri atau menyeretnya kepada seorang muslim.",
      ulang: 1
    },
    {
      id: 112,
      judul: "Doa Perlindungan dari Kejahatan Makhluk",
      arab: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
      latin: "A'uudzu bikalimaatillaahit taammaati min syarri maa khalaq",
      arti: "Aku berlindung dengan kalimat-kalimat Allah yang sempurna dari kejahatan apa yang Dia ciptakan.",
      ulang: 3
    },
    {
      id: 113,
      judul: "Doa Ridha terhadap Allah, Islam, dan Nabi Muhammad",
      arab: "رَضِيتُ بِاللَّهِ رَبَّاً، وَبِالْإِسْلاَمِ دِيناً، وَبِمُحَمَّدٍ صلى الله عليه وسلم نَبِيّاً",
      latin: "Radhiitu billaahi rabbaa, wa bil islaami diinaa, wa bi muhammadin shallallaahu 'alaihi wa sallama nabiyyaa",
      arti: "Aku ridha Allah sebagai Tuhanku, Islam sebagai agamaku, dan Muhammad shallallahu 'alaihi wasallam sebagai Nabiku.",
      ulang: 3
    },
    {
      id: 114,
      judul: "Doa Memohon Pertolongan",
      arab: "يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغيثُ أَصْلِحْ لِي شَأْنِيَ كُلَّهُ وَلاَ تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ",
      latin: "Yaa hayyu yaa qayyuumu birahmatika astaghiitsu ashlih lii sya'nii kullahu wa laa takilnii ilaa nafsii tharfata 'ain",
      arti: "Wahai Yang Maha Hidup, wahai Yang Maha Berdiri Sendiri (mengurus semua makhluk), dengan rahmat-Mu aku memohon pertolongan, perbaikilah seluruh urusanku dan janganlah Engkau biarkan aku bergantung pada diriku sendiri sekejap mata pun.",
      ulang: 1
    },
    {
      id: 115,
      judul: "Doa Memohon Kebaikan Malam",
      arab: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ رَبِّ الْعَالَمِينَ، اللَّهُـمَّ إِنِّي أَسْأَلُكَ خَيْرَ هَذِهِ اللَّيْلَةِ: فَتْحَهَا، وَنَصْرَهَا، وَنورَهَا، وَبَرَكَتَهَا، وَهُدَاهَا، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِيهَا وَشَرِّ مَا بَعْدَهَا",
      latin: "Amsainaa wa amsal mulku lillaahi rabbil 'aalamiin, allaahumma innii as-aluka khaira haadzihil lailah: fathahaa, wa nashrahaa, wa nuurahaa, wa barakatahaa, wa hudaahaa, wa a'uudzu bika min syarri maa fiihaa wa syarri maa ba'dahaa",
      arti: "Kami memasuki waktu sore dan kerajaan hanya milik Allah Tuhan semesta alam. Ya Allah, sesungguhnya aku memohon kepada-Mu kebaikan malam ini: kemenangannya, pertolongannya, cahayanya, berkahnya, dan petunjuknya, dan aku berlindung kepada-Mu dari kejahatan malam ini dan kejahatan setelahnya.",
      ulang: 1
    },
    {
      id: 116,
      judul: "Tasbih: Subhanallahi wa Bihamdihi",
      arab: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
      latin: "Subhaanallaahi wa bihamdihi",
      arti: "Maha Suci Allah dan segala puji bagi-Nya.",
      ulang: 100,
      catatan: "Barangsiapa membacanya 100x, akan diampuni dosa-dosanya"
    },
    {
      id: 117,
      judul: "Tahlil: La ilaha illallah",
      arab: "لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
      latin: "Laa ilaaha illallaahu wahdahu laa syariika lahu, lahul mulku wa lahul hamdu, wa huwa 'alaa kulli syai-in qadiir",
      arti: "Tidak ada Tuhan selain Allah Yang Maha Esa, tidak ada sekutu bagi-Nya, bagi-Nya kerajaan dan bagi-Nya segala puji, dan Dia Maha Berkuasa atas segala sesuatu.",
      ulang: 10,
      catatan: "10x, atau 1x saat malas. Setara membebaskan 4 hamba dari keturunan Ismail"
    },
    {
      id: 118,
      judul: "Shalawat Nabi",
      arab: "اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبَيِّنَا مُحَمَّدٍ",
      latin: "Allaahumma shalli wa sallim 'alaa nabiyyinaa muhammad",
      arti: "Ya Allah, limpahkanlah shalawat dan salam kepada Nabi kami, Muhammad.",
      ulang: 10
    }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = DZIKIR_DATA;
}