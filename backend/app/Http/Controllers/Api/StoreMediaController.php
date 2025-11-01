<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Store;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class StoreMediaController extends Controller
{
    /**
     * POST /api/stores/{store}/images/from-url
     * body: { "url": "https://..." , "slot": 1 } // slotは任意（1〜20）
     */
    public function attach(Request $req, Store $store)
    {
        $data = $req->validate([
            'url'  => ['required', 'url'],
            'slot' => ['nullable', 'integer', 'min:1', 'max:20'],
        ]);

        // 空きスロットを探す（slot指定があればそれを使う）
        $slot = $data['slot'] ?? null;
        if (!$slot) {
            for ($i = 1; $i <= 20; $i++) {
                $col = "sub_image_{$i}";
                if (empty($store->{$col})) { $slot = $i; break; }
            }
        }
        if (!$slot) {
            return response()->json(['message' => 'No empty sub_image slots'], 422);
        }

        // ダウンロード
        try {
            $res = Http::timeout(15)->get($data['url']);
            if (!$res->successful() || !$res->body()) {
                return response()->json(['message' => 'Download failed'], 422);
            }
        } catch (\Throwable $e) {
            return response()->json(['message' => 'Download error'], 422);
        }

        // 保存（publicディスク）
        $ext  = pathinfo(parse_url($data['url'], PHP_URL_PATH) ?? '', PATHINFO_EXTENSION) ?: 'jpg';
        $name = "sub_{$store->id}_{$slot}_" . Str::random(8) . ".{$ext}";
        $rel  = "stores/sub/{$name}";

        Storage::disk('public')->put($rel, $res->body(), 'public');

        // DB更新
        $col = "sub_image_{$slot}";
        $store->{$col} = $rel;
        $store->save();

        return response()->json([
            'slot' => $slot,
            'path' => $rel,
            'url'  => Storage::url($rel),
        ], 201);
    }
}
