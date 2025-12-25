<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Request;
use App\Helpers\Helpers;
use Illuminate\Http\Resources\Json\JsonResource;

class CustomerResource extends JsonResource
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
            'full_name' => $this->full_name,
            'email' => $this->email,
            'phone' => $this->phone,
            'dob' => $this->dob,
            'status' => (int) $this->status,
            'status_text' => Helpers::apiActiveStatus($this->status),
            'avatar' => $this->avatar ?: null,
            'email_verified_at' => $this->email_verified_at ? $this->email_verified_at->setTimezone(env('ADMIN_TIMEZONE', 'UTC'))->format('H:i:s, d M Y') : null,
            'created_at' =>  $this->created_at->setTimezone(env('ADMIN_TIMEZONE', 'UTC'))->format('H:i:s, d M Y'),
            'updated_at' => $this->updated_at->setTimezone(env('ADMIN_TIMEZONE', 'UTC'))->format('H:i:s, d M Y'),
        ];
    }
}
