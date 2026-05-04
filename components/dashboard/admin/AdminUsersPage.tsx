"use client";

import { useEffect, useState } from "react";
import {
  PageHeader,
  SectionCard,
  Table,
  Tr,
  Td,
  Btn,
  Avatar,
} from "@/components/dashboard/shared/DashboardUI";
import { formatDate } from "@/lib/dashboard-utils";
import {
  getAllUsers,
  updateUser,
  deleteUser,
  User,
  UserRole,
  UpdateUserPayload,
} from "@/services/api/user.service";
import {
  Loader2,
  CheckCircle2,
  X,
  AlertTriangle,
  Pencil,
  Trash2,
  Save,
  RotateCcw,
} from "lucide-react";

// ── Config ────────────────────────────────────────────────────────────────────

const ROLE_CONFIG: Record<
  UserRole,
  { label: string; color: string; bg: string; emoji: string }
> = {
  ADMIN: {
    label: "Admin",
    color: "text-purple-700",
    bg: "bg-purple-50",
    emoji: "👑",
  },
  CARETAKER: {
    label: "Petugas",
    color: "text-blue-700",
    bg: "bg-blue-50",
    emoji: "🧑‍⚕️",
  },
  COURIER: {
    label: "Kurir",
    color: "text-amber-700",
    bg: "bg-amber-50",
    emoji: "🚗",
  },
  CUSTOMER: {
    label: "Customer",
    color: "text-stone-600",
    bg: "bg-stone-100",
    emoji: "👤",
  },
};

const ROLE_FILTERS: { label: string; value: UserRole | "ALL" }[] = [
  { label: "Semua", value: "ALL" },
  { label: "Admin", value: "ADMIN" },
  { label: "Petugas", value: "CARETAKER" },
  { label: "Kurir", value: "COURIER" },
  { label: "Customer", value: "CUSTOMER" },
];

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
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-6 right-6 z-[100] flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl text-white text-sm font-semibold animate-in slide-in-from-bottom-4 fade-in duration-300 ${type === "success" ? "bg-green-500" : "bg-red-500"}`}
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

// ── Edit Modal ────────────────────────────────────────────────────────────────

function EditModal({
  user,
  onSave,
  onClose,
  submitting,
}: {
  user: User;
  onSave: (data: UpdateUserPayload) => void;
  onClose: () => void;
  submitting: boolean;
}) {
  const [form, setForm] = useState<UpdateUserPayload>({
    name: user.name,
    email: user.email,
    telepon: user.telepon,
    role: user.role,
  });

  const inputCls =
    "w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10 transition-all";
  const labelCls =
    "block text-xs font-black text-stone-700 uppercase tracking-wider mb-1.5 ml-1";

  return (
    <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-[32px] w-full max-w-md shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-8 py-6 border-b border-stone-100">
          <div className="flex items-center gap-3">
            <Avatar name={user.name} />
            <div>
              <h2 className="font-black text-lg text-stone-900">Edit User</h2>
              <p className="text-xs text-stone-400">{user.email}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={submitting}
            className="p-2 hover:bg-stone-100 rounded-full text-stone-400 disabled:opacity-40"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(form);
          }}
          className="p-8 space-y-4"
        >
          <div>
            <label className={labelCls}>Nama</label>
            <input
              value={form.name ?? ""}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              className={inputCls}
              required
            />
          </div>
          <div>
            <label className={labelCls}>Email</label>
            <input
              type="email"
              value={form.email ?? ""}
              onChange={(e) =>
                setForm((p) => ({ ...p, email: e.target.value }))
              }
              className={inputCls}
              required
            />
          </div>
          <div>
            <label className={labelCls}>Telepon</label>
            <input
              value={form.telepon ?? ""}
              onChange={(e) =>
                setForm((p) => ({ ...p, telepon: e.target.value }))
              }
              className={inputCls}
              required
            />
          </div>
          <div>
            <label className={labelCls}>Role</label>
            <div className="relative">
              <select
                value={form.role}
                onChange={(e) =>
                  setForm((p) => ({ ...p, role: e.target.value as UserRole }))
                }
                className={`${inputCls} appearance-none pr-8 cursor-pointer`}
              >
                {Object.entries(ROLE_CONFIG).map(([value, cfg]) => (
                  <option key={value} value={value}>
                    {cfg.emoji} {cfg.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-stone-400 text-xs">
                ▼
              </div>
            </div>
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
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" /> Simpan
                </>
              )}
            </Btn>
            <Btn
              variant="secondary"
              onClick={onClose}
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

// ── Delete Confirm Modal ───────────────────────────────────────────────────────

function DeleteModal({
  user,
  onConfirm,
  onClose,
  submitting,
}: {
  user: User;
  onConfirm: () => void;
  onClose: () => void;
  submitting: boolean;
}) {
  return (
    <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-[32px] w-full max-w-sm shadow-2xl p-8 text-center">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <Trash2 className="w-8 h-8 text-red-400" />
        </div>
        <h2 className="font-black text-xl text-stone-900 mb-2">Hapus User?</h2>
        <p className="text-stone-500 text-sm mb-1">
          <span className="font-bold text-stone-700">{user.name}</span> akan
          dihapus permanen.
        </p>
        <p className="text-xs text-stone-400 mb-6">
          Semua data kucing dan booking terkait juga ikut terhapus.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onConfirm}
            disabled={submitting}
            className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Menghapus...
              </>
            ) : (
              "Hapus"
            )}
          </button>
          <button
            onClick={onClose}
            disabled={submitting}
            className="flex-1 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold rounded-xl transition-colors disabled:opacity-60"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [roleFilter, setRoleFilter] = useState<UserRole | "ALL">("ALL");
  const [search, setSearch] = useState("");
  const [editTarget, setEditTarget] = useState<User | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") =>
    setToast({ message, type });

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      setLoading(true);
      const data = await getAllUsers();
      setUsers(data);
    } catch (err: any) {
      showToast(err?.message ?? "Gagal memuat data user.", "error");
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdate(data: UpdateUserPayload) {
    if (!editTarget) return;
    try {
      setSubmitting(true);
      const updated = await updateUser(editTarget.id, data);
      setUsers((prev) =>
        prev.map((u) => (u.id === updated.id ? { ...u, ...updated } : u)),
      );
      setEditTarget(null);
      showToast(`${updated.name} berhasil diperbarui!`);
    } catch (err: any) {
      showToast(err?.message ?? "Gagal memperbarui user.", "error");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    try {
      setSubmitting(true);
      await deleteUser(deleteTarget.id);
      setUsers((prev) => prev.filter((u) => u.id !== deleteTarget.id));
      setDeleteTarget(null);
      showToast(`${deleteTarget.name} berhasil dihapus.`);
    } catch (err: any) {
      showToast(err?.message ?? "Gagal menghapus user.", "error");
    } finally {
      setSubmitting(false);
    }
  }

  const filtered = users.filter((u) => {
    const matchRole = roleFilter === "ALL" || u.role === roleFilter;
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    return matchRole && matchSearch;
  });

  // Stats
  const countByRole = (role: UserRole) =>
    users.filter((u) => u.role === role).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 gap-3 text-stone-400">
        <Loader2 className="w-6 h-6 animate-spin" />
        <span className="text-sm font-medium">Memuat data user...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      {editTarget && (
        <EditModal
          user={editTarget}
          onSave={handleUpdate}
          onClose={() => setEditTarget(null)}
          submitting={submitting}
        />
      )}
      {deleteTarget && (
        <DeleteModal
          user={deleteTarget}
          onConfirm={handleDelete}
          onClose={() => setDeleteTarget(null)}
          submitting={submitting}
        />
      )}

      <PageHeader
        title="Manajemen User"
        subtitle={`${users.length} user terdaftar`}
      />

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {(["ADMIN", "CARETAKER", "COURIER", "CUSTOMER"] as UserRole[]).map(
          (role) => {
            const cfg = ROLE_CONFIG[role];
            return (
              <div
                key={role}
                className={`rounded-2xl p-4 text-center border border-stone-100 ${cfg.bg}`}
              >
                <p className="text-2xl mb-0.5">{cfg.emoji}</p>
                <p className={`text-2xl font-black ${cfg.color}`}>
                  {countByRole(role)}
                </p>
                <p
                  className={`text-xs font-bold uppercase tracking-wide ${cfg.color} opacity-70`}
                >
                  {cfg.label}
                </p>
              </div>
            );
          },
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari nama atau email…"
          className="flex-1 bg-white border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
        />
        <div className="flex gap-2 flex-wrap">
          {ROLE_FILTERS.map((f) => {
            const count =
              f.value === "ALL"
                ? users.length
                : users.filter((u) => u.role === f.value).length;
            return (
              <button
                key={f.value}
                onClick={() => setRoleFilter(f.value)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  roleFilter === f.value
                    ? "bg-amber-500 text-white"
                    : "bg-white text-stone-600 border border-stone-200 hover:border-stone-300"
                }`}
              >
                {f.label}
                <span
                  className={`text-[10px] rounded-full px-1.5 py-0.5 font-bold ${roleFilter === f.value ? "bg-white/20" : "bg-stone-100"}`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <SectionCard
        title="Daftar User"
        subtitle={`${filtered.length} ditampilkan`}
      >
        <Table
          headers={[
            "User",
            "Email",
            "Telepon",
            "Role",
            "Kucing",
            "Booking",
            "Bergabung",
            "Aksi",
          ]}
        >
          {filtered.length === 0 ? (
            <Tr>
              <Td colSpan={8}>
                <p className="text-center text-stone-400 text-sm py-8">
                  Tidak ada user yang sesuai filter.
                </p>
              </Td>
            </Tr>
          ) : (
            filtered.map((u) => {
              const rc = ROLE_CONFIG[u.role];
              return (
                <Tr key={u.id}>
                  {/* User */}
                  <Td>
                    <div className="flex items-center gap-3">
                      <Avatar name={u.name} />
                      <span className="font-semibold text-stone-800 text-sm whitespace-nowrap">
                        {u.name}
                      </span>
                    </div>
                  </Td>

                  {/* Email */}
                  <Td className="text-stone-500 text-xs">{u.email}</Td>

                  {/* Telepon */}
                  <Td className="text-stone-500 text-xs">{u.telepon}</Td>

                  {/* Role */}
                  <Td>
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${rc.color} ${rc.bg}`}
                    >
                      {rc.emoji} {rc.label}
                    </span>
                  </Td>

                  {/* Kucing */}
                  <Td>
                    <span className="text-xs font-semibold text-stone-600">
                      🐱 {u._count?.cats ?? 0}
                    </span>
                  </Td>

                  {/* Booking */}
                  <Td>
                    <span className="text-xs font-semibold text-stone-600">
                      📋 {u._count?.booking ?? 0}
                    </span>
                  </Td>

                  {/* Bergabung */}
                  <Td className="text-stone-400 text-xs whitespace-nowrap">
                    {formatDate(u.createdAt)}
                  </Td>

                  {/* Aksi */}
                  <Td>
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => setEditTarget(u)}
                        className="w-8 h-8 bg-stone-50 rounded-lg flex items-center justify-center text-stone-500 hover:bg-amber-50 hover:text-amber-600 transition-colors border border-stone-100"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(u)}
                        className="w-8 h-8 bg-stone-50 rounded-lg flex items-center justify-center text-stone-500 hover:bg-red-50 hover:text-red-600 transition-colors border border-stone-100"
                        disabled={u.role === "ADMIN"}
                        title={
                          u.role === "ADMIN"
                            ? "Admin tidak bisa dihapus"
                            : "Hapus user"
                        }
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </Td>
                </Tr>
              );
            })
          )}
        </Table>
      </SectionCard>
    </div>
  );
}
