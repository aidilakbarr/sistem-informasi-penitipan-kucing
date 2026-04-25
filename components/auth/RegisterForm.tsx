"use client";

import Link from "next/link";
import {
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Cat,
  Check,
} from "lucide-react";
import { useRegisterForm } from "@/hooks/useRegisterForm";
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

  if (success) {
    return (
      <div className="text-center py-8 animate-in fade-in zoom-in duration-300">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h3 className="text-xl font-black text-stone-900 mb-2">
          Pendaftaran Berhasil!
        </h3>
        <p className="text-stone-500 text-sm mb-6">
          Akun AnZ Pet Care Anda telah dibuat. Mengarahkan ke halaman login…
        </p>
        <div className="flex justify-center gap-1.5">
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
      {errors.general && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          {errors.general}
        </div>
      )}

      {/* Nama */}
      <div>
        <label className="block text-sm font-semibold text-stone-700 mb-1.5">
          Nama Lengkap
        </label>
        <input
          name="nama"
          type="text"
          value={form.nama}
          onChange={handleChange}
          placeholder="Masukkan nama lengkap"
          className={getInputClass("nama")}
        />
        {errors.nama && (
          <p className="mt-1.5 text-xs text-red-600">{errors.nama}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-semibold text-stone-700 mb-1.5">
          Email
        </label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="nama@email.com"
          className={getInputClass("email")}
        />
        {errors.email && (
          <p className="mt-1.5 text-xs text-red-600">{errors.email}</p>
        )}
      </div>

      {/* Telepon */}
      <div>
        <label className="block text-sm font-semibold text-stone-700 mb-1.5">
          Nomor WhatsApp
        </label>
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500 text-xs font-bold border-r pr-2 border-stone-200">
            +62
          </div>
          <input
            name="telepon"
            type="tel"
            value={form.telepon}
            onChange={handleChange}
            placeholder="8123456789"
            className={`${getInputClass("telepon")} pl-14`}
          />
        </div>
        {errors.telepon && (
          <p className="mt-1.5 text-xs text-red-600">{errors.telepon}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-semibold text-stone-700 mb-1.5">
          Password
        </label>
        <div className="relative">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={handleChange}
            placeholder="Minimal 8 karakter"
            className={`${getInputClass("password")} pr-11`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        <PasswordStrengthBar strength={passwordStrength} />
        {errors.password && (
          <p className="mt-1.5 text-xs text-red-600">{errors.password}</p>
        )}
      </div>

      {/* Konfirmasi Password */}
      <div>
        <label className="block text-sm font-semibold text-stone-700 mb-1.5">
          Konfirmasi Password
        </label>
        <div className="relative">
          <input
            name="konfirmasi_password"
            type={showKonfirmasi ? "text" : "password"}
            value={form.konfirmasi_password}
            onChange={handleChange}
            placeholder="Ulangi password"
            className={`${getInputClass("konfirmasi_password")} pr-11`}
          />
          <button
            type="button"
            onClick={() => setShowKonfirmasi(!showKonfirmasi)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
          >
            {showKonfirmasi ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {/* Pengecekan real-time yang benar */}
        {form.konfirmasi_password &&
          form.konfirmasi_password === form.password && (
            <p className="mt-1.5 text-xs text-green-600 flex items-center gap-1 font-medium animate-in fade-in slide-in-from-top-1">
              <Check size={14} /> Password cocok
            </p>
          )}
        {errors.konfirmasi_password && (
          <p className="mt-1.5 text-xs text-red-600">
            {errors.konfirmasi_password}
          </p>
        )}
      </div>

      {/* Agree */}
      <div className="py-2">
        <label className="flex items-start gap-3 cursor-pointer group">
          <div className="relative mt-0.5 flex-shrink-0">
            <input
              type="checkbox"
              name="agree"
              checked={form.agree}
              onChange={handleChange}
              className="sr-only"
            />
            <div
              className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${form.agree ? "bg-amber-500 border-amber-500" : errors.agree ? "bg-white border-red-400" : "bg-white border-stone-300 group-hover:border-amber-400"}`}
            >
              {form.agree && (
                <Check size={14} className="text-white" strokeWidth={4} />
              )}
            </div>
          </div>
          <span className="text-xs text-stone-600 leading-normal">
            Saya menyetujui{" "}
            <Link
              href="/terms"
              className="text-amber-600 hover:underline font-bold"
            >
              Syarat & Ketentuan
            </Link>{" "}
            dan{" "}
            <Link
              href="/privacy"
              className="text-amber-600 hover:underline font-bold"
            >
              Kebijakan Privasi
            </Link>{" "}
            AnZ Pet Care.
          </span>
        </label>
        {errors.agree && (
          <p className="mt-1 text-xs text-red-600 ml-8">{errors.agree}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-200 text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-100"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" /> Memproses...
          </>
        ) : (
          <>
            <Cat className="w-4 h-4" /> Daftar Sekarang
          </>
        )}
      </button>

      <p className="text-center text-sm text-stone-500 pt-2">
        Sudah punya akun?{" "}
        <Link
          href="/login"
          className="text-amber-600 hover:text-amber-700 font-bold"
        >
          Masuk sekarang
        </Link>
      </p>
    </form>
  );
}
