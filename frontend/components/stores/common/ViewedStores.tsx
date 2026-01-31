"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { ImageWithFallback } from "@/components/ui";
import { STORAGE_KEYS } from "@/lib/constants/storage";

// 閲覧履歴用の軽量な店舗型
type ViewedStoreItem = {
  slug: string;
  name: string;
  imageUrl: string;
  area: string;
  category: string;
  lunch?: number;
  dinner?: number;
  likes: number;
  viewedAt: number;
};

// ダミーデータ（開発用）
const DUMMY_VIEWED_STORES: ViewedStoreItem[] = [
  {
    slug: "test-1",
    name: "テスト店-1",
    imageUrl: "",
    area: "東京",
    category: "寿司",
    lunch: 1200,
    dinner: 4000,
    likes: 210,
    viewedAt: Date.now() - 1000 * 60 * 5,
  },
  {
    slug: "test-2",
    name: "テスト店-2",
    imageUrl: "",
    area: "東京",
    category: "焼肉",
    lunch: 1500,
    dinner: 5000,
    likes: 120,
    viewedAt: Date.now() - 1000 * 60 * 30,
  },
  {
    slug: "test-8",
    name: "テスト店-8",
    imageUrl: "",
    area: "東京",
    category: "天ぷら",
    lunch: 2200,
    dinner: 6500,
    likes: 155,
    viewedAt: Date.now() - 1000 * 60 * 60,
  },
  {
    slug: "test-14",
    name: "テスト店-14",
    imageUrl: "",
    area: "東京",
    category: "イタリアン",
    lunch: 1800,
    dinner: 4800,
    likes: 77,
    viewedAt: Date.now() - 1000 * 60 * 120,
  },
];

// LocalStorage store (useSyncExternalStore用)
let listeners: Array<() => void> = [];
let cachedStores: ViewedStoreItem[] | null = null;

function getSnapshot(): ViewedStoreItem[] {
  if (cachedStores !== null) {
    return cachedStores;
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEYS.VIEWED_STORES);
    if (stored) {
      const parsed: ViewedStoreItem[] = JSON.parse(stored);
      if (parsed.length > 0) {
        cachedStores = parsed;
        return parsed;
      }
    }
  } catch {
    // パースエラー
  }

  // データがなければダミーデータを使用（開発用）
  cachedStores = DUMMY_VIEWED_STORES;
  return DUMMY_VIEWED_STORES;
}

function getServerSnapshot(): ViewedStoreItem[] {
  // SSR時は空配列
  return [];
}

function subscribe(listener: () => void): () => void {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

const yen = (v?: number) =>
  typeof v === "number" ? `¥${v.toLocaleString()}` : "-";

type Props = {
  className?: string;
};

export function ViewedStores({ className = "" }: Props) {
  const stores = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // サーバーサイドまたはデータがない場合は非表示
  if (stores.length === 0) {
    return null;
  }

  return (
    <section className={`mx-auto max-w-6xl px-4 ${className}`}>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold">最近見たお店</h2>
        <span className="text-xs text-muted-foreground">
          {stores.length}件
        </span>
      </div>

      {/* 横スクロール */}
      <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {stores.map((store) => (
          <ViewedStoreCard key={store.slug} store={store} />
        ))}
      </div>
    </section>
  );
}

function ViewedStoreCard({ store }: { store: ViewedStoreItem }) {
  return (
    <Link
      href={`/stores/${store.slug}`}
      className="group min-w-[200px] max-w-[200px] snap-start overflow-hidden rounded-xl border bg-card shadow-sm transition hover:shadow-md"
    >
      {/* 画像 */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <ImageWithFallback
          src={store.imageUrl}
          alt={store.name}
          sizes="200px"
          className="object-cover transition duration-300 group-hover:scale-105"
          fallbackClassName="object-contain bg-muted/30 p-4"
          priority={false}
        />
        <div className="absolute right-1.5 top-1.5 rounded-full bg-black/70 px-1.5 py-0.5 text-[10px] text-white">
          ❤️ {store.likes}
        </div>
      </div>

      {/* 情報 */}
      <div className="space-y-1.5 p-2">
        <div className="line-clamp-1 text-sm font-semibold">{store.name}</div>
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
          <span>📍{store.area}</span>
          <span>🍳{store.category}</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
          <span>☀️{yen(store.lunch)}</span>
          <span>🌙{yen(store.dinner)}</span>
        </div>
      </div>
    </Link>
  );
}

// デフォルトエクスポート
export default ViewedStores;
