<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class InfluencerChangeRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'influencer_profile_id',
        'status_id',
        'payload',
        'message',
    ];

    protected $casts = [
        'payload' => 'array',
        'handled_at' => 'datetime',
    ];

    public function influencerProfile(): BelongsTo
    {
        return $this->belongsTo(InfluencerProfile::class);
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
