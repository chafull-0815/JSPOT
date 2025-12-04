<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('influencers', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete(); // ログインユーザーと紐付ける前提

            $table->foreignId('main_area_id')
                ->nullable()
                ->constrained('areas')
                ->nullOnDelete();

            $table->string('slug')->unique();
            $table->string('display_name');
            $table->string('avatar_url')->nullable();
            $table->text('bio')->nullable();

            $table->string('instagram_url')->nullable();
            $table->string('tiktok_url')->nullable();
            $table->string('youtube_url')->nullable();
            $table->string('website_url')->nullable();

            $table->unsignedInteger('follower_count')->default(0);
            $table->string('status', 20)->default('active');

            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('influencers');
    }
};
