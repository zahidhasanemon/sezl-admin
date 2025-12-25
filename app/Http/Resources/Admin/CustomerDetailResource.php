<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Request;
use App\Helpers\Helpers;
use Illuminate\Http\Resources\Json\JsonResource;

class CustomerDetailResource extends JsonResource
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
            'last_name' => $this->last_name,
            'full_name' => $this->full_name,
            'email' => $this->email,
            'phone' => $this->phone,
            'dob' => $this->dob,
            'status' => (int) $this->status,
            'status_text' => Helpers::apiActiveStatus($this->status),
            'avatar' => $this->avatar,
            'email_verified_at' => $this->email_verified_at ? $this->email_verified_at->setTimezone(env('ADMIN_TIMEZONE', 'UTC'))->format('H:i:s, d M Y') : null,
            'created_at' =>  $this->created_at->setTimezone(env('ADMIN_TIMEZONE', 'UTC'))->format('H:i:s, d M Y'),
            'updated_at' => $this->updated_at->setTimezone(env('ADMIN_TIMEZONE', 'UTC'))->format('H:i:s, d M Y'),
            'device_tokens' => $this->deviceTokens->pluck('token')->toArray(),
        ];
    }
}
