// components/ui/ImageWithFallback.tsx
"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { APP } from "@/lib/utils/appConfig";

export default function ImageWithFallback({
  src,
  alt,
  sizes,
  className,
  fallbackClassName,
  fallback = APP.image.fallback,
  priority = false,
}: {
  src?: string;
  alt: string;
  sizes: string;
  className?: string;
  fallbackClassName?: string;
  fallback?: string;
  priority: boolean;
}) {
  const errored = useRef(false);
  const [ curr, setCurr ] = useState( src || fallback );

  useEffect(() => {
    errored.current = false;
    setCurr( src || fallback );
  }, [ src, fallback ]);

  const isFallback = curr === fallback;

  return (
    <Image
      src={curr}
      alt={alt}
      fill
      sizes={sizes}
      className={isFallback ? (fallbackClassName ?? className) : className}
      priority={priority}
      onError={() => {
        if (!errored.current && curr !== fallback) {
          errored.current = true;
          setCurr(fallback);
        }
      }}
    />
  );
}