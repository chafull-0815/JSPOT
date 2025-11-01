<?php

// database/migrations/2025_10_30_000003_create_stores_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('stores', function (Blueprint $table) {
            $table->id();

            // 単一タクソノミー相当
            $table->foreignId('area_id')->constrained()->cascadeOnUpdate()->restrictOnDelete();

            // 基本
            $table->string('name')->index();
            $table->string('catch_copy')->nullable();
            $table->text('opening_hours')->nullable();   // text運用
            $table->string('phone_number')->nullable();
            $table->string('address')->nullable();

            // 料金
            $table->unsignedInteger('price_daytime')->nullable();
            $table->unsignedInteger('price_night')->nullable();

            // リンク類
            $table->string('official_url')->nullable();
            $table->string('instagram_url')->nullable();

            // 画像
            $table->string('main_image')->nullable();
            for ($i = 1; $i <= 20; $i++) {
                $table->string("sub_image_{$i}")->nullable();
            }

            // 紹介文
            $table->text('about_1')->nullable();
            $table->text('about_2')->nullable();
            $table->text('about_3')->nullable();

            // 位置
            $table->decimal('lat', 10, 7)->nullable()->index();
            $table->decimal('lng', 10, 7)->nullable()->index();

            $table->timestamps();
        });
    }
    public function down(): void {
        Schema::dropIfExists('stores');
    }
};
