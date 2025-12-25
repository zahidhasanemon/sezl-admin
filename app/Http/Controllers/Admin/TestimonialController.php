<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\Admin\TestimonialResource;

class TestimonialController extends Controller
{
    /**
     * Display a listing of Testimonials
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
        $eligibleOrderByFields = ['id', 'name', 'address', 'status', 'created_at', 'updated_at'];
        $eligibleDirections = ['asc', 'desc'];

        // Validate orderBy field
        if (!in_array($sortBy, $eligibleOrderByFields)) {
            $sortBy = 'id';
        }

        // Validate order direction
        if (!in_array(strtolower($orderBy), $eligibleDirections)) {
            $orderBy = 'desc';
        }

        $query = Testimonial::with(['creator', 'editor'])
            ->orderBy($sortBy, $orderBy);

        // Filter by status
        if ($request->has('status') && $status !== 'all') {
            $query->where('status', $status);
        }

        // Search functionality
        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('address', 'like', "%{$search}%")
                    ->orWhere('testimonial', 'like', "%{$search}%");
            });
        }

        $testimonials = $query->paginate($perPage);

        $success = [
            'testimonials' => TestimonialResource::collection($testimonials->items()),
            'pagination' => [
                'currentPage' => $testimonials->currentPage(),
                'lastPage' => $testimonials->lastPage(),
                'perPage' => $testimonials->perPage(),
                'total' => $testimonials->total(),
            ]
        ];

        return $this->sendSuccessResponse($success, 'Testimonials retrieved successfully.');
    }

    /**
     * Store a newly created Testimonial
     *
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $messages = [
            'name.required' => 'Name is required',
            'testimonial.required' => 'Testimonial is required',
            'status.required' => 'Status is required',
            'avatar.image' => 'Avatar must be an image',
            'avatar.mimes' => 'Avatar must be a file of type: jpeg, png, jpg, gif',
            'avatar.max' => 'Avatar may not be greater than 2MB',
        ];

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:191',
            'address' => 'nullable|string|max:250',
            'testimonial' => 'required|string|max:250',
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'status' => 'required|boolean',
        ], $messages);

        if ($validator->fails()) {
            $errors = $validator->errors()->all();
            $errMsg = implode(', ', $errors);
            return $this->sendErrorResponse($errMsg, $validator->errors()->toArray(), 422);
        }

        $input = $request->only('name', 'address', 'testimonial', 'status');
        $input['created_by'] = Auth::guard('admin')->id();
        $input['updated_by'] = Auth::guard('admin')->id();

        DB::beginTransaction();
        try {
            $testimonial = Testimonial::create($input);

            if ($request->hasFile('avatar')) {
                $testimonial->addMediaFromRequest('avatar')
                    ->toMediaCollection('avatar');
            }

            $testimonial->load(['creator']);
            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            return $this->sendErrorResponse('Something went wrong, Please try again later.', [], 500);
        }

        $success = [
            'testimonial' => new TestimonialResource($testimonial)
        ];

        return $this->sendSuccessResponse($success, 'Testimonial created successfully.');
    }

    /**
     * Display the specified Testimonial
     *
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $testimonial = Testimonial::with(['creator', 'editor'])->find($id);

        if (!$testimonial) {
            return $this->sendErrorResponse('Testimonial not found.', [], 404);
        }

        $success = [
            'testimonial' => new TestimonialResource($testimonial)
        ];

        return $this->sendSuccessResponse($success, 'Testimonial retrieved successfully.');
    }

    /**
     * Update the specified Testimonial
     *
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $testimonial = Testimonial::find($id);

        if (!$testimonial) {
            return $this->sendErrorResponse('Testimonial not found.', [], 404);
        }

        $messages = [
            'name.required' => 'Name is required',
            'testimonial.required' => 'Testimonial is required',
            'status.required' => 'Status is required',
            'avatar.image' => 'Avatar must be an image',
            'avatar.mimes' => 'Avatar must be a file of type: jpeg, png, jpg, gif',
            'avatar.max' => 'Avatar may not be greater than 2MB',
        ];

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:191',
            'address' => 'nullable|string|max:250',
            'testimonial' => 'required|string|max:250',
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'status' => 'required|boolean',
        ], $messages);

        if ($validator->fails()) {
            $errors = $validator->errors()->all();
            $errMsg = implode(', ', $errors);
            return $this->sendErrorResponse($errMsg, $validator->errors()->toArray(), 422);
        }

        $input = $request->only('name', 'address', 'testimonial', 'status');
        $input['updated_by'] = Auth::guard('admin')->id();

        DB::beginTransaction();
        try {
            $testimonial->update($input);

            if ($request->hasFile('avatar')) {
                $testimonial->clearMediaCollection('avatar');
                $testimonial->addMediaFromRequest('avatar')
                    ->toMediaCollection('avatar');
            }

            $testimonial->load(['creator', 'editor']);
            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            return $this->sendErrorResponse('Something went wrong, Please try again later.', [], 500);
        }

        $success = [
            'testimonial' => new TestimonialResource($testimonial)
        ];

        return $this->sendSuccessResponse($success, 'Testimonial updated successfully.');
    }

    /**
     * Remove the specified Testimonial
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $testimonial = Testimonial::find($id);

        if (!$testimonial) {
            return $this->sendErrorResponse('Testimonial not found.', [], 404);
        }

        DB::beginTransaction();
        try {
            $testimonial->delete();
            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            return $this->sendErrorResponse('Something went wrong, Please try again later.', [], 500);
        }

        $success = [
            'message' => 'Testimonial deleted successfully.'
        ];

        return $this->sendSuccessResponse($success, 'Testimonial deleted successfully.');
    }
}
