import { api } from "@/lib/api";
import { UserForm } from "./user-form";

export const dynamic = "force-dynamic";

export default async function Page() {
  const res = await api.users.$get();
  const users = await res.json();

  return (
    <main style={{ maxWidth: 560, margin: "48px auto", padding: "0 16px" }}>
      <h1>Users</h1>
      <UserForm />
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.name} — {u.email}
          </li>
        ))}
      </ul>
    </main>
  );
}
