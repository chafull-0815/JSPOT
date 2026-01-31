<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StatusDefinition extends Model
{
    use HasFactory;

    protected $fillable = [
        'domain',
        'slug',
        'label_ja',
        'label_en',
        'sort_order',
    ];
}
