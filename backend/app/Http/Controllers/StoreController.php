<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Store;
use Illuminate\Support\Str;

class StoreController extends Controller
{
    public function show(string $storePage)
    {
        // "sushi-taro-01J..." → 末尾のULIDだけ取る
        $publicId = Str::afterLast($storePage, '-');
    
        // ULID形式チェック（雑に弾いてOK）
        if (! preg_match('/^[0-9A-HJKMNP-TV-Z]{26}$/', $publicId)) {
            abort(404);
        }
    
        $store = Store::where('public_id', $publicId)->firstOrFail();
    
        // slugが違っててもULIDで取れてしまうので、正規URLに寄せる（SEO）
        $expected = "{$store->slug}-{$store->public_id}";
        if ($storePage !== $expected) {
            return redirect()->to("/stores/{$expected}", 301);
        }
    
        // あなたの既存の表示処理へ
        return view('stores.show', compact('store'));
    }
}
