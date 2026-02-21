export interface Service {
  emoji: string;
  title: string;
  desc: string;
  price: string;
  features: string[];
  popular?: boolean;
}

export interface Testimonial {
  name: string;
  cat: string;
  rating: number;
  text: string;
  avatar: string;
}

export interface Feature {
  icon: string;
  title: string;
  desc: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface Stat {
  val: string;
  label: string;
}

export interface BookingFormData {
  nama: string;
  kucing: string;
  tanggal_masuk: string;
  tanggal_keluar: string;
  paket: string;
  catatan: string;
}

export interface NavLink {
  label: string;
  href: string;
}
