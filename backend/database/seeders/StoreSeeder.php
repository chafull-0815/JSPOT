<?php

namespace Database\Seeders;

use App\Models\Area;
use App\Models\Cooking;
use App\Models\Store;
use App\Models\Tag;
use App\Models\Taxonomy;
use Illuminate\Database\Seeder;

class StoreSeeder extends Seeder
{
    public function run(): void
    {
        // マスタが空なら軽く作る（あとでちゃんと作り直してOK）
        if (Area::count() === 0) {
            Area::factory()->count(5)->create();
        }
        if (Cooking::count() === 0) {
            Cooking::factory()->count(5)->create();
        }
        if (Taxonomy::count() === 0) {
            Taxonomy::factory()->count(5)->create();
        }
        if (Tag::count() === 0) {
            Tag::factory()->count(10)->create();
        }

        $cookings = Cooking::all();
        $taxonomies = Taxonomy::all();
        $tags = Tag::all();

        Store::factory()
            ->count(20)
            ->create()
            ->each(function (Store $store) use ($cookings, $taxonomies, $tags) {
                $store->cookings()->attach(
                    $cookings->random(rand(1, 2))->pluck('id')->toArray()
                );
                $store->taxonomies()->attach(
                    $taxonomies->random(rand(1, 2))->pluck('id')->toArray()
                );
                $store->tags()->attach(
                    $tags->random(rand(2, 4))->pluck('id')->toArray()
                );
            });
    }
}
