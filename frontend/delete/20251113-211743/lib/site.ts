// lib/site.ts
import { headers } from "next/headers";

/**
 * サイトの絶対URLを返す。
 * 1) .env(.local) の NEXT_PUBLIC_SITE_URL を優先（末尾スラッシュ除去）
 * 2) リクエストヘッダから組み立て
 * 3) フォールバック: http://localhost:3000
 */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "");
  if (fromEnv) return fromEnv;

  try {
    // Next 16 で型が Promise 風になるケースの回避（実行時は同期）
    // @ts-expect-error Next runtime returns ReadonlyHeaders synchronously
    const h: Headers = headers();
    const host = h.get("x-forwarded-host") || h.get("host") || "localhost:3000";
    const proto = h.get("x-forwarded-proto") || "http";
    return `${proto}://${host}`;
  } catch {
    return "http://localhost:3000";
  }
}

export default getSiteUrl;
