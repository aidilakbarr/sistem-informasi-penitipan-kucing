"use client";

import {
  useState,
  useRef,
  useCallback,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { useRouter } from "next/navigation";
import type {
  ForgotPasswordStep,
  ForgotPasswordErrors,
} from "@/types/forgot-password";
import type { PasswordStrength } from "@/hooks/useRegisterForm";

const OTP_LENGTH = 6;

function getPasswordStrength(pw: string): PasswordStrength {
  if (!pw) return null;
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (score <= 1) return "weak";
  if (score <= 2) return "medium";
  return "strong";
}

export function useForgotPassword() {
  const router = useRouter();

  const [step, setStep] = useState<ForgotPasswordStep>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [password, setPassword] = useState("");
  const [konfirmasi, setKonfirmasi] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showKonfirmasi, setShowKonfirmasi] = useState(false);
  const [errors, setErrors] = useState<ForgotPasswordErrors>({});
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const passwordStrength = getPasswordStrength(password);

  // ── Step 1: Send email ──
  async function handleEmailSubmit(e: FormEvent) {
    e.preventDefault();
    const newErrors: ForgotPasswordErrors = {};
    if (!email) newErrors.email = "Email wajib diisi.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Format email tidak valid.";
    if (Object.keys(newErrors).length) return setErrors(newErrors);

    setLoading(true);
    setErrors({});
    try {
      // TODO: await sendOtp(email)
      await new Promise((r) => setTimeout(r, 1500));
      setStep("otp");
      startResendCooldown();
    } catch {
      setErrors({ general: "Gagal mengirim kode. Coba lagi." });
    } finally {
      setLoading(false);
    }
  }

  // ── Step 2: Verify OTP ──
  function handleOtpChange(index: number, value: string) {
    if (!/^\d?$/.test(value)) return;
    const next = [...otp];
    next[index] = value;
    setOtp(next);
    if (errors.otp) setErrors((prev) => ({ ...prev, otp: undefined }));
    if (value && index < OTP_LENGTH - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  }

  function handleOtpKeyDown(index: number, e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  }

  function handleOtpPaste(e: React.ClipboardEvent) {
    e.preventDefault();
    const digits = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);
    if (digits.length) {
      const next = [...otp];
      digits.split("").forEach((d, i) => {
        next[i] = d;
      });
      setOtp(next);
      otpRefs.current[Math.min(digits.length, OTP_LENGTH - 1)]?.focus();
    }
  }

  async function handleOtpSubmit(e: FormEvent) {
    e.preventDefault();
    const code = otp.join("");
    if (code.length < OTP_LENGTH) {
      return setErrors({ otp: "Masukkan 6 digit kode OTP." });
    }
    setLoading(true);
    setErrors({});
    try {
      // TODO: await verifyOtp(email, code)
      await new Promise((r) => setTimeout(r, 1400));
      setStep("reset");
    } catch {
      setErrors({ otp: "Kode OTP salah atau sudah kedaluwarsa." });
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    if (resendCooldown > 0) return;
    setLoading(true);
    try {
      // TODO: await sendOtp(email)
      await new Promise((r) => setTimeout(r, 1000));
      setOtp(Array(OTP_LENGTH).fill(""));
      startResendCooldown();
    } finally {
      setLoading(false);
    }
  }

  function startResendCooldown() {
    setResendCooldown(60);
    const interval = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  // ── Step 3: Reset password ──
  async function handleResetSubmit(e: FormEvent) {
    e.preventDefault();
    const newErrors: ForgotPasswordErrors = {};
    if (!password) newErrors.password = "Password baru wajib diisi.";
    else if (password.length < 8)
      newErrors.password = "Password minimal 8 karakter.";
    if (!konfirmasi)
      newErrors.konfirmasi_password = "Konfirmasi password wajib diisi.";
    else if (password !== konfirmasi)
      newErrors.konfirmasi_password = "Password tidak cocok.";
    if (Object.keys(newErrors).length) return setErrors(newErrors);

    setLoading(true);
    setErrors({});
    try {
      // TODO: await resetPassword(email, otp.join(""), password)
      await new Promise((r) => setTimeout(r, 1500));
      setStep("success");
      setTimeout(() => router.push("/login"), 3000);
    } catch {
      setErrors({ general: "Gagal mereset password. Coba lagi." });
    } finally {
      setLoading(false);
    }
  }

  const setOtpRef = useCallback(
    (index: number) => (el: HTMLInputElement | null) => {
      otpRefs.current[index] = el;
    },
    [],
  );

  return {
    step,
    email,
    setEmail,
    otp,
    otpRefs,
    setOtpRef,
    password,
    setPassword,
    konfirmasi,
    setKonfirmasi,
    showPassword,
    setShowPassword,
    showKonfirmasi,
    setShowKonfirmasi,
    errors,
    loading,
    resendCooldown,
    passwordStrength,
    handleEmailSubmit,
    handleOtpChange,
    handleOtpKeyDown,
    handleOtpPaste,
    handleOtpSubmit,
    handleResend,
    handleResetSubmit,
  };
}
