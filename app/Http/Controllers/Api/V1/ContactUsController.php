<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\{Inquiry, SiteSetting};
use Illuminate\Support\Facades\{Validator, Log, Cache};
use Illuminate\Http\Request;

class ContactUsController extends Controller
{
    /**
     * contact info
     *
     * @return
     */
    public function contactInfo()
    {
        try {
            $settings = Cache::remember('site_settings', 3600, function () {
                return SiteSetting::all()->keyBy('key');
            });

            return response()->json([
                'success' => true,
                'message' => 'Contact information retrieved successfully.',
                'information' => [
                    'email' => $settings[config('constants.settings.site_email')]->value ?? '',
                    'phone' => $settings[config('constants.settings.site_contact_numbers')]->value ?? '',
                    'address' => $settings[config('constants.settings.site_address')]->value ?? '',
                    'facebook' => $settings[config('constants.settings.site_facebook_url')]->value ?? '',
                    'x' => $settings[config('constants.settings.site_x_url')]->value ?? '',
                    'instagram' => $settings[config('constants.settings.site_instagram_url')]->value ?? '',
                    'youtube' => $settings[config('constants.settings.site_youtube_url')]->value ?? '',
                ]
            ]);
        } catch (\Exception $e) {
            Log::error('Failed to retrieve contact info', ['error' => $e->getMessage()]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve contact information.',
            ], 500);
        }
    }

    /**
     * contact info
     *
     * @return
     */
    public function contactUs(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => [
                'required',
                'string',
                'email',
                'max:255'
            ],
            'phone' => 'nullable|string|max:255',
            'message' => [
                'required',
                'string',
                'max:1000',
            ],
            'subject' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
                'message' => $validator->errors()->first()
            ], 422);
        }

        try {
            Inquiry::create($request->only(['name', 'email', 'phone', 'subject', 'message']));
        } catch (\Exception $e) {
            Log::error('Email verification failed', ['error' => $e->getMessage()]);
            return response()->json([
                'success' => false,
                'errors' => [],
                'message' => 'There was an error processing your request. Please try again later.'
            ], 500);
        }

        $success = [
            'success' => true,
            'errors' => [],
            'message' => 'Your message has been received. We will get back to you shortly.',
        ];

        return response()->json($success, 200);
    }
}
