<?php

namespace App\Http\Controllers\Admin;

use Carbon\Carbon;
use App\Models\Admin;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\Admin\ProfileResource;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $messages = [
            //
        ];
        $validator = Validator::make($request->all(), [
            'email' => [
                'required',
                'email',
            ],
            'password' => 'required|min:6',
        ], $messages);

        if ($validator->fails()) {
            $errors = $validator->errors()->all();
            $errMsg = implode(', ', $errors);
            return $this->sendErrorResponse($errMsg, $validator->errors()->toArray(), 422);
        }

        // Manual authentication for Sanctum
        $admin = Admin::where('email', $request->email)
            ->where('status', 1)
            ->first();

        if (!$admin || !Hash::check($request->password, $admin->password)) {
            return $this->sendErrorResponse('Invalid Login Credentials.', ['email' => 'Invalid Login Credentials.'], 401);
        }

        $expiresAt = $request->remember
            ? Carbon::now()->addMinutes(Config::get('constants.REMEMBER_TOKEN_EXPIRED'))
            : Carbon::now()->addMinutes(Config::get('sanctum.expiration'));

        $success = [];
        $success['admin'] = new ProfileResource($admin);

        $hashedAgent = hash('sha256', $request->userAgent());
        $success['accessToken'] = $admin->createToken($hashedAgent, ['*'], $expiresAt)->plainTextToken;

        $success['adminAbilityRules'] = [
            [
                'action' => 'manage',
                'subject' => 'all',
            ],
        ];

        return $this->sendSuccessResponse($success, 'User login successfully.');
    }
}
