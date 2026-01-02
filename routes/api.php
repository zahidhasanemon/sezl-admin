<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\V1\{
    ContactUsController,
    HomeController,
    TestimonialController,
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
    // common routes
    Route::get('contact-info', [ContactUsController::class, 'contactInfo']);
    Route::get('pages/home', [HomeController::class, 'homePageContent']);
    Route::get('countries', [HomeController::class, 'countries']);
    Route::get('countries/{id}/states', [HomeController::class, 'states']);
    Route::get('states/{id}/cities', [HomeController::class, 'cities']);
    Route::post('contact-us', [ContactUsController::class, 'contactUs']);
    Route::get('testimonials', [TestimonialController::class, 'index']);

    // Test push notification
    Route::post('sendPush', [HomeController::class, 'sendPush']);
});
