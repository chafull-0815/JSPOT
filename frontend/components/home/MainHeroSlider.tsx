"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Container } from "../layout";

type Slide = {
  src: string;
  title: string;
  subtitle?: string;
  href?: string;
};

export default function HeroSlider({
  slides,
  interval = 5000,
}: {
  slides: Slide[];
  interval?: number;
}) {
  const [index, setIndex] = useState(0);
  const timer = useRef<NodeJS.Timeout | null>(null);

  const go = (dir: 1 | -1) =>
    setIndex((i) => (i + dir + slides.length) % slides.length);
  const goto = (i: number) => setIndex(i % slides.length);

  // autoplay
  useEffect(() => {
    timer.current && clearTimeout(timer.current);
    timer.current = setTimeout(() => go(1), interval);
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [index, interval, go]);

  return (
    <Container>
      <section className="max-w-6xl">
        <div className="relative h-[480px] w-full overflow-hidden rounded-2xl sm:h-[560px]">
          {/* スライドたち */}
          {slides.map((s, i) => (
            <div
              key={i}
              className="absolute inset-0 transition-opacity duration-700"
              style={{ opacity: i === index ? 1 : 0 }}
              aria-hidden={i !== index}
            >
              <Image
                src={s.src}
                alt={s.title}
                fill
                priority={i === index}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white drop-shadow">
                {s.href ? (
                  <Link href={s.href} className="inline-block">
                    <h2 className="text-2xl font-bold md:text-3xl">
                      {s.title}
                    </h2>
                    {s.subtitle && (
                      <p className="mt-1 text-sm opacity-85">{s.subtitle}</p>
                    )}
                  </Link>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold md:text-3xl">
                      {s.title}
                    </h2>
                    {s.subtitle && (
                      <p className="mt-1 text-sm opacity-85">{s.subtitle}</p>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}

          {/* ナビゲーション */}
          <button
            aria-label="prev"
            onClick={() => go(-1)}
            className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/40 px-3 py-2 text-white hover:bg-black/60"
          >
            ‹
          </button>
          <button
            aria-label="next"
            onClick={() => go(1)}
            className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/40 px-3 py-2 text-white hover:bg-black/60"
          >
            ›
          </button>

          {/* ドット */}
          <div className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2 space-x-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goto(i)}
                aria-label={`slide ${i + 1}`}
                className={`h-2 w-2 rounded-full ${
                  i === index ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </section>
    </Container>
  );
}
