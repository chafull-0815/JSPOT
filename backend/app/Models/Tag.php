<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Tag extends Model
{
    protected $fillable = [
        'slug',
        'name',
        'sort_order',
    ];

    /**
     * 翻訳（多言語表示名）
     */
    public function translations(): HasMany
    {
        return $this->hasMany(TagTranslation::class);
    }

    /**
     * このタグが紐付いている投稿
     */
    public function posts(): BelongsToMany
    {
        return $this->belongsToMany(Post::class)
            ->withTimestamps();
    }

    /**
     * 指定ロケールの翻訳を1件取得（fallback込み）
     */
    public function translationFor(string $locale): ?TagTranslation
    {
        return $this->translations
            ->firstWhere('locale', $locale)
            ?? $this->translations->firstWhere('locale', config('app.locale'));
    }

    /**
     * 表示名（多言語対応）
     *
     * $tag->label で取得できるようにする
     */
    public function getLabelAttribute(): string
    {
        $locale = app()->getLocale();

        $translation = $this->translations
            ->firstWhere('locale', $locale)
            ?? $this->translations->firstWhere('locale', config('app.locale'));

        // 翻訳なければ name をそのまま返す
        return $translation->label ?? $this->name;
    }
}
