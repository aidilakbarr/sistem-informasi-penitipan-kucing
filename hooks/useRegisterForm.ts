"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/services/api/auth.service";
import { registerSchema } from "@/lib/validations/register.schema";

export function useRegisterForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    nama: "",
    email: "",
    telepon: "",
    password: "",
    konfirmasi_password: "",
    agree: false,
  });

  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showKonfirmasi, setShowKonfirmasi] = useState(false);

  const passwordStrength = form.password.length >= 8 ? "strong" : "weak";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((prev: any) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 🔥 VALIDASI ZOD
    const result = registerSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;

      setErrors({
        nama: fieldErrors.nama?.[0],
        email: fieldErrors.email?.[0],
        telepon: fieldErrors.telepon?.[0],
        password: fieldErrors.password?.[0],
        konfirmasi_password: fieldErrors.konfirmasi_password?.[0],
        agree: fieldErrors.agree?.[0],
      });

      return;
    }

    setLoading(true);
    setErrors({});

    try {
      await register({
        name: form.nama.trim(),
        email: form.email.toLowerCase(),
        password: form.password,
        confirmPassword: form.konfirmasi_password,
        telepon: form.telepon,
      });

      setSuccess(true);

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err: any) {
      if (err.errors) {
        setErrors(err.errors);
      } else {
        setErrors({ general: err.message });
      }
    } finally {
      setLoading(false);
    }
  };

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
