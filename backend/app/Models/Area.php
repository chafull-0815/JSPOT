<?php

// app/Models/Area.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Area extends Model
{
    protected $fillable = ['name','slug'];

    public function stores() { return $this->hasMany(Store::class); }
}
