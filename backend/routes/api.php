<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\StoreLikeController;
use App\Http\Controllers\Api\StoreMediaController;

// routes/api.php （いいね系に付与）
Route::middleware('throttle:likes')->group(function () {
  Route::post('/stores/{store}/like',  [StoreLikeController::class, 'like']);
  Route::get ('/stores/{store}/likes', [StoreLikeController::class, 'count']);
});

