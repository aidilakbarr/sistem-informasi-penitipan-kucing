"use client";

import { useState } from "react";
import { PageHeader, SectionCard, Table, Tr, Td, Badge, Btn, Avatar } from "@/components/dashboard/shared/DashboardUI";
import { MOCK_USERS } from "@/lib/mock-data";
import { ROLE_CONFIG, formatDate } from "@/lib/dashboard-utils";
import type { Role } from "@/types/dashboard";

const ROLE_FILTERS: { label: string; value: Role | "ALL" }[] = [
  { label: "Semua", value: "ALL" },
  { label: "Admin", value: "ADMIN" },
  { label: "Petugas", value: "CARETAKER" },
  { label: "Kurir", value: "COURIER" },
  { label: "Customer", value: "CUSTOMER" },
];

export function AdminUsersPage() {
  const [roleFilter, setRoleFilter] = useState<Role | "ALL">("ALL");
  const [search, setSearch] = useState("");

  const filtered = MOCK_USERS.filter((u) => {
    const matchRole = roleFilter === "ALL" || u.role === roleFilter;
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.includes(search.toLowerCase());
    return matchRole && matchSearch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <PageHeader
        title="Manajemen User"
        subtitle={`${MOCK_USERS.length} user terdaftar`}
        action={<Btn size="sm">+ Tambah User</Btn>}
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari nama atau email…"
          className="flex-1 bg-white border border-stone-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
        />
        <div className="flex gap-2 flex-wrap">
          {ROLE_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setRoleFilter(f.value)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                roleFilter === f.value
                  ? "bg-amber-500 text-white"
                  : "bg-white text-stone-600 border border-stone-200 hover:border-stone-300"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <SectionCard title="Daftar User" subtitle={`${filtered.length} ditampilkan`}>
        <Table headers={["User", "Email", "Telepon", "Role", "Status", "Bergabung", "Aksi"]}>
          {filtered.map((u) => {
            const rc = ROLE_CONFIG[u.role];
            return (
              <Tr key={u.id}>
                <Td>
                  <div className="flex items-center gap-3">
                    <Avatar name={u.name} />
                    <span className="font-semibold text-stone-800 text-sm whitespace-nowrap">{u.name}</span>
                  </div>
                </Td>
                <Td className="text-stone-500 text-xs">{u.email}</Td>
                <Td className="text-stone-500 text-xs">{u.phone}</Td>
                <Td>
                  <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${rc.color} ${rc.bg}`}>
                    {rc.emoji} {rc.label}
                  </span>
                </Td>
                <Td>
                  <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-1 rounded-full border ${u.isActive ? "text-green-700 bg-green-50 border-green-200" : "text-red-700 bg-red-50 border-red-200"}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${u.isActive ? "bg-green-500" : "bg-red-500"}`} />
                    {u.isActive ? "Aktif" : "Nonaktif"}
                  </span>
                </Td>
                <Td className="text-stone-400 text-xs whitespace-nowrap">{formatDate(u.createdAt)}</Td>
                <Td>
                  <div className="flex gap-1.5">
                    <Btn variant="secondary" size="sm">Edit</Btn>
                    <Btn variant={u.isActive ? "danger" : "primary"} size="sm">
                      {u.isActive ? "Nonaktif" : "Aktifkan"}
                    </Btn>
                  </div>
                </Td>
              </Tr>
            );
          })}
        </Table>
      </SectionCard>
    </div>
  );
}
