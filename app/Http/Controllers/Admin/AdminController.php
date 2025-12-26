<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\Admin\AdminResource;

class AdminController extends Controller
{
    public function dashboard(Request $request)
    {
        $success = [
            'summaries' => [
                'total_pages' => 0,
                'total_open_jobs' => 5,
                'total_job_applications' => 15,
                'total_contact_messages' => 10,
            ],
        ];

        return $this->sendSuccessResponse($success, 'Report retrieved successfully.');
    }

    /**
     * Display a listing of admins
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $perPage = $request->get('perPage', 50);
        $search = $request->get('search');
        $sortBy = $request->get('sortBy', 'id');
        $orderBy = $request->get('orderBy', 'desc');

        // Define eligible fields for ordering
        $eligibleOrderByFields = ['id', 'name', 'email', 'created_at', 'updated_at'];
        $eligibleDirections = ['asc', 'desc'];

        // Validate orderBy field
        if (!in_array($sortBy, $eligibleOrderByFields)) {
            $sortBy = 'id';
        }

        // Validate order direction
        if (!in_array(strtolower($orderBy), $eligibleDirections)) {
            $orderBy = 'desc';
        }

        $query = Admin::orderBy($sortBy, $orderBy);

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        if ($request->has('status') && $request->get('status') !== 'all') {
            $query->where('status', $request->get('status'));
        }

        $admins = $query->paginate($perPage);

        $success = [
            'admins' => AdminResource::collection($admins->items()),
            'pagination' => [
                'currentPage' => $admins->currentPage(),
                'lastPage' => $admins->lastPage(),
                'perPage' => $admins->perPage(),
                'total' => $admins->total(),
            ]
        ];

        return $this->sendSuccessResponse($success, 'Admins retrieved successfully.');
    }

    /**
     * Store a newly created admin
     *
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $messages = [
            'name.required' => 'Name is required',
            'email.required' => 'Email is required',
            'email.unique' => 'Email already exists',
            'password.required' => 'Password is required',
            'password.min' => 'Password must be at least 6 characters',
            'password.confirmed' => 'Password confirmation does not match',
            'avatar.max' => 'Image may not be greater than 2MB'
        ];

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:191',
            'email' => [
                'required',
                'string',
                'email',
                'max:191',
                Rule::unique('admins', 'email')->whereNull('deleted_at'),
            ],
            'password' => 'required|string|min:6|max:32|confirmed',
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'status' => 'required|boolean',
        ], $messages);

        if ($validator->fails()) {
            $errors = $validator->errors()->all();
            $errMsg = implode(', ', $errors);
            return $this->sendErrorResponse($errMsg, $validator->errors()->toArray(), 422);
        }

        $input = $request->only('name', 'email', 'status');
        $input['password'] = bcrypt($request->password);

        DB::beginTransaction();
        try {
            $admin = Admin::create($input);

            if ($request->hasFile('avatar')) {
                $admin->addMediaFromRequest('avatar')
                    ->toMediaCollection('avatar');
            }

            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            return $this->sendErrorResponse('Something went wrong, Please try again later.', [], 500);
        }

        $success = [
            'admin' => new AdminResource($admin)
        ];

        return $this->sendSuccessResponse($success, 'Admin created successfully.');
    }

    /**
     * Display the specified admin
     *
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $admin = Admin::find($id);

        if (!$admin) {
            return $this->sendErrorResponse('Admin not found.', [], 404);
        }

        $success = [
            'admin' => new AdminResource($admin)
        ];

        return $this->sendSuccessResponse($success, 'Admin retrieved successfully.');
    }

    /**
     * Update the specified admin
     *
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $admin = Admin::find($id);

        if (!$admin) {
            return $this->sendErrorResponse('Admin not found.', [], 404);
        }

        $messages = [
            'name.required' => 'Name is required',
            'email.required' => 'Email is required',
            'email.unique' => 'Email already exists',
            'avatar.max' => 'Image may not be greater than 2MB'
        ];

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:191',
            'email' => [
                'required',
                'string',
                'email',
                'max:191',
                Rule::unique('admins', 'email')->whereNull('deleted_at')->ignore($admin->id),
            ],
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'status' => 'required|boolean',
        ], $messages);

        if ($validator->fails()) {
            $errors = $validator->errors()->all();
            $errMsg = implode(', ', $errors);
            return $this->sendErrorResponse($errMsg, $validator->errors()->toArray(), 422);
        }

        $input = $request->only('name', 'email', 'status');

        DB::beginTransaction();
        try {
            $admin->update($input);

            if ($request->hasFile('avatar')) {
                $admin->clearMediaCollection('avatar');
                $admin->addMediaFromRequest('avatar')
                    ->toMediaCollection('avatar');
            }

            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            return $this->sendErrorResponse('Something went wrong, Please try again later.', [], 500);
        }

        $admin->refresh();

        $success = [
            'admin' => new AdminResource($admin)
        ];

        return $this->sendSuccessResponse($success, 'Admin updated successfully.');
    }

    /**
     * Update admin password
     *
     * @return \Illuminate\Http\Response
     */
    public function passwordUpdate(Request $request, $id)
    {
        $admin = Admin::find($id);

        if (!$admin) {
            return $this->sendErrorResponse('Admin not found.', [], 404);
        }

        $messages = [
            'password.required' => 'Password is required',
            'password.min' => 'Password must be at least 6 characters',
            'password.confirmed' => 'Password confirmation does not match',
        ];

        $validator = Validator::make($request->all(), [
            'password' => 'required|string|min:6|max:32|confirmed',
        ], $messages);

        if ($validator->fails()) {
            $errors = $validator->errors()->all();
            $errMsg = implode(', ', $errors);
            return $this->sendErrorResponse($errMsg, $validator->errors()->toArray(), 422);
        }

        DB::beginTransaction();
        try {
            $admin->update([
                'password' => bcrypt($request->password)
            ]);

            // Delete all tokens for this admin to force re-login
            $admin->tokens()->delete();

            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            return $this->sendErrorResponse('Something went wrong, Please try again later.', [], 500);
        }

        $success = [
            'message' => 'Password updated successfully.'
        ];

        return $this->sendSuccessResponse($success, 'Password updated successfully.');
    }

    /**
     * Remove the specified admin
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $admin = Admin::find($id);

        if (!$admin) {
            return $this->sendErrorResponse('Admin not found.', [], 404);
        }

        // Prevent self deletion
        if ($admin->id === auth()->id()) {
            return $this->sendErrorResponse('You cannot delete your own account.', [], 403);
        }
        if (Admin::count() <= 1) {
            return $this->sendErrorResponse('At least one admin must remain.', [], 403);
        }

        DB::beginTransaction();
        try {
            // Delete all tokens associated with this admin
            $admin->tokens()->delete();

            $admin->clearMediaCollection('avatar');
            $admin->delete();
            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            return $this->sendErrorResponse('Something went wrong, Please try again later.', [], 500);
        }

        $success = [
            'message' => 'Admin deleted successfully.'
        ];

        return $this->sendSuccessResponse($success, 'Admin deleted successfully.');
    }
}
