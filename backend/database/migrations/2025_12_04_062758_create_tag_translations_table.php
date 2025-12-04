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
        Schema::create('tag_translations', function (Blueprint $table) {
            $table->id();

            // tags.id へのFK。onDelete('cascade') でエラーになる場合はここが怪しいケースが多い
            $table->foreignId('tag_id')
                ->constrained('tags')   // ← テーブル名を明示
                ->cascadeOnDelete();    // = onDelete('cascade')

            $table->string('locale', 5); // 'ja', 'en', 'th' など
            $table->string('label');     // 該当言語での表示名

            $table->timestamps();

            $table->unique(['tag_id', 'locale']);
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tag_translations');
    }
};
