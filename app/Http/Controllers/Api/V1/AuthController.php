<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\{Validator, Hash, Mail, Crypt, DB, Log, Http};
use Illuminate\Validation\ValidationException;
use App\Models\{User, DeviceToken};
use App\Http\Resources\UserResource;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;
use Firebase\JWT\{JWT, JWK};

class AuthController extends Controller
{
    /**
     * register user
     *
     * @return
     */
    public function registerUser(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'last_name' => 'nullable|string|max:255',
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('users', 'email')
                    ->whereNull('deleted_at')
                    ->where(function ($query) {
                        $query->where('status', '!=', 0);
                    }),
            ],
            'password' => [
                'required',
                'string',
                'confirmed',
                Password::min(8)
                    ->letters()
                    ->numbers()
                    ->symbols()
            ],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()->first(),
                'otp' => null
            ], 422);
        }

        try {
            $randomNumber = mt_rand(100000, 999999);
            $expirationTime = (int)config('constants.otp_expire_after', 10);
            $user = User::updateOrCreate([
                'email' => $request->email,
            ], [
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'password' => Hash::make($request->password),
                'email_verification_token' => Hash::make($randomNumber),
                'verification_token_expires_at' => now()->addMinutes($expirationTime),
                'status' => 0,
            ]);

            // send otp to email
            Mail::send('email.otp', ['otp' => $randomNumber, 'name' => $user->full_name], function ($message) use ($user) {
                $message->to($user->email)->subject('Signup Email Verification for VuexyAdmin');
            });

            return response()->json([
                'success' => true,
                'message' => 'OTP sent to your email.',
                'otp' => config('app.env') == 'local' ? $randomNumber : null
            ]);
        } catch (\Exception $e) {
            Log::error('Email verification failed', ['error' => $e->getMessage()]);
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong. Please try again.',
                'otp' => null
            ], 500);
        }
    }

    /**
     * resend registration email otp
     *
     * @return
     */
    public function resendRegistrationEmail(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::exists('users', 'email')
                    ->whereNull('deleted_at')
                    ->where('status', 0),
            ],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()->first(),
                'otp' => null
            ], 422);
        }

        try {
            $randomNumber = mt_rand(100000, 999999);
            $expirationTime = (int)config('constants.otp_expire_after', 10);
            $user = User::where('email', $request->email)->where('status', 0)->first();
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not found.',
                    'otp' => null
                ], 404);
            }

            $user->update([
                'email_verification_token' => Hash::make($randomNumber),
                'verification_token_expires_at' => now()->addMinutes($expirationTime),
            ]);
            // send otp to email
            Mail::send('email.otp', ['otp' => $randomNumber, 'name' => $user->full_name], function ($message) use ($user) {
                $message->to($user->email)->subject('Signup Email Verification for VuexyAdmin');
            });

            return response()->json([
                'success' => true,
                'message' => 'OTP sent to your email.',
                'otp' => config('app.env') == 'local' ? $randomNumber : null
            ]);
        } catch (\Exception $e) {
            Log::error('Email verification failed', ['error' => $e->getMessage()]);
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong. Please try again.',
                'otp' => null
            ], 500);
        }
    }

    /**
     * resend registration email otp
     *
     * @return
     */
    public function verifyRegistrationEmail(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::exists('users', 'email')
                    ->whereNull('deleted_at')
                    ->where('status', 0),
            ],
            'otp' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()->first(),
                'user' => null,
                'accessToken' => null,
            ], 422);
        }

        try {
            $user = User::where('email', $request->email)->where('status', 0)->first();
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not found.',
                    'user' => null,
                    'accessToken' => null,
                ], 404);
            }

            if (!Hash::check($request->otp, $user->email_verification_token)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid OTP',
                    'user' => null,
                    'accessToken' => null,
                ]);
            }

            if ($user->verification_token_expires_at < now()) {
                return response()->json([
                    'success' => false,
                    'message' => 'OTP expired',
                    'user' => null,
                    'accessToken' => null,
                ]);
            }

            $user->update([
                'status' => 1,
                'email_verification_token' => null,
                'verification_token_expires_at' => null,
                'email_verified_at' => now(),
            ]);

            if ($request->filled('fcm_token')) {
                DeviceToken::updateOrCreate(
                    [
                        'user_id' => $user->id,
                        'token' => $request->get('fcm_token'),
                    ],
                    [
                        'device_type' => $request->get('device_type', 'unknown'),
                        'device_id' => $request->get('device_id', null),
                        'last_used_at' => now(),
                    ]
                );
            }

            $token = $user->createToken($user->email)->plainTextToken;
            $user->loadCount(['wishlists', 'carts', 'unreadNotifications']);
            return response()->json([
                'success' => true,
                'message' => 'Email verified successfully.',
                'user' => new UserResource($user),
                'accessToken' => $token,
            ]);
        } catch (\Exception $e) {
            Log::error('Email verification failed', ['error' => $e->getMessage()]);
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong. Please try again.',
                'user' => null,
                'accessToken' => null,
            ], 500);
        }
    }

    /**
     * social login
     *
     * @return
     */
    public function socialLogin(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'provider' => 'required|string|in:google,facebook,apple',
            'token' => 'required|string',
            'first_name' => 'nullable|string',
            'last_name' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()->first(),
                'user' => null,
                'accessToken' => null,
            ], 422);
        }
        try {
            $provider = $request->provider;
            $token = $request->token;
            $first_name = $request->first_name;
            $last_name = $request->last_name;

            if ($provider === 'google') {
                $response = Http::get('https://oauth2.googleapis.com/tokeninfo', [
                    'id_token' => $token,
                ]);
                if ($response->failed()) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Invalid Google token',
                        'user' => null,
                        'accessToken' => null,
                    ], 422);
                }
                $userData = $response->json();

                $email = $userData['email'] ?? null;
                $name = $userData['name'] ?? 'Google User';
                $providerId = $userData['sub'] ?? null;
                $avatar = $userData['picture'] ?? null;
            } else if ($provider === 'facebook') {
                $response = Http::get('https://graph.facebook.com/me', [
                    'fields' => 'id,first_name,last_name,name,email,picture',
                    'access_token' => $token,
                ]);
                if ($response->failed()) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Invalid Facebook token',
                        'user' => null,
                        'accessToken' => null,
                    ], 422);
                }
                $userData = $response->json();

                $email = $userData['email'] ?? null;
                $name = $userData['name'] ?? 'Facebook User';
                $providerId = $userData['id'] ?? null;
                $avatar = $userData['picture']['data']['url'] ?? null;
            } else if ($provider === 'apple') {
                $applePublicKeysUrl = 'https://appleid.apple.com/auth/keys';
                $response = Http::get($applePublicKeysUrl);
                if ($response->failed()) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Unable to fetch Apple public keys',
                        'user' => null,
                        'accessToken' => null,
                    ], 422);
                }
                $applePublicKeys = $response->json();
                $jwks = JWK::parseKeySet($applePublicKeys);
                try {
                    $decoded = JWT::decode($token, $jwks);
                } catch (\Exception $e) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Invalid Apple token',
                        'user' => null,
                        'accessToken' => null,
                    ], 422);
                }

                $email = $decoded->email ?? null;
                $name = $decoded->name ?? 'Apple User';
                $providerId = $decoded->sub ?? null;
                $avatar = null;
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Unsupported provider',
                    'user' => null,
                    'accessToken' => null,
                ], 422);
            }

            if (!$email || !$providerId) {
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to retrieve user info',
                    'user' => null,
                    'accessToken' => null,
                ], 422);
            }

            $user = User::where('email', $email)->first();
            if ($user && $user->status == 2) {
                return response()->json([
                    'success' => false,
                    'message' => 'Your account has been deactivated. Please contact support.',
                    'user' => null,
                    'accessToken' => null,
                ], 422);
            }
            $attributes = [
                'provider' => $provider,
                'provider_id' => $providerId,
                'status' => 1,
            ];

            $user = User::where('email', $email)->first();
            if (!$user || !$user->first_name) {
                $attributes['first_name'] = $first_name ?? $name;
                $attributes['last_name'] = $last_name ?? '';
            }

            if (!$user || !$user->email_verified_at) {
                $attributes['email_verified_at'] = now();
            }
            $user = User::updateOrCreate(
                ['email' => $email],
                $attributes
            );

            if ($user && $user->getMedia('avatar')->isEmpty() && $avatar) {
                try {
                    $user->addMediaFromUrl($avatar)
                        ->preservingOriginal()
                        ->toMediaCollection('avatar');
                    $user->refresh();
                } catch (\Exception $e) {
                    Log::error('Social login avatar upload failed', ['error' => $e->getMessage()]);
                }
            }

            if ($request->filled('fcm_token')) {
                DeviceToken::updateOrCreate(
                    [
                        'user_id' => $user->id,
                        'token' => $request->get('fcm_token'),
                    ],
                    [
                        'device_type' => $request->get('device_type', 'unknown'),
                        'device_id' => $request->get('device_id', null),
                        'last_used_at' => now(),
                    ]
                );
            }

            $token = $user->createToken($user->email)->plainTextToken;
            $user->loadCount(['wishlists', 'carts', 'unreadNotifications']);
            return response()->json([
                'success' => true,
                'message' => 'Logged in successfully.',
                'user' => new UserResource($user),
                'accessToken' => $token,
            ]);
        } catch (\Exception $e) {
            Log::error('Social Login failed', ['error' => $e->getMessage()]);
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong. Please try again.',
                'user' => null,
                'accessToken' => null,
            ], 500);
        }
    }

    /**
     * login user
     *
     * @return
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'user' => null,
                'accessToken' => null,
                'message' => $validator->errors()->first(),
            ], 422);
        }

        try {
            $user = null;
            if (filter_var($request->username, FILTER_VALIDATE_EMAIL)) {
                $user = User::withCount(['unreadNotifications'])->where('email', $request->username)->where('status', 1)->first();
            } else {
                // $user = User::where('username', $request->username)->where('status', 1)->first();
            }

            if (!$user) {
                return response()->json([
                    'success' => false,
                    'user' => null,
                    'accessToken' => null,
                    'message' => 'The provided credentials does not match',
                ]);
            }

            if (is_null($user->password) || $user->password === '') {
                return response()->json([
                    'success' => false,
                    'user' => null,
                    'accessToken' => null,
                    'message' => 'Password login is not available for this user',
                ]);
            }

            if (!$user || !Hash::check($request->password, $user->password)) {
                return response()->json([
                    'success' => false,
                    'user' => null,
                    'accessToken' => null,
                    'message' => 'The provided credentials does not match',
                ]);
            }

            if ($request->filled('fcm_token')) {
                DeviceToken::updateOrCreate(
                    [
                        'user_id' => $user->id,
                        'token' => $request->get('fcm_token'),
                    ],
                    [
                        'device_type' => $request->get('device_type', 'unknown'),
                        'device_id' => $request->get('device_id', null),
                        'last_used_at' => now(),
                    ]
                );
            }
            $token = $user->createToken($request->get('username'))->plainTextToken;

            return response()->json([
                'success' => true,
                'user' => new UserResource($user),
                'accessToken' => $token,
                'message' => 'Successfully logged in!',
            ]);
        } catch (\Exception $e) {
            Log::error('Email verification failed', ['error' => $e->getMessage()]);
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong. Please try again.',
                'user' => null,
                'accessToken' => null,
            ], 500);
        }
    }

    /**
     * forget password
     *
     * @return
     */
    public function forgetPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::exists('users', 'email')
                    ->whereNull('deleted_at')
                    ->where('status', 1),
            ]
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()->first(),
                'otp' => null
            ], 422);
        }

        try {
            $user = User::where('email', $request->email)->where('status', 1)->first();

            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not found.',
                    'otp' => null
                ], 404);
            }
            $randomNumber = mt_rand(100000, 999999);
            $expirationTime = (int)config('constants.otp_expire_after', 10);
            $user->update([
                'email_verification_token' => Hash::make($randomNumber),
                'verification_token_expires_at' => now()->addMinutes($expirationTime),
            ]);
            // send otp to email
            Mail::send('email.forget-password', ['otp' => $randomNumber, 'name' => $user->full_name], function ($message) use ($user) {
                $message->to($user->email)->subject('Forget Password Email Verification');
            });

            return response()->json([
                'success' => true,
                'message' => 'OTP sent to your email.',
                'otp' => config('app.env') == 'local' ? $randomNumber : null
            ]);
        } catch (\Exception $e) {
            Log::error('Email verification failed', ['error' => $e->getMessage()]);
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong. Please try again.',
                'otp' => null
            ], 500);
        }
    }

    /**
     * verify password reset otp
     *
     * @return
     */
    public function verifyPasswordResetOtp(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::exists('users', 'email')
                    ->whereNull('deleted_at')
                    ->where('status', 1),
            ],
            'otp' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()->first(),
            ], 422);
        }

        try {
            $user = User::where('email', $request->email)->where('status', 1)->first();

            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not found.',
                ], 404);
            }

            if (!Hash::check($request->otp, $user->email_verification_token)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid OTP',
                ]);
            }

            if ($user->verification_token_expires_at < now()) {
                return response()->json([
                    'success' => false,
                    'message' => 'OTP expired',
                ]);
            }

            return response()->json([
                'success' => true,
                'message' => 'Email verified successfully.',
            ]);
        } catch (\Exception $e) {
            Log::error('Email verification failed', ['error' => $e->getMessage()]);
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong. Please try again.',
            ], 500);
        }
    }

    /**
     * reset password
     *
     * @return
     */
    public function resetPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::exists('users', 'email')
                    ->whereNull('deleted_at')
                    ->where('status', 1),
            ],
            'otp' => 'required|string',
            'password' => [
                'required',
                'string',
                'confirmed',
                Password::min(8)
                    ->letters()
                    ->numbers()
                    ->symbols()
            ],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()->first(),
                'user' => null,
                'accessToken' => null,
            ], 422);
        }

        try {
            $user = User::withCount(['unreadNotifications'])->where('email', $request->email)->where('status', 1)->first();

            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not found.',
                    'user' => null,
                    'accessToken' => null,
                ], 404);
            }
            if (!Hash::check($request->otp, $user->email_verification_token)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid OTP',
                    'user' => null,
                    'accessToken' => null,
                ]);
            }

            if ($user->verification_token_expires_at < now()) {
                return response()->json([
                    'success' => false,
                    'message' => 'OTP expired',
                    'user' => null,
                    'accessToken' => null,
                ]);
            }

            $user->update([
                'password' => Hash::make($request->password),
                'email_verification_token' => null,
                'verification_token_expires_at' => null,
            ]);

            if ($request->filled('fcm_token')) {
                DeviceToken::updateOrCreate(
                    [
                        'user_id' => $user->id,
                        'token' => $request->get('fcm_token'),
                    ],
                    [
                        'device_type' => $request->get('device_type', 'unknown'),
                        'device_id' => $request->get('device_id', null),
                        'last_used_at' => now(),
                    ]
                );
            }

            $token = $user->createToken($user->email)->plainTextToken;

            return response()->json([
                'success' => true,
                'user' => new UserResource($user),
                'accessToken' => $token,
                'message' => 'Password reset successfully.',
            ]);
        } catch (\Exception $e) {
            Log::error('Email verification failed', ['error' => $e->getMessage()]);
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong. Please try again.',
                'user' => null,
                'accessToken' => null
            ], 500);
        }
    }

    /**
     * logout
     *
     * @return
     */
    public function logout(Request $request)
    {
        try {
            if ($request->get('fcm_token')) {
                DeviceToken::where('user_id', $request->user()->id)->where('token', $request->get('fcm_token'))->delete();
            }
            $request->user()->currentAccessToken()->delete();

            return response()->json([
                'success' => true,
                'message' => 'Logout successfully.',
            ]);
        } catch (\Exception $e) {
            Log::error('Email verification failed', ['error' => $e->getMessage()]);
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong. Please try again.',
            ], 500);
        }
    }
}
