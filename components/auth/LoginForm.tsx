"use client";

import Link from "next/link";
import { useLoginForm } from "@/hooks/useLoginForm";
import { InputField } from "@/components/ui/InputField";
import { signInWithGoogle } from "@/app/auth/login/actions";

export function LoginForm() {
  const {
    form,
    errors,
    isLoading,
    showPassword,
    setShowPassword,
    handleChange,
    handleSubmit,
  } = useLoginForm();

  return (
    <>
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* General error */}
        {errors.general && (
          <div
            role="alert"
            className="flex items-center gap-2.5 px-4 py-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl"
          >
            <span className="text-base" aria-hidden="true">
              🚫
            </span>
            {errors.general}
          </div>
        )}

        {/* Email */}
        <InputField
          id="email"
          label="Alamat Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="nama@email.com"
          autoComplete="email"
          required
          error={errors.email}
        />

        {/* Password */}
        <InputField
          id="password"
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={form.password}
          onChange={handleChange}
          placeholder="Masukkan password"
          autoComplete="current-password"
          required
          error={errors.password}
          rightElement={
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              aria-label={
                showPassword ? "Sembunyikan password" : "Tampilkan password"
              }
              className="text-stone-400 hover:text-stone-600 transition-colors p-0.5"
            >
              {showPassword ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
          }
        />

        {/* Remember me & forgot password */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              name="rememberMe"
              checked={form.rememberMe}
              onChange={handleChange}
              className="w-4 h-4 accent-amber-500 rounded"
            />
            <span className="text-sm text-stone-600">Ingat saya</span>
          </label>
          <Link
            href="/forgot-password"
            className="text-sm font-semibold text-amber-600 hover:text-amber-700 transition-colors"
          >
            Lupa password?
          </Link>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300
          text-white font-bold text-sm rounded-xl transition-all duration-150
          shadow-md shadow-amber-200 hover:shadow-lg hover:-translate-y-0.5
          disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none
          flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <svg
                className="w-4 h-4 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
              Memproses…
            </>
          ) : (
            "Masuk"
          )}
        </button>
      </form>
      {/* Divider */}
      <div className="relative flex items-center gap-3 py-1 my-5">
        <div className="flex-1 h-px bg-stone-200" />
        <span className="text-xs text-stone-400 font-medium">
          atau masuk dengan
        </span>
        <div className="flex-1 h-px bg-stone-200" />
      </div>

      {/* Google OAuth */}
      <form action={signInWithGoogle}>
        <button
          type="submit"
          className="w-full py-3 bg-white border border-stone-200 hover:border-stone-300
          hover:bg-stone-50 text-stone-700 font-semibold text-sm rounded-xl
          transition-all duration-150 flex items-center justify-center gap-2.5 my-5"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Lanjutkan dengan Google
        </button>
      </form>

      {/* Register link */}
      <p className="text-center text-sm text-stone-500 my-5">
        Belum punya akun?{" "}
        <Link
          href="/register"
          className="font-bold text-amber-600 hover:text-amber-700 transition-colors"
        >
          Daftar sekarang
        </Link>
      </p>
    </>
  );
}
