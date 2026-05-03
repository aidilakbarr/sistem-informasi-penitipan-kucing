import { Cat, CatPayload } from "@/types/cat";
import { apiFetch } from "@/utils/api";

export async function getCats(): Promise<Cat[]> {
  const res = await apiFetch("/cats");
  return res.data;
}

export async function createCat(payload: FormData): Promise<Cat> {
  const res = await apiFetch("/cats", {
    method: "POST",
    body: payload,
  });
  return res.data;
}

export async function updateCat(id: string, payload: FormData): Promise<Cat> {
  const res = await apiFetch(`/cats/${id}`, {
    method: "PUT",
    body: payload,
  });
  return res.data;
}

export async function deleteCat(id: string): Promise<void> {
  await apiFetch(`/cats/${id}`, {
    method: "DELETE",
  });
}
