<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class StoreImage extends Model
{
    use HasFactory;

    protected $fillable = [
        'store_id',
        'image_url',
        'sort_order',
    ];

    public function store()
    {
        return $this->belongsTo(Store::class);
    }
}
