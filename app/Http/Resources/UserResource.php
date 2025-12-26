<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'first_name' => $this->first_name,
            'last_name' => $this->last_name ?? null,
            'full_name' => $this->full_name,
            'email' => $this->email,
            'phone' => $this->phone ?? null,
            'dob' => $this->dob ?? null,
            'avatar' => $this->avatar ?? null,
            'email_verified_at' => $this->email_verified_at ?? null,
            'status' => $this->status,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
