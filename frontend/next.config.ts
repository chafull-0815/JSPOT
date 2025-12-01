// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  reactCompiler: true,
  images: {
    formats: ["image/avif", "image/webp"],        // 軽量フォーマット
    deviceSizes: [360, 414, 640, 768, 1024, 1280, 1536],
    imageSizes:  [160, 240, 320, 480],            // サムネ用
    minimumCacheTTL: 60,                           // 画像キャッシュ
    // remotePatterns: [] // 画像をCDN配信にしたらここへ許可ドメインを追加
  },
};

export default nextConfig;
