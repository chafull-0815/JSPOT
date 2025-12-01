// components/stores/post/comments/CommentsList.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
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

export function CommentsList({
  comments,
  storeSlug,
} : {
  comments: Comment[];
  storeSlug: string;
}) {
  const [localComments, setLocalComments] = useState<Comment[]>([]);

  useEffect(() => {
    setLocalComments(loadLocal(storeSlug));
  }, [storeSlug]);

  const merged = useMemo(() => {
    const all = [...localComments, ...comments];
    // 新しい順に並び替え
    return all.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [comments, localComments]);

  if (!merged.length) {
    return (
      <p className="text-sm text-muted-foreground">
        まだコメントがありません。
      </p>
    );
  }

  return (
    <div className="grid gap-3 sm:gap-5">
      {merged.map((c) => (
        <article key={c.id} className="rounded-lg border bg-white p-3 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">{c.name}</p>
            <time className="text-xs tet-muted-foreground">{new Date(c.createdAt).toLocaleString("ja-JP")}</time>
          </div>
          <p className="mt-2 whitespace-pre-wrap text-sm">{c.body}</p>
        </article>
      ))}
    </div>
  );
}