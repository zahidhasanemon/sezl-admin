<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\InquiryResource;
use App\Models\Inquiry;
use Illuminate\Http\Request;

class InquiryController extends Controller
{
    /**
     * Display a listing of Customers
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $perPage = $request->get('perPage', 50);
        $search = $request->get('search');
        $sortBy = $request->get('sortBy', 'id');
        $orderBy = $request->get('orderBy', 'desc');
        $status = $request->get('status');

        // Define eligible fields for ordering
        $eligibleOrderByFields = ['id', 'name', 'email', 'phone', 'status', 'created_at', 'updated_at'];
        $eligibleDirections = ['asc', 'desc'];

        // Validate orderBy field
        if (!in_array($sortBy, $eligibleOrderByFields)) {
            $sortBy = 'id';
        }

        // Validate order direction
        if (!in_array(strtolower($orderBy), $eligibleDirections)) {
            $orderBy = 'desc';
        }

        $query = Inquiry::with(['resolver'])
            ->orderBy($sortBy, $orderBy);

        // Filter by status
        if ($request->has('status') && $status !== 'all') {
            $query->where('status', $status);
        }

        // Search functionality
        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%")
                    ->orWhere('subject', 'like', "%{$search}%")
                    ->orWhere('message', 'like', "%{$search}%");
            });
        }

        $inquiries = $query->paginate($perPage);

        $success = [
            'inquiries' => InquiryResource::collection($inquiries->items()),
            'pagination' => [
                'currentPage' => $inquiries->currentPage(),
                'lastPage' => $inquiries->lastPage(),
                'perPage' => $inquiries->perPage(),
                'total' => $inquiries->total(),
            ]
        ];

        return $this->sendSuccessResponse($success, 'Inquiries retrieved successfully.');
    }
}
