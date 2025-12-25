<?php

namespace App\Listeners;

use Illuminate\Notifications\Events\NotificationFailed;
use Illuminate\Support\Arr;
use NotificationChannels\Fcm\FcmChannel;

class LogNotificationFailed
{
    /**
     * Handle the event.
     */
    public function handle(NotificationFailed $event): void
    {
        if ($event->channel === FcmChannel::class) {
            // Get the report from event data
            $report = Arr::get($event->data, 'report');
            if (!$report) {
                return;
            }

            // Extract target token
            $target = $report->target();
            $targetValue = $target ? $target->value() : null;

            // Delete expired/invalid token from database
            if ($targetValue) {
                $event->notifiable->deviceTokens()
                    ->where('token', $targetValue)
                    ->delete();
            }
        }
    }
}
