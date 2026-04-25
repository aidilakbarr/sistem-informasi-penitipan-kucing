import type { Testimonial, FaqItem, Stat, NavLink } from "@/types";

import {
  Wind,
  ShieldCheck,
  Camera,
  HeartPulse,
  Soup,
  Sparkles,
  Home,
  Bath,
  Bug,
} from "lucide-react";

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

export const PRICING = [
  {
    title: "Penitipan Harian",
    price: "30.000",
    unit: "/hari",
    desc: "Fasilitas lengkap dengan laporan harian kondisi anabul.",
    icon: Home,
    features: [
      "Ruangan Full AC",
      "CCTV 24 Jam",
      "Update Foto & Video",
      "Pemeriksaan Kesehatan",
    ],
    highlight: false,
  },
  {
    title: "Grooming Reguler",
    price: "80.000",
    unit: "/kucing",
    desc: "Perawatan kebersihan standar agar kucing tetap wangi dan bersih.",
    icon: Bath,
    features: [
      "Mandi Shampo Khusus",
      "Potong Kuku",
      "Pembersihan Telinga",
      "Sisir Bulu",
    ],
    highlight: false,
  },
  {
    title: "Grooming Spesial",
    price: "100.000",
    unit: "/kucing",
    desc: "Solusi khusus untuk masalah kutu atau jamur pada anabul.",
    icon: Bug,
    features: [
      "Treatment Kutu/Jamur",
      "Shampo Medicated",
      "Potong Kuku",
      "Pembersihan Telinga",
    ],
    highlight: true, // Beri penanda untuk paket yang sering dicari
  },
  {
    title: "Grooming Complete",
    price: "125.000",
    unit: "/kucing",
    desc: "Perawatan total untuk masalah jamur sekaligus kutu.",
    icon: Sparkles,
    features: [
      "Treatment Kutu & Jamur",
      "Deep Cleaning",
      "Extra Care",
      "Free Konsultasi",
    ],
    highlight: false,
  },
];

export const FEATURES = [
  {
    title: "Ruangan Ber-AC",
    desc: "Suhu ruangan terjaga agar anabul tetap sejuk dan tidak stres.",
    icon: Wind,
  },
  {
    title: "Keamanan 24 Jam",
    desc: "Dipantau staf berpengalaman untuk memastikan kucing tetap aman.",
    icon: ShieldCheck,
  },
  {
    title: "CCTV Real-time",
    desc: "Akses pantauan langsung melalui kamera untuk ketenangan Anda.",
    icon: Camera,
  },
  {
    title: "Pemeriksaan Kesehatan",
    desc: "Pengecekan rutin kondisi fisik kucing setiap pagi dan sore.",
    icon: HeartPulse,
  },
  {
    title: "Nutrisi Terjamin",
    desc: "Pemberian makanan berkualitas sesuai dengan jadwal rutin.",
    icon: Soup,
  },
  {
    title: "Kebersihan Terjaga",
    desc: "Kandang dan area bermain dibersihkan menggunakan disinfektan aman.",
    icon: Sparkles,
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Rina Maulida",
    cat: "Pemilik Mochi & Donut",
    rating: 5,
    text: "AnZ Pet Care selalu memberikan update foto setiap hari. Kucing saya diperlakukan seperti keluarga sendiri. Sangat recommended!",
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
