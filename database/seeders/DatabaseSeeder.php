<?php

namespace Database\Seeders;

use App\Models\Admin;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        $admin = Admin::firstOrCreate([
            'email' => 'admin@example.com',
        ], [
            'name' => 'Super Admin',
            'status' => 1,
            'password' => bcrypt('123456'),
        ]);

        $filePath = public_path('images/avatars/avatar-1.png');
        if ($admin->getMedia('avatar')->isEmpty()) {
            $admin->addMedia($filePath)->preservingOriginal()->toMediaCollection('avatar');
        }

        $this->call([
            // WorldSeeder::class,
            // UserSeeder::class,
            PageDataSeeder::class,
            SiteSettingSeeder::class,
            TestimonialSeeder::class,
        ]);
    }
}
