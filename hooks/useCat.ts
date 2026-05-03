"use client";

import {
  createCat,
  deleteCat,
  getCats,
  updateCat,
} from "@/services/api/cat.service";
import { Cat, CatPayload } from "@/types/cat";
import { useEffect, useState } from "react";

export function useCats() {
  const [cats, setCats] = useState<Cat[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔹 GET
  useEffect(() => {
    fetchCats();
  }, []);

  async function fetchCats() {
    try {
      const data = await getCats();
      setCats(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // 🔹 CREATE
  async function addCat(payload: FormData) {
    try {
      const newCat = await createCat(payload);
      setCats((prev) => [...prev, newCat]);
    } catch (err) {
      console.error(err);
      alert("Gagal tambah data");
    }
  }

  // 🔹 UPDATE
  async function editCat(id: string, payload: FormData) {
    try {
      const updated = await updateCat(id, payload);
      setCats((prev) => prev.map((c) => (c.id === id ? updated : c)));
    } catch (err) {
      console.error(err);
      alert("Gagal update data");
    }
  }

  // 🔹 DELETE
  async function removeCat(id: string) {
    try {
      await deleteCat(id);
      setCats((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error(err);
      alert("Gagal hapus data");
    }
  }

  return {
    cats,
    loading,
    addCat,
    editCat,
    removeCat,
  };
}
