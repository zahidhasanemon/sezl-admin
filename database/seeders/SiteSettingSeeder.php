<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\{SiteSetting, Inquiry};
use Carbon\Carbon;

class SiteSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $inquiries = [
            [
                'name' => 'Olivia Adams',
                'email' => 'olivia.adams@example.com',
                'phone' => '+1 416-555-1000',
                'subject' => 'Land available sizes',
                'message' => 'Can you please provide me the available plot sizes in the downtown area?',
                'status' => 1,
                'resolved_by' => null,
            ],
            [
                'name' => 'Lily Thompson',
                'email' => 'lily.thompson@example.com',
                'phone' => '+1 604-555-2000',
                'subject' => 'Gas and Electricity rates',
                'message' => 'I would like to know the current gas and electricity rates for residential properties.',
                'status' => 1,
                'resolved_by' => null,
            ],
        ];

        foreach ($inquiries as $inquiry) {
            Inquiry::firstOrCreate(
                [
                    'email' => $inquiry['email'],
                    'subject' => $inquiry['subject'],
                ],
                $inquiry
            );
        }

        SiteSetting::updateOrCreate(
            ['key' => config('constants.settings.site_name')],
            [
                'value' => 'SEZ Limited',
                'created_by' => 1,
                'updated_by' => 1,
            ]
        );

        SiteSetting::updateOrCreate(
            ['key' => config('constants.settings.site_title')],
            [
                'value' => 'SEZL - Special Economic Zoen',
                'created_by' => 1,
                'updated_by' => 1,
            ]
        );

        SiteSetting::updateOrCreate(
            ['key' => config('constants.settings.site_email')],
            [
                'value' => 'contact@sezl.com',
                'created_by' => 1,
                'updated_by' => 1,
            ]
        );

        SiteSetting::updateOrCreate(
            ['key' =>  config('constants.settings.site_contact_numbers')],
            [
                'value' => '+88 01745 678900',
                'created_by' => 1,
                'updated_by' => 1,
            ]
        );

        SiteSetting::updateOrCreate(
            ['key' => config('constants.settings.site_address')],
            [
                'value' => '123 SEZ Road, Dhaka, Bangladesh',
                'created_by' => 1,
                'updated_by' => 1,
            ]
        );

        SiteSetting::updateOrCreate(
            ['key' => config('constants.settings.site_facebook_url')],
            [
                'value' => 'https://www.facebook.com/sezl',
                'created_by' => 1,
                'updated_by' => 1,
            ]
        );

        SiteSetting::updateOrCreate(
            ['key' => config('constants.settings.site_instagram_url')],
            [
                'value' => 'https://www.instagram.com/sezl',
                'created_by' => 1,
                'updated_by' => 1,
            ]
        );

        SiteSetting::updateOrCreate(
            ['key' => config('constants.settings.site_x_url')],
            [
                'value' => 'https://www.x.com/sezl',
                'created_by' => 1,
                'updated_by' => 1,
            ]
        );

        SiteSetting::updateOrCreate(
            ['key' => config('constants.settings.site_youtube_url')],
            [
                'value' => 'https://www.youtube.com/sezl',
                'created_by' => 1,
                'updated_by' => 1,
            ]
        );

        SiteSetting::updateOrCreate(
            ['key' => config('constants.settings.site_linkedin_url')],
            [
                'value' => 'https://www.linkedin.com/company/sezl',
                'created_by' => 1,
                'updated_by' => 1,
            ]
        );

        SiteSetting::updateOrCreate(
            ['key' => config('constants.settings.site_tiktok_url')],
            [
                'value' => 'https://www.tiktok.com/@sezl',
                'created_by' => 1,
                'updated_by' => 1,
            ]
        );

        SiteSetting::updateOrCreate(
            ['key' => config('constants.settings.site_whatsapp_number')],
            [
                'value' => '+88 01745 678900',
                'created_by' => 1,
                'updated_by' => 1,
            ]
        );
    }
}
