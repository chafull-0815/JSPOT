<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\InfluencerListResource;
use App\Http\Resources\InfluencerResource;
use App\Models\InfluencerProfile;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class InfluencerController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $query = InfluencerProfile::query();

        // キーワード検索
        if ($request->filled('keyword')) {
            $keyword = $request->keyword;
            $query->where(function ($q) use ($keyword) {
                $q->where('display_name', 'like', "%{$keyword}%")
                    ->orWhere('name_en', 'like', "%{$keyword}%")
                    ->orWhere('bio', 'like', "%{$keyword}%");
            });
        }

        // ソート
        $sortBy = $request->get('sort', 'updated_at');
        $sortOrder = $request->get('order', 'desc');
        $query->orderBy($sortBy, $sortOrder);

        $perPage = min($request->get('per_page', 20), 100);
        $influencers = $query->paginate($perPage);

        return InfluencerListResource::collection($influencers);
    }

    public function show(string $slug): InfluencerResource
    {
        $influencer = InfluencerProfile::where('slug', $slug)->firstOrFail();

        return new InfluencerResource($influencer);
    }
}
