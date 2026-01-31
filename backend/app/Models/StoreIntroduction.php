<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StoreIntroduction extends Model
{
    use HasFactory;

    protected $fillable = [
        'store_id',
        'title',
        'content',
        'sort_order',
    ];

    public function store(): BelongsTo
    {
        return $this->belongsTo(Store::class);
    }
}
