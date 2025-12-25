<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Resources\Admin\CustomerResource;
use App\Http\Resources\Admin\CustomerDetailResource;

class CustomerController extends Controller
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
        $emailVerified = $request->get('emailVerified');

        // Define eligible fields for ordering
        $eligibleOrderByFields = ['id', 'first_name', 'last_name', 'email', 'phone', 'order_count', 'order_total', 'status', 'created_at', 'updated_at'];
        $eligibleDirections = ['asc', 'desc'];

        // Validate orderBy field
        if (!in_array($sortBy, $eligibleOrderByFields)) {
            $sortBy = 'id';
        }

        // Validate order direction
        if (!in_array(strtolower($orderBy), $eligibleDirections)) {
            $orderBy = 'desc';
        }

        $query = User::with(['media', 'deviceTokens'])
            ->orderBy($sortBy, $orderBy);

        // Filter by status
        if ($request->has('status') && $status !== 'all') {
            $query->where('status', $status);
        }

        // Filter by email verification status
        if ($request->has('emailVerified') && $emailVerified !== 'all') {
            if ($emailVerified === 'verified') {
                $query->whereNotNull('email_verified_at');
            } else {
                $query->whereNull('email_verified_at');
            }
        }

        // Search functionality
        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('first_name', 'like', "%{$search}%")
                    ->orWhere('last_name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%")
                    ->orWhereRaw("CONCAT(first_name, ' ', last_name) LIKE ?", ["%{$search}%"]);
            });
        }

        $customers = $query->paginate($perPage);

        $success = [
            'customers' => CustomerResource::collection($customers->items()),
            'pagination' => [
                'currentPage' => $customers->currentPage(),
                'lastPage' => $customers->lastPage(),
                'perPage' => $customers->perPage(),
                'total' => $customers->total(),
            ]
        ];

        return $this->sendSuccessResponse($success, 'Customers retrieved successfully.');
    }

    /**
     * Display the specified Customer
     *
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $customer = User::with([
            'deviceTokens',
            'notifications' => function ($query) {
                $query->latest()->take(10);
            }
        ])->find($id);

        if (!$customer) {
            return $this->sendErrorResponse('Customer not found.', [], 404);
        }

        $success = [
            'customer' => new CustomerDetailResource($customer)
        ];

        return $this->sendSuccessResponse($success, 'Customer retrieved successfully.');
    }
}
