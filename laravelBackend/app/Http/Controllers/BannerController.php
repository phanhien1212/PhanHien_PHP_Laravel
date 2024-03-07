<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
class BannerController extends Controller
{
    function index()
    {
        $banners = Banner::whereIn('status', [1,2])->get();
        $data = [
            'status' => true,
            'message' => 'Success',
            'banners' => $banners,
        ];
        return response()->json($data, 200,);
    }

    function trash()
    {
        $banners = Banner::where('status', 0)->get();
        $data = [
            'status' => true,
            'message' => 'Success',
            'banners' => $banners,
        ];
        return response()->json($data, 200);
    }

    function show($id)
    {
        $banner = Banner::find($id);
        if ($banner == null) {
            $data = [
                'status' => false,
                'message' => 'error',
                'banner' => $banner,
            ];
            return response()->json($data, 404);
        }
        $data = [
            'status' => true,
            'message' => 'Success',
            'banner' => $banner,
        ];
        return response()->json($data, 200);
    }

    function store(Request $request)
    {
        $banner = new Banner();
        $banner->name = $request->name;
        $banner->link = $request->link;
        $banner->position = $request->position;
        $banner->description = $request->description;
        $banner->status = $request->status;
        $banner->created_at = date('Y-m-d H:i:s');
        $banner->created_by = 1; //login

        if ($request->image != null) {
            $extension = $request->image->getClientOriginalExtension();
            if (in_array($extension, ['png', 'jpg', 'gif', 'webp'])) {
                $fileName = date('YmdHis') . '.' . $extension;
                $request->image->move(public_path('images/banner'), $fileName);
                $banner->image = $fileName;
            }
        }

        if ($banner->save()) {
            $data = [
                'status' => true,
                'message' => 'Success',
                'banner' => $banner,
            ];
            return response()->json($data, 200);
        } else {
            return response()->json($banner->errors(), 422);
        }
    }

    function update(Request $request, $id)
    {
        $banner = Banner::find($id);
        if ($banner == null) {
            $data = [
                'status' => false,
                'message' => 'error',
                'banner' => $banner,
            ];
            return response()->json($data, 404);
        }
        $banner->name = $request->name;
        $banner->link = $request->link;
        $banner->position = $request->position;
        $banner->description = $request->description;
        $banner->status = $request->status;
        $banner->updated_at = date('Y-m-d H:i:s');
        $banner->updated_by = 1; //login

        if ($request->hasFile('image') && $request->file('image')->isValid()) {
            $extension = $request->image->getClientOriginalExtension();
            
            // Kiểm tra định dạng hình ảnh
            if (in_array($extension, ['png', 'jpg', 'gif', 'webp'])) {
                $fileName = date('YmdHis') . '.' . $extension;
                $request->image->move(public_path('images/banner'), $fileName);
                $banner->image = $fileName;
            }
        }

        if ($banner->save()) {
            $data = [
                'status' => true,
                'message' => 'Success',
                'banner' => $banner,
            ];
            return response()->json($data, 200);
        } else {
            $data = [
                'status' => false,
                'message' => 'hghg',
                'banner' => $banner,
            ];
            return response()->json($data, 200);
        }
    }
    function delete($id)
    {
        $banner = Banner::find($id);
        if ($banner == null) {
            $data = [
                'status' => false,
                'message' => 'error',
                'banner' => $banner,
            ];
            return response()->json($data, 404);
        }
        $banner->status = 0;
        $banner->updated_at = date('Y-m-d H:i:s');
        $banner->updated_by = 1; //login
        if ($banner->save()) {
            $data = [
                'status' => true,
                'message' => 'Success',
                'banner' => $banner,
            ];
            return response()->json($data, 200);
        } else {
            $data = [
                'status' => false,
                'message' => 'hghg',
                'banner' => $banner,
            ];
            return response()->json($data, 200);
        }
    }

    function destroy($id)
    {
        $banner = Banner::find($id);
        if (!$banner) {
            $data = [
                'status' => false,
                'message' => 'error',
                'banner' => null,
            ];
            return response()->json($data, 404);
        }
        if ($banner->delete()) {
            $data = [
                'status' => true,
                'message' => 'Success',
                'banner' => null,
            ];
            return response()->json($data, 200);
        }
    }

    function restore($id)
    {
        $banner = Banner::find($id);
     
        $banner->status = 2;
        $banner->updated_at = date('Y-m-d H:i:s');
        $banner->updated_by = 1; //login
        if ($banner->save()) {
            $data = [
                'status' => true,
                'message' => 'Success',
                'banner' => $banner,
            ];
            return response()->json($data, 200);
        } else {
            $data = [
                'status' => false,
                'message' => 'hghg',
                'banner' => $banner,
            ];
            return response()->json($data, 200);
        }
    }
}
