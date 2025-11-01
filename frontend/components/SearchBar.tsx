'use client';

import { useState } from 'react';

export default function SearchBar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* PC: 横並びフォーム */}
      <form
        action="/search"
        className="hidden gap-3 md:flex"
        onSubmit={(e) => {
          // ここでクエリをまとめて /search?area=... のようにしてもOK
        }}
      >
        <input name="keyword" className="h-12 flex-1 rounded-xl border px-4" placeholder="キーワード（例：渋谷 焼肉）" />
        <select name="area" className="h-12 w-48 rounded-xl border px-3">
          <option value="">エリア</option>
          <option>東京</option><option>大阪</option><option>名古屋</option><option>福岡</option>
        </select>
        <select name="genre" className="h-12 w-48 rounded-xl border px-3">
          <option value="">ジャンル</option>
          <option>寿司</option><option>焼肉</option><option>カフェ</option><option>中華</option>
        </select>
        <select name="budget" className="h-12 w-48 rounded-xl border px-3">
          <option value="">予算</option>
          <option>〜¥3,000</option><option>〜¥5,000</option><option>〜¥8,000</option><option>¥8,000〜</option>
        </select>
        <button type="submit" className="h-12 rounded-xl bg-black px-8 text-white">検索</button>
      </form>

      {/* SP: キーワード + 詳細ボタン */}
      <div className="flex gap-2 md:hidden">
        <input name="keyword_sp" className="h-12 flex-1 rounded-xl border px-4" placeholder="キーワード検索" />
        <button onClick={() => setOpen(true)} className="h-12 rounded-xl border px-4">条件</button>
        <button className="h-12 rounded-xl bg-black px-4 text-white">検索</button>
      </div>

      {/* 右から出るドロワー（SP用の詳細検索） */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-[88%] max-w-sm bg-white p-4 shadow-xl">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-lg font-semibold">詳細条件</h3>
              <button onClick={() => setOpen(false)} className="rounded-md border px-2 py-1">閉じる</button>
            </div>

            <div className="space-y-4 overflow-y-auto pb-20">
              <div>
                <label className="mb-1 block text-sm font-medium">エリア</label>
                <select className="w-full rounded-xl border px-3 py-2">
                  <option>指定なし</option><option>東京</option><option>大阪</option>
                  <option>名古屋</option><option>福岡</option><option>札幌</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">ジャンル</label>
                <div className="flex flex-wrap gap-2">
                  {['寿司','焼肉','カフェ','中華','居酒屋','フレンチ'].map(g => (
                    <label key={g} className="inline-flex items-center gap-2 rounded-full border px-3 py-1">
                      <input type="checkbox" className="accent-black" /> <span>{g}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">予算</label>
                <select className="w-full rounded-xl border px-3 py-2">
                  <option>指定なし</option><option>〜¥3,000</option><option>〜¥5,000</option>
                  <option>〜¥8,000</option><option>¥8,000〜</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">こだわり</label>
                <div className="flex flex-wrap gap-2">
                  {['カード可','個室あり','喫煙可','テイクアウト','駐車場あり'].map(t => (
                    <label key={t} className="inline-flex items-center gap-2 rounded-full border px-3 py-1">
                      <input type="checkbox" className="accent-black" /> <span>{t}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 border-t bg-white p-3">
              <button className="h-12 w-full rounded-xl bg-black text-white">この条件で検索</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
