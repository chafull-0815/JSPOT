<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('influencer_store', function (Blueprint $table) {
            $table->id();
            $table->foreignId('influencer_id')->constrained('influencers')->cascadeOnDelete();
            $table->foreignId('store_id')->constrained('stores')->cascadeOnDelete();

            // この関係のタイプ（recommend / visited / collab など）
            $table->string('relation_type', 50)->nullable();

            $table->timestamps();

            $table->unique(['influencer_id', 'store_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('influencer_store');
    }
};
