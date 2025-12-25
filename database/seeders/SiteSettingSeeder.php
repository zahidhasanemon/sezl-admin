<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\{FaqCategory, Faq, HeroSlider, Inquiry, Notice, Testimonial, SiteSetting};
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
                'subject' => 'Order shipment status',
                'message' => 'Can you please update me on the shipping status of my recent order #12345?',
                'status' => 1,
                'resolved_by' => null,
            ],
            [
                'name' => 'Lily Thompson',
                'email' => 'lily.thompson@example.com',
                'phone' => '+1 604-555-2000',
                'subject' => 'Product availability',
                'message' => 'Is the red dress in size Medium available in stock?',
                'status' => 1,
                'resolved_by' => null,
            ],
            [
                'name' => 'Sophia Patel',
                'email' => 'sophia.patel@example.com',
                'phone' => '+1 514-555-3000',
                'subject' => 'Return procedure',
                'message' => 'How can I return a product if I am not satisfied with it?',
                'status' => 1,
                'resolved_by' => null,
            ],
            [
                'name' => 'Isabella Brown',
                'email' => 'isabella.brown@example.com',
                'phone' => '+1 780-555-4000',
                'subject' => 'Coupon code issue',
                'message' => 'I tried to use a coupon code but it did not apply at checkout. Can you help?',
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
                'value' => 'VuexyAdmin',
                'created_by' => 1,
                'updated_by' => 1,
            ]
        );

        SiteSetting::updateOrCreate(
            ['key' => config('constants.settings.site_email')],
            [
                'value' => 'contact@vuexy-admin.com, info@vuexy-admin.com',
                'created_by' => 1,
                'updated_by' => 1,
            ]
        );

        SiteSetting::updateOrCreate(
            ['key' =>  config('constants.settings.site_contact_numbers')],
            [
                'value' => '+1 416-555-0111, +1 604-555-0222',
                'created_by' => 1,
                'updated_by' => 1,
            ]
        );

        SiteSetting::updateOrCreate(
            ['key' => config('constants.settings.site_address')],
            [
                'value' => '123 Fashion Ave, Toronto, ON, Canada',
                'created_by' => 1,
                'updated_by' => 1,
            ]
        );

        SiteSetting::updateOrCreate(
            ['key' => config('constants.settings.site_facebook_url')],
            [
                'value' => 'https://www.facebook.com/vuexy-admin',
                'created_by' => 1,
                'updated_by' => 1,
            ]
        );

        SiteSetting::updateOrCreate(
            ['key' => config('constants.settings.site_instagram_url')],
            [
                'value' => 'https://www.instagram.com/vuexy-admin',
                'created_by' => 1,
                'updated_by' => 1,
            ]
        );

        SiteSetting::updateOrCreate(
            ['key' => config('constants.settings.site_x_url')],
            [
                'value' => 'https://www.x.com/vuexy-admin',
                'created_by' => 1,
                'updated_by' => 1,
            ]
        );

        SiteSetting::updateOrCreate(
            ['key' => config('constants.settings.site_youtube_url')],
            [
                'value' => 'https://www.youtube.com/vuexy-admin',
                'created_by' => 1,
                'updated_by' => 1,
            ]
        );

        SiteSetting::updateOrCreate(
            ['key' => config('constants.settings.site_linkedin_url')],
            [
                'value' => 'https://www.linkedin.com/company/vuexy-admin',
                'created_by' => 1,
                'updated_by' => 1,
            ]
        );

        SiteSetting::updateOrCreate(
            ['key' => config('constants.settings.site_tiktok_url')],
            [
                'value' => 'https://www.tiktok.com/@vuexy-admin',
                'created_by' => 1,
                'updated_by' => 1,
            ]
        );

        SiteSetting::updateOrCreate(
            ['key' => config('constants.settings.site_whatsapp_number')],
            [
                'value' => '+1 416-555-0333',
                'created_by' => 1,
                'updated_by' => 1,
            ]
        );

        SiteSetting::updateOrCreate(
            ['key' => config('constants.settings.site_footer_content')],
            [
                'value' => 'Your premier destination for fashion and style.Discover timeless pieces that redefine elegance and bring luxury to everyday life.',
                'created_by' => 1,
                'updated_by' => 1,
            ]
        );
    }
}
