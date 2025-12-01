// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const RATE = 60;         // 60 req
const WINDOW = 60_000;   // 60 sec
const hits = new Map<string, { t: number; n: number }>();

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // API だけレート制限（SEO影響を避ける）
  if (!pathname.startsWith("/api/")) return;

  const ip =
    (req as any).ip ??
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";

  const now = Date.now();
  const rec = hits.get(ip);

  if (!rec || now - rec.t > WINDOW) {
    hits.set(ip, { t: now, n: 1 });
  } else {
    rec.n++;
    if (rec.n > RATE) {
      return new NextResponse("Too Many Requests", {
        status: 429,
        headers: { "Retry-After": "60" },
      });
    }
  }
}
