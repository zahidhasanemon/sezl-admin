<?php

namespace App\Observers;

use App\Models\Notification;
use Illuminate\Support\Facades\Log;
use App\Notifications\SendPushNotification;

class NotificationObserver
{
    public function created(Notification $notification): void
    {
        try {
            $data = is_array($notification->data) ? $notification->data : [];
            if (env('ENABLE_PUSH', false) && $notification->user) {
                $notification->user->notify(new SendPushNotification($data['title'] ?? 'Order Status Notification', [
                    'title' => $data['title'] ?? 'Order Status Notification',
                    'body' => $data['body'] ?? 'Your order status has been updated.',
                    'sound' => 'default',
                ], [
                    'id' => (string) "$notification->target_id",
                    'type' => $notification->type,
                ]));
            }
        } catch (\Exception $e) {
            // Log::error('Push Notification Error: ' . $e->getMessage());
            // dd($e);
        }
    }
}
