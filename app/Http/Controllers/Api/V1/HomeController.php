<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Notifications\SendPushNotification;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\{Validator, Log, Cache};
use Nnjeim\World\Models\{Country, State, City};

class HomeController extends Controller
{
    /**
     * countries
     *
     * @return
     */
    public function countries()
    {
        try {
            $countries = Country::all();
            return response()->json([
                'success' => true,
                'message' => 'Countries Retrieved Successfully.',
                'countries' => $countries,
            ]);
        } catch (\Exception $e) {
            Log::error('Failed to retrieve contact info', ['error' => $e->getMessage()]);
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong. Please try again.',
                'countries' => null
            ], 500);
        }
    }

    /**
     * states
     *
     * @return
     */
    public function states($id)
    {
        try {
            $states = State::where('country_id', $id)->get();
            return response()->json([
                'success' => true,
                'message' => 'states Retrieved Successfully.',
                'states' => $states,
            ]);
        } catch (\Exception $e) {
            Log::error('Failed to retrieve contact info', ['error' => $e->getMessage()]);
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong. Please try again.',
                'states' => null
            ], 500);
        }
    }

    /**
     * cities
     *
     * @return
     */
    public function cities($id)
    {
        try {
            $cities = City::where('state_id', $id)->get();
            return response()->json([
                'success' => true,
                'message' => 'Cities Retrieved Successfully.',
                'cities' => $cities,
            ]);
        } catch (\Exception $e) {
            Log::error('Failed to retrieve contact info', ['error' => $e->getMessage()]);
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong. Please try again.',
                'cities' => null
            ], 500);
        }
    }

    /**
     * home page notice pop up
     *
     * @return
     */
    public function homePageContent()
    {
        try {
            return response()->json([
                'success' => true,
                'message' => 'All Data Retrieved Successfully.',
                'data' => [
                    'products' => null
                ]
            ]);
        } catch (\Exception $e) {
            Log::error('Failed to retrieve contact info', ['error' => $e->getMessage()]);
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong. Please try again.',
                'data' => null
            ], 500);
        }
    }

    //test push notification
    public function sendPush(Request $request)
    {
        $messages = [
            'id.required' => 'User id is required.',
            'id.integer' => 'User id must be an integer.',
        ];
        $validator = Validator::make($request->all(), [
            'id' => 'required|integer',
        ], $messages);

        if ($validator->fails()) {
            $errors = $validator->errors()->all();
            $errMsg = implode(', ', $errors);
            return $this->sendErrorResponse($errMsg, $validator->errors()->toArray(), 422);
        }

        $user = User::find($request->id);

        try {
            $response = $user->notify(new SendPushNotification());

            return $this->sendSuccessResponse($response, 'Push notification sent successfully.');
        } catch (\Exception $e) {
            dd($e);
        }
    }
}
