<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class HomePageContent extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'hero_title',
        'hero_media_type',
        'hero_description',
        'about_us_title',
        'about_us_description',
        'core_title',
        'core_description',
        'middle_banner_title',
        'about_bd_tag',
        'about_bd_title',
        'about_bd_description',
        'about_bd_video_url',
        'created_by',
        'updated_by',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @return array<string>
     */
    protected $appends = ['hero_media', 'partners', 'about_us_first', 'about_us_second', 'about_us_third', 'middle_banner'];

    /**
     * The relationships to always load with the model.
     *
     * @return array<string>
     */
    protected $with = ['media'];

    /**
     * Get the admin that created the resource.
     */
    public function creator(): BelongsTo
    {
        return $this->belongsTo(Admin::class, 'created_by')->withTrashed();
    }

    /**
     * Get the admin that edited the resource.
     */
    public function editor(): BelongsTo
    {
        return $this->belongsTo(Admin::class, 'updated_by')->withTrashed();
    }

    /**
     * Get the hero_media attribute.
     *
     * @return string | null
     */
    public function getHeroMediaAttribute()
    {
        return $this->getFirstMediaUrl('hero_media');
    }

    /**
     * Get the partners image attribute.
     *
     * @return string | null
     */
    public function getPartnersAttribute()
    {
        return $this->getMedia('partners')->map(fn($media) => $media->getUrl());
    }

    /**
     * Get the about_us_first attribute.
     *
     * @return string | null
     */
    public function getAboutUsFirstAttribute()
    {
        return $this->getFirstMediaUrl('about_us_first');
    }

    /**
     * Get the about_us_second attribute.
     *
     * @return string | null
     */
    public function getAboutUsSecondAttribute()
    {
        return $this->getFirstMediaUrl('about_us_second');
    }

    /**
     * Get the about_us_third attribute.
     *
     * @return string | null
     */
    public function getAboutUsThirdAttribute()
    {
        return $this->getFirstMediaUrl('about_us_third');
    }

    /**
     * Get the middle_banner attribute.
     *
     * @return string | null
     */
    public function getMiddleBannerAttribute()
    {
        return $this->getFirstMediaUrl('middle_banner');
    }

    /**
     * Register the media collections.
     *
     * @return void
     */
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('hero_media')->singleFile();
        $this->addMediaCollection('partners');
        $this->addMediaCollection('about_us_first')->singleFile();
        $this->addMediaCollection('about_us_second')->singleFile();
        $this->addMediaCollection('about_us_third')->singleFile();
        $this->addMediaCollection('middle_banner')->singleFile();
    }
}
