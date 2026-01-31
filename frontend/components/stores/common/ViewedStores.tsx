"use client"

import { useEffect, useState } from "react"
import type { Store } from "@/types/store"
import { STORAGE_KEYS } from "@/constants/storage"

export const ViewedStores = () => {
    const [stores, setStores] = useState<Store[]>([])

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEYS.VIEWED_STORE_IDS)
        if (!stored) return

        const ids: number[] = JSON.parse(stored)
        if (!ids.length) return

        const query = ids.map(id => `ids[]=${id}`).join("&")

        fetch(`/api/stores?${query}`)
            .then(res => res.json())
            .then((data: Store[]) => {
                const storeMap = new Map(data.map(store => [store.id, store]))
                const sorted = ids.map(id => storeMap.get(id)).filter(Boolean) as Store[]
                setStores(sorted)
            })
    }, [])

    return (
        <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">最近見た店舗</h2>
            <div className="overflow-x-auto flex gap-4">
                {stores.length === 0 ? (
                    <div className="text-sm text-gray-400">履歴はまだありません。</div>
                ) : (
                    stores.map((store) => (
                        <div
                            key={store.id}
                            className="min-w-[160px] border p-2 rounded shadow-sm bg-white"
                        >
                            <img
                                src={store.image_path}
                                alt={store.name}
                                className="w-full h-32 object-cover rounded"
                            />
                            <p className="mt-2 text-sm font-medium">{store.name}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
