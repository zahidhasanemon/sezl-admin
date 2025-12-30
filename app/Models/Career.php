<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\{BelongsTo, HasMany};

class Career extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'title',
        'department',
        'location',
        'employment_status',
        'employment_type',
        'level',
        'vacancy',
        'salary_range',
        'deadline',
        'description',
        'requirements',
        'benefits',
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
            'deadline' => 'datetime',
            'deleted_at' => 'datetime',
        ];
    }

    /**
     * Get the applicants that applied for job.
     */
    public function applicants(): HasMany
    {
        return $this->hasMany(JobApplication::class, 'career_id')->withTrashed();
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
}
