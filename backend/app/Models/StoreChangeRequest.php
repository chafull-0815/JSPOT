<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StoreChangeRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'store_id',
        'store_profile_id',
        'status_id',
        'payload',
        'message',
    ];

    protected $casts = [
        'payload' => 'array',
        'handled_at' => 'datetime',
    ];

    public function store(): BelongsTo
    {
        return $this->belongsTo(Store::class);
    }

    public function storeProfile(): BelongsTo
    {
        return $this->belongsTo(StoreProfile::class);
    }

    public function status(): BelongsTo
    {
        return $this->belongsTo(StatusDefinition::class, 'status_id');
    }

    public function handledByAdmin(): BelongsTo
    {
        return $this->belongsTo(Admin::class, 'handled_by_admin_id');
    }
}
