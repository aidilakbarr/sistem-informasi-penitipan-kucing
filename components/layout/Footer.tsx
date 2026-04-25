import { PawIcon } from "@/components/ui/Icons";
// Import ikon profesional untuk kontak dan sosial media
import {
  MapPin,
  Phone,
  Mail,
  Camera,
  MessageCircle,
  Video,
  Heart,
} from "lucide-react";


const FOOTER_SERVICES = [
  "Penitipan Harian",
  "Penitipan Mingguan",
  "Paket Premium",
  "Grooming",
  "Konsultasi",
];

const FOOTER_INFO = [
  "Tentang Kami",
  "Fasilitas",
  "Blog",
  "FAQ",
  "Syarat & Ketentuan",
];

// Kita buat objek untuk social agar bisa memanggil ikon masing-masing
const SOCIALS = [
  { name: "Instagram", icon: Camera, href: "#" },
  { name: "WhatsApp", icon: MessageCircle, href: "#" },
  { name: "TikTok", icon: Video, href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-400 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-amber-500 rounded-xl flex items-center justify-center">
                <PawIcon className="w-4 h-4 text-white" />
              </div>
              <span className="font-black text-lg text-white">
                AnZ <span className="text-amber-500">Pet Care</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-6 max-w-xs">
              Penitipan kucing profesional dengan standar perawatan terbaik dan
              penuh kasih sayang di Kolaka.
            </p>

            {/* Kontak Tanpa Emoji */}
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>
                  Jl. Mekongga Indah, Lamokato, Kec. Kolaka, Kabupaten Kolaka,
                  Sulawesi Tenggara.
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <span>0821-4892-4390</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <span>AnZPetCare@kucingku.id</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">Layanan</h4>
            <ul className="space-y-2 text-sm">
              {FOOTER_SERVICES.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="hover:text-amber-400 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">Informasi</h4>
            <ul className="space-y-2 text-sm">
              {FOOTER_INFO.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="hover:text-amber-400 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-stone-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-1">
            <p>© 2026 AnZ Pet Care. All rights reserved. Made with</p>
            <Heart className="w-3 h-3 text-amber-500 fill-amber-500" />
            <p>for cat lovers.</p>
          </div>

          <div className="flex gap-5">
            {SOCIALS.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
                aria-label={social.name}
              >
                <social.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{social.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
