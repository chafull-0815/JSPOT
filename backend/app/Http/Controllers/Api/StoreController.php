<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\StoreListResource;
use App\Http\Resources\StoreResource;
use App\Models\Store;
use App\Models\StatusDefinition;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class StoreController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $query = Store::query()
            ->with(['mainImage', 'prefecture', 'city'])
            ->whereHas('visibilityStatus', fn ($q) => $q->where('slug', 'published'))
            ->whereNotNull('published_at');

        // 検索フィルター
        if ($request->filled('prefecture_id')) {
            $query->where('prefecture_id', $request->prefecture_id);
        }

        if ($request->filled('city_id')) {
            $query->where('city_id', $request->city_id);
        }

        if ($request->filled('keyword')) {
            $keyword = $request->keyword;
            $query->where(function ($q) use ($keyword) {
                $q->where('name', 'like', "%{$keyword}%")
                    ->orWhere('name_en', 'like', "%{$keyword}%")
                    ->orWhere('catchphrase', 'like', "%{$keyword}%");
            });
        }

        // 価格帯フィルター
        if ($request->filled('time_slot')) {
            $timeSlot = $request->time_slot;
            if (in_array($timeSlot, ['morning', 'lunch', 'dinner'])) {
                $query->where("has_{$timeSlot}", true);

                if ($request->filled('min_price')) {
                    $query->where("{$timeSlot}_min_price", '>=', $request->min_price);
                }
                if ($request->filled('max_price')) {
                    $query->where("{$timeSlot}_max_price", '<=', $request->max_price);
                }
            }
        }

        // ソート
        $sortBy = $request->get('sort', 'updated_at');
        $sortOrder = $request->get('order', 'desc');

        if ($sortBy === 'likes') {
            $query->orderByRaw('(COALESCE(likes_count, 0) + COALESCE(admin_likes, 0)) ' . ($sortOrder === 'asc' ? 'ASC' : 'DESC'));
        } else {
            $query->orderBy($sortBy, $sortOrder);
        }

        $perPage = min($request->get('per_page', 20), 100);
        $stores = $query->paginate($perPage);

        return StoreListResource::collection($stores);
    }

    public function show(string $slug): StoreResource
    {
        $store = Store::query()
            ->with(['images', 'prefecture', 'city'])
            ->whereHas('visibilityStatus', fn ($q) => $q->where('slug', 'published'))
            ->whereNotNull('published_at')
            ->where('slug', $slug)
            ->firstOrFail();

        return new StoreResource($store);
    }
}
