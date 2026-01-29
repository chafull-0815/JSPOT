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
        Schema::create('store_view_histories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('store_id')->constrained()->onDelete('cascade');
            $table->string('actor_key'); // "U:{user_id}" or "V:{visitor_id}"
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade');
            $table->string('visitor_id', 26)->nullable(); // ULID
            $table->timestamp('last_viewed_at');
            $table->integer('view_count')->default(1);
            $table->timestamps();

            // 同一アクターによる同一店舗の閲覧は1レコード
            $table->unique(['actor_key', 'store_id']);

            // 履歴取得用インデックス
            $table->index(['actor_key', 'last_viewed_at']);
            $table->index(['user_id', 'last_viewed_at']);
            $table->index(['visitor_id', 'last_viewed_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('store_view_histories');
    }
};
