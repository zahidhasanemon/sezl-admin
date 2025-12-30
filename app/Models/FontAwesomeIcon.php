<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Arr;

class FontAwesomeIcon extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'style',
        'prefix',
        'categories',
        'tags',
        'word_count',
        'processed'
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'categories' => 'array',
            'tags' => 'array',
            'processed' => 'boolean',
            'word_count' => 'integer'
        ];
    }

    // Accessor for full icon class
    public function getFullClassAttribute(): string
    {
        return "{$this->prefix} fa-{$this->name}";
    }

    // Accessor for display name (formatted)
    public function getDisplayNameAttribute(): string
    {
        return str_replace('-', ' ', ucwords($this->name, '-'));
    }

    // Scope for searching
    public function scopeSearch(Builder $query, string $searchTerm = null): Builder
    {
        if (!$searchTerm) {
            return $query;
        }

        return $query->where(function ($q) use ($searchTerm) {
            // Search in name
            $q->where('name', 'LIKE', "%{$searchTerm}%")
                // Search in categories (JSON array)
                ->orWhereJsonContains('categories', $searchTerm)
                // Search in tags (JSON array)
                ->orWhereJsonContains('tags', $searchTerm)
                // Full-text search if using MySQL/PostgreSQL
                ->orWhereRaw("MATCH(name, categories, tags) AGAINST(? IN BOOLEAN MODE)", [$searchTerm]);
        });
    }

    // Scope for filtering by category
    public function scopeByCategory(Builder $query, string $category): Builder
    {
        return $query->whereJsonContains('categories', $category);
    }

    // Scope for filtering by tag
    public function scopeByTag(Builder $query, string $tag): Builder
    {
        return $query->whereJsonContains('tags', $tag);
    }

    // Scope for filtering by style
    public function scopeByStyle(Builder $query, string $style): Builder
    {
        return $query->where('style', $style);
    }

    // Scope for common styles
    public function scopeSolid(Builder $query): Builder
    {
        return $query->where('style', 'solid');
    }

    public function scopeRegular(Builder $query): Builder
    {
        return $query->where('style', 'regular');
    }

    public function scopeBrands(Builder $query): Builder
    {
        return $query->where('style', 'brands');
    }

    // Get all unique categories
    public static function getAllCategories(): array
    {
        return self::query()
            ->selectRaw('JSON_UNQUOTE(JSON_EXTRACT(categories, "$[*]")) as category')
            ->distinct()
            ->pluck('category')
            ->filter()
            ->unique()
            ->sort()
            ->values()
            ->toArray();
    }

    // Get all unique tags
    public static function getAllTags(): array
    {
        return self::query()
            ->selectRaw('JSON_UNQUOTE(JSON_EXTRACT(tags, "$[*]")) as tag')
            ->distinct()
            ->pluck('tag')
            ->filter()
            ->unique()
            ->sort()
            ->values()
            ->toArray();
    }

    // Get all unique styles
    public static function getAllStyles(): array
    {
        return self::query()
            ->distinct('style')
            ->pluck('style')
            ->sort()
            ->values()
            ->toArray();
    }

    // Get icon suggestions based on search
    public static function getSuggestions(string $searchTerm, int $limit = 10): array
    {
        return self::search($searchTerm)
            ->limit($limit)
            ->get()
            ->map(fn($icon) => [
                'id' => $icon->id,
                'name' => $icon->name,
                'display_name' => $icon->display_name,
                'full_class' => $icon->full_class,
                'style' => $icon->style,
                'categories' => $icon->categories,
                'tags' => $icon->tags,
            ])
            ->toArray();
    }
}
