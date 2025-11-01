<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('store_likes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('store_id')->constrained()->cascadeOnDelete();
            $table->string('uuid', 64);         // クッキーの値
            $table->string('ip', 45)->nullable();
            $table->string('ua', 255)->nullable();
            $table->timestamps();

            $table->unique(['store_id', 'uuid']); // 同一ブラウザの二重防止
            $table->index('store_id');
        });
    }
    public function down(): void {
        Schema::dropIfExists('store_likes');
    }
};
