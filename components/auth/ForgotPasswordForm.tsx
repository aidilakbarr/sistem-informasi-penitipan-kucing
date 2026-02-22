"use client";

import Link from "next/link";
import { useForgotPassword } from "@/hooks/useForgotPassword";
import { EyeIcon, PawIcon, SpinnerIcon } from "@/components/ui/Icons";
import { PasswordStrengthBar } from "@/components/ui/PasswordStrengthBar";

const inputBase =
  "w-full bg-white border rounded-xl px-4 py-3 text-sm text-stone-800 placeholder-stone-400 focus:outline-none transition-all duration-150";
const inputNormal = `${inputBase} border-stone-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100`;
const inputError = `${inputBase} border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100 bg-red-50/30`;

function SubmitBtn({
  loading,
  label,
  loadingLabel,
}: {
  loading: boolean;
  label: string;
  loadingLabel: string;
}) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 disabled:cursor-not-allowed text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2.5 shadow-md shadow-amber-100 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
    >
      {loading ? (
        <>
          <SpinnerIcon />
          {loadingLabel}
        </>
      ) : (
        <>
          <PawIcon className="w-4 h-4" />
          {label}
        </>
      )}
    </button>
  );
}

// ─── Step 1 : Email ──────────────────────────────────────────────────────────

function StepEmail() {
  const { email, setEmail, errors, loading, handleEmailSubmit } =
    useForgotPasswordCtx();
  return (
    <form onSubmit={handleEmailSubmit} noValidate className="space-y-5">
      {errors.general && <ErrorBanner msg={errors.general} />}
      <div>
        <label
          htmlFor="fp-email"
          className="block text-sm font-semibold text-stone-700 mb-1.5"
        >
          Email Terdaftar
        </label>
        <input
          id="fp-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="nama@email.com"
          autoComplete="email"
          className={errors.email ? inputError : inputNormal}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "fp-email-error" : undefined}
        />
        {errors.email && (
          <p id="fp-email-error" className="mt-1 text-xs text-red-600">
            {errors.email}
          </p>
        )}
      </div>
      <SubmitBtn
        loading={loading}
        label="Kirim Kode OTP"
        loadingLabel="Mengirim kode…"
      />
      <p className="text-center text-sm text-stone-500">
        Ingat password?{" "}
        <Link
          href="/login"
          className="text-amber-600 hover:text-amber-700 font-semibold"
        >
          Masuk di sini
        </Link>
      </p>
    </form>
  );
}

// ─── Step 2 : OTP ────────────────────────────────────────────────────────────

function StepOtp() {
  const {
    email,
    otp,
    setOtpRef,
    errors,
    loading,
    resendCooldown,
    handleOtpChange,
    handleOtpKeyDown,
    handleOtpPaste,
    handleOtpSubmit,
    handleResend,
  } = useForgotPasswordCtx();

  const filled = otp.filter(Boolean).length;

  return (
    <form onSubmit={handleOtpSubmit} noValidate className="space-y-5">
      <p className="text-sm text-stone-500 leading-relaxed">
        Kode 6 digit telah dikirim ke{" "}
        <span className="font-semibold text-stone-800">{email}</span>. Periksa
        folder spam jika tidak ada.
      </p>

      {errors.otp && <ErrorBanner msg={errors.otp} />}

      {/* OTP boxes */}
      <div>
        <div
          className="flex gap-2.5 justify-between"
          onPaste={handleOtpPaste}
          role="group"
          aria-label="Kode OTP 6 digit"
        >
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={setOtpRef(i)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(i, e.target.value)}
              onKeyDown={(e) => handleOtpKeyDown(i, e)}
              aria-label={`Digit OTP ke-${i + 1}`}
              className={`w-12 h-14 text-center text-xl font-black rounded-xl border-2 transition-all focus:outline-none ${
                digit
                  ? "border-amber-400 bg-amber-50 text-amber-700"
                  : "border-stone-200 bg-white text-stone-800 focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
              }`}
            />
          ))}
        </div>
        <p className="mt-2 text-xs text-stone-400 text-right">
          {filled}/{otp.length} digit terisi
        </p>
      </div>

      <SubmitBtn
        loading={loading}
        label="Verifikasi Kode"
        loadingLabel="Memverifikasi…"
      />

      {/* Resend */}
      <p className="text-center text-sm text-stone-500">
        Tidak menerima kode?{" "}
        {resendCooldown > 0 ? (
          <span className="text-stone-400">
            Kirim ulang ({resendCooldown}s)
          </span>
        ) : (
          <button
            type="button"
            onClick={handleResend}
            className="text-amber-600 hover:text-amber-700 font-semibold"
          >
            Kirim ulang
          </button>
        )}
      </p>
    </form>
  );
}

// ─── Step 3 : Reset ──────────────────────────────────────────────────────────

function StepReset() {
  const {
    password,
    setPassword,
    konfirmasi,
    setKonfirmasi,
    showPassword,
    setShowPassword,
    showKonfirmasi,
    setShowKonfirmasi,
    passwordStrength,
    errors,
    loading,
    handleResetSubmit,
  } = useForgotPasswordCtx();

  return (
    <form onSubmit={handleResetSubmit} noValidate className="space-y-5">
      {errors.general && <ErrorBanner msg={errors.general} />}

      {/* New password */}
      <div>
        <label
          htmlFor="new-password"
          className="block text-sm font-semibold text-stone-700 mb-1.5"
        >
          Password Baru
        </label>
        <div className="relative">
          <input
            id="new-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Minimal 8 karakter"
            autoComplete="new-password"
            className={`${errors.password ? inputError : inputNormal} pr-11`}
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
          <p className="mt-1 text-xs text-red-600">{errors.password}</p>
        )}
        <PasswordStrengthBar strength={passwordStrength} />
      </div>

      {/* Confirm */}
      <div>
        <label
          htmlFor="confirm-password"
          className="block text-sm font-semibold text-stone-700 mb-1.5"
        >
          Konfirmasi Password
        </label>
        <div className="relative">
          <input
            id="confirm-password"
            type={showKonfirmasi ? "text" : "password"}
            value={konfirmasi}
            onChange={(e) => setKonfirmasi(e.target.value)}
            placeholder="Ulangi password baru"
            autoComplete="new-password"
            className={`${errors.konfirmasi_password ? inputError : inputNormal} pr-11`}
          />
          <button
            type="button"
            onClick={() => setShowKonfirmasi(!showKonfirmasi)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors"
            aria-label={showKonfirmasi ? "Sembunyikan" : "Tampilkan"}
          >
            <EyeIcon open={showKonfirmasi} />
          </button>
        </div>
        {konfirmasi && !errors.konfirmasi_password && (
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
          <p className="mt-1 text-xs text-red-600">
            {errors.konfirmasi_password}
          </p>
        )}
      </div>

      <SubmitBtn
        loading={loading}
        label="Simpan Password Baru"
        loadingLabel="Menyimpan…"
      />
    </form>
  );
}

// ─── Step 4 : Success ────────────────────────────────────────────────────────

function StepSuccess() {
  return (
    <div className="text-center py-4">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5 text-4xl">
        🔓
      </div>
      <h3 className="text-xl font-black text-stone-900 mb-2">
        Password Berhasil Diubah!
      </h3>
      <p className="text-stone-500 text-sm">Mengarahkan ke halaman login…</p>
      <div className="mt-5 flex justify-center gap-1.5">
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

// ─── Helper components ───────────────────────────────────────────────────────

function ErrorBanner({ msg }: { msg: string }) {
  return (
    <div className="flex items-center gap-2.5 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
      <span className="text-lg flex-shrink-0">⚠️</span>
      {msg}
    </div>
  );
}

// ─── Context trick: pass hook down via render prop ────────────────────────────
// We expose the hook result through a simple context-like approach using
// a parent component that passes state via render.
// This keeps each step component small and readable.

import { createContext, useContext } from "react";

type FPCtx = ReturnType<typeof useForgotPassword>;
const FPContext = createContext<FPCtx | null>(null);
function useForgotPasswordCtx() {
  const ctx = useContext(FPContext);
  if (!ctx) throw new Error("Must be used inside ForgotPasswordForm");
  return ctx;
}

// ─── Step config ─────────────────────────────────────────────────────────────

const STEPS = [
  { key: "email", label: "Email" },
  { key: "otp", label: "Kode OTP" },
  { key: "reset", label: "Password Baru" },
] as const;

const STEP_META: Record<
  string,
  { icon: string; title: string; subtitle: string }
> = {
  email: {
    icon: "📧",
    title: "Lupa Password?",
    subtitle: "Masukkan email Anda dan kami akan mengirimkan kode OTP.",
  },
  otp: {
    icon: "🔢",
    title: "Verifikasi OTP",
    subtitle: "Masukkan 6 digit kode yang dikirim ke email Anda.",
  },
  reset: {
    icon: "🔑",
    title: "Buat Password Baru",
    subtitle: "Buat password baru yang kuat dan mudah diingat.",
  },
  success: { icon: "✅", title: "Selesai!", subtitle: "" },
};

// ─── Root export ─────────────────────────────────────────────────────────────

export function ForgotPasswordForm() {
  const ctx = useForgotPassword();
  const { step } = ctx;
  const meta = STEP_META[step];
  const stepIndex = STEPS.findIndex((s) => s.key === step);

  return (
    <FPContext.Provider value={ctx}>
      <div className="space-y-6">
        {/* Progress stepper */}
        {step !== "success" && (
          <div className="flex items-center gap-0">
            {STEPS.map((s, i) => {
              const done = i < stepIndex;
              const current = i === stepIndex;
              return (
                <div
                  key={s.key}
                  className="flex items-center flex-1 last:flex-none"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                        done
                          ? "bg-amber-500 text-white"
                          : current
                            ? "bg-amber-500 text-white ring-4 ring-amber-100"
                            : "bg-stone-100 text-stone-400"
                      }`}
                    >
                      {done ? (
                        <svg
                          className="w-3.5 h-3.5"
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
                      ) : (
                        i + 1
                      )}
                    </div>
                    <span
                      className={`text-xs font-semibold hidden sm:block ${current ? "text-amber-600" : done ? "text-stone-600" : "text-stone-400"}`}
                    >
                      {s.label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div
                      className={`flex-1 h-px mx-3 transition-all ${done ? "bg-amber-400" : "bg-stone-200"}`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Step heading */}
        <div>
          <div className="text-3xl mb-2">{meta.icon}</div>
          <h2 className="text-2xl font-black text-stone-900 mb-1">
            {meta.title}
          </h2>
          {meta.subtitle && (
            <p className="text-stone-500 text-sm">{meta.subtitle}</p>
          )}
        </div>

        {/* Step content */}
        {step === "email" && <StepEmail />}
        {step === "otp" && <StepOtp />}
        {step === "reset" && <StepReset />}
        {step === "success" && <StepSuccess />}
      </div>
    </FPContext.Provider>
  );
}
