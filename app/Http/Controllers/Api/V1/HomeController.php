<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\{Validator, Log, Cache};

class HomeController extends Controller
{
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
}
