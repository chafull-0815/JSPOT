<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('store_cooking', function (Blueprint $table) {
            $table->id();
            $table->foreignId('store_id')->constrained('stores')->cascadeOnDelete();
            $table->foreignId('cooking_id')->constrained('cookings')->cascadeOnDelete();
            $table->timestamps();

            $table->unique(['store_id', 'cooking_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('store_cooking');
    }
};
