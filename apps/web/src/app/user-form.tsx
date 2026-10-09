"use client";

import type { FormEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";

export function UserForm() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: { name: string; email: string }) => {
      const res = await api.users.$post({ json: data });
      if (!res.ok) throw new Error("Gagal menyimpan");
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    mutate(
      { name: String(fd.get("name")), email: String(fd.get("email")) },
      { onSuccess: () => form.reset() },
    );
  }

  return (
    <form onSubmit={onSubmit} style={{ display: "flex", gap: 8 }}>
      <input name="name" placeholder="Nama" required />
      <input name="email" type="email" placeholder="Email" required />
      <button type="submit" disabled={isPending}>
        {isPending ? "Menyimpan..." : "Tambah"}
      </button>
    </form>
  );
}
