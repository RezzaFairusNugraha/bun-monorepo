"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { UserForm } from "./user-form";

export default function Page() {
  const {
    data: users,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await api.users.$get();
      if (!res.ok) throw new Error("Gagal memuat data");
      return res.json();
    },
  });

  return (
    <main style={{ maxWidth: 560, margin: "48px auto", padding: "0 16px" }}>
      <h1>Users</h1>
      <UserForm />
      {isLoading && <p>Memuat...</p>}
      {isError && <p>Terjadi kesalahan.</p>}
      <ul>
        {users?.map((u) => (
          <li key={u.id}>
            {u.name} — {u.email}
          </li>
        ))}
      </ul>
    </main>
  );
}
