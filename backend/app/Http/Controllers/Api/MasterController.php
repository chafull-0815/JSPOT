<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\City;
use App\Models\Line;
use App\Models\PaymentMethod;
use App\Models\Prefecture;
use App\Models\Scene;
use App\Models\Station;
use App\Models\Tag;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MasterController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $data = [];

        // 都道府県
        $data['prefectures'] = Prefecture::select('id', 'name', 'slug')
            ->orderBy('id')
            ->get();

        // 市区町村（都道府県ごとにグループ化）
        $data['cities'] = City::select('id', 'prefecture_id', 'name', 'slug')
            ->orderBy('prefecture_id')
            ->orderBy('id')
            ->get()
            ->groupBy('prefecture_id')
            ->map(fn ($cities) => $cities->values());

        // カテゴリ
        $data['categories'] = Category::select('id', 'name', 'slug')
            ->orderBy('id')
            ->get();

        // タグ
        $data['tags'] = Tag::select('id', 'name', 'slug')
            ->orderBy('id')
            ->get();

        // シーン
        $data['scenes'] = Scene::select('id', 'name', 'slug')
            ->orderBy('id')
            ->get();

        // 支払い方法
        $data['payment_methods'] = PaymentMethod::select('id', 'name', 'slug')
            ->orderBy('id')
            ->get();

        // 路線
        $data['lines'] = Line::select('id', 'name', 'slug')
            ->orderBy('id')
            ->get();

        // 駅（路線ごとにグループ化）
        $data['stations'] = Station::select('id', 'line_id', 'name', 'slug')
            ->orderBy('line_id')
            ->orderBy('id')
            ->get()
            ->groupBy('line_id')
            ->map(fn ($stations) => $stations->values());

        return response()->json([
            'data' => $data,
        ]);
    }
}
