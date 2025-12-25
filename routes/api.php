<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\V1\{
    AuthController,
    UserController,
    ContactUsController,
    HomeController,
    TestimonialController,
    NotificationController
};

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

/*
 * All auth functionality route
 */
Route::group([
    'prefix' => 'v1'
], function () {
    // auth routes
    Route::post('register', [AuthController::class, 'registerUser']);
    Route::post('register/resend-email', [AuthController::class, 'resendRegistrationEmail'])->middleware('throttle:1,1');
    Route::post('register/email-verify', [AuthController::class, 'verifyRegistrationEmail']);
    Route::post('login', [AuthController::class, 'login']);
    Route::post('login/social', [AuthController::class, 'socialLogin']);
    Route::post('forget-password', [AuthController::class, 'forgetPassword']);
    Route::post('forget-password/verify-otp', [AuthController::class, 'verifyPasswordResetOtp']);
    Route::post('reset-password', [AuthController::class, 'resetPassword']);

    // common routes
    Route::get('contact-info', [ContactUsController::class, 'contactInfo']);
    Route::get('home', [HomeController::class, 'homePageContent']);
    Route::get('countries', [HomeController::class, 'countries']);
    Route::get('countries/{id}/states', [HomeController::class, 'states']);
    Route::get('states/{id}/cities', [HomeController::class, 'cities']);
    Route::post('contact-us', [ContactUsController::class, 'contactUs']);
    Route::get('testimonials', [TestimonialController::class, 'index']);

    // Test push notification
    Route::post('sendPush', [HomeController::class, 'sendPush']);

    Route::group(['middleware' => ['auth:sanctum']], function () {
        Route::post('logout', [AuthController::class, 'logout']);
        Route::get('profile', [UserController::class, 'myProfile']);
        // Route::get('dashboard-data', [UserController::class, 'dashboardData']);
        Route::post('profile', [UserController::class, 'updateProfile']);
        Route::post('change/password', [UserController::class, 'changePassword']);
        Route::post('password/verify', [UserController::class, 'verifyCurrentPassword']);
        Route::delete('account/delete', [UserController::class, 'deleteAccount']);

        // notifications
        Route::get('notifications', [NotificationController::class, 'userNotifications']);
        Route::post('notifications/{id}/read', [NotificationController::class, 'markAsRead']);
        Route::post('notifications/mark-all-as-read', [NotificationController::class, 'markAllAsRead']);
    });
});
