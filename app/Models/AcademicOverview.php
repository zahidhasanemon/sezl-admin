<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Illuminate\Support\Facades\Cache;

class AcademicOverview extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'description',
        'created_by',
        'updated_by',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @return array<string>
     */
    protected $appends = ['overview_image', 'partners'];

    /**
     * The relationships to always load with the model.
     *
     * @return array<string>
     */
    protected $with = ['media'];

    /**
     * The "booted" method of the model.
     *
     * @return void
     */
    protected static function booted()
    {
        static::created(function () {
            Cache::forget("academic_overviews");
        });

        static::updated(function () {
            Cache::forget("academic_overviews");
        });

        static::deleted(function () {
            Cache::forget("academic_overviews");
        });
    }

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
     * Get the overview_image attribute.
     *
     * @return string | null
     */
    public function getOverviewImageAttribute()
    {
        return $this->getFirstMediaUrl('overview_image');
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
     * Register the media collections.
     *
     * @return void
     */
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('overview_image')->singleFile();
        $this->addMediaCollection('partners')->multipleFiles();
    }
}
