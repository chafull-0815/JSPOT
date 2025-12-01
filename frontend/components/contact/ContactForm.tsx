// components/contact/ContactForm.tsx
'use client';

import { useState } from "react";

type Props = { action: string };
type PersonType = "" | "個人" | "法人";
type Category = "" | "general" | "collab" | "bug" | "other";

export default function ContactForm({ action }: Props) {
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [type, setType] = useState<PersonType>("");
  const [category, setCategory] = useState<Category>("");
  const [message, setMessage] = useState("");
  const [hp, setHp] = useState("");

  const canSubmit =
    !sending &&
    name.trim().length > 0 &&
    /\S+@\S+\.\S+/.test(email) &&
    message.trim().length > 0;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setSending(true);
    setErr(null);
    try {
      const res = await fetch(action, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          tel: tel || null,
          person_type: type || null,
          category: category || "general",
          message,
          hp,
        }),
      });
      if (!res.ok) throw new Error(`Failed: ${res.status}`);
      setDone(true);
      setName(""); setEmail(""); setTel(""); setType(""); setCategory(""); setMessage(""); setHp("");
    } catch {
      setErr("送信に失敗しました。時間をおいて再度お試しください。");
    } finally {
      setSending(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-2xl border bg-green-50 p-4 text-green-800">
        送信が完了しました。担当からご連絡いたします。ありがとうございます。
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-start">
        {/* お名前 */}
        <input
          className="h-12 w-1/2 rounded-xl border px-4 required aria-required"
          placeholder="お名前 *"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* 会社名 */}
        <input
          className="h-12 w-1/2 rounded-xl border px-4"
          placeholder="会社名"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-start">
        <input
          type="email"
          className="h-12 rounded-xl border px-4 md:w-2/3 required aria-required"
          placeholder="メールアドレス *"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="tel"
          className="h-12 rounded-xl border px-4 md:w-1/3"
          placeholder="TEL"
          value={tel}
          onChange={(e) => setTel(e.target.value)}
        />
      </div>

      {/* 個人/法人 と カテゴリー（SP:縦、MD↑:横並び／左寄せ） */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-start">
        <select
          className="h-12 rounded-xl border px-3 md:w-1/4"
          value={type}
          onChange={(e) => setType(e.target.value as PersonType)}
        >
          <option value="">個人 / 法人</option>
          <option value="個人">個人</option>
          <option value="法人">法人</option>
        </select>

        <select
          className="h-12 rounded-xl border px-3 md:w-1/3 required aria-required"
          value={category}
          onChange={(e) => setCategory(e.target.value as Category)}
        >
          <option value="">カテゴリー（任意）</option>
          <option value="general">一般</option>
          <option value="collab">タイアップ・取材</option>
          <option value="bug">不具合報告</option>
          <option value="other">その他</option>
        </select>
      </div>

      {/* 本文 */}
      <textarea
        className="min-h-[140px] w-full rounded-xl border px-4 py-3 required aria-required"
        placeholder="お問い合わせ内容 *"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      {/* 蜜壺（非表示） */}
      <input
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        value={hp}
        onChange={(e) => setHp(e.target.value)}
        placeholder="Leave blank"
      />

      {err && <p className="text-sm text-red-600">{err}</p>}

      <div className="flex justify-end">
        <button
          type="submit"
          className="h-12 rounded-xl bg-black px-8 text-white disabled:opacity-50"
          disabled={!canSubmit}
        >
          {sending ? "送信中..." : "送信"}
        </button>
      </div>
    </form>
  );
}
