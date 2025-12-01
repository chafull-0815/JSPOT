// app/stores/loading.tsx
export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6" role="status" aria-busy="true" aria-live="polite">
      <div className="mb-4 h-6 w-40 animate-pulse rounded bg-muted" />
      <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-56 animate-pulse rounded-xl border bg-muted" />
        ))}
      </div>
    </div>
  );
}
