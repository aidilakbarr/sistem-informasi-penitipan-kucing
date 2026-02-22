"use client";

import Link from "next/link";
import { useRegisterForm } from "@/hooks/useRegisterForm";
import { EyeIcon, PawIcon, SpinnerIcon } from "@/components/ui/Icons";
import { PasswordStrengthBar } from "@/components/ui/PasswordStrengthBar";

export function RegisterForm() {
  const {
    form,
    errors,
    loading,
    success,
    showPassword,
    showKonfirmasi,
    passwordStrength,
    setShowPassword,
    setShowKonfirmasi,
    handleChange,
    handleSubmit,
  } = useRegisterForm();

  const inputBase =
    "w-full bg-white border rounded-xl px-4 py-3 text-sm text-stone-800 placeholder-stone-400 focus:outline-none transition-all duration-150";
  const inputNormal = `${inputBase} border-stone-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100`;
  const inputError = `${inputBase} border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100 bg-red-50/30`;

  const getInputClass = (field: keyof typeof errors) =>
    errors[field] ? inputError : inputNormal;

  // ── Success state ──
  if (success) {
    return (
      <div className="text-center py-6">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5 text-4xl">
          🎉
        </div>
        <h3 className="text-xl font-black text-stone-900 mb-2">
          Pendaftaran Berhasil!
        </h3>
        <p className="text-stone-500 text-sm mb-1">
          Akun Anda telah dibuat. Mengarahkan ke halaman login…
        </p>
        <div className="mt-4 flex justify-center gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-amber-400 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {/* General error */}
      {errors.general && (
        <div className="flex items-center gap-2.5 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
          <span className="text-lg flex-shrink-0">⚠️</span>
          {errors.general}
        </div>
      )}

      {/* Nama */}
      <div>
        <label
          htmlFor="nama"
          className="block text-sm font-semibold text-stone-700 mb-1.5"
        >
          Nama Lengkap
        </label>
        <input
          id="nama"
          name="nama"
          type="text"
          value={form.nama}
          onChange={handleChange}
          placeholder="Nama lengkap Anda"
          autoComplete="name"
          className={getInputClass("nama")}
          aria-invalid={!!errors.nama}
          aria-describedby={errors.nama ? "nama-error" : undefined}
        />
        {errors.nama && (
          <p id="nama-error" className="mt-1 text-xs text-red-600">
            {errors.nama}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="reg-email"
          className="block text-sm font-semibold text-stone-700 mb-1.5"
        >
          Email
        </label>
        <input
          id="reg-email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="nama@email.com"
          autoComplete="email"
          className={getInputClass("email")}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "reg-email-error" : undefined}
        />
        {errors.email && (
          <p id="reg-email-error" className="mt-1 text-xs text-red-600">
            {errors.email}
          </p>
        )}
      </div>

      {/* Telepon */}
      <div>
        <label
          htmlFor="telepon"
          className="block text-sm font-semibold text-stone-700 mb-1.5"
        >
          Nomor WhatsApp / HP
        </label>
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 text-sm font-medium select-none pointer-events-none">
            🇮🇩
          </div>
          <input
            id="telepon"
            name="telepon"
            type="tel"
            value={form.telepon}
            onChange={handleChange}
            placeholder="08123456789"
            autoComplete="tel"
            className={`${getInputClass("telepon")} pl-10`}
            aria-invalid={!!errors.telepon}
            aria-describedby={errors.telepon ? "telepon-error" : undefined}
          />
        </div>
        {errors.telepon && (
          <p id="telepon-error" className="mt-1 text-xs text-red-600">
            {errors.telepon}
          </p>
        )}
      </div>

      {/* Password */}
      <div>
        <label
          htmlFor="reg-password"
          className="block text-sm font-semibold text-stone-700 mb-1.5"
        >
          Password
        </label>
        <div className="relative">
          <input
            id="reg-password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={handleChange}
            placeholder="Minimal 8 karakter"
            autoComplete="new-password"
            className={`${getInputClass("password")} pr-11`}
            aria-invalid={!!errors.password}
            aria-describedby={
              errors.password ? "reg-password-error" : undefined
            }
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors"
            aria-label={
              showPassword ? "Sembunyikan password" : "Tampilkan password"
            }
          >
            <EyeIcon open={showPassword} />
          </button>
        </div>
        {errors.password && (
          <p id="reg-password-error" className="mt-1 text-xs text-red-600">
            {errors.password}
          </p>
        )}
        <PasswordStrengthBar strength={passwordStrength} />
      </div>

      {/* Konfirmasi Password */}
      <div>
        <label
          htmlFor="konfirmasi_password"
          className="block text-sm font-semibold text-stone-700 mb-1.5"
        >
          Konfirmasi Password
        </label>
        <div className="relative">
          <input
            id="konfirmasi_password"
            name="konfirmasi_password"
            type={showKonfirmasi ? "text" : "password"}
            value={form.konfirmasi_password}
            onChange={handleChange}
            placeholder="Ulangi password Anda"
            autoComplete="new-password"
            className={`${getInputClass("konfirmasi_password")} pr-11`}
            aria-invalid={!!errors.konfirmasi_password}
            aria-describedby={
              errors.konfirmasi_password ? "konfirmasi-error" : undefined
            }
          />
          <button
            type="button"
            onClick={() => setShowKonfirmasi(!showKonfirmasi)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors"
            aria-label={
              showKonfirmasi ? "Sembunyikan password" : "Tampilkan password"
            }
          >
            <EyeIcon open={showKonfirmasi} />
          </button>
        </div>
        {/* Match indicator */}
        {form.konfirmasi_password && !errors.konfirmasi_password && (
          <p className="mt-1 text-xs text-green-600 flex items-center gap-1">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            Password cocok
          </p>
        )}
        {errors.konfirmasi_password && (
          <p id="konfirmasi-error" className="mt-1 text-xs text-red-600">
            {errors.konfirmasi_password}
          </p>
        )}
      </div>

      {/* Agree */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer group select-none">
          <div className="relative mt-0.5 flex-shrink-0">
            <input
              type="checkbox"
              name="agree"
              checked={form.agree}
              onChange={handleChange}
              className="sr-only"
              aria-describedby={errors.agree ? "agree-error" : undefined}
            />
            <div
              className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                form.agree
                  ? "bg-amber-500 border-amber-500"
                  : errors.agree
                    ? "bg-white border-red-400"
                    : "bg-white border-stone-300 group-hover:border-amber-400"
              }`}
            >
              {form.agree && (
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={3}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
          </div>
          <span className="text-sm text-stone-600 leading-snug">
            Saya menyetujui{" "}
            <Link
              href="/terms"
              className="text-amber-600 hover:underline font-semibold"
            >
              Syarat & Ketentuan
            </Link>{" "}
            dan{" "}
            <Link
              href="/privacy"
              className="text-amber-600 hover:underline font-semibold"
            >
              Kebijakan Privasi
            </Link>{" "}
            KucingKu
          </span>
        </label>
        {errors.agree && (
          <p id="agree-error" className="mt-1 text-xs text-red-600 ml-8">
            {errors.agree}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 disabled:cursor-not-allowed text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2.5 shadow-md shadow-amber-100 hover:shadow-lg hover:shadow-amber-100 hover:-translate-y-0.5 active:translate-y-0"
      >
        {loading ? (
          <>
            <SpinnerIcon />
            Mendaftarkan akun…
          </>
        ) : (
          <>
            <PawIcon className="w-4 h-4" />
            Buat Akun Gratis
          </>
        )}
      </button>

      {/* Login link */}
      <p className="text-center text-sm text-stone-500">
        Sudah punya akun?{" "}
        <Link
          href="/auth/login"
          className="text-amber-600 hover:text-amber-700 font-semibold transition-colors"
        >
          Masuk di sini
        </Link>
      </p>
    </form>
  );
}
