import Image from 'next/image';

export default function StoreCard({
  src,
  name,
  area,
  likes,
}: {
  src: string;
  name: string;
  area?: string;
  likes?: number;
}) {
  return (
    <div className="w-[260px] shrink-0">
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl">
        <Image src={src} alt={name} fill className="object-cover" />
        {typeof likes === 'number' && (
          <span className="absolute left-2 top-2 rounded-full bg-black/60 px-2 py-0.5 text-xs text-white">
            ♥ {likes}
          </span>
        )}
      </div>
      <div className="mt-2">
        <p className="line-clamp-1 font-medium">{name}</p>
        {area && <p className="text-sm text-muted-foreground">{area}</p>}
      </div>
    </div>
  );
}
