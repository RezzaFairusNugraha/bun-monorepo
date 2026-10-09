import type { ReactNode } from "react";
import { Providers } from "./providers";

export const metadata = {
  title: "Bun Monorepo",
  description: "Next.js + Hono + Neon + Drizzle",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <body style={{ fontFamily: "system-ui, sans-serif", margin: 0 }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
