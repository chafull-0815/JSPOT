<?php

// database/migrations/2025_10_30_000005_create_cooking_store_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('cooking_store', function (Blueprint $table) {
            $table->id();
            $table->foreignId('store_id')->constrained()->cascadeOnDelete();
            $table->foreignId('cooking_id')->constrained()->cascadeOnDelete();
            $table->unique(['store_id','cooking_id']);
            $table->timestamps();
        });
    }
    public function down(): void {
        Schema::dropIfExists('cooking_store');
    }
};
