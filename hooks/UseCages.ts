"use client";

import { useEffect, useState } from "react";
import {
  getCages,
  createCage,
  updateCage,
  deleteCage,
  Cage,
  CagePayload,
} from "@/services/api/cage.services";

export function useCages() {
  const [cages, setCages] = useState<Cage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCages();
  }, []);

  async function fetchCages() {
    try {
      const data = await getCages();
      setCages(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function addCage(payload: CagePayload): Promise<void> {
    const newCage = await createCage(payload);
    setCages((prev) => [...prev, newCage]);
  }

  async function editCage(
    id: string,
    payload: Partial<CagePayload>,
  ): Promise<void> {
    const updated = await updateCage(id, payload);
    setCages((prev) => prev.map((c) => (c.id === id ? updated : c)));
  }

  async function removeCage(id: string): Promise<void> {
    await deleteCage(id);
    setCages((prev) => prev.filter((c) => c.id !== id));
  }

  return { cages, loading, addCage, editCage, removeCage, fetchCages };
}
