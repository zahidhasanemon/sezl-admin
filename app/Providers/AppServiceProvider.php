<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\{Validator, Cache, Auth, Hash, Vite};
use App\Models\{User, SiteSetting};
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
        //Old Password Validation
        Validator::extend('old_password', function ($attribute, $value, $parameters, $validator) {
            return Hash::check($value, current($parameters));
        }, 'Old Password does not match');


        Validator::extend('new_password', function ($attribute, $value, $parameters, $validator) {
            return !Hash::check($value, current($parameters));
        }, 'New Password must be different from the old password');

        SiteSetting::observe(SiteSettingObserver::class);
    }
}
