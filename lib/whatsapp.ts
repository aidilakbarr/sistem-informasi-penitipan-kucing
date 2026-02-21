import type { BookingFormData } from "@/types";
import { WHATSAPP_NUMBER } from "@/lib/constants";

export function buildWhatsAppUrl(form: BookingFormData): string {
  const message = [
    "Halo KucingKu! Saya ingin memesan penitipan kucing 🐾",
    "",
    `Nama: ${form.nama}`,
    `Nama Kucing: ${form.kucing}`,
    `Tanggal Masuk: ${form.tanggal_masuk}`,
    `Tanggal Keluar: ${form.tanggal_keluar}`,
    `Paket: ${form.paket}`,
    `Catatan: ${form.catatan || "-"}`,
  ].join("\n");

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
