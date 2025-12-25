<?php

namespace App\Http\Controllers\Frontend;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\{Testimonial, SiteSetting, Inquiry};
use App\Http\Resources\TestimonialResource;
use Illuminate\Support\Facades\Validator;

class HomeController extends Controller
{
    public function application()
    {
        return Inertia::render('app', [
            // You can pass initial props here if needed
        ])->withViewData('view', 'app');
    }

    public function home()
    {
        return Inertia::render('Home', [
            'slides' => [],
            'seo' => [
                'title' => 'Welcome',
                'description' => 'Discover amazing products'
            ]
        ]);
    }

    public function testimonials()
    {
        $testimonials = Testimonial::where('status', 1)->inRandomOrder()->take(12)->get();
        return Inertia::render('Testimonial', [
            'testimonials' => TestimonialResource::collection($testimonials)->resolve(),
            'seo' => [
                'title' => 'Testimonials',
                'description' => 'What our customers say about us'
            ]
        ]);
    }

    public function storeContactForm(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'firstName' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Validation Error', 'errors' => $validator->errors()], 422);
        }

        Inquiry::create([
            'name' => $request->input('firstName') . ' ' . $request->input('lastName', ''),
            'email' => $request->input('email'),
            'phone' => $request->input('phone'),
            'subject' => $request->input('subject'),
            'message' => $request->input('message'),
            'status' => 0,
        ]);

        return response()->json(['message' => 'Your inquiry has been submitted successfully.'], 200);
    }

    public function email()
    {
        return view('email.verify');
    }

    public function profile()
    {
        return Inertia::render('Profile', [
            'seo' => [
                'title' => 'My Profile - Vuexy',
                'description' => 'Manage your account'
            ]
        ]);
    }
}
