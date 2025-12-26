<?php

namespace App\Providers;

use Inertia\Inertia;
use App\Observers\NotificationObserver;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\{Validator, Cache, Auth, Hash, Vite};
use App\Models\{Notification, User, SiteSetting};
use App\Observers\SiteSettingObserver;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // $host = request()->getHost();
        // $hostParts = explode('.', $host);

        // if (count($hostParts) > 2 && $hostParts[0] === 'admin') {
        //     Vite::useBuildDirectory('build/admin');
        // }

        // $path = request()->path();

        // if (str_starts_with($path, 'admin')) {
        //     Vite::useBuildDirectory('build/admin');
        // }

        // Inertia::share([
        //     'auth.user' => function () {
        //         $user = Auth::user();

        //         // Check if user is instance of User model (not Admin)
        //         if ($user && $user instanceof User) {
        //             return [
        //                 'id' => $user->id,
        //                 'name' => $user->full_name,
        //                 'first_name' => $user->first_name,
        //                 'last_name' => $user->last_name,
        //                 'phone' => $user->phone,
        //                 'email' => $user->email,
        //                 'avatar' => $user->avatar,
        //                 'cart_count' => $user->carts()->count(),
        //                 'wishlist_count' => $user->wishlists()->count(),
        //                 'notifications_count' => $user->unreadNotifications()->count(),
        //             ];
        //         }

        //         return null;
        //     },

        //     'flash' => function () {
        //         return [
        //             'success' => session('success'),
        //             'error' => session('error'),
        //         ];
        //     },

        //     // Featured categories - loaded on every page
        //     'navigation' => fn() => [
        //         'categories' => Cache::remember('navigation-categories', 3600, function () {
        //             return Category::where('featured', true)
        //                 ->where('parent_id', 1)
        //                 ->with(['children' => function ($query) {
        //                     $query->where('status', 1)
        //                         ->select('id', 'name', 'slug', 'parent_id');
        //                 }])
        //                 ->where('status', 1)
        //                 ->select('id', 'name', 'slug')
        //                 ->get();
        //         }),
        //     ],

        //     // Site Settings
        //     'site' => function () {
        //         return Cache::remember('site-settings-frontend', 3600, function () {
        //             $settings = SiteSetting::all()->keyBy('key');

        //             return [
        //                 'name' => $settings[config('constants.settings.site_name')]->value ?? 'VuexyAdmin',
        //                 'description' => $settings[config('constants.settings.site_footer_content')]->value ?? '',
        //                 'email' => $settings[config('constants.settings.site_email')]->value ?? '',
        //                 'phone' => $settings[config('constants.settings.site_contact_numbers')]->value ?? '',
        //                 'address' => $settings[config('constants.settings.site_address')]->value ?? '',
        //                 'facebook' => $settings[config('constants.settings.site_facebook_url')]->value ?? '',
        //                 'twitter' => $settings[config('constants.settings.site_x_url')]->value ?? '',
        //                 'instagram' => $settings[config('constants.settings.site_instagram_url')]->value ?? '',
        //                 'youtube' => $settings[config('constants.settings.site_youtube_url')]->value ?? '',
        //                 'linkedin' => $settings[config('constants.settings.site_linkedin_url')]->value ?? '',
        //                 'app_download_text' => $settings[config('constants.settings.site_app_download_title')]->value ?? '',
        //                 'play_store_url' => $settings[config('constants.settings.site_app_download_playstore_link')]->value ?? '',
        //                 'app_store_url' => $settings[config('constants.settings.site_app_download_appstore_link')]->value ?? '',
        //             ];
        //         });
        //     },
        // ]);

        //Old Password Validation
        Validator::extend('old_password', function ($attribute, $value, $parameters, $validator) {
            return Hash::check($value, current($parameters));
        }, 'Old Password does not match');


        Validator::extend('new_password', function ($attribute, $value, $parameters, $validator) {
            return !Hash::check($value, current($parameters));
        }, 'New Password must be different from the old password');

        Notification::observe(NotificationObserver::class);
        SiteSetting::observe(SiteSettingObserver::class);
    }
}
