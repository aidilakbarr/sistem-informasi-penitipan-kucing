import type { Service, Testimonial, Feature, FaqItem, Stat, NavLink } from "@/types";

export const NAV_LINKS: NavLink[] = [
  { label: "Layanan", href: "#layanan" },
  { label: "Fasilitas", href: "#fasilitas" },
  { label: "Testimoni", href: "#testimoni" },
  { label: "FAQ", href: "#faq" },
];

export const STATS: Stat[] = [
  { val: "500+", label: "Kucing Dititipkan" },
  { val: "4.9★", label: "Rating Pelanggan" },
  { val: "3 Th", label: "Pengalaman" },
];

export const SERVICES: Service[] = [
  {
    emoji: "🏠",
    title: "Penitipan Harian",
    desc: "Titipkan kucing kesayangan Anda per hari dengan fasilitas lengkap dan penuh kasih sayang.",
    price: "Rp 75.000/hari",
    features: ["Kandang nyaman & bersih", "Makan 2x sehari", "Bermain & bersosialisasi"],
  },
  {
    emoji: "🌙",
    title: "Penitipan Mingguan",
    desc: "Paket hemat untuk perjalanan lebih lama. Kucing Anda dirawat bak di rumah sendiri.",
    price: "Rp 450.000/minggu",
    features: ["Semua layanan harian", "Foto update harian", "Grooming ringan gratis"],
    popular: true,
  },
  {
    emoji: "✨",
    title: "Penitipan Premium",
    desc: "Kamar VIP eksklusif dengan layanan spa, grooming, dan pemantauan 24 jam.",
    price: "Rp 150.000/hari",
    features: ["Kamar VIP ber-AC", "Live CCTV akses owner", "Full grooming & spa"],
  },
];

export const FEATURES: Feature[] = [
  { icon: "🏥", title: "Berstandar Vet", desc: "Prosedur perawatan sesuai standar dokter hewan bersertifikat" },
  { icon: "📹", title: "CCTV 24 Jam", desc: "Pantau kucing Anda kapan saja melalui aplikasi kami" },
  { icon: "🛁", title: "Grooming Tersedia", desc: "Layanan mandi, potong kuku, dan perawatan bulu" },
  { icon: "🍗", title: "Makanan Premium", desc: "Pakan berkualitas tinggi, atau bisa titip pakan favorit kucing" },
  { icon: "💊", title: "Konsultasi Kesehatan", desc: "Konsultasi gratis dengan tenaga kesehatan hewan kami" },
  { icon: "🤝", title: "Garansi Kepuasan", desc: "Tidak puas? Kami kembalikan pembayaran Anda penuh" },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Rina Maulida",
    cat: "Pemilik Mochi & Donut",
    rating: 5,
    text: "KucingKu selalu memberikan update foto setiap hari. Kucing saya diperlakukan seperti keluarga sendiri. Sangat recommended!",
    avatar: "RM",
  },
  {
    name: "Budi Santoso",
    cat: "Pemilik Latte",
    rating: 5,
    text: "Fasilitas bersih, staf ramah dan sayang kucing. Latte saya selalu happy setiap kali dititipkan di sini.",
    avatar: "BS",
  },
  {
    name: "Dewi Pratiwi",
    cat: "Pemilik Luna & Boba",
    rating: 5,
    text: "Awalnya khawatir titip 2 kucing sekaligus, ternyata mereka dirawat dengan sangat baik. Harga terjangkau, kualitas premium!",
    avatar: "DP",
  },
];

export const FAQS: FaqItem[] = [
  {
    q: "Apakah vaksin diperlukan sebelum menitipkan kucing?",
    a: "Ya, kami mensyaratkan kucing telah divaksin lengkap (F3 minimal) untuk menjaga kesehatan semua kucing yang dititipkan.",
  },
  {
    q: "Bagaimana cara mendaftar penitipan?",
    a: "Anda bisa mendaftar melalui WhatsApp, telepon, atau formulir online di website ini. Pemesanan bisa dilakukan H-3 sebelum tanggal penitipan.",
  },
  {
    q: "Apakah tersedia layanan antar-jemput?",
    a: "Tersedia layanan antar-jemput dalam radius 10 km dari lokasi kami dengan biaya tambahan Rp 25.000 per sekali jalan.",
  },
  {
    q: "Bagaimana jika kucing saya sakit selama penitipan?",
    a: "Kami bekerja sama dengan klinik hewan terpercaya. Penanganan darurat akan langsung dilakukan dan owner akan segera dihubungi.",
  },
];

export const WHATSAPP_NUMBER = "6281234567890";

export const BOOKING_PACKAGES = [
  "Penitipan Harian - Rp 75.000/hari",
  "Penitipan Mingguan - Rp 450.000/minggu",
  "Penitipan Premium - Rp 150.000/hari",
] as const;
