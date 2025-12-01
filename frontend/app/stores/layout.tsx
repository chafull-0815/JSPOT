// app/stores/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "店舗詳細 | JSPOT",
};

export default function StoresDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ここで詳細ページの共通枠だけ作る（必要なら）
  return <div className="mx-auto max-w-6xl px-4 py-6">{children}</div>;
}
