<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\{User, Notification};
use App\Http\Resources\NotificationResource;

class NotificationController extends Controller
{
    /**
     * Get notifications for the authenticated user.
     */
    public function userNotifications(Request $request)
    {
        $notifications = Notification::where("user_id", $request->user()->id);
        if ($request->has('is_read')) {
            $notifications = $notifications->where('is_read', $request->input('is_read'));
        }
        $notifications = $notifications->orderBy('created_at', 'desc')
            ->paginate(15);

        $notificationData = NotificationResource::collection($notifications);

        return response()->json([
            'success' => true,
            'message' => 'Notifications Retrieved Successfully',
            'notifications' => $notificationData,
            'meta' => [
                'current_page' => $notifications->currentPage(),
                'last_page' => $notifications->lastPage(),
                'per_page' => $notifications->perPage(),
                'total' => $notifications->total(),
            ]
        ]);
    }

    /**
     * Mark a notification as read.
     */
    public function markAsRead(Request $request, $id)
    {
        $notification = Notification::where('user_id', $request->user()->id)->where('id', $id)->first();
        if (!$notification) {
            return response()->json([
                'success' => false,
                'message' => 'Notification not found',
            ], 404);
        }

        $notification->is_read = true;
        $notification->save();

        return response()->json([
            'success' => true,
            'message' => 'Notification marked as read',
        ]);
    }

    /**
     * Mark all notifications as read.
     */
    public function markAllAsRead(Request $request)
    {
        Notification::where('user_id', $request->user()->id)->update(['is_read' => true]);

        return response()->json([
            'success' => true,
            'message' => 'All notifications marked as read',
        ]);
    }
}
