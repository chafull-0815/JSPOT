export default function RowScroller({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible">
      {children}
    </div>
  );
}
