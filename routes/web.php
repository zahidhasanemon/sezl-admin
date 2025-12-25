<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Frontend\{
    HomeController,
    AuthController,
    UserController,
};
use App\Http\Resources\OrderResource;

// Route::domain(config('app.url', 'vuexy-admin.com'))->group(function () {
//     Route::get('{any}', function () {
//         return view('application');
//     })->where('any', '.*');
// });

// Route::get('/invoice', function () {
//     $order = App\Models\Order::with(
//         'user',
//         'items.product',
//         'items.variation',
//         'items.variation.variationAttributes',
//         'items.variation.variationAttributes.attribute',
//         'items.variation.variationAttributes.attributeItem',
//         'transactions'
//     )->first();
//     $transaction = $order->transactions->where('type', 1)->first();
//     return view('pdfs.invoice', ['order' => $order, 'transaction' => $transaction]);
// });

Route::domain(config('app.url'))->group(function () {
    Route::get('/', [HomeController::class, 'home'])->name('home');
    Route::middleware('guest')->group(function () {
        Route::get('/login', [AuthController::class, 'login'])->name('login');
        Route::post('/login', [AuthController::class, 'loginUser']);
        Route::get('/signup', [AuthController::class, 'signup'])->name('signup');
        Route::post('/signup', [AuthController::class, 'signupUser']);
        Route::get('/email/verify', [AuthController::class, 'verifyEmail'])->name('email.verify');
        Route::post('/email/verify/resend', [AuthController::class, 'resendVerificationEmail'])->middleware('throttle:1,1');;
        Route::post('/verify/email', [AuthController::class, 'verifyRegistrationEmail']);
        Route::get('/forget-password', [AuthController::class, 'forgetPassword'])->name('forget.password');
        Route::get('/password/email/verify', [AuthController::class, 'verifyForgetPasswordEmail'])->name('password.verify');
        Route::post('/forget/password', [AuthController::class, 'sendForgetPasswordOtp'])->middleware('throttle:1,1');
        Route::post('/password/verify-otp', [AuthController::class, 'verifyPassword']);
        Route::post('/password/reset', [AuthController::class, 'resetPassword']);
        Route::get('/auth/{provider}/redirect', [AuthController::class, 'redirect'])->name('social.redirect');
        Route::get('/auth/{provider}/callback', [AuthController::class, 'callback'])->name('social.callback');
    });
    Route::get('/testimonials', [HomeController::class, 'testimonials'])->name('testimonials');
    Route::get('/contact-us', [HomeController::class, 'contactUs'])->name('contactUs');
    Route::post('/contact/store', [HomeController::class, 'storeContactForm'])->middleware('throttle:2,1');
    Route::get('/email', [HomeController::class, 'email'])->name('email');

    Route::middleware('auth')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
        Route::get('/profile', [UserController::class, 'myProfile'])->name('profile');
        Route::post('/profile/update', [UserController::class, 'updateProfile']);
        Route::post('/profile/update/avatar', [UserController::class, 'updateProfileAvatar']);
        Route::post('/profile/update/password', [UserController::class, 'updatePassword']);
        Route::get('/profile/delete/check', [UserController::class, 'checkDeletionEligibility']);
        Route::post('/profile/delete', [UserController::class, 'deleteAccount']);
        Route::get('/notifications', [UserController::class, 'userNotifications'])->name('my-notifications');
    });

    // Fallback for client-side routing
    // Route::get('{any}', [HomeController::class, 'application'])
    //     ->where('any', '.*');
    // Route::get('{any}', [HomeController::class, 'application'])
    //     ->where('any', '^(?!admin).*');
    Route::fallback([HomeController::class, 'application']);
});
