<?php

namespace App\Http\Controllers\Admin;

use Carbon\Carbon;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\Admin\ProfileResource;

class ProfileController extends Controller
{
    /**
     * profile api
     *
     * @return \Illuminate\Http\Response
     */
    public function profile(Request $request)
    {
        $user = $request->user();
        $success = [];
        $success['user'] = new ProfileResource($user);
        $success['userAbilityRules'] = [
            [
                'action' => 'manage',
                'subject' => 'all',
            ],
        ];

        return $this->sendSuccessResponse($success, 'User Details.');
    }

    /**
     * profile update api
     *
     * @return \Illuminate\Http\Response
     */
    public function profileUpdate(Request $request)
    {
        $auth = Auth::guard('sanctum')->user();
        $messages = [
            'avatar.max' => 'Image may not be greater than 2MB',
        ];
        $validator = Validator::make($request->all(), [
            'name' => [
                'required',
                'max:191',
            ],
            'avatar' => [
                'sometimes',
                'nullable',
                'image',
                'mimes:jpeg,png,jpg,gif,svg,webp',
                'max:2048'
            ],
        ], $messages);

        if ($validator->fails()) {
            $errors = $validator->errors()->all();
            $errMsg = implode(', ', $errors);
            return $this->sendErrorResponse($errMsg, $validator->errors()->toArray(), 422);
        }

        $user = Admin::find($auth->id);

        $input = $request->only('name');

        DB::beginTransaction();
        try {
            $user->update($input);

            if ($request->hasFile('avatar')) {
                // Clear existing avatar
                $user->clearMediaCollection('avatar');

                // Add new avatar
                $user->addMediaFromRequest('avatar')
                    ->toMediaCollection('avatar');
            }

            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            return $this->sendErrorResponse('Something went wrong, Please try again later.', [], 500);
        }
        $success = [];
        $success['user'] = new ProfileResource($user);

        return $this->sendSuccessResponse($success, 'User updated successfully.');
    }

    public function changePassword(Request $request)
    {
        $auth = Auth::guard('sanctum')->user();
        $messages = [
            'old_password.required' => 'Current password is required',
            'old_password.old_password' => 'Current password is wrong',
            'password.required' => 'New Password is required',
            'password.confirmed' => 'New Passwords does not match',
            'password.min' => 'New Password must be at least 6 char long',
            'password.max' => 'New Password can be maximum 200 char long',
        ];

        $validator = Validator::make($request->all(), [
            'old_password' => 'required|old_password:' . $auth->password,
            'password' => 'required|confirmed|min:6|max:255',
        ], $messages);

        if ($validator->fails()) {
            $errors = $validator->errors()->all();
            $errMsg = implode(', ', $errors);
            return $this->sendErrorResponse($errMsg, $validator->errors()->toArray(), 422);
        }

        $auth['password'] = bcrypt($request->get('password'));

        DB::beginTransaction();
        try {
            $auth->save();
            $user = Admin::find(Auth::guard('sanctum')->user()->id);
            $user->tokens()->delete();

            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            // dd($e);
            return $this->sendErrorResponse('Something went wrong, Please try again later.', [], 500);
        }

        $expiresAt = null;
        if (Config::get('sanctum.expiration')) {
            $expiresAt = Carbon::now()->addMinutes(Config::get('sanctum.expiration'));
        }
        $hashedAgent = hash('sha256', $request->userAgent());

        $success = [];
        $success['user'] = new ProfileResource($user);
        $success['accessToken'] = $user->createToken($hashedAgent, ['*'], $expiresAt)->plainTextToken;
        return $this->sendSuccessResponse($success, 'User logged in successfully.');
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        $success = [
            'message' => 'User logged out successfully.',
        ];

        return $this->sendSuccessResponse($success, 'User logged out successfully.');
    }
}
