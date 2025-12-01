// app/api/contact/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const { name, email, tel, category, message, hp } = body || {};

  // honeypot
  if (hp && String(hp).trim() !== "") {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  // ここでメール送信／Slack通知などに繋げてもOK
  // console.log({ name, email, type, message });

  return NextResponse.json({ ok: true });
}
