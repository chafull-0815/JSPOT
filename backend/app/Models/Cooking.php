<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cooking extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'name',
        'sort_order',
    ];

    public function stores()
    {
        return $this->belongsToMany(Store::class, 'store_cooking');
    }
}
