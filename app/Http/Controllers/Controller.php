<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;

abstract class Controller
{
    use AuthorizesRequests, ValidatesRequests;

    /**
     * success response method.
     *
     * @return \Illuminate\Http\Response
     */
    public function sendSuccessResponse($result, $message, $code = 200)
    {
        $response = [
            'success' => true,
            'response_code' => $code,
            'data' => $result,
            'message' => $message,
        ];

        return response()->json($response, 200);
    }

    /**
     * return error response.
     *
     * @return \Illuminate\Http\Response
     */
    public function sendErrorResponse($message, $errorMessages = [], $code = 400)
    {
        $response = [
            'success' => false,
            'response_code' => $code,
            'message' => $message,
        ];

        if (!empty($errorMessages)) {
            $response['messages'] = $errorMessages;
        }

        return response()->json($response, $code);
    }
}
