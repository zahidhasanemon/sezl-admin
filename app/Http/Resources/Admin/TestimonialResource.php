<?php

namespace App\Http\Resources\Admin;

use App\Helpers\Helpers;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TestimonialResource extends JsonResource
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
            'name' => $this->name,
            'address' => $this->address,
            'testimonial' => $this->testimonial,
            'avatar' => $this->avatar,
            'status' => (int) $this->status,
            'status_text' => Helpers::apiActiveStatus($this->status),
            'created_by' => $this->created_by,
            'updated_by' => $this->updated_by,
            'creator' => $this->whenLoaded('creator', function () {
                return $this->creator ? $this->creator->name : null;
            }),
            'editor' => $this->whenLoaded('editor', function () {
                return $this->editor ? $this->editor->name : null;
            }),
            'created_at' => $this->created_at->setTimezone(env('ADMIN_TIMEZONE', 'UTC'))->format('H:i:s, d M Y'),
            'updated_at' => $this->updated_at->setTimezone(env('ADMIN_TIMEZONE', 'UTC'))->format('H:i:s, d M Y'),
        ];
    }
}
