<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\InfluencerProfile;
use Illuminate\Support\Str;

class InfluencerController extends Controller
{
    public function show(string $influencerPage)
    {
        // "sushi-taro-01J..." → 末尾のULIDだけ取る
        $publicId = Str::afterLast($influencerPage, '-');
    
        // ULID形式チェック（雑に弾いてOK）
        if (! preg_match('/^[0-9A-HJKMNP-TV-Z]{26}$/', $publicId)) {
            abort(404);
        }
    
        $influencer = InfluencerProfile::where('public_id', $publicId)->firstOrFail();
    
        // slugが違っててもULIDで取れてしまうので、正規URLに寄せる（SEO）
        $expected = $influencer->pageKey();
        if ($influencerPage !== $expected) {
            return redirect()->route('influencers.show', ['influencerPage' => $expected], 301);
        }
    
        // あなたの既存の表示処理へ
        return view('influencers.show', compact('influencer'));
    }
}
