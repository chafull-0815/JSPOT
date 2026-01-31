<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class InfluencerResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->public_id,
            'slug' => $this->slug,
            'display_name' => $this->display_name,
            'name_en' => $this->name_en,
            'bio' => $this->bio,
            'profile_image_url' => $this->profile_image
                ? Storage::disk('public')->url($this->profile_image)
                : null,
            'social_links' => [
                'youtube' => $this->youtube_url,
                'tiktok' => $this->tiktok_url,
                'facebook' => $this->facebook_url,
                'instagram' => $this->instagram_url,
            ],
            'updated_at' => $this->updated_at?->toIso8601String(),
        ];
    }
}
