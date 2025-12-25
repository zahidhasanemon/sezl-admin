<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SettingController extends Controller
{
    public function index()
    {
        // Get all setting keys from constants
        $settingKeys = config('constants.settings');

        // Retrieve all settings from database
        $dbSettings = SiteSetting::pluck('value', 'key')->all();

        // Logic to retrieve settings
        $settings = [];
        foreach ($settingKeys as $key) {
            $settings[$key] = $dbSettings[$key] ?? '';
        }

        $success = [
            'settings' => $settings
        ];

        return $this->sendSuccessResponse($success, 'Settings retrieved successfully.');
    }

    public function store(Request $request)
    {
        $validatedData = $request->get('settings', []);
        $adminId = Auth::guard('admin')->id();

        // Save or update settings in database
        foreach ($validatedData as $key => $value) {
            SiteSetting::updateOrCreate(
                ['key' => $key],
                [
                    'value' => $value,
                    'updated_by' => $adminId,
                    'created_by' => $adminId
                ]
            );
        }

        $success = [
            'settings' => $validatedData
        ];

        return $this->sendSuccessResponse($success, 'Settings updated successfully.');
    }
}
