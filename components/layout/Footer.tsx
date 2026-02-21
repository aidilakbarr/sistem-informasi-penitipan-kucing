import { PawIcon } from "@/components/ui/Icons";

const FOOTER_SERVICES = ["Penitipan Harian", "Penitipan Mingguan", "Paket Premium", "Grooming", "Konsultasi"];
const FOOTER_INFO = ["Tentang Kami", "Fasilitas", "Blog", "FAQ", "Syarat & Ketentuan"];
const SOCIALS = ["Instagram", "WhatsApp", "TikTok"];

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
                Kucing<span className="text-amber-500">Ku</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-4 max-w-xs">
              Penitipan kucing profesional dengan standar perawatan terbaik dan penuh kasih sayang.
            </p>
            <address className="text-sm not-italic space-y-1">
              <p>📍 Jl. Kucing Bahagia No. 12, Kota Anda</p>
              <p>📞 0812-3456-7890</p>
              <p>✉️ hello@kucingku.id</p>
            </address>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">Layanan</h4>
            <ul className="space-y-2 text-sm">
              {FOOTER_SERVICES.map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-amber-400 transition-colors">
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
                  <a href="#" className="hover:text-amber-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-stone-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p>© 2024 KucingKu. All rights reserved. Made with 🐾 for cat lovers.</p>
          <div className="flex gap-4">
            {SOCIALS.map((social) => (
              <a key={social} href="#" className="hover:text-amber-400 transition-colors">
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
