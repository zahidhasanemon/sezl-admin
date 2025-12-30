<?php

namespace Database\Seeders;

use App\Models\FontAwesomeIcon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class FontAwesomeIconsSeeder extends Seeder
{
    public function run(): void
    {
        // Clear the table first
        FontAwesomeIcon::truncate();

        // Load the JSON file
        $jsonPath = database_path('data/icons_with_metadata.json');

        if (!File::exists($jsonPath)) {
            $this->command->error("JSON file not found at: {$jsonPath}");
            $this->command->info("Please make sure your icons_with_metadata.json file is in database/data/ directory");
            return;
        }

        $jsonData = File::get($jsonPath);
        $icons = json_decode($jsonData, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            $this->command->error('Invalid JSON: ' . json_last_error_msg());
            return;
        }

        $total = count($icons);
        $this->command->info("Processing {$total} icons...");

        // Batch insert for better performance
        $batchSize = 500;
        $processed = 0;
        $batch = [];

        foreach ($icons as $icon) {
            $batch[] = [
                'name' => $icon['name'] ?? '',
                'style' => $icon['style'] ?? 'solid',
                'prefix' => $icon['prefix'] ?? 'fas',
                'categories' => json_encode($icon['categories'] ?? []),
                'tags' => json_encode($icon['tags'] ?? []),
                'word_count' => $icon['word_count'] ?? 0,
                'processed' => $icon['processed'] ?? true,
                'created_at' => now(),
                'updated_at' => now(),
            ];

            if (count($batch) >= $batchSize) {
                FontAwesomeIcon::insert($batch);
                $processed += count($batch);
                $this->command->info("Inserted {$processed}/{$total} icons...");
                $batch = [];
            }
        }

        // Insert remaining icons
        if (!empty($batch)) {
            FontAwesomeIcon::insert($batch);
            $processed += count($batch);
        }

        $this->command->info("✅ Successfully seeded {$processed} Font Awesome icons.");

        // Display statistics
        $this->displayStatistics();
    }

    private function displayStatistics(): void
    {
        $total = FontAwesomeIcon::count();
        $solid = FontAwesomeIcon::where('style', 'solid')->count();
        $regular = FontAwesomeIcon::where('style', 'regular')->count();
        $brands = FontAwesomeIcon::where('style', 'brands')->count();

        $categories = FontAwesomeIcon::getAllCategories();
        $tags = FontAwesomeIcon::getAllTags();

        $this->command->info("\n📊 Database Statistics:");
        $this->command->info("  Total icons: {$total}");
        $this->command->info("  Solid icons: {$solid}");
        $this->command->info("  Regular icons: {$regular}");
        $this->command->info("  Brand icons: {$brands}");
        $this->command->info("  Unique categories: " . count($categories));
        $this->command->info("  Unique tags: " . count($tags));

        // Show top 10 categories
        $this->command->info("\n🏷️  Top 10 Categories:");
        $topCategories = DB::table('font_awesome_icons')
            ->selectRaw('categories, COUNT(*) as count')
            ->groupBy('categories')
            ->orderByDesc('count')
            ->limit(10)
            ->get();

        foreach ($topCategories as $index => $category) {
            $catArray = json_decode($category->categories, true);
            $catNames = $catArray ? implode(', ', $catArray) : 'None';
            $this->command->info(sprintf(
                "  %2d. %-30s %4d icons",
                $index + 1,
                substr($catNames, 0, 30),
                $category->count
            ));
        }
    }
}
