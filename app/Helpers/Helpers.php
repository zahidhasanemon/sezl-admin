<?php

namespace App\Helpers;

use Carbon\Carbon;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Storage;

class Helpers
{
    /**
     * this function will Upload any file to S3 or local disk
     * pass file or base64sting
     * pass destination folderPath with slash added in last
     * if fileName not provided , ans automatic file name will be generated with segmented folder with year & month
     * @return string Image Name With Segmented Folder
     */
    public static function uploadFile($file = null, $base64string = null, $destinationPath = null, $fileName = null, $disk = null)
    {
        if (!$disk) {
            $disk = env('DISK_TYPE');
        }
        if (!$fileName) {
            if ($file) {
                $fileName = Carbon::now()->format('Y') . '/' . Carbon::now()->format('m') . '/' . uniqid() . '_' . time() . '.' . $file->getClientOriginalExtension();
            } else {
                $fileName = Carbon::now()->format('Y') . '/' . Carbon::now()->format('m') . '/' . uniqid() . '_' . time() . '.jpg';
            }
        }

        if ($file) {
            $imagePath = Storage::disk($disk)->putFileAs($destinationPath, $file, $fileName, 'public');

            return $imagePath;
        } elseif ($base64string) {
            $imagePath = Storage::disk($disk)->put($destinationPath . '/' . $fileName, $base64string, 'public');

            return $fileName;
        } else {
            return null;
        }
    }

    /**
     * Get full storage path for a given file path.
     *
     * @param string $filePath
     * @return string
     */
    public static function storagePath($filePath)
    {
        return env('CDN_URL') . '/' . $filePath;
    }


    public static function apiActiveStatus($status)
    {
        if (array_key_exists($status, Config::get('constants.ACTIVE_STATUSES'))) {
            return Config::get('constants.ACTIVE_STATUSES')[$status];
        } else {
            return '';
        }
    }


    public static function apiOrderStatus($status)
    {
        if (array_key_exists($status, Config::get('constants.ORDER_STATUSES'))) {
            return Config::get('constants.ORDER_STATUSES')[$status];
        } else {
            return '';
        }
    }

    public static function getDiscountTypeText($type)
    {
        if (array_key_exists($type, Config::get('constants.DISCOUNT_TYPES'))) {
            return Config::get('constants.DISCOUNT_TYPES')[$type];
        } else {
            return '';
        }
    }

    public static function paymentStatusMap($status)
    {
        $map = [
            'unpaid' => ['label' => 'Unpaid', 'color' => 'text-red-500'],
            'paid' => ['label' => 'Paid', 'color' => 'text-green-500'],
            'refunded' => ['label' => 'Refunded', 'color' => 'text-indigo-500'],
            'refund_pending' => ['label' => 'Refund Pending', 'color' => 'text-purple-500'],
            'refund_failed' => ['label' => 'Delivered', 'color' => 'text-yellow-600'],
        ];

        return $map[$status] ?? ['label' => ucfirst($status), 'color' => 'text-gray-500'];
    }
}
