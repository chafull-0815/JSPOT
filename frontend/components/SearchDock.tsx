'use client';

import { useState, useEffect } from 'react';
import SearchBar from './SearchBar';

export default function SearchDock() {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const onChange = () => setIsMobile(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return (
    <>
      {/* 右下に追従する検索ボタン（SPのみ） */}
      {isMobile && (
        <button
          onClick={() => setOpen(true)}
          aria-label="検索を開く"
          className="fixed bottom-5 right-5 z-50 rounded-full bg-black px-5 py-3 text-white shadow-lg"
        >
          検索
        </button>
      )}

      {/* ドロワー（SPの詳細検索UI） */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-[88%] max-w-sm bg-white p-4 shadow-xl">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-lg font-semibold">条件で検索</h3>
              <button onClick={() => setOpen(false)} className="rounded-md border px-2 py-1">閉じる</button>
            </div>
            <SearchBar />
          </div>
        </div>
      )}
    </>
  );
}
