<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StoreMembership extends Model
{
    use HasFactory;

    protected $fillable = [
        'store_id',
        'store_profile_id',
        'role',
        'status',
    ];

    public function store(): BelongsTo
    {
        return $this->belongsTo(Store::class);
    }

    public function storeProfile(): BelongsTo
    {
        return $this->belongsTo(StoreProfile::class);
    }

    public function createdByAdmin(): BelongsTo
    {
        return $this->belongsTo(Admin::class, 'created_by_admin_id');
    }
}
