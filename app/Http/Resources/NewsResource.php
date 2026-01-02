<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NewsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'main_image' => $this->main_image ?? null,
            'optional_image' => $this->optional_image ?? null,
            'video_url' => $this->video_url,
            'published_at' => $this->published_at ? $this->published_at->setTimezone(env('APP_TIMEZONE', 'UTC'))->format('M d, Y') : null,
        ];
    }
}
