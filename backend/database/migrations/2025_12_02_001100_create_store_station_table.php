<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('store_station', function (Blueprint $table) {
            $table->id();
            $table->foreignId('store_id')->constrained('stores')->cascadeOnDelete();
            $table->foreignId('station_id')->constrained('stations')->cascadeOnDelete();
            $table->unsignedInteger('distance_minutes')->nullable();
            $table->timestamps();

            $table->unique(['store_id', 'station_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('store_station');
    }
};
