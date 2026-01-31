<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class StoreImageResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'url' => $this->image_path ? Storage::disk('public')->url($this->image_path) : null,
            'is_main' => $this->is_main,
            'sort_order' => $this->sort_order,
        ];
    }
}
