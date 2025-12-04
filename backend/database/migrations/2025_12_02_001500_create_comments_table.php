<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('comments', function (Blueprint $table) {
            $table->id();

            $table->foreignId('store_id')
                ->constrained('stores')
                ->cascadeOnDelete();

            // ログイン済みユーザーのコメントならセット、ゲストなら null
            $table->foreignId('user_id')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            $table->string('nickname'); // 表示名（ゲスト or その時点の名前）
            $table->unsignedTinyInteger('rating')->default(0); // 1〜5 想定
            $table->text('body');

            $table->string('status', 20)->default('published'); // published / pending など

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('comments');
    }
};
