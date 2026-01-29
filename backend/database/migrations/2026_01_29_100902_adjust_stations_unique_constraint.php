<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * 駅のslugは路線内でユニークであれば良い（異なる路線で同名駅がありうる）
     */
    public function up(): void
    {
        Schema::table('stations', function (Blueprint $table) {
            // 既存の単体unique制約を削除
            $table->dropUnique('stations_slug_unique');

            // 路線+slug の複合uniqueを追加
            $table->unique(['line_id', 'slug'], 'stations_line_id_slug_unique');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('stations', function (Blueprint $table) {
            // 複合uniqueを削除
            $table->dropUnique('stations_line_id_slug_unique');

            // 単体unique制約を復元
            $table->unique('slug', 'stations_slug_unique');
        });
    }
};
