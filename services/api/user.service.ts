import { apiFetch } from "@/utils/api";

export type UserRole = "ADMIN" | "CARETAKER" | "COURIER" | "CUSTOMER";

export interface User {
  id: string;
  name: string;
  email: string;
  telepon: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
  _count?: {
    cats: number;
    booking: number;
  };
}

export interface UpdateUserPayload {
  name?: string;
  email?: string;
  telepon?: string;
  role?: UserRole;
}

export async function getAllUsers(): Promise<User[]> {
  const res = await apiFetch("/users");
  return res.data;
}

export async function getUser(id: string): Promise<User> {
  const res = await apiFetch(`/users/${id}`);
  return res.data;
}

export async function updateUser(
  id: string,
  payload: UpdateUserPayload,
): Promise<User> {
  const res = await apiFetch(`/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
  return res.data;
}

export async function deleteUser(id: string): Promise<void> {
  await apiFetch(`/users/${id}`, { method: "DELETE" });
}
