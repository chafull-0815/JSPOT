<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('status_definitions', function (Blueprint $table) {
            $table->id();
            $table->string('domain');
            $table->string('slug');
            $table->string('label_ja');
            $table->string('label_en')->nullable();
            $table->integer('sort_order')->default(0);
            $table->timestamps();

            $table->unique(['domain', 'slug']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('status_definitions');
    }
};
