import { apiFetch } from "@/utils/api";

export type CageType = "BASIC" | "PREMIUM" | "DELUXE";
export type CageStatus = "AVAILABLE" | "OCCUPIED" | "MAINTENANCE";

export interface CageBookingSnapshot {
  id: string;
  checkInDate: string;
  checkOutDate: string;
  status: string;
  cat: { name: string; photoUrl: string | null };
  user: { name: string };
}

export interface Cage {
  id: string;
  cageNumber: string;
  type: CageType;
  status: CageStatus;
  description: string | null;
  currentBookingId: string | null;
  booking: CageBookingSnapshot[];
  createdAt: string;
  updatedAt: string;
}

export interface CagePayload {
  cageNumber: string;
  type: CageType;
  status: CageStatus;
  description?: string;
}

export async function getCages(): Promise<Cage[]> {
  const res = await apiFetch("/cages");
  return res.data;
}

export async function getCage(id: string): Promise<Cage> {
  const res = await apiFetch(`/cages/${id}`);
  return res.data;
}

export async function createCage(payload: CagePayload): Promise<Cage> {
  const res = await apiFetch("/cages", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return res.data;
}

export async function updateCage(
  id: string,
  payload: Partial<CagePayload>,
): Promise<Cage> {
  const res = await apiFetch(`/cages/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
  return res.data;
}

export async function deleteCage(id: string): Promise<void> {
  await apiFetch(`/cages/${id}`, { method: "DELETE" });
}
