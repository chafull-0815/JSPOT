<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        // API ルート
        Route::middleware('api')
            ->prefix('api')
            ->group(base_path('routes/api.php'));

        // Web ルート
        Route::middleware('web')
            ->group(base_path('routes/web.php'));

        // いいねの数に制限
        RateLimiter::for('likes', function ($request) {
            return [
                Limit::perMinute(30)->by($request->ip()),
            ];
        });
    }
}
