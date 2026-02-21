"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import type { BookingFormData } from "@/types";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const INITIAL_FORM: BookingFormData = {
  nama: "",
  kucing: "",
  tanggal_masuk: "",
  tanggal_keluar: "",
  paket: "",
  catatan: "",
};

export function useBookingForm() {
  const [form, setForm] = useState<BookingFormData>(INITIAL_FORM);

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const url = buildWhatsAppUrl(form);
    window.open(url, "_blank");
  }

  function resetForm() {
    setForm(INITIAL_FORM);
  }

  return { form, handleChange, handleSubmit, resetForm };
}
