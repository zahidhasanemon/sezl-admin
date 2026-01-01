<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\{SiteSetting, SiteAsset, Inquiry, PageTitle, GalleryType};
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

        $siteAsset = SiteAsset::updateOrCreate(
            ['id' => 1],
            [
                'created_by' => 1,
                'updated_by' => 1,
            ]
        );
        $logoPath = public_path('logo.jpg');
        $faviconPath = public_path('favicon.ico');
        if ($siteAsset->getMedia('logo')->isEmpty()) {
            $siteAsset->addMedia($logoPath)->preservingOriginal()->toMediaCollection('logo');
        }
        if ($siteAsset->getMedia('favicon')->isEmpty()) {
            $siteAsset->addMedia($faviconPath)->preservingOriginal()->toMediaCollection('favicon');
        }

        $bannerPath = public_path('images/frontend/page_banner.jpg');
        $aboutUsPage = PageTitle::updateOrCreate(
            ['page' => config('constants.pages.about_us')],
            [
                'header_title' => 'About Us',
                'title' => null,
                'description' => null,
                'created_by' => 1,
                'updated_by' => 1,
            ]
        );

        if ($aboutUsPage->getMedia('banner')->isEmpty()) {
            $aboutUsPage->addMedia($bannerPath)->preservingOriginal()->toMediaCollection('banner');
        }

        $whyUsBDPage = PageTitle::updateOrCreate(
            ['page' => config('constants.pages.why_us_bd')],
            [
                'header_title' => 'Why Invest in Bangladesh',
                'title' => 'Unlocking Unprecedented Opportunities',
                'description' => 'One of Asia’s fastest-growing economies with unmatched investment potential.',
                'created_by' => 1,
                'updated_by' => 1,
            ]
        );

        if ($whyUsBDPage->getMedia('banner')->isEmpty()) {
            $whyUsBDPage->addMedia($bannerPath)->preservingOriginal()->toMediaCollection('banner');
        }

        $whyUsSezlPage = PageTitle::updateOrCreate(
            ['page' => config('constants.pages.why_us_sezl')],
            [
                'header_title' => 'Why Invest in SEZL',
                'title' => 'Strategic Advantages',
                'description' => 'A strategically positioned, resource-rich, investor-ready economic zone designed for sustainable industrial growth.',
                'created_by' => 1,
                'updated_by' => 1,
            ]
        );

        if ($whyUsSezlPage->getMedia('banner')->isEmpty()) {
            $whyUsSezlPage->addMedia($bannerPath)->preservingOriginal()->toMediaCollection('banner');
        }

        $whyUsPartnerPage = PageTitle::updateOrCreate(
            ['page' => config('constants.pages.why_us_partner')],
            [
                'header_title' => 'Incentives for Investors',
                'title' => 'Key Benefits for Our Partners',
                'description' => 'Maximize your investment with attractive benefits and government-supported incentives at SEZL.',
                'created_by' => 1,
                'updated_by' => 1,
            ]
        );

        if ($whyUsPartnerPage->getMedia('banner')->isEmpty()) {
            $whyUsPartnerPage->addMedia($bannerPath)->preservingOriginal()->toMediaCollection('banner');
        }

        $devPartnerPage = PageTitle::updateOrCreate(
            ['page' => config('constants.pages.dev_partners')],
            [
                'header_title' => 'Our Development Partners',
                'title' => 'Meet Our Partners',
                'description' => 'SEZL is driven by a consortium of leading national and international experts, ensuring a world-class economic zone built on a foundation of strength and innovation.',
                'created_by' => 1,
                'updated_by' => 1,
            ]
        );

        if ($devPartnerPage->getMedia('banner')->isEmpty()) {
            $devPartnerPage->addMedia($bannerPath)->preservingOriginal()->toMediaCollection('banner');
        }

        $directorsPage = PageTitle::updateOrCreate(
            ['page' => config('constants.pages.directors')],
            [
                'header_title' => 'Board of Directors',
                'title' => 'Your Financial Success Starts With the Right People',
                'description' => 'SEZL is guided by a strong leadership consortium with a strategic vision for sustainable industrial development and investor success.',
                'created_by' => 1,
                'updated_by' => 1,
            ]
        );

        if ($directorsPage->getMedia('banner')->isEmpty()) {
            $directorsPage->addMedia($bannerPath)->preservingOriginal()->toMediaCollection('banner');
        }

        $managementTeamPage = PageTitle::updateOrCreate(
            ['page' => config('constants.pages.management_team')],
            [
                'header_title' => 'Management Team',
                'title' => 'Your Financial Success Starts With the Right People',
                'description' => 'SEZL is guided by a strong leadership consortium with a strategic vision for sustainable industrial development and investor success.',
                'created_by' => 1,
                'updated_by' => 1,
            ]
        );

        if ($managementTeamPage->getMedia('banner')->isEmpty()) {
            $managementTeamPage->addMedia($bannerPath)->preservingOriginal()->toMediaCollection('banner');
        }

        $facilitiesPage = PageTitle::updateOrCreate(
            ['page' => config('constants.pages.facilities_infrastructure')],
            [
                'header_title' => 'Facilities & Services at SEZL',
                'title' => 'State-of-the-Art Infrastructure',
                'description' => 'World-class infrastructure and comprehensive support for your business growth.',
                'created_by' => 1,
                'updated_by' => 1,
            ]
        );

        if ($facilitiesPage->getMedia('banner')->isEmpty()) {
            $facilitiesPage->addMedia($bannerPath)->preservingOriginal()->toMediaCollection('banner');
        }

        $connectivityPage = PageTitle::updateOrCreate(
            ['page' => config('constants.pages.connectivity')],
            [
                'header_title' => 'Connectivity & Transportation',
                'title' => 'Accessibility Overview',
                'description' => 'Easily accessible via major highways, airports, and transit hubs, ensuring seamless national and international logistics.',
                'created_by' => 1,
                'updated_by' => 1,
            ]
        );

        if ($connectivityPage->getMedia('banner')->isEmpty()) {
            $connectivityPage->addMedia($bannerPath)->preservingOriginal()->toMediaCollection('banner');
        }

        $academyPage = PageTitle::updateOrCreate(
            ['page' => config('constants.pages.academy')],
            [
                'header_title' => 'SEZL Human Resource Academy',
                'title' => 'Academy Overview',
                'description' => null,
                'created_by' => 1,
                'updated_by' => 1,
            ]
        );

        if ($academyPage->getMedia('banner')->isEmpty()) {
            $academyPage->addMedia($bannerPath)->preservingOriginal()->toMediaCollection('banner');
        }

        $zoneMapPage = PageTitle::updateOrCreate(
            ['page' => config('constants.pages.zone_map')],
            [
                'header_title' => 'SEZL Zone Map',
                'title' => 'Interactive Zone Map',
                'description' => 'Explore designated industrial areas, facilities, and available land plots within the economic zone.',
                'created_by' => 1,
                'updated_by' => 1,
            ]
        );

        if ($zoneMapPage->getMedia('banner')->isEmpty()) {
            $zoneMapPage->addMedia($bannerPath)->preservingOriginal()->toMediaCollection('banner');
        }

        $galleryPage = PageTitle::updateOrCreate(
            ['page' => config('constants.pages.gallery')],
            [
                'header_title' => 'Gallery',
                'title' => 'Explore Gallery',
                'description' => null,
                'created_by' => 1,
                'updated_by' => 1,
            ]
        );

        if ($galleryPage->getMedia('banner')->isEmpty()) {
            $galleryPage->addMedia($bannerPath)->preservingOriginal()->toMediaCollection('banner');
        }

        $newsPage = PageTitle::updateOrCreate(
            ['page' => config('constants.pages.news')],
            [
                'header_title' => 'News & Updates',
                'title' => 'Latest News & Insights',
                'description' => 'At Finovo, we’ve helped countless individuals overcome obstacles, achieve their goals, and create lasting change. Explore these inspiring success stories to see how our coaching services can reach your full potential.',
                'created_by' => 1,
                'updated_by' => 1,
            ]
        );

        if ($newsPage->getMedia('banner')->isEmpty()) {
            $newsPage->addMedia($bannerPath)->preservingOriginal()->toMediaCollection('banner');
        }

        $careerPage = PageTitle::updateOrCreate(
            ['page' => config('constants.pages.career')],
            [
                'header_title' => 'Career at SEZL',
                'title' => 'Explore Open Positions',
                'description' => null,
                'created_by' => 1,
                'updated_by' => 1,
            ]
        );

        if ($careerPage->getMedia('banner')->isEmpty()) {
            $careerPage->addMedia($bannerPath)->preservingOriginal()->toMediaCollection('banner');
        }

        $contactPage = PageTitle::updateOrCreate(
            ['page' => config('constants.pages.contact_us')],
            [
                'header_title' => 'Contact Us',
                'title' => 'Let’s Start the Conversation!',
                'description' => null,
                'created_by' => 1,
                'updated_by' => 1,
            ]
        );

        if ($contactPage->getMedia('banner')->isEmpty()) {
            $contactPage->addMedia($bannerPath)->preservingOriginal()->toMediaCollection('banner');
        }

        GalleryType::updateOrCreate(
            [
                'name' => 'Offices'
            ],
            [
                'status' => true,
                'created_by' => 1,
                'updated_by' => 1,
            ]
        );

        GalleryType::updateOrCreate(
            [
                'name' => 'Events'
            ],
            [
                'status' => true,
                'created_by' => 1,
                'updated_by' => 1,
            ]
        );

        GalleryType::updateOrCreate(
            [
                'name' => 'Utilities'
            ],
            [
                'status' => true,
                'created_by' => 1,
                'updated_by' => 1,
            ]
        );
    }
}
