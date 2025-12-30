<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class JobApplication extends Model implements HasMedia
{
    use HasFactory, SoftDeletes, InteractsWithMedia;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'career_id',
        'name',
        'email',
        'phone',
        'cover_letter',
        'status',
        'resolved_by',
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
            'deleted_at' => 'datetime',
        ];
    }

    /**
     * The accessors to append to the model's array form.
     *
     * @return array<string>
     */
    protected $appends = ['resume'];

    /**
     * The relationships to always load with the model.
     *
     * @return array<string>
     */
    protected $with = ['media'];

    /**
     * Get the job that the application belongs to.
     */
    public function job(): BelongsTo
    {
        return $this->belongsTo(Career::class, 'career_id')->withTrashed();
    }

    /**
     * Get the admin that resolve the application.
     */
    public function resolver(): BelongsTo
    {
        return $this->belongsTo(Admin::class, 'resolved_by')->withTrashed();
    }

    /**
     * Get the resume attribute.
     *
     * @return string | null
     */
    public function getResumeAttribute()
    {
        return $this->getFirstMediaUrl('resume');
    }

    /**
     * Register the media collections.
     *
     * @return void
     */
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('resume')
            ->singleFile()
            ->acceptsFile(function ($file) {
                return in_array($file->getMimeType(), ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']);
            });
    }
}
