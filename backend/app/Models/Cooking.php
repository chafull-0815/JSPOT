<?php

// app/Models/Cooking.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Cooking extends Model
{
    use HasFactory;

    protected $fillable = ['name','slug'];

    public function stores()
    {
        return $this->belongsToMany(Store::class, 'cooking_store', 'cooking_id', 'store_id')
            ->withTimestamps();
    }
}

