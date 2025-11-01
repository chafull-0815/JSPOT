// components/FeatureCarousel.tsx
"use client";
import Image from "next/image";
import type { Article } from "@/lib/mock";
import Link from "next/link";
import { useRef } from "react";

export default function FeatureCarousel({ items }: { items: Article[] }) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className="relative">
      <div ref={ref} className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
        {items.map((a) => (
          <Link
            key={a.id}
            href="#"
            className="group relative aspect-[16/9] min-w-[85%] snap-start overflow-hidden rounded-xl sm:min-w-[60%] lg:min-w-[45%] xl:min-w-[33%]"
          >
            <Image src={a.image} alt={a.title} fill className="object-cover transition group-hover:scale-[1.03]" sizes="(min-width:1280px) 33vw, (min-width:1024px) 45vw, 85vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 text-white">
              <span className="rounded bg-white/15 px-2 py-0.5 text-xs backdrop-blur">{a.category}</span>
              <h3 className="mt-2 line-clamp-2 text-lg font-semibold">{a.title}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-zinc-200">{a.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
