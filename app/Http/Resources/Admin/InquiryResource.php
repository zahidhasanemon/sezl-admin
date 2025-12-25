<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InquiryResource extends JsonResource
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
            'name' => trim($this->name),
            'email' => $this->email,
            'phone' => $this->phone,
            'subject' => $this->subject,
            'message' => $this->message,
            'status' => $this->status,
            // 'comment' => $this->comment,
            'created_at' => $this->created_at ? $this->created_at->setTimezone(env('ADMIN_TIMEZONE', 'UTC'))->format('H:i:s, d M Y') : null,
            'updated_at' => $this->updated_at ? $this->updated_at->setTimezone(env('ADMIN_TIMEZONE', 'UTC'))->format('H:i:s, d M Y') : null,
        ];
    }
}
