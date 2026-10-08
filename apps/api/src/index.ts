import { zValidator } from "@hono/zod-validator";
import { db, desc, users } from "@repo/db";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { z } from "zod";

const createUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});

const app = new Hono()
  .use("*", logger())
  .use(
    "*",
    cors({ origin: process.env.WEB_URL ?? "http://localhost:3000" }),
  )
  .get("/health", (c) => c.json({ ok: true }))
  .get("/users", async (c) => {
    const rows = await db.select().from(users).orderBy(desc(users.id));
    return c.json(rows);
  })
  .post("/users", zValidator("json", createUserSchema), async (c) => {
    const body = c.req.valid("json");
    const [row] = await db.insert(users).values(body).returning();
    return c.json(row, 201);
  });

export type AppType = typeof app;

export default {
  port: Number(process.env.PORT ?? 3001),
  fetch: app.fetch,
};
