<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('store_groups', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->nullable()->unique();
            $table->foreignId('created_by_admin_id')->constrained('admins');
            $table->timestamps();
        });

        Schema::create('stores', function (Blueprint $table) {
            $table->id();
            $table->ulid('public_id')->unique(); // URL用（推測困難）

            $table->string('name');
            $table->string('slug')->nullable()->index(); // 店名由来は重複し得るのでuniqueにしない
            $table->text('catchphrase')->nullable();
            $table->string('tel')->nullable();

            $table->foreignId('store_group_id')->nullable()->constrained('store_groups')->nullOnDelete();

            $table->foreignId('visibility_status_id')->nullable()->constrained('status_definitions')->nullOnDelete();
            $table->timestamp('published_at')->nullable();

            $table->foreignId('prefecture_id')->nullable()->constrained('prefectures')->nullOnDelete();
            $table->foreignId('city_id')->nullable()->constrained('cities')->nullOnDelete();
            $table->text('address_details')->nullable();
            $table->decimal('latitude', 9, 6)->nullable();
            $table->decimal('longitude', 10, 6)->nullable();

            $table->boolean('has_morning')->default(false);
            $table->integer('morning_min_price')->nullable();
            $table->integer('morning_max_price')->nullable();

            $table->boolean('has_lunch')->default(false);
            $table->integer('lunch_min_price')->nullable();
            $table->integer('lunch_max_price')->nullable();

            $table->boolean('has_dinner')->default(false);
            $table->integer('dinner_min_price')->nullable();
            $table->integer('dinner_max_price')->nullable();

            $table->integer('likes_count')->default(0);

            $table->foreignId('created_by_admin_id')->nullable()->constrained('admins')->nullOnDelete();
            $table->foreignId('updated_by_admin_id')->nullable()->constrained('admins')->nullOnDelete();

            $table->timestamps();
        });

        Schema::create('store_memberships', function (Blueprint $table) {
            $table->id();
            $table->foreignId('store_id')->constrained('stores')->cascadeOnDelete();
            $table->foreignId('store_profile_id')->constrained('store_profiles')->cascadeOnDelete();
            $table->string('role'); // owner/staff
            $table->string('status')->default('active');
            $table->foreignId('created_by_admin_id')->nullable()->constrained('admins')->nullOnDelete();
            $table->timestamps();

            $table->unique(['store_id', 'store_profile_id']);
        });

        // details
        Schema::create('store_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('store_id')->constrained('stores')->cascadeOnDelete();
            $table->string('image_url');
            $table->boolean('is_main')->default(false);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('store_opening_hours', function (Blueprint $table) {
            $table->id();
            $table->foreignId('store_id')->constrained('stores')->cascadeOnDelete();
            $table->integer('day_of_week')->nullable(); // 0..6, 7=Holiday
            $table->time('open_time')->nullable();
            $table->time('close_time')->nullable();
            $table->boolean('is_closed')->default(false);
            $table->string('display_text')->nullable();
            $table->timestamps();
        });

        Schema::create('store_introductions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('store_id')->constrained('stores')->cascadeOnDelete();
            $table->string('title')->nullable();
            $table->text('content')->nullable();
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        // line_id は持たない（stations.line_id から導出）
        Schema::create('store_stations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('store_id')->constrained('stores')->cascadeOnDelete();
            $table->foreignId('station_id')->constrained('stations')->cascadeOnDelete();
            $table->integer('walking_minutes')->nullable();
            $table->timestamps();

            $table->unique(['store_id', 'station_id']);
        });

        // pivots
        Schema::create('store_categories', function (Blueprint $table) {
            $table->foreignId('store_id')->constrained('stores')->cascadeOnDelete();
            $table->foreignId('category_id')->constrained('categories')->cascadeOnDelete();
            $table->primary(['store_id', 'category_id']);
        });

        Schema::create('store_scenes', function (Blueprint $table) {
            $table->foreignId('store_id')->constrained('stores')->cascadeOnDelete();
            $table->foreignId('scene_id')->constrained('scenes')->cascadeOnDelete();
            $table->primary(['store_id', 'scene_id']);
        });

        Schema::create('store_tags', function (Blueprint $table) {
            $table->foreignId('store_id')->constrained('stores')->cascadeOnDelete();
            $table->foreignId('tag_id')->constrained('tags')->cascadeOnDelete();
            $table->primary(['store_id', 'tag_id']);
        });

        Schema::create('store_payments', function (Blueprint $table) {
            $table->foreignId('store_id')->constrained('stores')->cascadeOnDelete();
            $table->foreignId('payment_method_id')->constrained('payment_methods')->cascadeOnDelete();
            $table->primary(['store_id', 'payment_method_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('store_payments');
        Schema::dropIfExists('store_tags');
        Schema::dropIfExists('store_scenes');
        Schema::dropIfExists('store_categories');

        Schema::dropIfExists('store_stations');
        Schema::dropIfExists('store_introductions');
        Schema::dropIfExists('store_opening_hours');
        Schema::dropIfExists('store_images');

        Schema::dropIfExists('store_memberships');
        Schema::dropIfExists('stores');
        Schema::dropIfExists('store_groups');
    }
};
