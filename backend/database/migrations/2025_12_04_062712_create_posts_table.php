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
    Schema::create('posts', function (Blueprint $table) {
            $table->id();

            // store / influencer / user などの所有者をポリモーフィックで
            $table->string('owner_type'); // App\Models\Store など
            $table->unsignedBigInteger('owner_id');

            $table->string('title');
            $table->text('body')->nullable();
            $table->string('status')->default('draft'); // draft/published など
            $table->timestamp('published_at')->nullable()->index();

            $table->timestamps();

            // よく使う絞り込み用
            $table->index(['owner_type', 'owner_id', 'status']);
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
