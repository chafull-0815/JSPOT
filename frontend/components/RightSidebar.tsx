// components/RightSidebar.tsx
import Image from "next/image";
import type { Article } from "@/lib/mock";

export default function RightSidebar({ items }: { items: Article[] }) {
  return (
    <aside className="sticky top-20 hidden h-fit space-y-4 lg:block">
      <div className="rounded-lg border border-zinc-200 bg-white">
        <h3 className="border-b p-3 text-sm font-semibold">ランキング</h3>
        <ul className="p-3">
          {items.map((it, i) => (
            <li key={it.id} className="flex items-center gap-3 border-b py-3 last:border-b-0">
              <span className="grid h-6 w-6 place-items-center rounded bg-zinc-900 text-xs font-bold text-white">{i + 1}</span>
              <div className="relative h-12 w-16 overflow-hidden rounded">
                <Image src={it.image} alt="" fill className="object-cover" />
              </div>
              <p className="line-clamp-2 text-sm">{it.title}</p>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
