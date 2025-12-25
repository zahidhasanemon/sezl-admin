<?php

namespace App\Http\Resources\Admin;

use App\Helpers\Helpers;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AdminResource extends JsonResource
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
            'email' => $this->email,
            'phone' => $this->phone,
            'avatar' => $this->getFirstMediaUrl('avatar') ?: null,
            'status' => (int) $this->status,
            'status_text' => Helpers::apiActiveStatus($this->status),
            'created_at' => $this->created_at->setTimezone(env('ADMIN_TIMEZONE', 'UTC'))->format('H:i:s, d M Y'),
            'updated_at' => $this->updated_at->setTimezone(env('ADMIN_TIMEZONE', 'UTC'))->format('H:i:s, d M Y'),
        ];
    }
}
