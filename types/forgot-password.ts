export type ForgotPasswordStep = "email" | "otp" | "reset" | "success";

export interface ForgotPasswordEmailData {
  email: string;
}

export interface ForgotPasswordOtpData {
  otp: string[];
}

export interface ForgotPasswordResetData {
  password: string;
  konfirmasi_password: string;
}

export interface ForgotPasswordErrors {
  email?: string;
  otp?: string;
  password?: string;
  konfirmasi_password?: string;
  general?: string;
}
