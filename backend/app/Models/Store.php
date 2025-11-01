<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory; // ← 追加


class Store extends Model
{

    use HasFactory;
  
    protected $fillable = [
        'area_id',
        'name',
        'catch_copy',
        'opening_hours',
        'phone_number',
        'address',
        'price_daytime',
        'price_night',
        'official_url',
        'instagram_url',
        'main_image',
        'about_1',
        'about_2',
        'about_3',
        'lat',
        'lng',
        'likes_count',
        'sub_image_1','sub_image_2','sub_image_3','sub_image_4','sub_image_5',
        'sub_image_6','sub_image_7','sub_image_8','sub_image_9','sub_image_10',
        'sub_image_11','sub_image_12','sub_image_13','sub_image_14','sub_image_15',
        'sub_image_16','sub_image_17','sub_image_18','sub_image_19','sub_image_20',
    ];

    protected $casts = [
        'lat'           => 'float',
        'lng'           => 'float',
        'price_daytime' => 'integer',
        'price_night'   => 'integer',
        'likes_count' => 'integer',
    ];


    // 単一：エリア
    public function area()
    {
        return $this->belongsTo(Area::class);
    }

    // 複数：料理ジャンル
    public function cookings()
    {
        return $this->belongsToMany(Cooking::class, 'cooking_store', 'store_id', 'cooking_id')
            ->withTimestamps();
    }

    // 複数：属性
    public function attributes()
    {
        return $this->belongsToMany(Attribute::class, 'attribute_store', 'store_id', 'attribute_id')
            ->withTimestamps();
    }
}
