// lib/data/comments.ts
import { getFixtureComments, type Comment } from "@/lib/fixtures/comments.fixture";

export async function getCommentsByStoreSlug(storeSlug: string): Promise<Comment[]> {
  return getFixtureComments(storeSlug);

  // Laravelに差し替え
  const res = await fetch(`${process.env.LARAVEL_API_BASE}/stores/${storeSlug}/comments`, {
    cache: "no-store",
  });
  if (!res.ok) return [];
  return res.json();
}