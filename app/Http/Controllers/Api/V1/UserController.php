<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\{User, DeviceToken};
use Illuminate\Support\Facades\{Validator, Hash, Log, Mail, Crypt, DB};
use App\Http\Resources\UserResource;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class UserController extends Controller
{
    /**
     * Get the authenticated User's profile
     *
     * @return
     */
    public function myProfile()
    {
        $user = User::withCount(['unreadNotifications'])->find(request()->user()->id);

        return response()->json(
            [
                'success' => true,
                'message' => 'User profile fetched successfully',
                'user' => new UserResource($user),
            ]
        );
    }

    /**
     * change password
     *
     * @return
     */
    public function changePassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'current_password' => 'required|string',
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
            ], 422);
        }

        try {
            $user = request()->user();

            if (!Hash::check($request->current_password, $user->password)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Current password does not match.',
                ]);
            }

            if (Hash::check($request->password, $user->password)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Current password and new password are same.',
                ]);
            }

            $user->password = Hash::make($request->password);
            $user->save();

            return response()->json([
                'success' => true,
                'message' => 'Password changed successfully',
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
     * update profile
     *
     * @return
     */
    public function updateProfile(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'last_name' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:255',
            'dob' => 'nullable|date',
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()->first(),
                'user' => null,
            ], 422);
        }

        try {
            $user = request()->user();
            $user->update([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'phone' => $request->phone,
                'dob' => $request->dob,
            ]);

            if ($request->hasFile('avatar')) {
                if ($user->getMedia('avatar')->isNotEmpty()) {
                    $user->getMedia('avatar')->first()->delete();
                }
                $user->addMediaFromRequest('avatar')->toMediaCollection('avatar');
            }

            $user = User::withCount(['unreadNotifications'])->find(request()->user()->id);

            return response()->json([
                'success' => true,
                'message' => 'Profile updated successfully',
                'user' => new UserResource($user),
            ]);
        } catch (\Exception $e) {
            Log::error('Email verification failed', ['error' => $e->getMessage()]);
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong. Please try again.',
                'user' => null
            ], 500);
        }
    }

    /**
     * Summary of verifyCurrentPassword
     * @param \Illuminate\Http\Request $request
     * @param mixed $addressId
     * @return \Illuminate\Http\JsonResponse
     */
    public function verifyCurrentPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'password' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()->first(),
            ], 422);
        }

        $user = $request->user();
        if (!Hash::check($request->password, $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Current password is incorrect.',
            ]);
        }
        return response()->json([
            'success' => true,
            'message' => 'Current password is correct.',
        ]);
    }

    /**
     * Summary of deleteAccount
     * @param \Illuminate\Http\Request $request
     * @param mixed $addressId
     * @return \Illuminate\Http\JsonResponse
     */
    public function deleteAccount(Request $request)
    {
        try {
            DB::beginTransaction();
            $user = $request->user();
            $userEmail = $user->email;
            $userName = $user->full_name;
            $email = 'deleted-user-' . $user->id . '@vuexy-admin.com';
            $user->update([
                'first_name' => 'User',
                'last_name' => $user->id,
                'email' => $email,
                'phone' => null,
                'dob' => null,
                'deleted_at' => now()
            ]);
            $user->tokens()->delete();
            $user->deviceTokens()->delete();
            if ($user->getMedia('avatar')->isNotEmpty()) {
                $user->getMedia('avatar')->first()->delete();
            }

            DB::commit();

            Mail::send('email.delete-account', ['name' => $userName], function ($message) use ($userEmail) {
                $message->to($userEmail)->subject('Account deleted successfully');
            });

            return response()->json([
                'success' => true,
                'message' => 'Account deleted successfully.',
            ]);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => 'Failed to delete account. Please try again.',
            ], 500);
        }
    }
}
