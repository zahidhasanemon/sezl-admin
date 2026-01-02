<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\{Validator, Log, Cache};
use App\Models\{HomePageContent, CardItem, Testimonial, Highlight, News};
use App\Http\Resources\{HomePageContentResource, TestimonialResource, CardItemResource, HighlightResource, NewsResource};

class HomeController extends Controller
{
    /**
     * home page notice pop up
     *
     * @return
     */
    public function homePageContent()
    {
        try {
            $homePageContent = Cache::remember('home_page_content', 3600, function () {
                return HomePageContent::first();
            });
            $coreServices = Cache::remember('home_core_services', 3600, function () {
                return CardItem::where('type', config('constants.card_types.core_services'))
                    ->where('status', true)
                    ->orderBy('created_at', 'asc')
                    ->get();
            });
            $whyInvestInBD = Cache::remember('home_invest_bd', 3600, function () {
                return CardItem::where('type', config('constants.card_types.home_bd'))
                    ->where('status', true)
                    ->orderBy('created_at', 'asc')
                    ->get();
            });
            $testimonials = Cache::remember('home_testimonials', 3600, function () {
                return Testimonial::where('type', config('constants.testimonial_types.client'))
                    ->where('status', true)
                    ->where('featured', true)
                    ->orderBy('created_at', 'desc')
                    ->get();
            });
            $topHighlights = Cache::remember('home_top_highlights', 3600, function () {
                return Highlight::where('status', true)
                    ->where('home_page_top', true)
                    ->orderBy('created_at', 'asc')
                    ->get();
            });
            $middleHighlights = Cache::remember('home_middle_highlights', 3600, function () {
                return Highlight::where('status', true)
                    ->where('home_page_top', true)
                    ->orderBy('created_at', 'asc')
                    ->get();
            });
            $news = Cache::remember('home_news', 3600, function () {
                return NewsResource::collection(
                    News::where('status', true)
                        ->orderBy('published_at', 'desc')
                        ->take(3)
                        ->get()
                );
            });
            return response()->json([
                'success' => true,
                'message' => 'All Data Retrieved Successfully.',
                'data' => [
                    'content' => new HomePageContentResource($homePageContent),
                    'coreServices' => CardItemResource::collection($coreServices),
                    'whyInvestInBD' => CardItemResource::collection($whyInvestInBD),
                    'testimonials' => TestimonialResource::collection($testimonials),
                    'topHighlights' => HighlightResource::collection($topHighlights),
                    'middleHighlights' => HighlightResource::collection($middleHighlights),
                    'news' => $news
                ]
            ]);
        } catch (\Exception $e) {
            Log::error('Failed to retrieve contact info', ['error' => $e->getMessage()]);
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong. Please try again.',
                'data' => null
            ], 500);
        }
    }
}
