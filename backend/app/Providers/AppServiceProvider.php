<?php

namespace App\Providers;

use App\Models\Admin;
use Illuminate\Auth\Events\Login;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // 最終ログインのタイムスタンプの取得
        Event::listen(Login::class, function (Login $event) {

          if (! $event->user instanceof Admin) {
            return;
          }
    
          $event->user->forceFill([
            'last_login_at' => now(),
          ])->saveQuietly();
          });
    }
}
