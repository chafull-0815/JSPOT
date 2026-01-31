// frontend/hooks/useStoreViewHistory.ts
"use client"

import { useEffect } from "react"

const MAX_HISTORY = 20
const STORAGE_KEY = "viewedStoreIds"

export function useStoreViewHistory(storeId: number) {
    useEffect(() => {
        if (!storeId) return

        const stored = localStorage.getItem(STORAGE_KEY)
        let history: number[] = stored ? JSON.parse(stored) : []

        // storeIdが既にあれば削除（再追加して先頭に持ってくる）
        history = history.filter(id => id !== storeId)
        history.unshift(storeId)

        // 上限超過したら切り捨て
        if (history.length > MAX_HISTORY) {
            history = history.slice(0, MAX_HISTORY)
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
    }, [storeId])
}
