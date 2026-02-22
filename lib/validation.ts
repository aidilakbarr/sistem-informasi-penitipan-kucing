import type { LoginFormData, LoginFormErrors } from "@/types/auth";

export function validateLoginForm(form: LoginFormData): LoginFormErrors {
  const errors: LoginFormErrors = {};

  if (!form.email) {
    errors.email = "Email wajib diisi.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Format email tidak valid.";
  }

  if (!form.password) {
    errors.password = "Password wajib diisi.";
  } else if (form.password.length < 6) {
    errors.password = "Password minimal 6 karakter.";
  }

  return errors;
}

export function hasErrors(errors: LoginFormErrors): boolean {
  return Object.keys(errors).length > 0;
}
