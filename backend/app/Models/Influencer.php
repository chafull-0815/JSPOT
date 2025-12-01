<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Influencer extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'main_area_id',
        'slug',
        'display_name',
        'avatar_url',
        'bio',
        'instagram_url',
        'tiktok_url',
        'youtube_url',
        'website_url',
        'follower_count',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function mainArea()
    {
        return $this->belongsTo(Area::class, 'main_area_id');
    }

    public function stores()
    {
        return $this->belongsToMany(Store::class, 'influencer_store')
            ->withPivot('relation_type');
    }
}
