"use client";

type Props = {
  lat?: number;
  lng?: number;
  label?: string;
  height?: string;
  addres?: string;
}

export function StoreMap({ lat, lng, label, height, addres }: Props) {
  if (lat == null || lng == null) {
    return (
      <div className="flex h-[220px] items-center justify-center rounded-lg bg-muted text-sm text-muted-foreground">
        地図準備中
      </div>
    );
  }

  // embedは座標中心（ここの表記はGoogle側仕様）
  const embedSrc = `https://www.google.com/maps?q=${lat},${lng}&z=16&output=embed`;

  // 外部で開く時はlabel優先で検索させる
  const query = encodeURIComponent(`${lat},${lng}`);
  const openSrc = `https://www.google.com/maps/search/?api=1&query=${query}`;

  return (
    <div className="grid">
      {/* Map */}
      <div className="relative border-b sm:border-none overflow-hidden bg-white" style={{ height }}>
        <iframe
          title={label ?? "map"}
          src={embedSrc}
          width="100%"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block w-full h-full"
        />
        <div className="absolute left-2 top-2 h-20 sm:h-15 w-52 sm:w-50 rounded-md bg-white shodow-sm" />

        {/* 店名ラベル */}
        {label && (
          <div className="absolute left-4 top-4 text-sm font-semibold text-foreground">
            {label}<br />{addres}
          </div>
        )}

        {/* 右上にGoogle Mapで表示テキスト */}
        <a
          href={openSrc}
          target="_blank"
          rel="noreferrer"
          className="hidden sm:block absolute right-2 top-2 z-10 rounded-md border bg-white px-3 py-1 text-xs font-medium shadow-sm hover:bg-white/90"
        >
          Google Mapで表示
        </a>
      </div>
      <div className="flex justify-end sm:hidden py-3 px-1">
        <a
          href={openSrc}
          target="_blank"
          rel="noreferrer"
          className="text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground text-blue-700"
        >
          Google Mapを開く
        </a>
      </div>
    </div>

  );

}