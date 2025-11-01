<?php
// app/Models/StoreLike.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StoreLike extends Model
{
    protected $fillable = ['store_id','uuid','ip','ua'];
    public function store(){ return $this->belongsTo(Store::class); }
}
