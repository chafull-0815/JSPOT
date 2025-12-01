"use client";

import { useState } from "react";
import type { Comment } from "@/lib/fixtures/comments.fixture";

const LS_PREFIX = "jspot_local_comments_";

function loadLocal(storeSlug: string): Comment[] {
  try {
    const raw = localStorage.getItem(`${LS_PREFIX}${storeSlug}`);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveLocal(storeSlug: string, comments: Comment[]) {
  localStorage.setItem(`${LS_PREFIX}${storeSlug}`, JSON.stringify(comments));
}

export function CommentsForm({
  storeSlug,
  initialComments,
}: {
  storeSlug: string;
  initialComments: Comment[];
}) {
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isActive = body.trim().length > 0 && !sending;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!body.trim()) {
      setError("コメントを入力してください");
      return;
    }

    setSending(true);
    try {
      const newComment: Comment = {
        id: crypto.randomUUID(),
        storeSlug,
        name: name.trim() || "匿名",
        body: body.trim(),
        createdAt: new Date().toISOString(),
      };

      // fixtures + localのうちlocal側だけ更新するらしい
      const currentLocal = loadLocal(storeSlug);
      const nextLocal = [newComment, ...currentLocal].slice(0, 50);
      saveLocal(storeSlug, nextLocal);

      setName("");
      setBody("");

      // 軽くリロードらしい
      location.reload();
    } catch {
      setError("投稿に失敗しました");
    } finally {
      setSending(false);
    }
  }
  return (
    <form
      onSubmit={submit}
      className="grid gap-2 rounded-lg border bg-white p-3"
    >
      <input
        value={name} onChange={(e) => setName(e.target.value)}
        placeholder="名前（任意）"
        className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
      />
      <textarea
        value={body} onChange={(e) => setBody(e.target.value)}
        placeholder="コメントを書く" rows={3}
        className="w-full resize-y rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
      />
      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="flex justify-end">
        <button
          disabled={!isActive}
          className={`rounded-md px-2 py-1 text-sm border transition-colors
            ${
              isActive
                ? "bg-foreground text-background border-foreground hover:opacity-90 font-semibold"
                : "font-normal bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed font-normal"
            }
          `}
        >
          投稿する
        </button>
      </div>

      <p className="text-xs text-muted-foreground">
        ※ いまは仮実装：fixtures + この端末のlocalStorageに保存しています。
        将来Laravel接続に切替予定です。
      </p>
    </form>
  )
}