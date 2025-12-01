<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Store extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'owner_user_id',
        'area_id',
        'slug',
        'name',
        'catch_copy',
        'description',
        'address',
        'phone',
        'website_url',
        'instagram_url',
        'opening_hours',
        'regular_holiday',
        'budget_min',
        'budget_max',
        'lat',
        'lng',
        'is_published',
        'status',
        'priority_score',
        'is_recommended',
        'likes_count',
        'rating_avg',
        'rating_count',
    ];

    protected $casts = [
        'lat' => 'float',
        'lng' => 'float',
        'is_published' => 'boolean',
        'is_recommended' => 'boolean',
    ];

    // オーナーユーザー（shop_owner）
    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_user_id');
    }

    // エリア
    public function area()
    {
        return $this->belongsTo(Area::class);
    }

    // 画像
    public function images()
    {
        return $this->hasMany(StoreImage::class);
    }

    // いいね
    public function likes()
    {
        return $this->hasMany(StoreLike::class);
    }

    // 料理ジャンル
    public function cookings()
    {
        return $this->belongsToMany(Cooking::class, 'store_cooking');
    }

    // taxonomy
    public function taxonomies()
    {
        return $this->belongsToMany(Taxonomy::class, 'store_taxonomy');
    }

    // タグ
    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'store_tag');
    }

    // 駅
    public function stations()
    {
        return $this->belongsToMany(Station::class, 'store_station')
            ->withPivot('distance_minutes');
    }

    // コメント
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    // インフルとの関係
    public function influencers()
    {
        return $this->belongsToMany(Influencer::class, 'influencer_store')
            ->withPivot('relation_type');
    }
}
