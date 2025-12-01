<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable, SoftDeletes;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'status',
        'email_verified_at',
        'last_login_at',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'last_login_at' => 'datetime',
    ];

    // 権限ヘルパー
    public function isSuperAdmin(): bool
    {
        return $this->role === 'super_admin';
    }

    public function isAdminLike(): bool
    {
        return in_array($this->role, ['super_admin', 'admin'], true);
    }

    // 店舗オーナーとして持っている店舗
    public function stores()
    {
        return $this->hasMany(Store::class, 'owner_user_id');
    }

    // インフルとしてのプロフィール（あれば）
    public function influencer()
    {
        return $this->hasOne(Influencer::class);
    }
}
