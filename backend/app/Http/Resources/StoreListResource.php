<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class StoreListResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $mainImage = $this->mainImage;

        return [
            'id' => $this->public_id,
            'slug' => $this->slug,
            'name' => $this->name,
            'name_en' => $this->name_en,
            'catchphrase' => $this->catchphrase,
            'main_image_url' => $mainImage?->image_path
                ? Storage::disk('public')->url($mainImage->image_path)
                : null,
            'prefecture' => $this->prefecture?->name,
            'city' => $this->city?->name,
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
        ];
    }
}
