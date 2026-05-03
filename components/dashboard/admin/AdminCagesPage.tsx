"use client";

import { useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Save,
  RotateCcw,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  WrenchIcon,
} from "lucide-react";
import { PageHeader, Btn } from "@/components/dashboard/shared/DashboardUI";
import { useCages } from "@/hooks/UseCages";
import {
  Cage,
  CagePayload,
  CageStatus,
  CageType,
} from "@/services/api/cage.services";

// ── Types ────────────────────────────────────────────────────────────────────

const CAGE_TYPES: { value: CageType; label: string }[] = [
  { value: "BASIC", label: "Basic" },
  { value: "PREMIUM", label: "Premium" },
  { value: "DELUXE", label: "Deluxe" },
];

const CAGE_STATUSES: { value: CageStatus; label: string }[] = [
  { value: "AVAILABLE", label: "Tersedia" },
  { value: "OCCUPIED", label: "Terisi" },
  { value: "MAINTENANCE", label: "Maintenance" },
];

const EMPTY_FORM: CagePayload = {
  cageNumber: "",
  type: "BASIC",
  status: "AVAILABLE",
  description: "",
};

// ── Status Badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: CageStatus }) {
  const map: Record<
    CageStatus,
    { label: string; cls: string; icon: React.ReactNode }
  > = {
    AVAILABLE: {
      label: "Tersedia",
      cls: "bg-green-50 text-green-700 border-green-100",
      icon: <CheckCircle2 className="w-3.5 h-3.5" />,
    },
    OCCUPIED: {
      label: "Terisi",
      cls: "bg-red-50 text-red-700 border-red-100",
      icon: <X className="w-3.5 h-3.5" />,
    },
    MAINTENANCE: {
      label: "Maintenance",
      cls: "bg-amber-50 text-amber-700 border-amber-100",
      icon: <WrenchIcon className="w-3.5 h-3.5" />,
    },
  };

  const { label, cls, icon } = map[status];
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border ${cls}`}
    >
      {icon} {label}
    </span>
  );
}

// ── Type Badge ────────────────────────────────────────────────────────────────

function TypeBadge({ type }: { type: CageType }) {
  const map: Record<CageType, string> = {
    BASIC: "bg-stone-100 text-stone-600",
    PREMIUM: "bg-blue-50 text-blue-700",
    DELUXE: "bg-amber-50 text-amber-700",
  };
  return (
    <span
      className={`px-2 py-0.5 rounded-md text-[11px] font-bold uppercase ${map[type]}`}
    >
      {type}
    </span>
  );
}

// ── Toast ─────────────────────────────────────────────────────────────────────

function Toast({
  message,
  type,
  onClose,
}: {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}) {
  return (
    <div
      className={`fixed bottom-6 right-6 z-[100] flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl text-white text-sm font-semibold animate-in slide-in-from-bottom-4 fade-in duration-300 ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      }`}
    >
      {type === "success" ? (
        <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
      ) : (
        <AlertTriangle className="w-5 h-5 flex-shrink-0" />
      )}
      {message}
      <button onClick={onClose} className="ml-1 opacity-70 hover:opacity-100">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

// ── Form Modal ────────────────────────────────────────────────────────────────

function CageForm({
  initial,
  isEdit,
  submitting,
  onSave,
  onCancel,
}: {
  initial: CagePayload;
  isEdit: boolean;
  submitting: boolean;
  onSave: (data: CagePayload) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<CagePayload>(initial);
  const set = <K extends keyof CagePayload>(k: K, v: CagePayload[K]) =>
    setForm((p) => ({ ...p, [k]: v }));

  const inputCls =
    "w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10 transition-all";
  const labelCls =
    "block text-xs font-black text-stone-700 uppercase tracking-wider mb-1.5 ml-1";

  return (
    <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-[32px] w-full max-w-md shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-stone-100">
          <h2 className="font-black text-xl text-stone-900">
            {isEdit ? "Edit Kandang" : "Tambah Kandang"}
          </h2>
          <button
            onClick={onCancel}
            disabled={submitting}
            className="p-2 hover:bg-stone-100 rounded-full transition-colors text-stone-400 disabled:opacity-40"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(form);
          }}
          className="p-8 space-y-5"
        >
          <div>
            <label className={labelCls}>Nomor Kandang</label>
            <input
              required
              value={form.cageNumber}
              onChange={(e) => set("cageNumber", e.target.value)}
              placeholder="A-01"
              className={inputCls}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Tipe</label>
              <div className="relative">
                <select
                  value={form.type}
                  onChange={(e) => set("type", e.target.value as CageType)}
                  className={`${inputCls} appearance-none pr-8 cursor-pointer`}
                >
                  {CAGE_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-stone-400 text-xs">
                  ▼
                </div>
              </div>
            </div>
            <div>
              <label className={labelCls}>Status</label>
              <div className="relative">
                <select
                  value={form.status}
                  onChange={(e) => set("status", e.target.value as CageStatus)}
                  className={`${inputCls} appearance-none pr-8 cursor-pointer`}
                >
                  {CAGE_STATUSES.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-stone-400 text-xs">
                  ▼
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className={labelCls}>Deskripsi</label>
            <textarea
              rows={3}
              value={form.description ?? ""}
              onChange={(e) => set("description", e.target.value)}
              placeholder="Fasilitas, ukuran, atau catatan kandang..."
              className={`${inputCls} resize-none`}
            />
          </div>

          <div className="flex gap-3 pt-2 border-t border-stone-100">
            <Btn
              type="submit"
              disabled={submitting}
              className="flex-1 justify-center py-3.5 rounded-xl disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Menyimpan...
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
              className="flex-1 justify-center py-3.5 rounded-xl disabled:opacity-60"
            >
              <RotateCcw className="w-4 h-4 mr-2" /> Batal
            </Btn>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Cage Card ─────────────────────────────────────────────────────────────────

function CageCard({
  cage,
  onEdit,
  onDelete,
  isDeleting,
}: {
  cage: Cage;
  onEdit: () => void;
  onDelete: () => void;
  isDeleting: boolean;
}) {
  const activeBooking = cage.booking?.[0];

  return (
    <div
      className={`bg-white rounded-2xl border border-stone-100 p-5 hover:border-amber-200 hover:shadow-md transition-all relative group ${
        isDeleting ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      {isDeleting && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/70 rounded-2xl z-10">
          <div className="flex flex-col items-center gap-1.5">
            <Loader2 className="w-7 h-7 text-red-400 animate-spin" />
            <span className="text-xs font-semibold text-red-400">
              Menghapus...
            </span>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="absolute top-4 right-4 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={onEdit}
          className="w-8 h-8 bg-stone-50 rounded-lg flex items-center justify-center text-stone-500 hover:bg-amber-50 hover:text-amber-600 transition-colors border border-stone-100"
        >
          <Pencil className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={onDelete}
          className="w-8 h-8 bg-stone-50 rounded-lg flex items-center justify-center text-stone-500 hover:bg-red-50 hover:text-red-600 transition-colors border border-stone-100"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Cage number + type */}
      <div className="flex items-start gap-3 mb-3 pr-20">
        <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center flex-shrink-0 border border-amber-100">
          <span className="text-lg font-black text-amber-600">
            {cage.cageNumber}
          </span>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <TypeBadge type={cage.type} />
          </div>
          <StatusBadge status={cage.status} />
        </div>
      </div>

      {/* Description */}
      {cage.description && (
        <p className="text-xs text-stone-500 mb-3 leading-relaxed line-clamp-2">
          {cage.description}
        </p>
      )}

      {/* Active booking info */}
      {activeBooking && (
        <div className="bg-red-50 rounded-xl p-3 border border-red-100 mt-2">
          <p className="text-[10px] font-black text-red-600 uppercase tracking-wide mb-1">
            Sedang Ditempati
          </p>
          <p className="text-xs font-semibold text-red-800">
            🐱 {activeBooking.cat?.name ?? "-"}
          </p>
          <p className="text-[11px] text-red-600 mt-0.5">
            {new Date(activeBooking.checkInDate).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "short",
            })}{" "}
            –{" "}
            {new Date(activeBooking.checkOutDate).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
      )}
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export function AdminCagesPage() {
  const { cages, loading, addCage, editCage, removeCage } = useCages();

  const [showForm, setShowForm] = useState(false);
  const [editTarget, setEditTarget] = useState<Cage | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") =>
    setToast({ message, type });

  // Stats
  const total = cages.length;
  const available = cages.filter((c) => c.status === "AVAILABLE").length;
  const occupied = cages.filter((c) => c.status === "OCCUPIED").length;
  const maintenance = cages.filter((c) => c.status === "MAINTENANCE").length;

  async function handleSave(data: CagePayload) {
    try {
      setSubmitting(true);
      if (editTarget) {
        await editCage(editTarget.id, data);
        showToast(`Kandang ${data.cageNumber} berhasil diperbarui!`);
      } else {
        await addCage(data);
        showToast(`Kandang ${data.cageNumber} berhasil ditambahkan!`);
      }
      setShowForm(false);
      setEditTarget(null);
    } catch (err: any) {
      showToast(err?.message ?? "Terjadi kesalahan.", "error");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(cage: Cage) {
    try {
      setDeletingId(cage.id);
      await removeCage(cage.id);
      showToast(`Kandang ${cage.cageNumber} berhasil dihapus.`);
    } catch (err: any) {
      showToast(err?.message ?? "Gagal menghapus kandang.", "error");
    } finally {
      setDeletingId(null);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 gap-3 text-stone-400">
        <Loader2 className="w-6 h-6 animate-spin" />
        <span className="text-sm font-medium">Memuat data kandang...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-20">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <PageHeader
        title="Manajemen Kandang"
        subtitle={`${total} kandang terdaftar`}
        action={
          <Btn
            onClick={() => {
              setEditTarget(null);
              setShowForm(true);
            }}
          >
            <Plus className="w-4 h-4 mr-1.5" /> Tambah Kandang
          </Btn>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total", value: total, cls: "bg-stone-50 text-stone-800" },
          {
            label: "Tersedia",
            value: available,
            cls: "bg-green-50 text-green-700",
          },
          { label: "Terisi", value: occupied, cls: "bg-red-50 text-red-700" },
          {
            label: "Maintenance",
            value: maintenance,
            cls: "bg-amber-50 text-amber-700",
          },
        ].map(({ label, value, cls }) => (
          <div
            key={label}
            className={`rounded-2xl p-4 text-center border border-stone-100 ${cls}`}
          >
            <p className="text-2xl font-black mb-0.5">{value}</p>
            <p className="text-xs font-bold uppercase tracking-wide opacity-70">
              {label}
            </p>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {cages.length === 0 ? (
        <div className="bg-white rounded-[40px] border-2 border-dashed border-stone-200 p-20 text-center">
          <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-5">
            <WrenchIcon className="w-10 h-10 text-stone-300" />
          </div>
          <h3 className="text-xl font-black text-stone-800 mb-2">
            Belum ada kandang
          </h3>
          <p className="text-stone-500 text-sm mb-8 max-w-xs mx-auto">
            Tambahkan kandang untuk mulai menerima booking penitipan.
          </p>
          <Btn onClick={() => setShowForm(true)} className="px-8">
            <Plus className="w-5 h-5 mr-2" /> Tambah Kandang Pertama
          </Btn>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cages.map((cage) => (
            <CageCard
              key={cage.id}
              cage={cage}
              isDeleting={deletingId === cage.id}
              onEdit={() => {
                setEditTarget(cage);
                setShowForm(true);
              }}
              onDelete={() => handleDelete(cage)}
            />
          ))}
        </div>
      )}

      {showForm && (
        <CageForm
          initial={
            editTarget
              ? {
                  cageNumber: editTarget.cageNumber,
                  type: editTarget.type,
                  status: editTarget.status,
                  description: editTarget.description ?? "",
                }
              : EMPTY_FORM
          }
          isEdit={!!editTarget}
          submitting={submitting}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditTarget(null);
          }}
        />
      )}
    </div>
  );
}
