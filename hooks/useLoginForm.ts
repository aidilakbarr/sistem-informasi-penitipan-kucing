"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import type { LoginFormData, LoginFormErrors } from "@/types/auth";
import { validateLoginForm, hasErrors } from "@/lib/validation";
import { login } from "@/services/api/auth.service";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { isValidRole } from "@/utils/ValidationRules";

const INITIAL_FORM: LoginFormData = {
  email: "",
  password: "",
  rememberMe: false,
};

export function useLoginForm() {
  const router = useRouter();
  const [form, setForm] = useState<LoginFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const setAuth = useAuthStore((state) => state.setAuth);

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
      const res = await login({
        email: form.email,
        password: form.password,
      });

      setAuth(res.token, {
        id: res.user.id,
        name: res.user.name,
        role: isValidRole(res.user.role) ? res.user.role : null,
      });

      if (res.user.role === "admin") {
        router.push("/dashboard/admin");
      } else if (res.user.role === "courier") {
        router.push("/dashboard/courier");
      } else if (res.user.role === "caretaker") {
        router.push("/dashboard/caretaker");
      } else {
        router.push("/dashboard/customer");
      }
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
