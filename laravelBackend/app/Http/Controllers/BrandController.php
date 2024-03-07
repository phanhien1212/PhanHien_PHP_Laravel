<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class BrandController extends Controller
{
    function index()
    {
        $brands = Brand::whereIn('status', [1, 2])->get();
        $data = [
            'status' => true,
            'message' => 'Success',
            'brands' => $brands,
        ];
        return response()->json($data, 200,);
    }

    function trash()
    {
        $brands = Brand::where('status', 0)->get();
        $data = [
            'status' => true,
            'message' => 'Success',
            'brands' => $brands,
        ];
        return response()->json($data, 200);
    }

    function show($id)
    {
        $brand = Brand::find($id);
        if ($brand == null) {
            $data = [
                'status' => false,
                'message' => 'error',
                'brand' => $brand,
            ];
            return response()->json($data, 404);
        }
        $data = [
            'status' => true,
            'message' => 'Success',
            'brand' => $brand,
        ];
        return response()->json($data, 200);
    }

    function store(Request $request)
    {
        $brand = new Brand();
        $brand->name = $request->name;
        $brand->slug = Str::of($request->name)->slug('-');
        $brand->sort_order = 1;
        $brand->description = $request->description;
        $brand->status = $request->status;
        $brand->created_at = date('Y-m-d H:i:s');
        $brand->created_by = 1; //login

        if ($request->image != null) {
            $extension = $request->image->getClientOriginalExtension();
            if (in_array($extension, ['png', 'jpg', 'gif', 'webp'])) {
                $fileName = date('YmdHis') . '.' . $extension;
                $request->image->move(public_path('images/brand'), $fileName);
                $brand->image = $fileName;
            }
        }

        if ($brand->save()) {
            $data = [
                'status' => true,
                'message' => 'Success',
                'brand' => $brand,
            ];
            return response()->json($data, 200);
        } else {
            return response()->json($brand->errors(), 422);
        }
    }

    function update(Request $request, $id)
    {
        $brand = Brand::find($id);
        if ($brand == null) {
            $data = [
                'status' => false,
                'message' => 'error',
                'brand' => $brand,
            ];
            return response()->json($data, 404);
        }
        $brand->name = $request->name;
        $brand->slug = Str::of($request->name)->slug('-');
        $brand->sort_order = 1;
        $brand->description = $request->description;
        $brand->status = $request->status;
        $brand->updated_at = date('Y-m-d H:i:s');
        $brand->updated_by = 1; //login


        if ($request->hasFile('image') && $request->file('image')->isValid()) {
            $extension = $request->image->getClientOriginalExtension();

            // Kiểm tra định dạng hình ảnh
            if (in_array($extension, ['png', 'jpg', 'gif', 'webp'])) {
                $fileName = date('YmdHis') . '.' . $extension;
                $request->image->move(public_path('images/brand'), $fileName);
                $brand->image = $fileName;
            }
        }

        if ($brand->save()) {
            $data = [
                'status' => true,
                'message' => 'Success',
                'brand' => $brand,
            ];
            return response()->json($data, 200);
        } else {
            $data = [
                'status' => false,
                'message' => 'hghg',
                'brand' => $brand,
            ];
            return response()->json($data, 200);
        }
    }
    function delete($id)
    {
        $brand = Brand::find($id);
        if ($brand == null) {
            $data = [
                'status' => false,
                'message' => 'error',
                'brand' => $brand,
            ];
            return response()->json($data, 404);
        }
        $brand->status = 0;
        $brand->updated_at = date('Y-m-d H:i:s');
        $brand->updated_by = 1; //login
        if ($brand->save()) {
            $data = [
                'status' => true,
                'message' => 'Success',
                'brand' => $brand,
            ];
            return response()->json($data, 200);
        } else {
            $data = [
                'status' => false,
                'message' => 'hghg',
                'brand' => $brand,
            ];
            return response()->json($data, 200);
        }
    }

    function destroy($id)
    {
        $brand = Brand::find($id);
        if (!$brand) {
            $data = [
                'status' => false,
                'message' => 'error',
                'brand' => null,
            ];
            return response()->json($data, 404);
        }
        if ($brand->delete()) {
            $data = [
                'status' => true,
                'message' => 'Success',
                'brand' => null,
            ];
            return response()->json($data, 200);
        }
    }

    function restore($id)
    {
        $brand = Brand::find($id);

        $brand->status = 2;
        $brand->updated_at = date('Y-m-d H:i:s');
        $brand->updated_by = 1; //login
        if ($brand->save()) {
            $data = [
                'status' => true,
                'message' => 'Success',
                'brand' => $brand,
            ];
            return response()->json($data, 200);
        } else {
            $data = [
                'status' => false,
                'message' => 'hghg',
                'brand' => $brand,
            ];
            return response()->json($data, 200);
        }
    }

    public function updateStatus(Request $request, $id)
    {
        try {
            $brand = Brand::find($id);

            if (!$brand) {
                return response()->json([
                    'success' => false,
                    'message' => 'Không tìm thấy thương hiệu',
                ], 404);
            }

            // Bảo tồn giá trị 'name' hiện tại nếu nó không được cung cấp trong yêu cầu
            $brand->name = $request->has('name') ? $request->name : $brand->name;
            $brand->status = $request->status;

            // Lưu các thay đổi
            $brand->save();

            return response()->json([
                'success' => true,
                'message' => 'Thành công',
                'brand' => $brand
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Có lỗi xảy ra trong quá trình cập nhật trạng thái',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
