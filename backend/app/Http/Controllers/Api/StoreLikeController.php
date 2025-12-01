<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Store;
use App\Models\StoreLike;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class StoreLikeController extends Controller
{
    public function like(Request $req, Store $store)
    {
        $uuid = $req->cookie('like_uuid') ?: Str::uuid()->toString();

        $created = false;
        DB::transaction(function () use ($store, $uuid, $req, &$created) {
            $like = StoreLike::firstOrCreate(
                ['store_id' => $store->id, 'uuid' => $uuid],
                ['ip' => $req->ip(), 'ua' => (string) ($req->userAgent() ?? '')]
            );
            if ($like->wasRecentlyCreated) {
                $store->increment('likes_count');
                $created = true;
            }
        });

        return response()
            ->json(['liked' => $created, 'likes_count' => $store->likes_count])
            ->cookie('like_uuid', $uuid, 60 * 24 * 365); // 1年間
    }

    public function count(Store $store)
    {
        return response()->json(['likes_count' => $store->likes_count]);
    }
}
