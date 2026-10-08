# bun-monorepo

Bun workspaces + Next.js + Hono + Neon + Drizzle.

```
apps/web       Next.js (port 3000)
apps/api       Hono di Bun (port 3001)
packages/db    Drizzle schema + client Neon
```

## Setup

```bash
bun install
cp .env.example .env
cp apps/web/.env.example apps/web/.env.local
# isi DATABASE_URL di .env dengan connection string dari Neon
bun run db:push
bun run dev
```

## Perintah DB

```bash
bun run db:generate
bun run db:migrate
bun run db:push
bun run db:studio
```
