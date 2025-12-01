// components/storeGallery/StoreGallery.tsx
"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type Props = {
  name: string;
  images: string[];        // 先頭がメイン想定
  initialIndex?: number;
};

export function StoreGallery({ name, images, initialIndex = 0 }: Props) {
  const list = useMemo(() => images.filter(Boolean), [images]);
  const [active, setActive] = useState(initialIndex);

  const activeUrl = list[active] ?? list[0];

  useEffect(() => {
    if (typeof window === "undefined") return;
    list.forEach((url) => {
      const img = new window.Image();
      img.src = url;
    });
  }, [list]);

  return (
    <section>
      {/* メイン画像 */}
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border bg-muted">
        <Image
          src={activeUrl}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 1024px"
          className="object-cover object-center"
          priority
        />
      </div>

      {/* サムネ */}
      {list.length > 1 && (
        <div className="mt-3 grid grid-cols-5 gap-2 md:grid-cols-7">
          {list.map((url, i) => {
            const isActive = i === active;
            return (
              <button
                key={`${url}-${i}`}
                type="button"
                onMouseEnter={() => {
                  const img = new window.Image();
                  img.src = url;
                }}
                onClick={() => setActive(i)}
                className={[
                  "relative aspect-square overflow-hidden rounded-lg border",
                  "transition",
                  isActive ? "ring-2 ring-black" : "hover:opacity-80",
                ].join(" ")}
                aria-label={`画像 ${i + 1} を表示`}
              >
                <Image
                  src={url}
                  alt={`${name} thumbnail ${i + 1}`}
                  fill
                  sizes="160px"
                  className="object-cover object-center !rounded-none"
                />
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}
