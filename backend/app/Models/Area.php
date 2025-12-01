<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Area extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'name',
        'sort_order',
    ];

    public function stores()
    {
        return $this->hasMany(Store::class);
    }

    public function influencers()
    {
        return $this->hasMany(Influencer::class, 'main_area_id');
    }
}
