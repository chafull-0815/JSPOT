<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('store_change_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('store_id')->constrained('stores')->cascadeOnDelete();
            $table->foreignId('store_profile_id')->constrained('store_profiles')->cascadeOnDelete();

            $table->foreignId('status_id')->nullable()->constrained('status_definitions')->nullOnDelete();
            $table->jsonb('payload');
            $table->text('message')->nullable();

            $table->foreignId('handled_by_admin_id')->nullable()->constrained('admins')->nullOnDelete();
            $table->timestamp('handled_at')->nullable();

            $table->timestamps();
        });

        Schema::create('influencer_change_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('influencer_profile_id')->constrained('influencer_profiles')->cascadeOnDelete();

            $table->foreignId('status_id')->nullable()->constrained('status_definitions')->nullOnDelete();
            $table->jsonb('payload');
            $table->text('message')->nullable();

            $table->foreignId('handled_by_admin_id')->nullable()->constrained('admins')->nullOnDelete();
            $table->timestamp('handled_at')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('influencer_change_requests');
        Schema::dropIfExists('store_change_requests');
    }
};
