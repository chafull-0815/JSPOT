<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StoreOpeningHour extends Model
{
    use HasFactory;

    protected $fillable = [
        'store_id',
        'day_of_week',
        'open_time',
        'close_time',
        'is_closed',
        'display_text',
    ];

    protected $casts = [
        'is_closed' => 'boolean',
    ];

    public function store(): BelongsTo
    {
        return $this->belongsTo(Store::class);
    }
}
