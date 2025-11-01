import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import FullReload from 'vite-plugin-full-reload';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js', 'resources/css/filament/admin/theme.css'],
            refresh: true,
        }),
        tailwindcss(),
        FullReload([
            'app/Filament/Resources/**/*',  // ✅ ここでFilament関連PHPファイルも監視
        ]),
    ],
});
