<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class HomePageContentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'hero_title' => $this->hero_title,
            'hero_description' => $this->hero_description,
            'hero_media_type' => $this->hero_media_type,
            'hero_media' => $this->hero_media ?? null,
            'partners' => $this->partners ?? [],
            'about_us_title' => $this->about_us_title,
            'about_us_description' => $this->about_us_description,
            'about_us_first' => $this->about_us_first ?? null,
            'about_us_second' => $this->about_us_second ?? null,
            'about_us_third' => $this->about_us_third ?? null,
            'core_title' => $this->core_title,
            'core_description' => $this->core_description,
            'middle_banner' => $this->middle_banner ?? null,
            'middle_banner_title' => $this->middle_banner_title,
            'about_bd_tag' => $this->about_bd_tag,
            'about_bd_title' => $this->about_bd_title,
            'about_bd_description' => $this->about_bd_description,
            'about_bd_video_url' => $this->about_bd_video_url,
        ];
    }
}
