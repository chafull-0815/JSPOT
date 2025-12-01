<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Station extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'name',
    ];

    public function stores()
    {
        return $this->belongsToMany(Store::class, 'store_station')
            ->withPivot('distance_minutes');
    }
}
