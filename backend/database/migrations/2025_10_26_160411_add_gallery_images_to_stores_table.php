<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('stores', function (Blueprint $table) {
            // ギャラリー用 最大20枚
            // string でパスを保存。nullable で空でもOK
            for ($i = 1; $i <= 20; $i++) {
                $col = 'image_' . $i;
                $table->string($col)->nullable()->after('main_image');
            }
        });
    }

    public function down(): void
    {
        Schema::table('stores', function (Blueprint $table) {
            for ($i = 1; $i <= 20; $i++) {
                $col = 'image_' . $i;
                $table->dropColumn($col);
            }
        });
    }
};
