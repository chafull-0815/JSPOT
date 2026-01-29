<?php

namespace Database\Seeders;

use App\Models\Admin;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use RuntimeException;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        if (! app()->environment(['local', 'testing'])) {
          return;
        }

        $email = env('FILAMENT_ADMIN_EMAIL');
        $password = env('FILAMENT_ADMIN_PASSWORD');
        $name = env('FILAMENT_ADMIN_NAME');
        $role = env('FILAMENT_ADMIN_ROLE');

        if (! $email || ! $password || ! $name || ! $role) {
          throw new RuntimeException(
              'Missing required env for AdminSeeder: FILAMENT_ADMIN_EMAIL/PASSWORD/NAME/ROLE'
          );
      }

        // migrate:fresh --seed を何度回しても同じ管理者が必ず復活する（冪等）
        $admin = Admin::query()->firstOrNew(['email' => $email]);

        // fillable/guardedに依存せず強制代入
        $admin->forceFill([
            'name' => $name,
            'role' => $role,
        ]);

        // 毎回上書きでOK（運用上わかりやすい）
        $admin->password = Hash::make($password);

        $admin->save();
    }
}
