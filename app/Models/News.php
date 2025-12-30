<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\{BelongsTo, BelongsToMany};
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Illuminate\Database\Eloquent\SoftDeletes;

class News extends Model implements HasMedia
{
    use HasFactory, SoftDeletes, InteractsWithMedia;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'title',
        'description',
        'video_url',
        'status',
        'published_at',
        'created_by',
        'updated_by',
        'deleted_at'
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'published_at' => 'datetime',
            'deleted_at' => 'datetime',
        ];
    }

    /**
     * The accessors to append to the model's array form.
     *
     * @return array<string>
     */
    protected $appends = ['main_image', 'optional_image'];

    /**
     * The relationships to always load with the model.
     *
     * @return array<string>
     */
    protected $with = ['media'];

    /**
     * Get the categories the news belongs to.
     */
    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(NewsCategory::class, 'category_news', 'news_id', 'news_category_id');
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
     * Get the main_image attribute.
     *
     * @return string | null
     */
    public function getMainImageAttribute()
    {
        return $this->getFirstMediaUrl('main_image');
    }

    /**
     * Get the optional_image attribute.
     *
     * @return string | null
     */
    public function getOptionalImageAttribute()
    {
        return $this->getFirstMediaUrl('optional_image');
    }

    /**
     * Register the media collections.
     *
     * @return void
     */
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('main_image')->singleFile();
        $this->addMediaCollection('optional_image')->singleFile();
    }
}
