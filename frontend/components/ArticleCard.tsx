// components/ArticleCard.tsx
import Image from "next/image";
import type { Article } from "@/lib/mock";

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="group overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow">
      <div className="relative aspect-[16/10] w-full">
        <Image src={article.image} alt={article.title} fill className="object-cover" sizes="(min-width:1024px) 25vw, 100vw" />
      </div>
      <div className="p-4">
        <span className="inline-block rounded bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600">{article.category}</span>
        <h3 className="mt-2 line-clamp-2 text-base font-semibold leading-snug">{article.title}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-zinc-600">{article.excerpt}</p>
        <div className="mt-3 text-xs text-zinc-500">{article.date} / {article.author}</div>
      </div>
    </article>
  );
}
