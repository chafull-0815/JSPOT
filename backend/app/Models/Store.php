<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;


class Store extends Model
{
    /** @use HasFactory<\Database\Factories\StoreFactory> */
    use HasFactory, SoftDeletes;

    // 事故防止：$guarded=[] は禁止。編集可能なものだけ許可。
    protected $fillable = [
        'name',
        'name_en',
        'slug',
        'catchphrase',
        'tel',
        'store_group_id',
        'visibility_status_id',
        'published_at',
        'prefecture_id',
        'city_id',
        'address_details',
        'latitude',
        'longitude',
        'has_morning',
        'morning_min_price',
        'morning_max_price',
        'has_lunch',
        'lunch_min_price',
        'lunch_max_price',
        'has_dinner',
        'dinner_min_price',
        'dinner_max_price',
        'likes_count',
        'admin_likes',
    ];

    protected $casts = [
        'published_at' => 'datetime',
        'has_morning' => 'boolean',
        'has_lunch' => 'boolean',
        'has_dinner' => 'boolean',
        'latitude' => 'decimal:6',
        'longitude' => 'decimal:6',
        'morning_min_price' => 'integer',
        'morning_max_price' => 'integer',
        'lunch_min_price' => 'integer',
        'lunch_max_price' => 'integer',
        'dinner_min_price' => 'integer',
        'dinner_max_price' => 'integer',
    ];

    protected static function booted(): void
    {
        static::creating(function (self $store) {
            // public_id（URL用）は必ず自動付与
            if (empty($store->public_id)) {
                $store->public_id = (string) Str::ulid();
            }

            // 作成者（adminガードでログインしている時だけ）
            $admin = auth('admin')->user();
            if ($admin && empty($store->created_by_admin_id)) {
                $store->created_by_admin_id = $admin->id;
            }
        });

        static::saving(function (self $store) {
            // slug は name_en から自動生成（手入力はしない）
            if (filled($store->name_en)) {
                $store->slug = Str::slug($store->name_en);
            }

            // 更新者（adminガードでログインしている時だけ）
            $admin = auth('admin')->user();
            if ($admin) {
                $store->updated_by_admin_id = $admin->id;
            }
        });
    }

    public function pageKey(): string
    {
        $slug = $this->slug ?: 'store';
        return "{$slug}-{$this->public_id}";
    }

    public function images(): HasMany
    {
        return $this->hasMany(StoreImage::class)->orderBy('sort_order');
    }

    public function mainImage(): HasOne
    {
        return $this->hasOne(StoreImage::class)
            ->where('is_main', true)
            ->orderBy('sort_order');
    }

    public function userLikes(): HasMany
    {
        return $this->hasMany(UserLike::class);
    }

    public function getTotalLikesAttribute(): int
    {
        return ($this->likes_count ?? 0) + ($this->admin_likes ?? 0);
    }

}
