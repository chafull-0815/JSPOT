<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class StoreResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->public_id,
            'slug' => $this->slug,
            'name' => $this->name,
            'name_en' => $this->name_en,
            'catchphrase' => $this->catchphrase,
            'tel' => $this->tel,
            'images' => [
                'main' => $this->mainImage ? new StoreImageResource($this->mainImage) : null,
                'sub' => StoreImageResource::collection(
                    $this->images->where('is_main', false)->sortBy('sort_order')->values()
                ),
            ],
            'location' => [
                'prefecture' => $this->prefecture ? [
                    'id' => $this->prefecture->id,
                    'name' => $this->prefecture->name,
                ] : null,
                'city' => $this->city ? [
                    'id' => $this->city->id,
                    'name' => $this->city->name,
                ] : null,
                'address_details' => $this->address_details,
                'latitude' => $this->latitude ? (float) $this->latitude : null,
                'longitude' => $this->longitude ? (float) $this->longitude : null,
            ],
            'price' => [
                'morning' => $this->has_morning ? [
                    'min' => $this->morning_min_price,
                    'max' => $this->morning_max_price,
                ] : null,
                'lunch' => $this->has_lunch ? [
                    'min' => $this->lunch_min_price,
                    'max' => $this->lunch_max_price,
                ] : null,
                'dinner' => $this->has_dinner ? [
                    'min' => $this->dinner_min_price,
                    'max' => $this->dinner_max_price,
                ] : null,
            ],
            'total_likes' => $this->total_likes,
            'published_at' => $this->published_at?->toIso8601String(),
            'updated_at' => $this->updated_at?->toIso8601String(),
        ];
    }
}
