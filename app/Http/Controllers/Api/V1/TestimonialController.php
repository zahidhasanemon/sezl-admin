<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use App\Http\Resources\TestimonialResource;
use Illuminate\Support\Facades\Cache;
use Illuminate\Http\JsonResponse;

class TestimonialController extends Controller
{
    /**
     * testimonials list
     *
     * @return
     */
    public function index(): JsonResponse
    {
        $testimonials = Cache::remember('testimonials', 3600, function () {
            $testimonials = Testimonial::where('status', true)
                ->orderBy('created_at', 'desc')
                ->get();
            return TestimonialResource::collection($testimonials);
        });

        return response()->json([
            'success' => true,
            'message' => 'Testimonials retrieved successfully.',
            'testimonials' => $testimonials
        ]);
    }
}
