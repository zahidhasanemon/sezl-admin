<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\{User, DeviceToken, Notification};
use Illuminate\Support\Facades\{Validator, Auth, Hash, Log, Mail, Crypt, DB};
use Illuminate\Validation\ValidationException;
use App\Http\Resources\NotificationResource;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Nnjeim\World\Models\{Country, State, City};

class UserController extends Controller
{
    /**
     * Get the authenticated User's profile
     *
     * @return
     */
    public function myProfile()
    {
        $user = Auth::user();
        $countries = Country::all();

        return Inertia::render('Profile', [
            'user' => $user,
            'countries' => $countries,
            'seo' => [
                'title' => 'Profile',
                'description' => 'User Profile Data'
            ]
        ]);
    }

    /**
     * Update the authenticated User's profile
     *
     * @return
     */
    public function updateProfileAvatar(Request $request)
    {
        $user = Auth::user();

        $validator = Validator::make($request->all(), [
            'avatar' => ['required', 'image', 'mimes:jpeg,png,jpg,gif,svg,webp', 'max:2048'],
        ], [
            'avatar.required' => 'The avatar field is required.',
            'avatar.image' => 'The avatar field must be an image.',
            'avatar.mimes' => 'The avatar field must be a file of type: jpeg, png, jpg.',
            'avatar.max' => 'The avatar field must not be greater than 2MB.',
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        if ($request->hasFile('avatar')) {
            if ($user->getMedia('avatar')->isNotEmpty()) {
                $user->getMedia('avatar')->first()->delete();
            }
            $user->addMediaFromRequest('avatar')->toMediaCollection('avatar');
        }

        return redirect()->back()->with('success', 'Profile avatar updated successfully.');
    }

    /**
     * Update the authenticated User's profile information
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
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        $user = Auth::user();
        $user->first_name = $request->first_name;
        $user->last_name = $request->last_name;
        $user->phone = $request->phone;
        $user->dob = $request->dob;
        $user->save();

        return redirect()->back()->with('success', 'Profile Updated Successfully');
    }

    /**
     * Summary of updatePassword
     * @param Request $request
     * @throws ValidationException
     * @return \Illuminate\Http\RedirectResponse
     */
    public function updatePassword(Request $request)
    {
        $user = Auth::user();
        $rules = [
            'password' => [
                'required',
                'string',
                Password::min(8)
                    ->letters()
                    ->numbers()
                    ->symbols()
            ],
            'password_confirmation' => ['required', 'same:password'],
        ];

        if (!empty($user->password)) {
            $rules['current_password'] = 'required|string';
        }

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        if (!empty($user->password)) {
            if (!Hash::check($request->current_password, $user->password)) {
                throw ValidationException::withMessages([
                    'current_password' => 'The provided current password is incorrect.',
                ]);
            }

            if (Hash::check($request->password, $user->password)) {
                throw ValidationException::withMessages([
                    'password' => 'The new password must be different from the current password.',
                ]);
            }
        }

        $user->password = Hash::make($request->password);
        $user->save();

        return redirect()->back()->with('success', 'Password Updated Successfully');
    }

    public function checkDeletionEligibility(Request $request)
    {
        return response()->json([
            'success' => true,
            'message' => 'Account can be deleted'
        ]);
    }

    /**
     * Summary of deleteAccount
     * @param \Illuminate\Http\Request $request
     * @param mixed $addressId
     */
    public function deleteAccount(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'password' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }
        $user = Auth::user();
        try {
            DB::beginTransaction();
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

            Auth::logout();

            Mail::send('email.delete-account', ['name' => $userName], function ($message) use ($userEmail) {
                $message->to($userEmail)->subject('Account deleted successfully');
            });
            return redirect('/')->with('success', 'Account deleted successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('error', 'Failed to delete account. Please try again.');
        }
    }

    /**
     * Summary of userNotifications
     * @param Request $request
     * @return \Inertia\Response
     */
    public function userNotifications(Request $request)
    {
        Notification::where('user_id', $request->user()->id)
            ->where('is_read', 0)
            ->update(['is_read' => true]);

        $notifications = Notification::where("user_id", $request->user()->id);
        $sortBy = $request->input('sort', 'latest');

        switch ($sortBy) {
            case 'oldest':
                $notifications->orderBy('created_at', 'asc');
                break;
            case 'latest':
            default:
                $notifications->orderBy('created_at', 'desc');
                break;
        }

        $notifications = $notifications->paginate($request->input('per_page', 15));

        return Inertia::render('MyNotification', [
            'notifications' => NotificationResource::collection($notifications)->resolve(),
            'appliedFilters' => [
                'sort' => $sortBy,
            ],
            'meta' => [
                'current_page' => $notifications->currentPage(),
                'last_page' => $notifications->lastPage(),
                'per_page' => $notifications->perPage(),
                'total' => $notifications->total(),
            ],
            'seo' => [
                'title' => 'My Notifications',
                'description' => 'My Notifications',
            ]
        ]);
    }
}
