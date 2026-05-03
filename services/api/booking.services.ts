import { apiFetch } from "@/utils/api";

export interface CreateBookingPayload {
  catId: string;
  checkInDate: string;
  checkOutDate: string;
  additionalServices: string[];
  specialNote?: string;
}

export interface Booking {
  id: string;
  catId: string;
  checkInDate: string;
  checkOutDate: string;
  status: "PENDING" | "CONFIRMED" | "IN_CARE" | "COMPLETED" | "CANCELLED";
  totalPrice: number;
  additionalServices: string[];
  specialNote?: string;
  createdAt: string;
}

export async function createBooking(
  payload: CreateBookingPayload,
): Promise<Booking> {
  const res = await apiFetch("/bookings", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return res.data;
}

export async function getBookings(): Promise<Booking[]> {
  const res = await apiFetch("/bookings");
  return res.data;
}
