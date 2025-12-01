<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('stores', function (Blueprint $table) {
            $table->id();

            // オーナーとなるユーザー（shop_owner）
            $table->foreignId('owner_user_id')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            $table->foreignId('area_id')
                ->nullable()
                ->constrained('areas')
                ->nullOnDelete();

            $table->string('slug')->unique();
            $table->string('name');
            $table->string('catch_copy')->nullable();
            $table->text('description')->nullable();

            // 住所・連絡先
            $table->string('address')->nullable();
            $table->string('phone')->nullable();
            $table->string('website_url')->nullable();
            $table->string('instagram_url')->nullable();

            // 営業関連（必要であれば使う）
            $table->string('opening_hours')->nullable();
            $table->string('regular_holiday')->nullable();

            // 予算
            $table->unsignedInteger('budget_min')->nullable();
            $table->unsignedInteger('budget_max')->nullable();

            // 位置情報（必須）
            $table->decimal('lat', 10, 7); // ±90 まで表現できるくらい
            $table->decimal('lng', 10, 7); // ±180 まで

            // 掲載状態
            $table->boolean('is_published')->default(true);
            $table->string('status', 20)->default('published'); // draft / published / suspended など

            // ★ 優先度スコア：数値が大きいほど強い（広告プランなど）
            $table->unsignedInteger('priority_score')->default(1); // 1:無料, 3:サブスク, 5:広告 など

            // ★ サイト側のおすすめフラグ
            $table->boolean('is_recommended')->default(false);

            // ★ 集計系
            $table->unsignedInteger('likes_count')->default(0);
            $table->decimal('rating_avg', 3, 2)->default(0);

            $table->unsignedInteger('rating_count')->default(0);

            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('stores');
    }
};
