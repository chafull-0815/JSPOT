// components/PillTabs.tsx
export default function PillTabs({ items, active = 0 }: { items: string[]; active?: number }) {
  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {items.map((it, i) => (
        <button
          key={it}
          className={`rounded-full border px-3 py-1 text-sm ${i === active ? "border-zinc-900 bg-zinc-900 text-white" : "border-zinc-300 bg-white text-zinc-700 hover:border-zinc-400"}`}
        >
          {it}
        </button>
      ))}
    </div>
  );
}
