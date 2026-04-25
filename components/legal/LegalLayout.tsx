import Link from "next/link";
import { PawIcon } from "@/components/ui/Icons";

interface Section {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface LegalLayoutProps {
  title: string;
  subtitle: string;
  lastUpdated: string;
  sections: Section[];
  badge: string;
}

export function LegalLayout({
  title,
  subtitle,
  lastUpdated,
  sections,
  badge,
}: LegalLayoutProps) {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Top nav */}
      <header className="bg-white border-b border-stone-100 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-amber-500 rounded-xl flex items-center justify-center rotate-3 group-hover:rotate-6 transition-transform">
              <PawIcon className="w-4 h-4 text-white" />
            </div>
            <span className="font-black text-lg text-stone-800">
              AnZ <span className="text-amber-500">Pet Care</span>
            </span>
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <Link
              href="/login"
              className="text-stone-500 hover:text-stone-700 transition-colors"
            >
              Masuk
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-full transition-colors text-xs"
            >
              Daftar Gratis
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-12 lg:grid lg:grid-cols-[240px_1fr] lg:gap-12 lg:items-start">
        {/* Sidebar TOC */}
        <aside className="hidden lg:block">
          <nav
            className="sticky top-24 bg-white rounded-2xl border border-stone-100 p-5"
            aria-label="Daftar isi"
          >
            <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-4">
              Daftar Isi
            </p>
            <ul className="space-y-1">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="block text-sm text-stone-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg px-3 py-1.5 transition-all"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main content */}
        <main>
          {/* Hero header */}
          <div className="bg-white rounded-3xl border border-stone-100 p-8 mb-8">
            <div className="inline-flex items-center gap-2 text-amber-600 bg-amber-50 border border-amber-100 text-xs font-bold px-3 py-1.5 rounded-full mb-4">
              <PawIcon className="w-3 h-3" />
              {badge}
            </div>
            <h1 className="text-3xl font-black text-stone-900 mb-2">{title}</h1>
            <p className="text-stone-500 text-sm mb-4">{subtitle}</p>
            <div className="flex items-center gap-4 text-xs text-stone-400 pt-4 border-t border-stone-100">
              <span>
                📅 Terakhir diperbarui:{" "}
                <strong className="text-stone-600">{lastUpdated}</strong>
              </span>
              <span>🌐 Berlaku di Indonesia</span>
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-6">
            {sections.map((s, i) => (
              <section
                key={s.id}
                id={s.id}
                className="bg-white rounded-3xl border border-stone-100 p-8 scroll-mt-24"
              >
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-8 h-8 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-black text-amber-700">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h2 className="text-lg font-black text-stone-900 leading-snug">
                    {s.title}
                  </h2>
                </div>
                <div className="prose prose-sm prose-stone max-w-none text-stone-600 leading-relaxed pl-12">
                  {s.content}
                </div>
              </section>
            ))}
          </div>

          {/* Footer note */}
          <div className="mt-8 bg-amber-50 border border-amber-100 rounded-2xl p-6 text-sm text-stone-600">
            <p className="font-semibold text-stone-800 mb-1">Ada pertanyaan?</p>
            <p>
              Hubungi kami di{" "}
              <a
                href="mailto:hello@kucingku.id"
                className="text-amber-600 hover:underline font-medium"
              >
                hello@kucingku.id
              </a>{" "}
              atau WhatsApp{" "}
              <a
                href="https://wa.me/6281234567890"
                className="text-amber-600 hover:underline font-medium"
              >
                0812-3456-7890
              </a>
              .
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
