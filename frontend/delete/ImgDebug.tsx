// components/core/ImgDebug.tsx
'use client';
import { useEffect } from 'react';

export default function ImgDebug({ name, slug, mainImage }: { name: string; slug: string; mainImage: string }) {
  useEffect(() => {
    // 文字通りの文字列が来ているかを確認
    console.log('[ImgDebug]', { name, slug, mainImage });
    try {
      const u = new URL(mainImage, window.location.origin);
      console.log('[ImgDebug] parsed', { pathname: u.pathname });
    } catch (e) {
      console.log('[ImgDebug] not a URL (relative OK):', mainImage);
    }
  }, [name, slug, mainImage]);

  return null;
}
