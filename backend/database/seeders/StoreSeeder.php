<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\{Store, Cooking, Attribute, Area};
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Http;

class StoreSeeder extends Seeder
{
    public function run(): void
    {
        $areas = Area::pluck('id')->all();
        $cook  = Cooking::pluck('id')->all();
        $attrs = Attribute::pluck('id')->all();

        // 保存ヘルパ：URLから取得→publicディスクに保存。失敗時はnullを返す
        $saveFromUrl = function (string $url, string $path): ?string {
            try {
                $res = Http::timeout(15)->get($url);
                if ($res->successful() && $res->body()) {
                    Storage::disk('public')->put($path, $res->body(), 'public');
                    return $path;
                }
            } catch (\Throwable $e) {
                // 無視（あとでプレースホルダにフォールバック）
            }
            return null;
        };

        // フォールバック用の超小さいPNG
        $placeholderPng = base64_decode(
            'iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsSAAALEgHS3X78AAAAJ0lEQVR4nO3BAQ0AAADCoPdPbQ8HFAAAAAAAAAAAAAAAAAAAAAAAwH8G1gAAbLx2xwAAAABJRU5ErkJggg=='
        );

        for ($n = 1; $n <= 10; $n++) {
            $store = Store::create([
                'area_id'       => $areas[array_rand($areas)],
                'name'          => "テスト店{$n}",
                'catch_copy'    => '地域密着・丁寧施工',
                'opening_hours' => "11:00〜22:00（L.O.21:30）\n定休日：水曜",
                'phone_number'  => '090-1234-5678',
                'address'       => "石川県金沢市テスト{$n}-1-1",
                'price_daytime' => rand(800, 2500),
                'price_night'   => rand(1200, 5000),
                'official_url'  => 'https://example.com',
                'instagram_url' => 'https://instagram.com/example',
                'lat'           => 36.561 + (mt_rand(-50, 50) / 1000),
                'lng'           => 136.656 + (mt_rand(-50, 50) / 1000),
            ]);

            // ---- メイン画像（例：Picsumを使用）
            $mainRel = "stores/main/main_{$store->id}.jpg";
            $mainOk  = $saveFromUrl("https://picsum.photos/seed/main{$store->id}/800/450", $mainRel);
            if (!$mainOk) { // 失敗時はプレースホルダ
                Storage::disk('public')->put($mainRel, $placeholderPng, 'public');
            }
            $store->update(['main_image' => $mainRel]);

            // ---- サブ画像（2〜6枚）
            $subCount = rand(2, 6);
            for ($i = 1; $i <= $subCount; $i++) {
                $subRel = "stores/sub/sub_{$store->id}_{$i}.jpg";
                $ok = $saveFromUrl("https://picsum.photos/seed/sub{$store->id}_{$i}/600/400", $subRel);
                if (!$ok) {
                    Storage::disk('public')->put($subRel, $placeholderPng, 'public');
                }
                $store->update(["sub_image_{$i}" => $subRel]);
            }

            // ---- 多対多
            shuffle($cook);
            shuffle($attrs);
            $store->cookings()->sync(array_slice($cook, 0, rand(2, 3)));
            $store->attributes()->sync(array_slice($attrs, 0, rand(1, 3)));
        }
    }
}
