<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NotificationResource extends JsonResource
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
            'type' => $this->type,
            'data' => $this->data,
            'is_read' => $this->is_read,
            'push_sent' => $this->push_sent,
            'target_type' => $this->target_type,
            'target_id' => $this->target_id,
            'delivery_status' => $this->delivery_status,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'target' => $this->whenLoaded('target'),
        ];
    }
}
