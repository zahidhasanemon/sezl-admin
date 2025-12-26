<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\{
    AdminController,
    AuthController,
    ProfileController,
    TestimonialController,
    SettingController,
    InquiryController
};

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
|
| Here is where you can register admin routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::domain(config('constants.admin_url', 'admin.vuexy-admin.com'))->group(function () {
Route::group([
    'prefix' => 'admin'
], function () {
    Route::group([
        'prefix' => 'api'
    ], function () {
        Route::post('login', [AuthController::class, 'login'])->name('login');

        Route::group(['middleware' => ['auth:sanctum']], function () {
            Route::post('logout', [ProfileController::class, 'logout']);

            Route::get('profile', [ProfileController::class, 'profile']);
            Route::post('profile/update', [ProfileController::class, 'profileUpdate']);
            Route::post('profile/change-password', [ProfileController::class, 'changePassword']);

            Route::get('dashboard', [AdminController::class, 'dashboard']);

            Route::get('admins', [AdminController::class, 'index']);
            Route::post('admins', [AdminController::class, 'store']);
            Route::get('admins/{id}', [AdminController::class, 'show']);
            Route::post('admins/{id}/update', [AdminController::class, 'update']);
            Route::post('admins/{id}/delete', [AdminController::class, 'destroy']);
            Route::post('admins/{id}/password', [AdminController::class, 'passwordUpdate']);

            // Testimonials
            Route::get('testimonials', [TestimonialController::class, 'index']);
            Route::post('testimonials', [TestimonialController::class, 'store']);
            Route::get('testimonials/{id}', [TestimonialController::class, 'show']);
            Route::post('testimonials/{id}/update', [TestimonialController::class, 'update']);
            Route::post('testimonials/{id}/delete', [TestimonialController::class, 'destroy']);

            Route::get('settings', [SettingController::class, 'index']);
            Route::post('settings', [SettingController::class, 'store']);

            Route::get('shipping-settings', [SettingController::class, 'shippingSettingsIndex']);
            Route::post('shipping-settings', [SettingController::class, 'shippingSettingsStore']);

            Route::get('page-settings/{type}', [SettingController::class, 'pageSettingsIndex']);
            Route::post('page-settings/{type}', [SettingController::class, 'pageSettingsStore']);

            Route::get('inquiries', [InquiryController::class, 'index']);
        });
    });
});

Route::get('{any?}', function () {
    return view('admin');
})->where('any', '.*');
