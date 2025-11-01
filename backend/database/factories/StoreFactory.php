<?php

namespace Database\Factories;

use App\Models\Store;
use App\Models\Area;
use App\Models\Cooking;
use App\Models\Attribute;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Storage;

class StoreFactory extends Factory
{
    protected $model = Store::class;

    public function definition(): array
    {
        return [
            'area_id'       => Area::inRandomOrder()->value('id') ?? Area::factory(),
            'name'          => $this->faker->company() . ' ' . $this->faker->randomElement(['本店','駅前店','金沢店']),
            'catch_copy'    => $this->faker->realText(20),
            'opening_hours' => "11:00〜22:00（L.O.21:30）\n定休日：水曜",
            'phone_number'  => $this->faker->numerify('090-####-####'),
            'address'       => '石川県金沢市' . $this->faker->streetAddress(),
            'price_daytime' => $this->faker->numberBetween(800, 2500),
            'price_night'   => $this->faker->numberBetween(1200, 5000),
            'official_url'  => $this->faker->url(),
            'instagram_url' => 'https://instagram.com/' . $this->faker->userName(),
            'about_1'       => $this->faker->realText(60),
            'about_2'       => $this->faker->realText(60),
            'about_3'       => $this->faker->realText(60),
            'lat'           => 36.561 + $this->faker->randomFloat(5, -0.05, 0.05),
            'lng'           => 136.656 + $this->faker->randomFloat(5, -0.05, 0.05),
            'main_image'    => null,
        ] + collect(range(1, 20))->mapWithKeys(fn ($i) => ["sub_image_{$i}" => null])->all();
    }

    /**
     * 画像を自動でつける（メイン1枚＋サブN枚）
     */
    public function withImages(int $sub = 3): self
    {
        return $this->afterCreating(function (Store $store) use ($sub) {
            // 64x64のシンプルPNG（プレースホルダー）
            $png = base64_decode('iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsSAAALEgHS3X78AAAAJ0lEQVR4nO3BAQ0AAADCoPdPbQ8HFAAAAAAAAAAAAAAAAAAAAAAAwH8G1gAAbLx2xwAAAABJRU5ErkJggg==');

            // メイン
            $mainPath = "stores/main/main_{$store->id}.png";
            Storage::disk('public')->put($mainPath, $png);
            $store->forceFill(['main_image' => $mainPath])->save();

            // サブ
            for ($i = 1; $i <= $sub; $i++) {
                $path = "stores/sub/sub_{$store->id}_{$i}.png";
                Storage::disk('public')->put($path, $png);
                $store->forceFill(["sub_image_{$i}" => $path]);
            }
            $store->save();
        });
    }

    /**
     * 多対多（料理ジャンル／属性）を自動で紐付け
     */
    public function withTaxonomies(int $cookings = 2, int $attrs = 2): self
    {
        return $this->afterCreating(function (Store $store) use ($cookings, $attrs) {
            $store->cookings()->sync(
                Cooking::inRandomOrder()->limit($cookings)->pluck('id')->all()
            );
            $store->attributes()->sync(
                Attribute::inRandomOrder()->limit($attrs)->pluck('id')->all()
            );
        });
    }

    /**
     * 例：高価格帯ステート（必要なら）
     */
    public function expensive(): self
    {
        return $this->state(fn () => [
            'price_daytime' => 5000,
            'price_night'   => 8000,
        ]);
    }
}
