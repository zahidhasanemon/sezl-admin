<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::firstOrCreate([
            'email' => 'emma.clark@gmail.com',
        ], [
            'first_name' => 'Emma',
            'last_name' => 'Clark',
            'phone' => '+1 416-555-0111',
            'dob' => '1990-05-15',
            'status' => 1,
            'password' => bcrypt('123456'),
        ]);

        $filePath = public_path('images/avatars/avatar-2.png');
        if ($user->getMedia('avatar')->isEmpty()) {
            $user->addMedia($filePath)->preservingOriginal()->toMediaCollection('avatar');
        }

        $user2 = User::firstOrCreate([
            'email' => 'sophie.liu@gmail.com',
        ], [
            'first_name' => 'Sophie',
            'last_name' => 'Liu',
            'phone' => '+1 604-555-0333',
            'dob' => '2000-09-15',
            'status' => 1,
            'password' => bcrypt('123456'),
        ]);

        if ($user2->getMedia('avatar')->isEmpty()) {
            $user2->addMedia($filePath)->preservingOriginal()->toMediaCollection('avatar');
        }
    }
}
