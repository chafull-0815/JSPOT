<?php

use App\Http\Controllers\StoreController;
use App\Http\Controllers\InfluencerController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/stores/{storePage}', [StoreController::class, 'show'])
    ->where('storePage', '[^/]+');

Route::get('/influencers/{influencerPage}', [InfluencerController::class, 'show'])
    ->where('influencerPage', '[^/]+')
    ->name('influencers.show');