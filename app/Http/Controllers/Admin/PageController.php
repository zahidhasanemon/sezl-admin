<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\{Validator, Log, Auth, DB, Cache};
use App\Models\{HomePageContent, CardItem, Testimonial, Highlight, News};

class PageController extends Controller
{
    /**
     * home page
     *
     * @return
     */
    public function homePageContent()
    {
        try {
            $homePageContent = HomePageContent::first();
            $coreServices = CardItem::where('type', config('constants.card_types.core_services'))
                    ->where('status', true)
                    ->orderBy('created_at', 'asc')
                    ->get();
            $whyInvestInBD = CardItem::where('type', config('constants.card_types.home_bd'))
                    ->where('status', true)
                    ->orderBy('created_at', 'asc')
                    ->get();

            $success = [
                'content' => $homePageContent,
                'coreServices' => $coreServices,
                'whyInvestInBD' => $whyInvestInBD,
            ];

            return $this->sendSuccessResponse($success, 'Content retrieved successfully.');
        } catch (\Exception $e) {
            Log::error('Failed to retrieve contact info', ['error' => $e->getMessage()]);
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong. Please try again.',
                'data' => null
            ], 500);
        }
    }

    /**
     * update home page content
     *
     * @return
     */
    public function updateHomePageContent(Request $request)
    {
        $messages = [
            'heroMediaType.required' => 'Media Type is required',
            'heroTitle.required' => 'Hero Title is required',
            'heroMedia.required' => 'Hero Media is required',
        ];

        $validator = Validator::make($request->all(), [
            'heroMediaType' => 'required|in:image,video',
            'heroTitle' => 'required|string|max:191',
        ], $messages);

        $validator->sometimes('heroMedia', 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048', function ($input) {
            return $input->heroMediaType === 'image';
        });

        $validator->sometimes('heroMedia',
            'required|mimes:mp4,mov,avi,wmv,flv,mkv|max:51200',
            function ($input) {
                return $input->heroMediaType === 'video';
            }
        );

        if ($validator->fails()) {
            $errors = $validator->errors()->all();
            $errMsg = implode(', ', $errors);
            return $this->sendErrorResponse($errMsg, $validator->errors()->toArray(), 422);
        }

        DB::beginTransaction();
        try {
            $homePageContent = HomePageContent::first();
            if (!$homePageContent) {
                $homePageContent = new HomePageContent();
                $homePageContent->created_by = Auth::guard('admin')->id();
            }
            $homePageContent->hero_media_type = $request->input('heroMediaType');
            $homePageContent->hero_title = $request->input('heroTitle');
            $homePageContent->hero_description = $request->input('heroDescription');
            $homePageContent->updated_by = Auth::guard('admin')->id();
            $homePageContent->save();

            if ($request->hasFile('heroMedia')) {
                $homePageContent->clearMediaCollection('hero_media');
                $homePageContent->addMediaFromRequest('heroMedia')
                    ->toMediaCollection('hero_media');
            }

            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            return $this->sendErrorResponse('Something went wrong, Please try again later.', [], 500);
        }

        $success = [
            'content' => $homePageContent
        ];

        return $this->sendSuccessResponse($success, 'Data Updated successfully.');
    }
}
