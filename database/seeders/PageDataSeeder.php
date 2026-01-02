<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\{HomePageContent, CardItem, AboutUsContent, HistoryTimeline, AcademicOverview, Highlight};

class PageDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $homePageContent = HomePageContent::updateOrCreate(
            ['id' => 1],
            [
                'hero_title' => 'Pioneering Economic Growth in the Heart of Bangladesh',
                'hero_media_type' => 'image',
                'hero_description' => 'Discover unparalleled investment opportunities at Sirajganj Economic Zone, where strategic location meets world-class infrastructure and sustainable development.',
                'about_us_title' => 'Sirajganj Economic Zone Limited (SEZL)',
                'about_us_description' => 'Sirajganj Economic Zone Limited (SEZL) is at the forefront of industrial development, offering a strategic gateway for businesses to thrive. We provide a comprehensive ecosystem designed to foster innovation, attract investment, and support sustainable growth for our partners.',
                'core_title' => 'Our Core Services',
                'core_description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy tex",
                'middle_banner_title' => 'Lorem Ipsum is simply dummy text  of the printing',
                'about_bd_tag' => 'About Bangladesh',
                'about_bd_title' => 'Why Invest in Bangladesh',
                'about_bd_description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make",
                'about_bd_video_url' => 'https://www.youtube.com/watch?v=QNUSIOMb6vI',
                'created_by' => 1,
                'updated_by' => 1
            ]
        );

        $heroImagePath = public_path('images/frontend/hero.jpg');
        if ($homePageContent->getMedia('hero_media')->isEmpty()) {
            $homePageContent->addMedia($heroImagePath)->preservingOriginal()->toMediaCollection('hero_media');
        }

        if ($homePageContent->getMedia('partners')->isEmpty()) {
            $partner1 = public_path('images/frontend/company1.png');
            $partner2 = public_path('images/frontend/company2.png');
            $partner3 = public_path('images/frontend/company3.png');
            $partner4 = public_path('images/frontend/company4.png');
            $partner5 = public_path('images/frontend/company5.png');
            $homePageContent->addMedia($partner1)->preservingOriginal()->toMediaCollection('partners');
            $homePageContent->addMedia($partner2)->preservingOriginal()->toMediaCollection('partners');
            $homePageContent->addMedia($partner3)->preservingOriginal()->toMediaCollection('partners');
            $homePageContent->addMedia($partner4)->preservingOriginal()->toMediaCollection('partners');
            $homePageContent->addMedia($partner5)->preservingOriginal()->toMediaCollection('partners');
        }

        CardItem::updateOrCreate(
            [
                'type' => config('constants.card_types.core_services'),
                'title' => 'Legal service',
            ],
            [
                'description' => null,
                'icon' => 'fa-solid fa-file-invoice-dollar',
                'status' => true,
                'created_by' => 1,
                'updated_by' => 1,
            ]
        );

        CardItem::updateOrCreate(
            [
                'type' => config('constants.card_types.core_services'),
                'title' => 'Human Resource',
            ],
            [
                'description' => null,
                'icon' => 'fa-solid fa-person-digging',
                'status' => true,
                'created_by' => 1,
                'updated_by' => 1,
            ]
        );

        CardItem::updateOrCreate(
            [
                'type' => config('constants.card_types.core_services'),
                'title' => 'Manufacturing service',
            ],
            [
                'description' => null,
                'icon' => 'fa-solid fa-gear',
                'status' => true,
                'created_by' => 1,
                'updated_by' => 1,
            ]
        );

        CardItem::updateOrCreate(
            [
                'type' => config('constants.card_types.core_services'),
                'title' => 'Administrative service',
            ],
            [
                'description' => null,
                'icon' => 'fa-solid fa-user-tie',
                'status' => true,
                'created_by' => 1,
                'updated_by' => 1,
            ]
        );

        CardItem::updateOrCreate(
            [
                'type' => config('constants.card_types.home_bd'),
                'title' => 'Continuous GDP Growth',
            ],
            [
                'description' => 'Ranked 39th worldwide with 8.2% GDP rate in 2019, Bangladesh has made a major advancement in the economic sector.',
                'icon' => 'fa-solid fa-trophy',
                'status' => true,
                'created_by' => 1,
                'updated_by' => 1,
            ]
        );

        CardItem::updateOrCreate(
            [
                'type' => config('constants.card_types.home_bd'),
                'title' => 'Strategic Location',
            ],
            [
                'description' => 'The location of Bangladesh in South Asia makes it very convenient for any successful industrial venture.',
                'icon' => 'fa-solid fa-shield',
                'status' => true,
                'created_by' => 1,
                'updated_by' => 1,
            ]
        );

        CardItem::updateOrCreate(
            [
                'type' => config('constants.card_types.home_bd'),
                'title' => 'Cost-efficient Human Resource',
            ],
            [
                'description' => "Compared to the manpower of other industrially enriched countries, managing Bangladesh's workforce is much more cost-effective.",
                'icon' => 'fa-solid fa-folder',
                'status' => true,
                'created_by' => 1,
                'updated_by' => 1,
            ]
        );

        CardItem::updateOrCreate(
            [
                'type' => config('constants.card_types.home_bd'),
                'title' => 'Energetic Manpower',
            ],
            [
                'description' => "Bangladesh has produced a vast number of skilled workforce in recent years who are prepared for diversified industrial activities.",
                'icon' => 'fa-solid fa-handshake',
                'status' => true,
                'created_by' => 1,
                'updated_by' => 1,
            ]
        );

        $about1 = public_path('images/frontend/about1.jpg');
        $about2 = public_path('images/frontend/about2.png');
        $about3 = public_path('images/frontend/about3.png');
        if ($homePageContent->getMedia('about_us_first')->isEmpty()) {
            $homePageContent->addMedia($about1)->preservingOriginal()->toMediaCollection('about_us_first');
        }
        if ($homePageContent->getMedia('about_us_second')->isEmpty()) {
            $homePageContent->addMedia($about2)->preservingOriginal()->toMediaCollection('about_us_second');
        }
        if ($homePageContent->getMedia('about_us_third')->isEmpty()) {
            $homePageContent->addMedia($about3)->preservingOriginal()->toMediaCollection('about_us_third');
        }

        $middleImagePath = public_path('images/frontend/middle_banner.jpg');
        if ($homePageContent->getMedia('middle_banner')->isEmpty()) {
            $homePageContent->addMedia($middleImagePath)->preservingOriginal()->toMediaCollection('middle_banner');
        }

        $aboutUsContent = AboutUsContent::updateOrCreate(
            ['id' => 1],
            [
                'chairman_name' => 'A Matin Chowdhury',
                'chairman_message' => 'It is a great pleasure for me to welcome and address Investors both National – International to Sirajganj Economic Zone Ltd., the largest Private Special Economic Zone of Bangladesh. With the objective of achieving investment, development and employment, we are a group of successful Industrialists who joined hands to embark on this very challenging and difficult project.

We are embarking on it for meeting the economic needs of our country, at the same time create an environment for quality employment and enterprises.

The Board of Directors who have individual success and  contribution to industry and society are  aware of the predicaments for setting up industrial venture in Bangladesh, therefore, have ensured that all of these road blocks are eliminated for our investors and that they can come and set up units on a plug and play basis avoiding the non-production issues.

To achieve the objective, we have hired the best possible Consultants like Pricewaterhouse Coopers Ltd. (PWC) and others for advising us to set up this global standard project keeping in mind sustainability, environmental compliance records, recycle, etc.

A capable team of dedicated Professionals are running and setting up these units and we are looking forward to your participation. Should there be any queries, please do not hesitate to contact me and Members of my Board for any clarification and support.

Thanking you and looking forward to seeing you in our Zone.',
                'overview_message' => 'Sirajganj Economic Zone Limited is the largest Economic Zone to become the driving force of sustainable development in Bangladesh. The project will play an indispensable role in generating a wide range of employment opportunities as well as production activities in the Northern part of Bangladesh. It has got all the potential to contribute to the country’s industrial development.',
                'history' => 'Founded with a vision to transform the industrial landscape, SEZL has grown into a beacon of economic development, attracting global investment and fostering local prosperity through strategic planning and execution.',
                'mission' => 'To be the premier economic zone in the region, delivering sustainable value to investors, partners, and the community by creating an efficient, eco-friendly, and innovative industrial hub.',
                'core_services' => 'We provide comprehensive solutions including land development, utility infrastructure, logistics support, and one- stop administrative services to ensure seamless business operations.',
                'created_by' => 1,
                'updated_by' => 1,
            ]
        );

        $chairmanImagePath = public_path('images/frontend/chairman.png');
        $overViewPath = public_path('images/frontend/overview.jpg');
        if ($aboutUsContent->getMedia('chairman_image')->isEmpty()) {
            $aboutUsContent->addMedia($chairmanImagePath)->preservingOriginal()->toMediaCollection('chairman_image');
        }
        if ($aboutUsContent->getMedia('overview_image')->isEmpty()) {
            $aboutUsContent->addMedia($overViewPath)->preservingOriginal()->toMediaCollection('overview_image');
        }

        HistoryTimeline::updateOrCreate(
            [
                'year' => '2016',
            ],
            [
                'title' => 'Government approval',
                'description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
                'status' => true,
                'created_by' => 1,
                'updated_by' => 1,
            ]
        );

        HistoryTimeline::updateOrCreate(
            [
                'year' => '2017',
            ],
            [
                'title' => 'License as Developer and Operator',
                'description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
                'status' => true,
                'created_by' => 1,
                'updated_by' => 1,
            ]
        );

        HistoryTimeline::updateOrCreate(
            [
                'year' => '2018',
            ],
            [
                'title' => 'Land handed over',
                'description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
                'status' => true,
                'created_by' => 1,
                'updated_by' => 1,
            ]
        );

        HistoryTimeline::updateOrCreate(
            [
                'year' => '2019',
            ],
            [
                'title' => 'Development starts',
                'description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
                'status' => true,
                'created_by' => 1,
                'updated_by' => 1,
            ]
        );

        $academicOverviewContent = AcademicOverview::updateOrCreate(
            ['id' => 1],
            [
                'description' => 'Our mission is to cultivate a highly skilled, adaptable, and industry- ready workforce. We provide targeted training and development programs designed to meet the evolving demands of industries within the Sirajganj Economic Zone, ensuring a sustainable talent pipeline for our investors and partners. The SEZL Human Resource Academy is dedicated to empowering the local community through world-class vocational and technical training.',
                'created_by' => 1,
                'updated_by' => 1,
            ]
        );
        if ($academicOverviewContent->getMedia('overview_image')->isEmpty()) {
            $academicOverviewContent->addMedia($overViewPath)->preservingOriginal()->toMediaCollection('overview_image');
        }

        if ($academicOverviewContent->getMedia('partners')->isEmpty()) {
            $partner1 = public_path('images/frontend/partner1.png');
            $partner2 = public_path('images/frontend/partner2.png');
            $partner3 = public_path('images/frontend/partner3.png');
            $academicOverviewContent->addMedia($partner1)->preservingOriginal()->toMediaCollection('partners');
            $academicOverviewContent->addMedia($partner2)->preservingOriginal()->toMediaCollection('partners');
            $academicOverviewContent->addMedia($partner3)->preservingOriginal()->toMediaCollection('partners');
        }

        Highlight::updateOrCreate(
            [
                'title' => 'Years of Operation',
            ],
            [
                'value' => '10+',
                'home_page_top' => true,
                'home_page_middle' => false,
                'about_page' => true,
                'invest_bd_page' => false,
                'invest_sezl_page' => false,
                'status' => true,
                'created_by' => 1,
                'updated_by' => 1,
            ]
        );

        Highlight::updateOrCreate(
            [
                'title' => 'Successful projects',
            ],
            [
                'value' => '240+',
                'home_page_top' => true,
                'home_page_middle' => false,
                'about_page' => false,
                'invest_bd_page' => false,
                'invest_sezl_page' => false,
                'status' => true,
                'created_by' => 1,
                'updated_by' => 1,
            ]
        );

        Highlight::updateOrCreate(
            [
                'title' => 'Connectivity Hub',
            ],
            [
                'value' => 'Prime',
                'home_page_top' => false,
                'home_page_middle' => true,
                'about_page' => false,
                'invest_bd_page' => false,
                'invest_sezl_page' => false,
                'status' => true,
                'created_by' => 1,
                'updated_by' => 1,
            ]
        );

        Highlight::updateOrCreate(
            [
                'title' => 'Acres Developed',
            ],
            [
                'value' => '1040+',
                'home_page_top' => false,
                'home_page_middle' => true,
                'about_page' => true,
                'invest_bd_page' => false,
                'invest_sezl_page' => true,
                'status' => true,
                'created_by' => 1,
                'updated_by' => 1,
            ]
        );

        Highlight::updateOrCreate(
            [
                'title' => 'Partner Companies',
            ],
            [
                'value' => '50+',
                'home_page_top' => false,
                'home_page_middle' => false,
                'about_page' => true,
                'invest_bd_page' => false,
                'invest_sezl_page' => false,
                'status' => true,
                'created_by' => 1,
                'updated_by' => 1,
            ]
        );

        Highlight::updateOrCreate(
            [
                'title' => 'Total Investment',
            ],
            [
                'value' => '$2B+',
                'home_page_top' => false,
                'home_page_middle' => false,
                'about_page' => true,
                'invest_bd_page' => false,
                'invest_sezl_page' => false,
                'status' => true,
                'created_by' => 1,
                'updated_by' => 1,
            ]
        );

        Highlight::updateOrCreate(
            [
                'title' => 'Skilled Workforce',
            ],
            [
                'value' => '500,000+',
                'home_page_top' => false,
                'home_page_middle' => true,
                'about_page' => false,
                'invest_bd_page' => false,
                'invest_sezl_page' => true,
                'status' => true,
                'created_by' => 1,
                'updated_by' => 1,
            ]
        );

        Highlight::updateOrCreate(
            [
                'title' => 'Target Industries',
            ],
            [
                'value' => '12+',
                'home_page_top' => false,
                'home_page_middle' => false,
                'about_page' => false,
                'invest_bd_page' => false,
                'invest_sezl_page' => true,
                'status' => true,
                'created_by' => 1,
                'updated_by' => 1,
            ]
        );

        Highlight::updateOrCreate(
            [
                'title' => 'Average GDP Growth',
            ],
            [
                'value' => '7%+',
                'home_page_top' => false,
                'home_page_middle' => false,
                'about_page' => false,
                'invest_bd_page' => true,
                'invest_sezl_page' => false,
                'status' => true,
                'created_by' => 1,
                'updated_by' => 1,
            ]
        );

        Highlight::updateOrCreate(
            [
                'title' => 'Population with 65% Workforce',
            ],
            [
                'value' => '170M+',
                'home_page_top' => false,
                'home_page_middle' => false,
                'about_page' => false,
                'invest_bd_page' => true,
                'invest_sezl_page' => false,
                'status' => true,
                'created_by' => 1,
                'updated_by' => 1,
            ]
        );

        Highlight::updateOrCreate(
            [
                'title' => 'Annual Exports',
            ],
            [
                'value' => '$52B+',
                'home_page_top' => false,
                'home_page_middle' => false,
                'about_page' => false,
                'invest_bd_page' => true,
                'invest_sezl_page' => false,
                'status' => true,
                'created_by' => 1,
                'updated_by' => 1,
            ]
        );

        Highlight::updateOrCreate(
            [
                'title' => 'Countries with Trade Access',
            ],
            [
                'value' => '100+',
                'home_page_top' => false,
                'home_page_middle' => false,
                'about_page' => false,
                'invest_bd_page' => true,
                'invest_sezl_page' => false,
                'status' => true,
                'created_by' => 1,
                'updated_by' => 1,
            ]
        );
    }
}
