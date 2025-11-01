"use client";
import { useEffect } from "react";

export default function SearchDrawer({ open, onClose }: { open:boolean; onClose:()=>void }) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <div className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`}>
      {/* 背景 */}
      <div onClick={onClose} className={`absolute inset-0 bg-black/40 transition-opacity ${open ? "opacity-100" : "opacity-0"}`} />
      {/* パネル */}
      <aside className={`absolute inset-y-0 right-0 w-[92%] max-w-md bg-white shadow-xl transition-transform ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h3 className="font-semibold">条件で検索</h3>
          <button onClick={onClose} className="text-zinc-500">閉じる</button>
        </div>

        <div className="p-4 space-y-3">
          {/* ここはiframe差し替え可（外部検索をそのまま表示する場合） */}
          {/* <iframe src="https://example.com/search" className="h-[70vh] w-full rounded border" /> */}

          {/* 先にネイティブUIで置いておく（後でLaravel API連携に差し替え） */}
          <input className="h-11 w-full rounded border border-zinc-300 px-3" placeholder="エリア" />
          <input className="h-11 w-full rounded border border-zinc-300 px-3" placeholder="ジャンル" />
          <input className="h-11 w-full rounded border border-zinc-300 px-3" placeholder="予算" />
          <button className="h-11 w-full rounded bg-zinc-900 text-white">検索</button>
        </div>
      </aside>
    </div>
  );
}
