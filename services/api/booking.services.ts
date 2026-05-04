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

export interface DailyLog {
  id: string;
  date: string;
  condition: string;
  activity: "AKTIF" | "NORMAL" | "LEMAS";
  isEating: boolean;
  isDrinking: boolean;
  isDefecating: boolean;
  isUrinating: boolean;
  temperature: number | null;
  isEmergency: boolean;
  note: string | null;
  photos: string[];
  bookingId: string;
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

// Caretaker: semua booking IN_CARE
export async function getInCareBookings(): Promise<Booking[]> {
  const res = await apiFetch("/bookings/in-care");
  return res.data;
}

// Daily logs per booking
export async function getDailyLogs(bookingId: string): Promise<DailyLog[]> {
  const res = await apiFetch(`/bookings/${bookingId}/daily-logs`);
  return res.data;
}

// Submit daily log dengan foto
export async function submitDailyLog(
  bookingId: string,
  payload: {
    condition: string;
    activity: string;
    isEating: boolean;
    isDrinking: boolean;
    isDefecating: boolean;
    isUrinating: boolean;
    temperature?: number;
    isEmergency: boolean;
    note?: string;
  },
  photos: File[],
): Promise<DailyLog> {
  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined) formData.append(key, String(value));
  });

  photos.forEach((file) => formData.append("photos", file));

  const res = await apiFetch(`/bookings/${bookingId}/daily-update`, {
    method: "POST",
    body: formData,
  });
  return res.data;
}
