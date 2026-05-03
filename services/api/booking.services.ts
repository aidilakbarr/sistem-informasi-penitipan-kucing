import { apiFetch } from "@/utils/api";

export interface CreateBookingPayload {
  catId: string;
  checkInDate: string;
  checkOutDate: string;
  additionalServices: string[];
  specialNote?: string;
}

export interface BookingUser {
  id: string;
  name: string;
  email: string;
  telepon: string;
}

export interface BookingCat {
  id: string;
  name: string;
  ras: string;
  photoUrl: string | null;
  vaccinationStatus: string;
}

export interface BookingCage {
  id: string;
  cageNumber: string;
  type: string;
}

export interface BookingPayment {
  id: string;
  amount: number;
  method: string;
  status: "PENDING" | "SUCCESS" | "FAILED";
  proofOfPayment: string | null;
}

export type BookingStatus =
  | "PENDING"
  | "CONFIRMED"
  | "IN_CARE"
  | "COMPLETED"
  | "CANCELLED";

export interface Booking {
  id: string;
  checkInDate: string;
  checkOutDate: string;
  additionalServices: string[];
  specialNote: string | null;
  status: BookingStatus;
  totalPrice: number;
  catId: string;
  userId: string;
  cageId: string | null;
  cat: BookingCat;
  user: BookingUser;
  cage: BookingCage | null;
  payment: BookingPayment | null;
  createdAt: string;
  updatedAt: string;
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

export async function getAllBookings(): Promise<Booking[]> {
  const res = await apiFetch("/bookings/all");
  return res.data;
}

export async function approveBooking(
  id: string,
  cageId: string,
): Promise<Booking> {
  const res = await apiFetch(`/bookings/${id}/approve`, {
    method: "PUT",
    body: JSON.stringify({ cageId }),
  });
  return res.data;
}

export async function rejectBooking(id: string): Promise<Booking> {
  const res = await apiFetch(`/bookings/${id}/reject`, { method: "PUT" });
  return res.data;
}

export async function checkInBooking(id: string): Promise<Booking> {
  const res = await apiFetch(`/bookings/${id}/check-in`, { method: "PUT" });
  return res.data;
}

export async function checkOutBooking(id: string): Promise<Booking> {
  const res = await apiFetch(`/bookings/${id}/check-out`, { method: "PUT" });
  return res.data;
}
