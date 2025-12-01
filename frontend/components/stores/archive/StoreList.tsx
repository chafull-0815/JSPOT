// components/stores/StoreList.tsx

import { StoreCard } from "@/components/stores";
import type { Store } from "@/lib/fixtures/stores.fixture";

type StoreListProps = {
  stores: Store[];
};

export function StoreList({ stores }: StoreListProps) {
  return (
    <div className="grid grid-cols-1 gap-8 sm:gap-8 md:grid-cols-3 lg:grid-cols-4">
      {stores.map((s) => (
        <StoreCard
          key={s.id}
          href={`/stores/${s.slug}`}
          name={s.name ?? ""}
          area={s.area?.label ?? ""}
          category={s.cooking?.label ?? ""}
          lunch={s.price?.lunch ?? null}
          dinner={s.price?.dinner ?? null}
          src={s.images.cover_url}
          likes={s.like}
        />
      ))}

      {stores.length === 0 && (
        <div className="col-span-full rounded-xl border p-10 text-center text-sm text-muted-foreground">
          条件に合う店舗が見つかりませんでした。
        </div>
      )}
    </div>
  );
}
