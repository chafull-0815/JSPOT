import HeroSlider from '@/components/MainHeroSlider';
import StoreCard from '@/components/StoreCard';
import SearchBar from '@/components/SearchBar';

const heroSlides = [
  { src: '/hero1.jpg', title: '今月の注目店', subtitle: '編集部おすすめの名店' },
  { src: '/hero2.jpg', title: '話題の新店', subtitle: 'オープンしたてを先取り' },
  { src: '/hero3.jpg', title: '予約困難の人気店', subtitle: '今なら空きあり？' },
];

// 仮データ（あとで Laravel 連携置き換え）
const hot = Array.from({ length: 9 }).map((_, i) => ({
  src: `/store${(i % 9) + 1}.jpg`,
  name: `HOTなお店 ${i + 1}`,
  area: ['東京', '大阪', '名古屋', '福岡'][i % 4],
  likes: 20 + i,
}));
const newest = Array.from({ length: 9 }).map((_, i) => ({
  src: `/store${(i % 9) + 1}.jpg`,
  name: `新着のお店 ${i + 1}`,
  area: ['東京', '大阪', '京都', '神戸'][i % 4],
  likes: 5 + i,
}));
const byArea = ['東京', '大阪', '名古屋', '福岡', '札幌', '仙台', '京都', '神戸'];


export default function Page() {
  return (
    <main className="pb-16">
      <HeroSlider slides={heroSlides} />

      {/* 検索（PC横並び / SPは右からドロワー） */}
      <section className="mx-auto mt-4 max-w-6xl px-4">
        <SearchBar />
      </section>

      {/* エリアから探す */}
      <section className="mx-auto mt-8 max-w-6xl px-4">
        <h2 className="mb-3 text-lg font-semibold">エリアから探す</h2>
        <div className="rounded-2xl border p-4">
          <div className="flex flex-wrap gap-2">
            {byArea.map((a) => (
              <button key={a} className="rounded-full border px-4 py-2 hover:bg-muted">
                {a}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* HOTなお店（SP：横スクロール / PC：グリッド） */}
      <SectionRow title="最近HOTなお店" items={hot} />

      {/* 新着のお店 */}
      <SectionRow title="新着のお店" items={newest} />
    </main>
  );
}

function SectionRow({
  title,
  items,
}: {
  title: string;
  items: { src: string; name: string; area: string; likes?: number }[];
}) {
  return (
    <section className="mx-auto mt-10 max-w-6xl px-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold">{title}</h2>
        <a className="text-sm text-muted-foreground hover:underline" href="#">
          すべて見る
        </a>
      </div>

      {/* SP: 横スクロール（1行） */}
      <div className="block md:hidden">
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1">
          {items.map((s, i) => (
            <div key={i} className="snap-start">
              {/* 横スクロール時に少しワイドめ */}
              <div className="w-[280px]">
                <StoreCard {...s} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PC: 4列グリッド */}
      <div className="hidden grid-cols-4 gap-6 md:grid">
        {items.map((s, i) => (
          <StoreCard key={i} {...s} />
        ))}
      </div>
    </section>
  );
}

