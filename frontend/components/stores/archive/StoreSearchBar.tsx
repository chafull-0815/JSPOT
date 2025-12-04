"use client";

import type { SearchMeta } from "@/lib/data/search";
import type { Taxonomy } from "@/lib/fixtures/stores.fixture";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { Container } from "../../layout";

type Props = {
  meta: SearchMeta;
};

const toOptions = (arr: Taxonomy[]) =>
  arr.map((v) => ({ label: v.label, value: v.slug }));

export default function StoreSearchBar({ meta }: Props) {
  const router = useRouter();

  // meta
  const areas = useMemo(() => meta.areas ?? [], [meta.areas]);
  const stations = useMemo(() => meta.stations ?? {}, [meta.stations]);
  const cookings = useMemo(
    () => meta.cookings ?? meta.genres ?? [],
    [meta.cookings, meta.genres]
  );
  const lunchBudgets = useMemo(
    () => meta.lunchBudgets ?? [],
    [meta.lunchBudgets]
  );
  const dinnerBudgets = useMemo(
    () => meta.dinnerBudgets ?? [],
    [meta.dinnerBudgets]
  );

  // ---- state 定義（URL からは拾わず全部空スタート）----
  const [area, setArea] = useState("");
  const [station, setStation] = useState("");
  const [cooking, setCooking] = useState("");
  const [dayType, setDayType] = useState<"" | "lunch" | "dinner">("");
  const [budget, setBudget] = useState("");

  const isStationDisabled = !area;
  const isBudgetDisabled = !dayType;

  // area を選んだ時の station 候補
  const stationOptions = useMemo(() => {
    if (!area) return [];
    return toOptions(stations[area] ?? []);
  }, [area, stations]);

  // dayType に応じた予算候補
  const budgetOptions = useMemo(() => {
    if (dayType === "lunch") return lunchBudgets;
    if (dayType === "dinner") return dinnerBudgets;
    return [];
  }, [dayType, lunchBudgets, dinnerBudgets]);

  // dayType変更時にbudgetクリア
  const onChangeDayType = (v: "" | "lunch" | "dinner") => {
    setDayType(v);
    setBudget("");
  };

  const onSearch = useCallback(() => {
    const q = new URLSearchParams();

    if (area) q.set("area", area);
    if (station) q.set("station", station);
    if (cooking) q.set("cooking", cooking);

    if (dayType === "lunch") {
      if (budget) q.set("lunch", budget);
      q.delete("dinner");
    } else if (dayType === "dinner") {
      if (budget) q.set("dinner", budget);
      q.delete("lunch");
    } else {
      q.delete("lunch");
      q.delete("dinner");
    }

    router.push(`/stores?${q.toString()}`);
  }, [router, area, station, cooking, dayType, budget]);

  return (
    <Container>
      <section className="my-6 border rounded-2xl bg-white p-4 shadow-sm">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {/* Area */}
          <select
            value={area}
            onChange={(e) => {
              const v = e.target.value;
              setArea(v);
              setStation(""); // area変えたら駅もクリア
            }}
            className="h-11 rounded-lg border px-3"
          >
            <option value="">エリア</option>
            {areas.map((a) => (
              <option key={a.slug} value={a.slug}>
                {a.label}
              </option>
            ))}
          </select>

          {/* Station（area選択時のみ候補が出る） */}
          <select
            value={station}
            onChange={(e) => setStation(e.target.value)}
            className={`h-11 rounded-lg border border-black px-3
              ${
                isStationDisabled
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-white text-black"
              }
              `}
            disabled={!area}
          >
            <option value="">駅</option>
            {stationOptions.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>

          {/* Cooking */}
          <select
            value={cooking}
            onChange={(e) => setCooking(e.target.value)}
            className="h-11 rounded-lg border px-3"
          >
            <option value="">ジャンル</option>
            {cookings.map((g) => (
              <option key={g.slug} value={g.slug}>
                {g.label}
              </option>
            ))}
          </select>

          {/* dayType（昼/夜） */}
          <select
            value={dayType}
            onChange={(e) =>
              onChangeDayType(e.target.value as "" | "lunch" | "dinner")
            }
            className="h-11 rounded-lg border px-3"
          >
            <option value="">昼 / 夜</option>
            <option value="lunch">昼（ランチ）</option>
            <option value="dinner">夜（ディナー）</option>
          </select>

          {/* Budget（dayType選択後に有効化） */}
          <select
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className={`h-11 rounded-lg border border-black px-3
              ${
                isBudgetDisabled
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-white text-black"
              }
              `}
            disabled={!dayType}
          >
            <option value="">予算</option>
            {budgetOptions.map((b) => (
              <option key={b.label} value={b.label}>
                {b.label}
              </option>
            ))}
          </select>

          <button
            onClick={onSearch}
            className="h-11 rounded-lg bg-black text-white md:col-span-1"
          >
            検索
          </button>
        </div>
      </section>
    </Container>
  );
}
