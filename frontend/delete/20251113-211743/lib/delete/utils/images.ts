// lib/utils/images.ts
/**
 * public配下の画像パスを正規化:
 * - "/images/..." でも "/" 始まりでもOKにする
 * - それ以外（外部URL等）はそのまま返す
 */
export function normalizePublicImagePath(p: string): string {
  if (!p) return p;
  if (p.startsWith("/images/")) return p.replace("/images/", "/"); // 以前のfixImg互換
  if (p.startsWith("/")) return p;
  return p;
}

/** Hero用： {image,title,caption} -> {src,title,subtitle} に変換しつつパス正規化 */
export function toHeroSlide(s: { image: string; title: string; caption?: string }) {
  return {
    src: normalizePublicImagePath(s.image),
    title: s.title,
    subtitle: s.caption,
  };
}
