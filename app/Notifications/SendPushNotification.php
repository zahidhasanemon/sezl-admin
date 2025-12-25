<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use NotificationChannels\Fcm\FcmChannel;
use NotificationChannels\Fcm\FcmMessage;
use Illuminate\Notifications\Notification;

class SendPushNotification extends Notification
{
    use Queueable;

    public $name;
    public $data;
    public $notification;
    /**
     * Create a new notification instance.
     */
    public function __construct($name = 'Flutter Notification', $notification = [
            'color' => '#0A0A0A',
            'sound' => 'default',
            'title' => 'Flutter Notification',
            'body' => 'Your Order successfully placed',
            // 'click_action' => 'NOTIFICATION_CLICK',
            // 'image' => 'https://placehold.co/600x400/png',
        ], $data = [
            'id' => '0',
            'type' => 'order',
        ])
    {
        $this->name = $name;
        $this->data = $data;
        $this->notification = $notification;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return [FcmChannel::class];
    }

    public function toFcm($notifiable): FcmMessage
    {
        return FcmMessage::create()
        ->name($this->name)
        ->data($this->data)
        ->custom([
            'android' => [
            'notification' => $this->notification,
            'data' => $this->data,
            'fcm_options' => [
                'analytics_label' => 'analytics',
            ],
            ],
            'apns' => [
            'headers' => [
                'apns-priority' => '10',
            ],
            'payload' => [
                'aps' => [
                'alert' => [
                    'title' => $this->notification['title'] ?? '',
                    'body' => $this->notification['body'] ?? '',
                ],
                'sound' => 'default',
                'badge' => 1,
                ],
            ] + $this->data,
            'fcm_options' => [
                'analytics_label' => 'analytics',
            ],
            ],
        ]);
    }
}
