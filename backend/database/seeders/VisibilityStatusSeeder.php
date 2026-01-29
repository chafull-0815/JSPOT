<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\VisibilityStatus;

class VisibilityStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $statuses = ['公開', '下書き', '非公開'];

        foreach ($statuses as $label) {
            VisibilityStatus::firstOrCreate(['label' => $label]);
        }
    }
}
