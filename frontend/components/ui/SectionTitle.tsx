// components/SectionTitle.tsx
export default function SectionTitle({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <h2 className="mb-4 text-lg font-semibold tracking-wide">
      <span className="bg-linear-to-r from-zinc-900 to-zinc-500 bg-clip-text text-transparent">
        {children}
      </span>
    </h2>
  );
}
