import Container from "./Container";
import { regions } from "@/lib/stores";

export default function RegionLinks() {
  return (
    <Container>
      <div className="rounded-xl border border-zinc-200 bg-white p-4">
        <h3 className="mb-3 text-sm font-semibold">エリアから探す</h3>
        <div className="flex flex-wrap gap-2">
          {regions.map(r => (
            <a key={r} href="#" className="rounded-full border border-zinc-300 px-3 py-1 text-sm hover:border-zinc-400">
              {r}
            </a>
          ))}
        </div>
      </div>
    </Container>
  );
}
