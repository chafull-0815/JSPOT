<?php

namespace Database\Seeders;

use App\Models\StatusDefinition;
use Illuminate\Database\Seeder;

class StatusDefinitionSeeder extends Seeder
{
    public function run(): void
    {
        $statuses = [
            ['domain' => 'visibility', 'slug' => 'draft', 'label_ja' => '下書き', 'label_en' => 'Draft', 'sort_order' => 1],
            ['domain' => 'visibility', 'slug' => 'published', 'label_ja' => '公開', 'label_en' => 'Published', 'sort_order' => 2],
            ['domain' => 'visibility', 'slug' => 'private', 'label_ja' => '非公開', 'label_en' => 'Private', 'sort_order' => 3],
        ];

        foreach ($statuses as $status) {
            StatusDefinition::updateOrCreate(
                ['domain' => $status['domain'], 'slug' => $status['slug']],
                $status
            );
        }
    }
}
