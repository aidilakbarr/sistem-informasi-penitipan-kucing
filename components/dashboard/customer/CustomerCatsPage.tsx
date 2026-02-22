"use client";

import { useState } from "react";
import { PageHeader, SectionCard, Btn, Alert } from "@/components/dashboard/shared/DashboardUI";
import { MOCK_CATS } from "@/lib/mock-data";
import type { Cat } from "@/types/dashboard";

// ─── Form State ───────────────────────────────────────────────────────────────

const EMPTY_FORM = {
  name: "", breed: "", age: "", weight: "",
  diseaseHistory: "", notes: "",
  vaccinationStatus: false, vaccinationExpiry: "",
};

type FormState = typeof EMPTY_FORM;

// ─── Cat Card ─────────────────────────────────────────────────────────────────

function CatCard({ cat, onEdit, onDelete }: { cat: Cat; onEdit: () => void; onDelete: () => void }) {
  const vaccExpired = cat.vaccinationExpiry
    ? new Date(cat.vaccinationExpiry) < new Date()
    : false;

  return (
    <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden hover:border-amber-200 hover:shadow-sm transition-all">
      {/* Photo area */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 h-36 flex items-center justify-center relative">
        <span className="text-6xl select-none">🐱</span>
        <div className="absolute top-3 right-3 flex gap-1.5">
          <button
            onClick={onEdit}
            className="w-7 h-7 bg-white rounded-lg shadow-sm flex items-center justify-center text-sm text-stone-600 hover:bg-amber-50 transition-colors"
            aria-label="Edit"
          >✏️</button>
          <button
            onClick={onDelete}
            className="w-7 h-7 bg-white rounded-lg shadow-sm flex items-center justify-center text-sm text-stone-600 hover:bg-red-50 transition-colors"
            aria-label="Hapus"
          >🗑️</button>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-black text-stone-900 text-lg mb-0.5">{cat.name}</h3>
        <p className="text-sm text-stone-500 mb-3">{cat.breed}</p>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          {[
            { label: "Umur", value: `${cat.age} tahun` },
            { label: "Berat", value: `${cat.weight} kg` },
          ].map(({ label, value }) => (
            <div key={label} className="bg-stone-50 rounded-xl p-2.5 text-center">
              <p className="text-[10px] text-stone-400 font-medium">{label}</p>
              <p className="font-bold text-stone-800 text-sm">{value}</p>
            </div>
          ))}
        </div>

        {/* Vaccination */}
        <div className={`flex items-center gap-2 p-2.5 rounded-xl mb-3 ${
          !cat.vaccinationStatus        ? "bg-red-50 border border-red-100"
          : vaccExpired                 ? "bg-amber-50 border border-amber-100"
                                        : "bg-green-50 border border-green-100"
        }`}>
          <span className="text-base">
            {!cat.vaccinationStatus ? "❌" : vaccExpired ? "⚠️" : "✅"}
          </span>
          <div className="min-w-0">
            <p className={`text-xs font-bold ${
              !cat.vaccinationStatus ? "text-red-700" : vaccExpired ? "text-amber-700" : "text-green-700"
            }`}>
              {!cat.vaccinationStatus ? "Belum Vaksin" : vaccExpired ? "Vaksin Kadaluarsa" : "Vaksin Valid"}
            </p>
            {cat.vaccinationExpiry && (
              <p className="text-[10px] text-stone-400">
                Exp: {new Date(cat.vaccinationExpiry).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
              </p>
            )}
          </div>
        </div>

        {/* Disease history */}
        {cat.diseaseHistory && cat.diseaseHistory !== "-" && (
          <div className="mb-3">
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wide mb-1">Riwayat Penyakit</p>
            <p className="text-xs text-stone-600 bg-stone-50 rounded-lg px-2.5 py-1.5">{cat.diseaseHistory}</p>
          </div>
        )}

        {/* Notes */}
        {cat.notes && (
          <div>
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wide mb-1">Catatan</p>
            <p className="text-xs text-stone-500 italic">"{cat.notes}"</p>
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
}: {
  initial: FormState;
  onSave: (f: FormState) => void;
  onCancel: () => void;
  isEdit: boolean;
}) {
  const [form, setForm] = useState<FormState>(initial);
  const set = (k: keyof FormState, v: string | boolean) =>
    setForm((p) => ({ ...p, [k]: v }));

  const inputCls = "w-full bg-white border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all";
  const labelCls = "block text-sm font-semibold text-stone-700 mb-1.5";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave(form);
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100">
          <h2 className="font-black text-stone-900">{isEdit ? "Edit Data Kucing" : "Tambah Kucing Baru"}</h2>
          <button onClick={onCancel} className="text-stone-400 hover:text-stone-600 text-xl">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Photo upload placeholder */}
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-amber-50 rounded-2xl flex items-center justify-center text-3xl border-2 border-dashed border-amber-200 flex-shrink-0">
              🐱
            </div>
            <div>
              <button type="button" className="text-sm font-semibold text-amber-600 hover:text-amber-700 transition-colors">
                📷 Upload Foto
              </button>
              <p className="text-xs text-stone-400 mt-0.5">JPG / PNG, maks. 5MB</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 sm:col-span-1">
              <label className={labelCls}>Nama Kucing *</label>
              <input required value={form.name} onChange={e => set("name", e.target.value)}
                placeholder="contoh: Mochi" className={inputCls} />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className={labelCls}>Ras / Breed *</label>
              <input required value={form.breed} onChange={e => set("breed", e.target.value)}
                placeholder="contoh: Scottish Fold" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Umur (tahun) *</label>
              <input required type="number" min="0" max="30" step="0.5"
                value={form.age} onChange={e => set("age", e.target.value)}
                placeholder="2" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Berat (kg) *</label>
              <input required type="number" min="0.1" max="20" step="0.1"
                value={form.weight} onChange={e => set("weight", e.target.value)}
                placeholder="3.5" className={inputCls} />
            </div>
          </div>

          <div>
            <label className={labelCls}>Riwayat Penyakit</label>
            <textarea rows={2} value={form.diseaseHistory}
              onChange={e => set("diseaseHistory", e.target.value)}
              placeholder="Contoh: Pernah flu ringan (2023), alergi seafood"
              className={`${inputCls} resize-none`} />
          </div>

          {/* Vaccination */}
          <div className="p-4 bg-stone-50 rounded-2xl space-y-3">
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <div className={`w-11 h-6 rounded-full transition-colors flex-shrink-0 ${form.vaccinationStatus ? "bg-amber-500" : "bg-stone-300"}`}
                onClick={() => set("vaccinationStatus", !form.vaccinationStatus)}>
                <div className={`w-5 h-5 bg-white rounded-full m-0.5 shadow transition-transform ${form.vaccinationStatus ? "translate-x-5" : "translate-x-0"}`} />
              </div>
              <div>
                <p className="text-sm font-semibold text-stone-700">Status Vaksinasi</p>
                <p className="text-xs text-stone-400">{form.vaccinationStatus ? "Sudah vaksin ✓" : "Belum vaksin"}</p>
              </div>
            </label>
            {form.vaccinationStatus && (
              <div>
                <label className={labelCls}>Tanggal Kadaluarsa Vaksin</label>
                <input type="date" value={form.vaccinationExpiry}
                  onChange={e => set("vaccinationExpiry", e.target.value)}
                  className={inputCls} />
              </div>
            )}
          </div>

          <div>
            <label className={labelCls}>Catatan Khusus</label>
            <textarea rows={2} value={form.notes}
              onChange={e => set("notes", e.target.value)}
              placeholder="Contoh: Suka tuna, takut suara keras, pemalu dengan orang baru"
              className={`${inputCls} resize-none`} />
          </div>

          <div className="flex gap-3 pt-2">
            <Btn type="submit" className="flex-1 justify-center py-3">
              {isEdit ? "💾 Simpan Perubahan" : "➕ Tambah Kucing"}
            </Btn>
            <Btn variant="secondary" onClick={onCancel} className="flex-1 justify-center py-3">Batal</Btn>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export function CustomerCatsPage() {
  const [cats, setCats] = useState<Cat[]>(MOCK_CATS);
  const [showForm, setShowForm] = useState(false);
  const [editTarget, setEditTarget] = useState<Cat | null>(null);
  const [deleted, setDeleted] = useState<string | null>(null);

  const unvaccinated = cats.filter(c => !c.vaccinationStatus).length;

  function handleSave(form: FormState) {
    if (editTarget) {
      setCats(prev => prev.map(c => c.id === editTarget.id ? {
        ...c, ...form,
        age: Number(form.age), weight: Number(form.weight),
      } : c));
    } else {
      const newCat: Cat = {
        id: `c${Date.now()}`, ownerId: "u3",
        name: form.name, breed: form.breed,
        age: Number(form.age), weight: Number(form.weight),
        diseaseHistory: form.diseaseHistory || "-",
        vaccinationStatus: form.vaccinationStatus,
        vaccinationExpiry: form.vaccinationExpiry || undefined,
        notes: form.notes || undefined,
      };
      setCats(prev => [...prev, newCat]);
    }
    setShowForm(false);
    setEditTarget(null);
  }

  function handleEdit(cat: Cat) {
    setEditTarget(cat);
    setShowForm(true);
  }

  function handleDelete(catId: string) {
    setCats(prev => prev.filter(c => c.id !== catId));
    setDeleted(catId);
    setTimeout(() => setDeleted(null), 3000);
  }

  const formInitial = editTarget
    ? {
        name: editTarget.name, breed: editTarget.breed,
        age: String(editTarget.age), weight: String(editTarget.weight),
        diseaseHistory: editTarget.diseaseHistory,
        notes: editTarget.notes ?? "",
        vaccinationStatus: editTarget.vaccinationStatus,
        vaccinationExpiry: editTarget.vaccinationExpiry ?? "",
      }
    : EMPTY_FORM;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader
        title="Kucing Saya"
        subtitle={`${cats.length} kucing terdaftar`}
        action={
          <Btn onClick={() => { setEditTarget(null); setShowForm(true); }}>
            ➕ Tambah Kucing
          </Btn>
        }
      />

      {deleted && (
        <Alert type="success" msg="Data kucing berhasil dihapus." />
      )}
      {unvaccinated > 0 && (
        <Alert type="warning" msg={`${unvaccinated} kucing belum memiliki status vaksinasi yang valid. Vaksinasi diperlukan untuk penitipan.`} />
      )}

      {cats.length === 0 ? (
        <div className="bg-white rounded-3xl border border-stone-100 p-16 text-center">
          <div className="text-6xl mb-4 select-none">🐱</div>
          <h3 className="text-lg font-black text-stone-800 mb-2">Belum ada kucing</h3>
          <p className="text-stone-500 text-sm mb-6">Tambahkan data kucing Anda untuk mulai memesan penitipan.</p>
          <Btn onClick={() => setShowForm(true)}>➕ Tambah Kucing Pertama</Btn>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cats.map(cat => (
            <CatCard
              key={cat.id}
              cat={cat}
              onEdit={() => handleEdit(cat)}
              onDelete={() => handleDelete(cat.id)}
            />
          ))}
        </div>
      )}

      {showForm && (
        <CatForm
          initial={formInitial}
          isEdit={!!editTarget}
          onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditTarget(null); }}
        />
      )}
    </div>
  );
}
