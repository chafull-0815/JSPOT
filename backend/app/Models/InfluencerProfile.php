<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class InfluencerProfile extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'user_id',
        'display_name',
        'name_en',
        'youtube_url',
        'tiktok_url',
        'facebook_url',
        'instagram_url',
        'bio',
        'profile_image',
    ];

    protected static function booted(): void
    {
        static::creating(function (self $influencer) {
            if (empty($influencer->public_id)) {
                $influencer->public_id = (string) Str::ulid();
            }

            if (empty($influencer->slug)) {
                $source = $influencer->name_en ?? $influencer->display_name ?? '';
                $influencer->slug = static::makeUniqueSlug($source);
            }
        });

        static::updating(function (self $influencer) {
            if ($influencer->isDirty('name_en')) {
                $source = $influencer->name_en ?? $influencer->display_name ?? '';
                if (filled($source)) {
                    $influencer->slug = static::makeUniqueSlug($source, $influencer->id);
                }
            }
        });
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    protected static function makeUniqueSlug(string $source, ?int $ignoreId = null): string
    {
        $base = Str::slug($source);
        $base = $base !== '' ? $base : 'influencer';

        $slug = $base;
        $i = 2;

        while (
            static::query()
                ->where('slug', $slug)
                ->when($ignoreId, fn ($q) => $q->where('id', '!=', $ignoreId))
                ->exists()
        ) {
            $slug = "{$base}-{$i}";
            $i++;
        }

        return $slug;
    }

    public function pageKey(): string
    {
        $slug = $this->slug ?: 'influencer';
        return "{$slug}-{$this->public_id}";
    }
}
