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
                'type' => 'client',
                'name' => 'Sarah Johnson',
                'position' => 'CEO',
                'company_name' => 'Vex Footwear',
                'rating' => 5,
                'testimonial' => 'SEZL gives us the best in class facilities and support to grow our business internationally.',
                'featured' => true,
                'status' => true,
                'created_by' => 1,
                'updated_by' => 1,
                'created_at' => Carbon::now()->subDays(10),
                'updated_at' => Carbon::now()->subDays(10),
            ],
            [
                'type' => 'client',
                'name' => 'Ben Anderson',
                'position' => 'CEO',
                'company_name' => 'Red Denim Apparel',
                'rating' => 5,
                'testimonial' => 'SEZ is in a prime location with excellent infrastructure, making it easy for us to manage our operations efficiently.',
                'featured' => true,
                'status' => true,
                'created_by' => 1,
                'updated_by' => 1,
                'created_at' => Carbon::now()->subDays(10),
                'updated_at' => Carbon::now()->subDays(10),
            ],
            [
                'type' => 'graduate',
                'name' => 'Emily Davis',
                'position' => 'Marketing Manager',
                'company_name' => null,
                'rating' => 5,
                'testimonial' => 'SEZ Academy provided me with the skills and knowledge needed to excel in my career. The hands-on training and experienced instructors made all the difference.',
                'featured' => false,
                'status' => true,
                'created_by' => 1,
                'updated_by' => 1,
                'created_at' => Carbon::now()->subDays(10),
                'updated_at' => Carbon::now()->subDays(10),
            ],
        ];

        $filePath = public_path('images/avatars/avatar-1.png');
        foreach ($testimonials as $testimonial) {
            $testimonialData = Testimonial::firstOrCreate([
                'name' => $testimonial['name'],
                'position' => $testimonial['position'],
            ], $testimonial);
            if ($testimonialData->getMedia('avatar')->isEmpty()) {
                $testimonialData->addMedia($filePath)->preservingOriginal()->toMediaCollection('avatar');
            }
        }
    }
}
