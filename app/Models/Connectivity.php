<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Illuminate\Support\Facades\Cache;

class Connectivity extends Model implements HasMedia
{
    use HasFactory, SoftDeletes, InteractsWithMedia;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'type',
        'title',
        'icon',
        'description',
        'status',
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
            'status' => 'boolean',
            'deleted_at' => 'datetime',
        ];
    }

    /**
     * The accessors to append to the model's array form.
     *
     * @return array<string>
     */
    protected $appends = ['image'];

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
            Cache::forget("connectivity");
        });

        static::updated(function () {
            Cache::forget("connectivity");
        });

        static::deleted(function () {
            Cache::forget("connectivity");
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
     * Get the image attribute.
     *
     * @return string | null
     */
    public function getImageAttribute()
    {
        return $this->getFirstMediaUrl('image');
    }

    /**
     * Register the media collections.
     *
     * @return void
     */
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('image')->singleFile();
    }
}
