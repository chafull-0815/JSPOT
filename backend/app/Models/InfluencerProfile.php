<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class InfluencerProfile extends Model
{
    /** @use HasFactory<\Database\Factories\InfluencerProfileFactory> */
    use HasFactory;
    use SoftDeletes;

    protected $guarded = [];

    protected static function booted(): void
    {
      static::creating(function (self $influencer) {
          if (empty($influencer->public_id)) {
              $influencer->public_id = (string) Str::ulid();
          }

          if (empty($influencer->slug)) {
              $source = $influencer->en_name ?? $influencer->name_en ?? $influencer->name ?? '';
              $influencer->slug = static::makeUniqueSlug($source);
          }
      });

      static::updating(function (self $influencer) {
          if ($influencer->isDirty(['en_name', 'name_en'])) {
              $source = $influencer->en_name ?? $influencer->name_en ?? $influencer->name ?? '';
              if (filled($source)) {
                  $influencer->slug = static::makeUniqueSlug($source, $influencer->id);
              }
          }
      });
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
