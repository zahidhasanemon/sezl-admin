<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    protected $except = [
        'payment/webhook',
        'contact/store',
        'shipping/cost',
        'order/download/*',
        'password/verify-otp'
    ];
}
