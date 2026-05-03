import { apiFetch } from "@/utils/api";

export type PaymentMethod = "COD" | "TRANSFER";
export type PaymentStatus = "PENDING" | "SUCCESS" | "FAILED";

export interface PaymentBooking {
  id: string;
  checkInDate: string;
  checkOutDate: string;
  status: string;
  totalPrice: number;
  cat: { id: string; name: string; photoUrl: string | null };
  user: { id: string; name: string; email: string; telepon: string };
  cage: { id: string; cageNumber: string } | null;
}

export interface Payment {
  id: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  proofOfPayment: string | null;
  adminNote: string | null;
  bookingId: string;
  booking: PaymentBooking;
  createdAt: string;
  updatedAt: string;
}

// Customer: ambil payment saya
export async function getMyPayments(): Promise<Payment[]> {
  const res = await apiFetch("/payments/my");
  return res.data;
}

// Customer: submit COD
export async function payCOD(bookingId: string): Promise<Payment> {
  const res = await apiFetch("/payments/pay", {
    method: "POST",
    body: JSON.stringify({ bookingId, method: "COD" }),
  });
  return res.data;
}

// Customer: submit bukti transfer
export async function payTransfer(
  bookingId: string,
  proofFile: File,
): Promise<Payment> {
  const formData = new FormData();
  formData.append("bookingId", bookingId);
  formData.append("method", "TRANSFER");
  formData.append("proofOfPayment", proofFile);

  const res = await apiFetch("/payments/pay", {
    method: "POST",
    body: formData,
  });
  return res.data;
}

// Admin: ambil semua payment
export async function getAllPayments(): Promise<Payment[]> {
  const res = await apiFetch("/payments");
  return res.data;
}

// Admin: verifikasi payment
export async function verifyPayment(
  paymentId: string,
  status: "SUCCESS" | "FAILED",
  adminNote?: string,
): Promise<Payment> {
  const res = await apiFetch(`/payments/verify/${paymentId}`, {
    method: "PUT",
    body: JSON.stringify({ status, adminNote }),
  });
  return res.data;
}
