import { ImageWithFallback } from "@/components/ui";
import Link from "next/link";

type Props = {
  href: string;
  name: string;
  area: string;
  category: string;
  lunch?: number | null;
  dinner?: number | null;
  src: string; // mainImage
  likes?: number;
  priority?: boolean; // ファーストビューだけ true
};

const yen = (v?: number | null) =>
  typeof v === "number" ? `¥${v.toLocaleString()}` : "-";

export default function StoreCard(p: Props) {
  const {
    href,
    name,
    area,
    category,
    lunch,
    dinner,
    src,
    likes = 0,
    priority,
  } = p;
  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-2xl border bg-card shadow-sm transition hover:shadow-md"
    >
      <div className="relative aspect-4/3 w-full overflow-hidden border-b border-black">
        <ImageWithFallback
          src={src}
          alt={name}
          sizes="(max-width: 768px) 280px, 25vw"
          className="object-cover transition duration-300 group-hover:scale-105"
          fallbackClassName="object-contain bg-muted/30 p-6"
          priority={!!priority}
        />
        <div className="absolute right-2 top-2 rounded-full bg-black/80 px-2 py-1 text-xs text-white">
          ❤️ {likes}
        </div>
      </div>

      <div className="space-y-4 px-2 py-4">
        <div className="line-clamp-1 text-base font-semibold">{name}</div>
        <div className="flex flex-wrap items-center justify-between gap-y-1 text-sm text-muted-foreground">
          <div className="flex flex-nowrap min-w-0 items-center gap-3 pr-2">
            <span>📍 {area}</span>
            <span>🍳 {category}</span>
          </div>
          <div className="flex items-center gap-4">
            <span>☀️ {yen(lunch)}</span>
            <span>🌙 {yen(dinner)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
