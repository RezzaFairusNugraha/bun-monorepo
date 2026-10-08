"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "@/lib/api";

export function UserForm() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setPending(true);
    try {
      await api.users.$post({
        json: {
          name: String(data.get("name")),
          email: String(data.get("email")),
        },
      });
      form.reset();
      router.refresh();
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} style={{ display: "flex", gap: 8 }}>
      <input name="name" placeholder="Nama" required />
      <input name="email" type="email" placeholder="Email" required />
      <button type="submit" disabled={pending}>
        {pending ? "Menyimpan..." : "Tambah"}
      </button>
    </form>
  );
}
