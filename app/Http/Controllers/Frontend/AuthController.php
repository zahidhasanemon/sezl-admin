<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\{Validator, Hash, Auth, Log, Mail};
use Illuminate\Validation\ValidationException;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;
use App\Models\User;
use Laravel\Socialite\Facades\Socialite;

class AuthController extends Controller
{
    /**
     * Summary of login
     * @param Request $request
     * @return \Inertia\Response
     */
    public function login(Request $request)
    {
        return Inertia::render('Login', [
            'seo' => [
                'title' => 'Login',
                'description' => 'Login to your account'
            ]
        ]);
    }

    /**
     * Summary of loginUser
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function loginUser(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        $credentials = $request->only('email', 'password');
        $credentials['status'] = 1;

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            return redirect()->intended('/')->with('success', 'Logged in successfully.');
        }

        throw ValidationException::withMessages([
            'auth' => 'Invalid email address or password.',
        ]);
    }

    /**
     * Summary of signup
     * @param Request $request
     * @return \Inertia\Response
     */
    public function signup(Request $request)
    {
        return Inertia::render('Signup', [
            'seo' => [
                'title' => 'Signup',
                'description' => 'Signup for your account'
            ]
        ]);
    }

    /**
     * Summary of signupUser
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function signupUser(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'firstName' => 'required|string|max:255',
            'lastName' => 'nullable|string|max:255',
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
                Password::min(8)
                    ->letters()
                    ->numbers()
                    ->symbols()
            ],
            'password_confirmation' => ['required', 'same:password'],
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        try {
            $randomNumber = mt_rand(100000, 999999);
            $expirationTime = (int)config('constants.otp_expire_after', 10);
            $user = User::updateOrCreate([
                'email' => $request->email,
            ], [
                'first_name' => $request->firstName,
                'last_name' => $request->lastName,
                'password' => Hash::make($request->password),
                'email_verification_token' => Hash::make($randomNumber),
                'verification_token_expires_at' => now()->addMinutes($expirationTime),
                'status' => 0,
            ]);

            // send otp to email
            Mail::send('email.otp', ['otp' => $randomNumber, 'name' => $user->full_name], function ($message) use ($user) {
                $message->to($user->email)->subject('Signup Email Verification for VuexyAdmin');
            });

            return redirect()->route('email.verify', ['email' => $user->email])
                ->with('success', 'Account created successfully. Please verify your email.');
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            throw ValidationException::withMessages([
                'error' => 'An error occurred while creating the account. Please try again.',
            ]);
        }
    }

    /**
     * Summary of verifyEmail
     * @param Request $request
     * @return \Inertia\Response
     */
    public function verifyEmail(Request $request)
    {
        return Inertia::render('EmailVerification', [
            'seo' => [
                'title' => 'Email Verification',
                'description' => 'Verify your email address'
            ]
        ]);
    }

    /**
     * Summary of resendVerificationEmail
     */
    public function resendVerificationEmail(Request $request)
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
            throw new ValidationException($validator);
        }

        try {
            $randomNumber = mt_rand(100000, 999999);
            $expirationTime = (int) config('constants.otp_expire_after', 10);
            $user = User::where('email', $request->email)->where('status', 0)->first();
            if (!$user) {
                throw ValidationException::withMessages([
                    'email' => 'No unverified account found with this email.',
                ]);
            }
            $user->update([
                'email_verification_token' => Hash::make($randomNumber),
                'verification_token_expires_at' => now()->addMinutes($expirationTime),
            ]);
            // send otp to email
            Mail::send('email.otp', ['otp' => $randomNumber, 'name' => $user->full_name], function ($message) use ($user) {
                $message->to($user->email)->subject('Signup Email Verification for VuexyAdmin');
            });

            return redirect()->route('email.verify', ['email' => $user->email])
                ->with('success', 'Verification email resent successfully.');
        } catch (ValidationException $e) {
            throw $e;
        } catch (\Exception $e) {
            throw ValidationException::withMessages([
                'error' => 'An error occurred while resending the verification email. Please try again.',
            ]);
        }
    }

    /**
     * Summary of verifyRegistrationEmail
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
            throw new ValidationException($validator);
        }

        try {
            $user = User::where('email', $request->email)->where('status', 0)->first();
            if (!$user) {
                throw ValidationException::withMessages([
                    'email' => 'No unverified account found with this email.',
                ]);
            }

            if (!Hash::check($request->otp, $user->email_verification_token)) {
                throw ValidationException::withMessages([
                    'otp' => 'Invalid OTP',
                ]);
            }

            if ($user->verification_token_expires_at < now()) {
                throw ValidationException::withMessages([
                    'otp' => 'The OTP has expired. Please request a new one.',
                ]);
            }

            $user->update([
                'status' => 1,
                'email_verification_token' => null,
                'verification_token_expires_at' => null,
                'email_verified_at' => now(),
            ]);


            Auth::login($user);

            return redirect()->intended('/')->with('success', 'Email verified successfully.');
        } catch (ValidationException $e) {
            throw $e;
        } catch (\Exception $e) {
            throw ValidationException::withMessages([
                'error' => 'An error occurred while verifying the email. Please try again.',
            ]);
        }
    }

    /**
     * Summary of forgetPassword
     */
    public function forgetPassword(Request $request)
    {
        return Inertia::render('ForgetPassword', [
            'seo' => [
                'title' => 'Forget Password',
                'description' => 'Verify your email address'
            ]
        ]);
    }

    /**
     * Summary of forgetPassword
     */
    public function sendForgetPasswordOtp(Request $request)
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
            throw new ValidationException($validator);
        }

        try {
            $user = User::where('email', $request->email)->where('status', 1)->first();

            if (!$user) {
                throw ValidationException::withMessages([
                    'email' => 'No active account found with this email.',
                ]);
            }
            $randomNumber = mt_rand(100000, 999999);
            $expirationTime = (int)config('constants.otp_expire_after', 10);
            $user->update([
                'email_verification_token' => Hash::make($randomNumber),
                'verification_token_expires_at' => now()->addMinutes($expirationTime),
            ]);
            // send otp to email
            Mail::send('email.forget-password', ['otp' => $randomNumber, 'name' => $user->full_name], function ($message) use ($user) {
                $message->to($user->email)->subject('Forget Password Email Verification for VuexyAdmin');
            });

            return redirect()->route('password.verify', ['email' => $user->email])
                ->with('success', 'Please verify your email.');
        } catch (ValidationException $e) {
            throw $e;
        } catch (\Exception $e) {
            throw ValidationException::withMessages([
                'error' => 'An error occurred while verifying the email. Please try again.',
            ]);
        }
    }

    public function verifyForgetPasswordEmail(Request $request)
    {
        return Inertia::render('ResetPassword', [
            'seo' => [
                'title' => 'Reset Password',
                'description' => 'Reset your password'
            ]
        ]);
    }

    /**
     * Summary of resetPassword
     */
    public function verifyPassword(Request $request)
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
                'message'=> $validator->errors()->first(),
            ], 422);
        }

        $user = User::where('email', $request->email)->where('status', 1)->first();
        if (!Hash::check($request->otp, $user->email_verification_token)) {
            return response()->json([
                'success' => false,
                'message'=> 'Invalid OTP',
            ], 422);
        }

        if ($user->verification_token_expires_at < now()) {
            return response()->json([
                'success' => false,
                'message'=> 'The OTP has expired. Please request a new one.',
            ], 422);
        }

        return response()->json([
            'success' => true,
            'message'=> 'OTP Verified',
        ]);
    }

    /**
     * Summary of resetPassword
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
                Password::min(8)
                    ->letters()
                    ->numbers()
                    ->symbols()
            ],
            'password_confirmation' => ['required', 'same:password'],
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        try {
            $user = User::where('email', $request->email)->where('status', 1)->first();
            if (!$user) {
                throw ValidationException::withMessages([
                    'email' => 'No unverified account found with this email.',
                ]);
            }

            if (!Hash::check($request->otp, $user->email_verification_token)) {
                throw ValidationException::withMessages([
                    'otp' => 'Invalid OTP',
                ]);
            }

            if ($user->verification_token_expires_at < now()) {
                throw ValidationException::withMessages([
                    'otp' => 'The OTP has expired. Please request a new one.',
                ]);
            }

            $user->update([
                'status' => 1,
                'email_verification_token' => null,
                'verification_token_expires_at' => null,
                'password' => Hash::make($request->password),
            ]);


            Auth::login($user);

            return redirect()->intended('/')->with('success', 'Password reset successfully.');
        } catch (ValidationException $e) {
            throw $e;
        } catch (\Exception $e) {
            throw ValidationException::withMessages([
                'error' => 'An error occurred while verifying the email. Please try again.',
            ]);
        }
    }

    /**
     * Summary of social login redirect
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function redirect($provider)
    {
        return Socialite::driver($provider)->redirect();
    }

    /**
     * Summary of social login callback
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function callback($provider)
    {
        $socialUser = Socialite::driver($provider)->stateless()->user();

        $email = $socialUser->getEmail();
        $name = $socialUser->getName();
        $providerId = $socialUser->getId();
        $avatar = $socialUser->getAvatar();

        $user = User::where('email', $email)->first();
        if ($user && $user->status == 2) {
            return redirect()->back()->with('error', 'Your account has been suspended. Please contact support.');
        }

        $attributes = [
            'first_name' => $name,
            'provider' => $provider,
            'provider_id' => $providerId,
            'status' => 1,
        ];

        $user = User::where('email', $email)->first();

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

        Auth::login($user);

        return redirect()->intended('/')->with('success', 'Logged in successfully.');
    }

    /**
     * Summary of logout
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('home');
    }
}
