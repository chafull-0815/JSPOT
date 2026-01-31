"use client";

import { useCallback, useSyncExternalStore } from "react";
import { STORAGE_KEYS, MAX_VIEWED_STORES } from "@/lib/constants/storage";
import type { Store } from "@/lib/fixtures/stores.fixture";

// 閲覧履歴用の軽量な店舗型
export type ViewedStoreItem = {
  slug: string;
  name: string;
  imageUrl: string;
  area: string;
  category: string;
  lunch?: number;
  dinner?: number;
  likes: number;
  viewedAt: number; // timestamp
};

// Store から ViewedStoreItem への変換
export function storeToViewedItem(store: Store): ViewedStoreItem {
  return {
    slug: store.slug,
    name: store.name,
    imageUrl: store.images.cover_url,
    area: store.area?.label ?? "",
    category: store.cooking?.label ?? "",
    lunch: store.price?.lunch,
    dinner: store.price?.dinner,
    likes: store.like ?? 0,
    viewedAt: Date.now(),
  };
}

// LocalStorage用のストア
let listeners: Array<() => void> = [];
let cachedStores: ViewedStoreItem[] | null = null;

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

function getSnapshot(): ViewedStoreItem[] {
  if (cachedStores !== null) {
    return cachedStores;
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEYS.VIEWED_STORES);
    if (stored) {
      cachedStores = JSON.parse(stored);
      return cachedStores ?? [];
    }
  } catch {
    // パースエラー
  }

  cachedStores = [];
  return [];
}

function getServerSnapshot(): ViewedStoreItem[] {
  return [];
}

function subscribe(listener: () => void): () => void {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

export function useViewedStores() {
  const viewedStores = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // 閲覧履歴に追加
  const addViewedStore = useCallback((store: Store) => {
    const current = getSnapshot();
    // 既存を除外
    const filtered = current.filter((s) => s.slug !== store.slug);
    // 新しいものを先頭に追加
    const newItem = storeToViewedItem(store);
    const updated = [newItem, ...filtered].slice(0, MAX_VIEWED_STORES);

    // キャッシュとLocalStorageを更新
    cachedStores = updated;
    try {
      localStorage.setItem(STORAGE_KEYS.VIEWED_STORES, JSON.stringify(updated));
    } catch {
      // ストレージ容量エラー等は無視
    }

    notifyListeners();
  }, []);

  // 履歴をクリア
  const clearViewedStores = useCallback(() => {
    cachedStores = [];
    try {
      localStorage.removeItem(STORAGE_KEYS.VIEWED_STORES);
    } catch {
      // エラーは無視
    }
    notifyListeners();
  }, []);

  return {
    viewedStores,
    addViewedStore,
    clearViewedStores,
  };
}
