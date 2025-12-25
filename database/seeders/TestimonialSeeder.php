<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Testimonial;
use Carbon\Carbon;

class TestimonialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $testimonials = [
            [
                'name' => 'Sarah Johnson',
                'address' => 'New York, USA',
                'testimonial' => 'Absolutely love the silk products! The quality is exceptional and my skin feels so much softer. Highly recommend VuexyAdmin to anyone looking for premium skincare.',
                'status' => true,
                'created_by' => 1,
                'updated_by' => 1,
                'created_at' => Carbon::now()->subDays(10),
                'updated_at' => Carbon::now()->subDays(10),
            ],
            [
                'name' => 'Michael Chen',
                'address' => 'California, USA',
                'testimonial' => 'The silk face mask is a game changer! I\'ve been using it for 3 months and the results are incredible. My complexion has never looked better.',
                'status' => true,
                'created_by' => 1,
                'updated_by' => 1,
                'created_at' => Carbon::now()->subDays(15),
                'updated_at' => Carbon::now()->subDays(15),
            ],
            [
                'name' => 'Emma Rodriguez',
                'address' => 'Texas, USA',
                'testimonial' => 'Amazing customer service and even better products. The silk serum has transformed my nighttime routine. Worth every penny!',
                'status' => true,
                'created_by' => 1,
                'updated_by' => 1,
                'created_at' => Carbon::now()->subDays(8),
                'updated_at' => Carbon::now()->subDays(8),
            ],
            [
                'name' => 'David Thompson',
                'address' => 'Florida, USA',
                'testimonial' => 'Great products with fast shipping. The silk moisturizer works wonderfully for my sensitive skin. Will definitely order again.',
                'status' => true,
                'created_by' => 1,
                'updated_by' => 1,
                'created_at' => Carbon::now()->subDays(5),
                'updated_at' => Carbon::now()->subDays(5),
            ],
            [
                'name' => 'Lisa Wang',
                'address' => 'Washington, USA',
                'testimonial' => 'I was skeptical at first, but VuexyAdmin has exceeded my expectations. The silk essence has made my skin glow like never before.',
                'status' => true,
                'created_by' => 1,
                'updated_by' => 1,
                'created_at' => Carbon::now()->subDays(20),
                'updated_at' => Carbon::now()->subDays(20),
            ],
            [
                'name' => 'James Miller',
                'address' => 'Illinois, USA',
                'testimonial' => 'Excellent quality and packaging. The silk cream feels luxurious and has helped with my dry skin issues significantly.',
                'status' => true,
                'created_by' => 1,
                'updated_by' => 1,
                'created_at' => Carbon::now()->subDays(12),
                'updated_at' => Carbon::now()->subDays(12),
            ]
        ];

        $filePath = public_path('images/avatars/avatar-1.png');
        foreach ($testimonials as $testimonial) {
            $testimonialData = Testimonial::firstOrCreate([
                'name' => $testimonial['name'],
                'address' => $testimonial['address'],
            ], $testimonial);
            if ($testimonialData->getMedia('avatar')->isEmpty()) {
                $testimonialData->addMedia($filePath)->preservingOriginal()->toMediaCollection('avatar');
            }
        }
    }
}
