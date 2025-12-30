<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Illuminate\Support\Facades\Cache;

class AboutUsContent extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'chairman_name',
        'chairman_message',
        'overview_message',
        'history',
        'mission',
        'vision',
        'core_services',
        'created_by',
        'updated_by',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @return array<string>
     */
    protected $appends = ['chairman_image', 'overview_image'];

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
            Cache::forget("about_us_content");
        });

        static::updated(function () {
            Cache::forget("about_us_content");
        });

        static::deleted(function () {
            Cache::forget("about_us_content");
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
     * Get the chairman_image attribute.
     *
     * @return string | null
     */
    public function getChairmanImageAttribute()
    {
        return $this->getFirstMediaUrl('chairman_image');
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
     * Register the media collections.
     *
     * @return void
     */
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('chairman_image')->singleFile();
        $this->addMediaCollection('overview_image')->singleFile();
    }
}
