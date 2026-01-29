<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class StoreImage extends Model
{
    /** @use HasFactory<\Database\Factories\StoreImageFactory> */
    use HasFactory;

    protected $fillable = [
        'store_id',
        'disk',
        'image_path',
        'alt_text',
        'is_main',
        'sort_order',
    ];

    protected $casts = [
        'is_main' => 'boolean',
        'sort_order' => 'integer',
    ];

    protected $appends = [
        'url',
    ];

    public function store(): BelongsTo
    {
        return $this->belongsTo(Store::class);
    }

    public function getUrlAttribute(): ?string
    {
        if (empty($this->image_path)) {
            return null;
        }

        $disk = $this->disk ?: config('filesystems.default');

        /** @var \Illuminate\Filesystem\FilesystemAdapter $filesystem */
        $filesystem = Storage::disk($disk);

        return $filesystem->url($this->image_path);
    }

    protected static function booted(): void
    {
        // store_id 単位で「メイン画像は常に1枚」にする
        static::saved(function (self $image): void {
            if (!$image->store_id || !$image->is_main) {
                return;
            }

            self::query()
                ->where('store_id', $image->store_id)
                ->whereKeyNot($image->getKey())
                ->where('is_main', true)
                ->update(['is_main' => false]);
        });

        // DBから削除されたらファイルも削除（Filamentは自動削除しないため）:contentReference[oaicite:2]{index=2}
        static::deleting(function (self $image): void {
            if (empty($image->image_path)) {
                return;
            }

            $disk = $image->disk ?: config('filesystems.default');

            /** @var \Illuminate\Filesystem\FilesystemAdapter $filesystem */
            $filesystem = Storage::disk($disk);

            $filesystem->delete($image->image_path);
        });

        // 画像差し替え時、古いファイルを削除
        static::updating(function (self $image): void {
            if (!$image->isDirty('image_path')) {
                return;
            }

            $oldPath = $image->getOriginal('image_path');
            if (empty($oldPath)) {
                return;
            }

            $disk = $image->disk ?: config('filesystems.default');

            /** @var \Illuminate\Filesystem\FilesystemAdapter $filesystem */
            $filesystem = Storage::disk($disk);

            $filesystem->delete($oldPath);
        });
    }
}
