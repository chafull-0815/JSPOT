<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StoreStation extends Model
{
    use HasFactory;

    protected $fillable = [
        'store_id',
        'station_id',
        'walking_minutes',
    ];

    public function store(): BelongsTo
    {
        return $this->belongsTo(Store::class);
    }

    public function station(): BelongsTo
    {
        return $this->belongsTo(Station::class);
    }
}
