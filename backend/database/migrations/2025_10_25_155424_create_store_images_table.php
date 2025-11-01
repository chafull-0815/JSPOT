<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('store_images', function (Blueprint $table) {
            $table->id();

            $table->foreignId('store_id')
                ->constrained('stores')
                ->onDelete('cascade');

            $table->string('image_url'); // 画像URL
            $table->unsignedInteger('sort_order')->default(0); // 並び順

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('store_images');
    }
};
