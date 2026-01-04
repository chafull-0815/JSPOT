<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('user_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->unique()->constrained()->cascadeOnDelete();
            $table->string('display_name')->nullable();
            $table->boolean('newsletter_opt_in')->default(true);
            $table->string('locale')->default('ja');
            $table->timestamps();
        });

        Schema::create('store_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->unique()->constrained()->cascadeOnDelete();
            $table->string('display_name')->nullable();
            $table->string('contact_name')->nullable();
            $table->string('contact_tel')->nullable();
            $table->foreignId('created_by_admin_id')->constrained('admins');
            $table->timestamps();
        });

        Schema::create('influencer_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->unique()->constrained()->cascadeOnDelete();

            $table->ulid('public_id')->unique();
            $table->string('name');
            $table->string('slug')->unique();

            $table->string('youtube_url')->nullable();
            $table->string('tiktok_url')->nullable();
            $table->string('facebook_url')->nullable();
            $table->string('instagram_url')->nullable();
            $table->text('bio')->nullable();

            $table->foreignId('created_by_admin_id')->constrained('admins');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('influencer_profiles');
        Schema::dropIfExists('store_profiles');
        Schema::dropIfExists('user_profiles');
    }
};
