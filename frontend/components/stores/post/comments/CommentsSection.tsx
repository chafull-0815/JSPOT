// components/stores/post/comments/CommentsSection.tsx
import { getCommentsByStoreSlug } from "@/lib/data/comments";
import { CommentsList } from "./CommentsList";
import { CommentsForm } from "./CommentsForm";
import type { Comment } from "@/lib/fixtures/comments.fixture";

export async function StoreCommentsSection({ storeSlug }: { storeSlug: string }) {
  const initialComments: Comment[] = await getCommentsByStoreSlug(storeSlug);

  return (
    <section className="mt-8 grid gap-5">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold">クチコミ</h2>
        <p className="text-xs text-muted-foreground">
          全{initialComments.length}件
        </p>
      </div>

      <CommentsList comments={initialComments} storeSlug={storeSlug} />
      <CommentsForm storeSlug={storeSlug} initialComments={initialComments} />
    </section>
  );
}