<?php

use App\Http\Controllers\Api\StoreController;
use App\Http\Controllers\Api\InfluencerController;
use App\Http\Controllers\Api\MasterController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// 公開API（認証不要）
Route::prefix('v1')->group(function () {
    // マスターデータ
    Route::get('/masters', [MasterController::class, 'index']);

    // 店舗
    Route::get('/stores', [StoreController::class, 'index']);
    Route::get('/stores/{slug}', [StoreController::class, 'show']);

    // インフルエンサー
    Route::get('/influencers', [InfluencerController::class, 'index']);
    Route::get('/influencers/{slug}', [InfluencerController::class, 'show']);
});
