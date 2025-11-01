<?php

// app/Models/Attribute.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Attribute extends Model
{
    use HasFactory;

    protected $fillable = ['name','slug'];

    public function stores()
    {
        return $this->belongsToMany(Store::class, 'attribute_store', 'attribute_id', 'store_id')
            ->withTimestamps();
    }
}
