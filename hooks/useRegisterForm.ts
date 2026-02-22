"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { RegisterFormData, RegisterFormErrors } from "@/types/register";

const INITIAL_FORM: RegisterFormData = {
  nama: "",
  email: "",
  telepon: "",
  password: "",
  konfirmasi_password: "",
  agree: false,
};

export type PasswordStrength = "weak" | "medium" | "strong" | null;

function getPasswordStrength(password: string): PasswordStrength {
  if (!password) return null;
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  if (score <= 1) return "weak";
  if (score <= 2) return "medium";
  return "strong";
}

export function useRegisterForm() {
  const router = useRouter();
  const [form, setForm] = useState<RegisterFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<RegisterFormErrors>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showKonfirmasi, setShowKonfirmasi] = useState(false);
  const [success, setSuccess] = useState(false);

  const passwordStrength = getPasswordStrength(form.password);

  function validate(): boolean {
    const newErrors: RegisterFormErrors = {};

    if (!form.nama.trim()) {
      newErrors.nama = "Nama lengkap wajib diisi.";
    } else if (form.nama.trim().length < 3) {
      newErrors.nama = "Nama minimal 3 karakter.";
    }

    if (!form.email) {
      newErrors.email = "Email wajib diisi.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Format email tidak valid.";
    }

    if (!form.telepon) {
      newErrors.telepon = "Nomor telepon wajib diisi.";
    } else if (
      !/^(\+62|62|0)8[1-9][0-9]{6,10}$/.test(form.telepon.replace(/\s/g, ""))
    ) {
      newErrors.telepon = "Format nomor HP tidak valid (contoh: 08123456789).";
    }

    if (!form.password) {
      newErrors.password = "Password wajib diisi.";
    } else if (form.password.length < 8) {
      newErrors.password = "Password minimal 8 karakter.";
    }

    if (!form.konfirmasi_password) {
      newErrors.konfirmasi_password = "Konfirmasi password wajib diisi.";
    } else if (form.password !== form.konfirmasi_password) {
      newErrors.konfirmasi_password = "Password tidak cocok.";
    }

    if (!form.agree) {
      newErrors.agree = "Anda harus menyetujui syarat & ketentuan.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name as keyof RegisterFormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setErrors({});

    try {
      // TODO: Replace with actual API call
      // await registerUser({ nama: form.nama, email: form.email, telepon: form.telepon, password: form.password });
      await new Promise((resolve) => setTimeout(resolve, 1800));

      setSuccess(true);
      setTimeout(() => router.push("/auth/login"), 2500);
    } catch {
      setErrors({
        general: "Pendaftaran gagal. Email mungkin sudah terdaftar.",
      });
    } finally {
      setLoading(false);
    }
  }

  return {
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
  };
}
