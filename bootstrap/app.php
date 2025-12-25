<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Support\Facades\Route;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;
use App\Http\Middleware\{VerifyCsrfToken, HandleInertiaRequests};

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
        then: function () {
            Route::middleware('api')
                ->group(base_path('routes/admin.php'));
        },
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->alias([
            'csrf' => VerifyCsrfToken::class,
            'inertia' => HandleInertiaRequests::class,
        ]);

        $middleware->web(append: [
            'csrf',
            'inertia'
        ]);

        $middleware->validateCsrfTokens(except: []);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->render(function (AuthenticationException $e, Request $request) {
            if ($request->is('api/*') || $request->is('admin/api/*') || $request->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Not authenticated.'
                ], 401);
            }
        });

        $exceptions->render(function (\Throwable $e, Request $request) {
            if (!($request->is('api/*') || $request->is('admin/api/*') || $request->expectsJson())) {
                return null;
            }

            $status = $e instanceof HttpExceptionInterface
                ? $e->getStatusCode()
                : 500;

            $message = match (true) {
                $status === 429 => 'Too many attempts. Please try again later.',
                $status >= 400 && $status < 500 => $e->getMessage() ?: 'Bad request.',
                default => 'Something went wrong.'
            };

            return response()->json([
                'success' => false,
                'message' => $message
            ], $status);
        });
    })->create();
