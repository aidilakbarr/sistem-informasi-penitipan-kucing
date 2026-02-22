"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import type { LoginFormData, LoginFormErrors } from "@/types/auth";
import { validateLoginForm, hasErrors } from "@/lib/validation";

const INITIAL_FORM: LoginFormData = {
  email: "",
  password: "",
  rememberMe: false,
};

export function useLoginForm() {
  const [form, setForm] = useState<LoginFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear field error on change
    if (errors[name as keyof LoginFormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const validationErrors = validateLoginForm(form);
    if (hasErrors(validationErrors)) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // TODO: ganti dengan API call sesungguhnya
      // await signIn(form.email, form.password)
      await new Promise((res) => setTimeout(res, 1500)); // simulasi loading
      // redirect ke dashboard setelah login sukses
      window.location.href = "/dashboard";
    } catch {
      setErrors({ general: "Email atau password salah. Silakan coba lagi." });
    } finally {
      setIsLoading(false);
    }
  }

  return {
    form,
    errors,
    isLoading,
    showPassword,
    setShowPassword,
    handleChange,
    handleSubmit,
  };
}
