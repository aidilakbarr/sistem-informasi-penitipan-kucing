"use client";

import { useEffect, useState } from "react";
import {
  Cat,
  Plus,
  Pencil,
  Trash2,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Camera,
  X,
  Save,
  RotateCcw,
  Loader2,
} from "lucide-react";
import {
  PageHeader,
  Btn,
  Alert,
} from "@/components/dashboard/shared/DashboardUI";
import { useCats } from "@/hooks/useCat";
import type { Cat as CatType } from "@/types/cat";

// ─── Toast ────────────────────────────────────────────────────────────────────

type ToastType = "success" | "error";

function Toast({
  message,
  type,
  onClose,
}: {
  message: string;
  type: ToastType;
  onClose: () => void;
}) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-6 right-6 z-[100] flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl text-white text-sm font-semibold animate-in slide-in-from-bottom-4 fade-in duration-300 ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      }`}
    >
      {type === "success" ? (
        <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
      ) : (
        <XCircle className="w-5 h-5 flex-shrink-0" />
      )}
      {message}
      <button onClick={onClose} className="ml-1 opacity-70 hover:opacity-100">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

// ─── Form State ───────────────────────────────────────────────────────────────

const EMPTY_FORM = {
  name: "",
  ras: "",
  age: "",
  weight: "",
  medicalHistory: "",
  specialNote: "",
  vaccinationStatus: false,
  vaccineExpirationDate: "",
};

const CAT_RAS = [
  { value: "persia", label: "Persia" },
  { value: "siamase", label: "Siamese" },
  { value: "scottish_fold", label: "Scottish Fold" },
  { value: "maine_coon", label: "Maine Coon" },
  { value: "anggora", label: "Anggora" },
  { value: "bengal", label: "Bengal" },
  { value: "siberian", label: "Siberian" },
  { value: "sphynx", label: "Sphynx" },
  { value: "russian_blue", label: "Russian Blue" },
  { value: "british_shorthair", label: "British Shorthair" },
];

type FormState = typeof EMPTY_FORM;

// ─── Cat Card ─────────────────────────────────────────────────────────────────

function CatCard({
  cat,
  onEdit,
  onDelete,
  isDeleting,
}: {
  cat: CatType;
  onEdit: () => void;
  onDelete: () => void;
  isDeleting: boolean;
}) {
  const vaccExpired = cat.vaccineExpirationDate
    ? new Date(cat.vaccineExpirationDate) < new Date()
    : false;

  return (
    <div
      className={`bg-white rounded-2xl border border-stone-100 overflow-hidden hover:border-amber-200 hover:shadow-md transition-all group relative ${
        isDeleting ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      {/* Delete loading overlay */}
      {isDeleting && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70 rounded-2xl">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="w-8 h-8 text-red-400 animate-spin" />
            <span className="text-xs font-semibold text-red-400">
              Menghapus...
            </span>
          </div>
        </div>
      )}

      {/* Photo area */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 h-36 flex items-center justify-center relative">
        {cat.photoUrl ? (
          <img src={cat.photoUrl} className="w-full h-full object-cover" />
        ) : (
          <Cat className="w-16 h-16 text-amber-200" />
        )}
        <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={onEdit}
            className="w-8 h-8 bg-white rounded-lg shadow-sm flex items-center justify-center text-stone-600 hover:bg-amber-50 hover:text-amber-600 transition-colors"
            aria-label="Edit"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            className="w-8 h-8 bg-white rounded-lg shadow-sm flex items-center justify-center text-stone-600 hover:bg-red-50 hover:text-red-600 transition-colors"
            aria-label="Hapus"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-black text-stone-900 text-lg mb-0.5">{cat.name}</h3>
        <p className="text-sm text-stone-500 mb-3 font-medium">{cat.ras}</p>

        <div className="grid grid-cols-2 gap-2 mb-3">
          {[
            { label: "Umur", value: `${cat.age} thn` },
            { label: "Berat", value: `${cat.weight} kg` },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="bg-stone-50 rounded-xl p-2 text-center border border-stone-100"
            >
              <p className="text-[10px] text-stone-400 font-bold uppercase tracking-tighter">
                {label}
              </p>
              <p className="font-black text-stone-800 text-sm">{value}</p>
            </div>
          ))}
        </div>

        <div
          className={`flex items-center gap-2.5 p-2.5 rounded-xl mb-3 border ${
            cat.vaccinationStatus === "not_vaccinated"
              ? "bg-red-50 border-red-100 text-red-700"
              : vaccExpired
                ? "bg-amber-50 border-amber-100 text-amber-700"
                : "bg-green-50 border-green-100 text-green-700"
          }`}
        >
          <div className="flex-shrink-0">
            {cat.vaccinationStatus === "not_vaccinated" ? (
              <XCircle className="w-5 h-5" />
            ) : vaccExpired ? (
              <AlertTriangle className="w-5 h-5" />
            ) : (
              <CheckCircle2 className="w-5 h-5" />
            )}
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-black uppercase leading-none mb-1">
              {cat.vaccinationStatus === "not_vaccinated"
                ? "Belum Vaksin"
                : vaccExpired
                  ? "Vaksin Expired"
                  : "Vaksin Aktif"}
            </p>
            {cat.vaccineExpirationDate && (
              <p className="text-[10px] opacity-70 font-medium">
                Sampai:{" "}
                {new Date(cat.vaccineExpirationDate).toLocaleDateString(
                  "id-ID",
                  {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  },
                )}
              </p>
            )}
          </div>
        </div>

        {cat.medicalHistory && cat.medicalHistory !== "-" && (
          <div className="mb-3">
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wide mb-1">
              Riwayat Penyakit
            </p>
            <p className="text-xs text-stone-600 bg-stone-50 rounded-lg px-2.5 py-1.5 border border-stone-100">
              {cat.medicalHistory}
            </p>
          </div>
        )}

        {cat.specialNote && (
          <div>
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wide mb-1">
              Catatan
            </p>
            <p className="text-xs text-stone-500 italic leading-relaxed">
              "{cat.specialNote}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Modal Form ───────────────────────────────────────────────────────────────

function CatForm({
  initial,
  onSave,
  onCancel,
  isEdit,
  submitting,
}: {
  initial: FormState;
  onSave: (f: FormState, photo: File | null) => void;
  onCancel: () => void;
  isEdit: boolean;
  submitting: boolean;
}) {
  const [form, setForm] = useState<FormState>(initial);
  const set = (k: keyof FormState, v: string | boolean) =>
    setForm((p) => ({ ...p, [k]: v }));

  const [photo, setPhoto] = useState<File | null>(null);

  const inputCls =
    "w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10 transition-all";
  const labelCls =
    "block text-xs font-black text-stone-700 uppercase tracking-wider mb-1.5 ml-1";

  useEffect(() => {
    setForm(initial);
  }, [initial]);

  return (
    <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-[32px] w-full max-w-lg shadow-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-8 py-6 border-b border-stone-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
              <Cat className="w-5 h-5" />
            </div>
            <h2 className="font-black text-xl text-stone-900">
              {isEdit ? "Update Data Kucing" : "Tambah Kucing Baru"}
            </h2>
          </div>
          <button
            onClick={onCancel}
            disabled={submitting}
            className="p-2 hover:bg-stone-100 rounded-full transition-colors text-stone-400 disabled:opacity-40"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(form, photo);
          }}
          className="p-8 space-y-5 overflow-y-auto"
        >
          <div className="flex items-center gap-5 p-4 bg-amber-50/50 rounded-2xl border border-dashed border-amber-200">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center text-amber-300 border border-amber-100 shadow-sm flex-shrink-0 overflow-hidden">
              {photo ? (
                <img
                  src={URL.createObjectURL(photo)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Camera className="w-8 h-8" />
              )}
            </div>
            <div>
              <label className="text-sm font-black text-amber-600 cursor-pointer flex items-center gap-1.5">
                <Plus className="w-4 h-4" /> Upload Foto
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setPhoto(file);
                  }}
                />
              </label>
              <p className="text-[11px] text-stone-400 mt-1 font-medium">
                Format JPG atau PNG, Maks 5MB.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 sm:col-span-1">
              <label className={labelCls}>Nama Kucing</label>
              <input
                required
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="Mochi"
                className={inputCls}
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className={labelCls}>Ras</label>
              <div className="relative">
                <select
                  required
                  value={form.ras}
                  onChange={(e) => set("ras", e.target.value)}
                  className="w-full appearance-none bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 pr-10 text-sm focus:outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10 transition-all cursor-pointer"
                >
                  <option value="">Pilih Ras Kucing</option>
                  {CAT_RAS.map((b) => (
                    <option key={b.value} value={b.value}>
                      {b.label}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-stone-400">
                  ▼
                </div>
              </div>
            </div>
            <div>
              <label className={labelCls}>Umur (Tahun)</label>
              <input
                required
                type="number"
                step="0.5"
                value={form.age}
                onChange={(e) => set("age", e.target.value)}
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Berat (KG)</label>
              <input
                required
                type="number"
                step="0.1"
                value={form.weight}
                onChange={(e) => set("weight", e.target.value)}
                className={inputCls}
              />
            </div>
          </div>

          <div>
            <label className={labelCls}>Riwayat Medis</label>
            <textarea
              rows={2}
              value={form.medicalHistory}
              onChange={(e) => set("medicalHistory", e.target.value)}
              placeholder="Sebutkan jika ada alergi atau penyakit..."
              className={`${inputCls} resize-none`}
            />
          </div>

          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-100">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <CheckCircle2
                  className={`w-5 h-5 ${form.vaccinationStatus ? "text-green-500" : "text-stone-300"}`}
                />
                <span className="text-sm font-bold text-stone-700">
                  Sudah Vaksin?
                </span>
              </div>
              <button
                type="button"
                onClick={() =>
                  set("vaccinationStatus", !form.vaccinationStatus)
                }
                className={`w-12 h-6 rounded-full transition-all relative ${form.vaccinationStatus ? "bg-amber-500" : "bg-stone-300"}`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${form.vaccinationStatus ? "left-7" : "left-1"}`}
                />
              </button>
            </div>
            {form.vaccinationStatus && (
              <div className="pt-3 border-t border-stone-200 mt-3 animate-in fade-in slide-in-from-top-1">
                <label className={labelCls}>Tanggal Kadaluarsa Vaksin</label>
                <input
                  type="date"
                  value={
                    form.vaccineExpirationDate
                      ? form.vaccineExpirationDate.split("T")[0]
                      : ""
                  }
                  onChange={(e) => set("vaccineExpirationDate", e.target.value)}
                  className={inputCls}
                />
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-4 border-t border-stone-100">
            <Btn
              type="submit"
              disabled={submitting}
              className="flex-1 justify-center py-4 rounded-xl shadow-lg shadow-amber-200 disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {isEdit ? "Menyimpan..." : "Menambahkan..."}
                </>
              ) : isEdit ? (
                <>
                  <Save className="w-4 h-4 mr-2" /> Simpan
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" /> Tambah
                </>
              )}
            </Btn>
            <Btn
              variant="secondary"
              onClick={onCancel}
              disabled={submitting}
              className="flex-1 justify-center py-4 rounded-xl border-stone-200 disabled:opacity-60"
            >
              <RotateCcw className="w-4 h-4 mr-2" /> Batal
            </Btn>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export function CustomerCatsPage() {
  const { cats, loading, addCat, editCat, removeCat } = useCats();

  const [showForm, setShowForm] = useState(false);
  const [editTarget, setEditTarget] = useState<CatType | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Toast state
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const showToast = (
    message: string,
    type: "success" | "error" = "success",
  ) => {
    setToast({ message, type });
  };

  const unvaccinated = cats.filter(
    (c) => c.vaccinationStatus === "not_vaccinated",
  ).length;

  // ─── SAVE (CREATE / UPDATE) ─────────────────────────

  async function handleSave(form: typeof EMPTY_FORM, photo: File | null) {
    try {
      setSubmitting(true);

      const vaccinationStatus = form.vaccinationStatus
        ? "vaccinated"
        : "not_vaccinated";

      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("ras", form.ras.trim().toLowerCase());
      formData.append("age", String(Number(form.age)));
      formData.append("weight", String(Number(form.weight)));
      formData.append("medicalHistory", form.medicalHistory || "-");

      formData.append("vaccinationStatus", vaccinationStatus);

      if (form.vaccineExpirationDate) {
        formData.append("vaccineExpirationDate", form.vaccineExpirationDate);
      }

      if (photo) {
        formData.append("photo", photo);
      }

      if (editTarget) {
        const res = await editCat(editTarget.id, formData);
        if (res?.success !== false) {
          showToast(`Data ${form.name} berhasil diperbarui!`);
        } else {
          showToast(res?.err.message, "error");
        }
      } else {
        const res = await addCat(formData);
        if (res?.success !== false) {
          showToast(`${form.name} berhasil ditambahkan!`);
        } else {
          showToast(res?.err.message, "error");
        }
      }

      setShowForm(false);
      setEditTarget(null);
    } catch (err) {
      console.log(err);
      showToast("Terjadi kesalahan, coba lagi.", "error");
    } finally {
      setSubmitting(false);
    }
  }

  // ─── DELETE ─────────────────────────────────────────

  async function handleDelete(id: string, name: string) {
    try {
      setDeletingId(id);
      await removeCat(id);
      showToast(`${name} berhasil dihapus.`);
    } catch (err) {
      console.error(err);
      showToast("Gagal menghapus data.", "error");
    } finally {
      setDeletingId(null);
    }
  }

  // ─── LOADING STATE ──────────────────────────────────

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 gap-3 text-stone-400">
        <Loader2 className="w-6 h-6 animate-spin" />
        <span className="text-sm font-medium">Memuat data...</span>
      </div>
    );
  }

  // ─── UI ─────────────────────────────────────────────

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-20">
      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* HEADER */}
      <PageHeader
        title="Kucing Saya"
        subtitle={`${cats.length} kucing terdaftar di AnZ Pet Care`}
        action={
          <Btn
            onClick={() => {
              setEditTarget(null);
              setShowForm(true);
            }}
          >
            <Plus className="w-5 h-5 mr-1" /> Tambah Kucing
          </Btn>
        }
      />

      {unvaccinated > 0 && (
        <Alert
          type="warning"
          msg={`${unvaccinated} kucing belum divaksin. Syarat penitipan wajib vaksin ya!`}
          icon={<AlertTriangle className="w-4 h-4" />}
        />
      )}

      {/* EMPTY STATE */}
      {cats.length === 0 ? (
        <div className="bg-white rounded-[40px] border-2 border-dashed border-stone-200 p-20 text-center">
          <div className="w-24 h-24 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Cat className="w-12 h-12 text-stone-300" />
          </div>
          <h3 className="text-xl font-black text-stone-800 mb-2">
            Kucingnya masih kosong...
          </h3>
          <p className="text-stone-500 text-sm mb-8 max-w-xs mx-auto">
            Tambahkan kucing Anda sekarang untuk mulai menikmati layanan
            penitipan terbaik.
          </p>
          <Btn onClick={() => setShowForm(true)} className="px-8">
            <Plus className="w-5 h-5 mr-2" /> Daftarkan Kucing Pertama
          </Btn>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cats.map((cat) => (
            <CatCard
              key={cat.id}
              cat={cat}
              isDeleting={deletingId === cat.id}
              onEdit={() => {
                setEditTarget(cat);
                setShowForm(true);
              }}
              onDelete={() => handleDelete(cat.id, cat.name)}
            />
          ))}
        </div>
      )}

      {/* FORM MODAL */}
      {showForm && (
        <CatForm
          initial={
            editTarget
              ? {
                  ...editTarget,
                  age: String(editTarget.age),
                  weight: String(editTarget.weight),
                  specialNote: editTarget.specialNote ?? "",
                  vaccineExpirationDate: editTarget.vaccineExpirationDate ?? "",
                  vaccinationStatus:
                    editTarget.vaccinationStatus === "vaccinated",
                }
              : EMPTY_FORM
          }
          isEdit={!!editTarget}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditTarget(null);
          }}
          submitting={submitting}
        />
      )}
    </div>
  );
}
