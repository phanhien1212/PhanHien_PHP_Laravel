<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Category;
class CategoryController extends Controller
{
    function index()
    {
        $categories = Category::whereIn('status', [1,2])->get();
        $data = [
            'status' => true,
            'message' => 'Success',
            'categories' => $categories,
        ];
        return response()->json($data, 200,);
    }

    function trash()
    {
        $categories = Category::where('status', 0)->get();
        $data = [
            'status' => true,
            'message' => 'Success',
            'categories' => $categories,
        ];
        return response()->json($data, 200);
    }

    function show($id)
    {
        $category = Category::find($id);
        if($category==null)
        {
            $data = [
                'status' => false,
                'message' => 'error',
                'category' => $category,
            ];
            return response()->json($data, 404);
        }
        $data = [
            'status' => true,
            'message' => 'Success',
            'category' => $category,
        ];
        return response()->json($data, 200);
    }

    function store(Request $request)
    {
        $category = new Category();
        $category->name = $request->name;
        $category->slug = Str::of($request->name)->slug('-');
        $category->parent_id = $request->parent_id;
        $category->sort_order = 1;
        $category->description = $request->description;
        $category->status = $request->status;
        $category->created_at = date('Y-m-d H:i:s');
        $category->created_by = 1; //login

        if ($request->image != null) {
            $extension = $request->image->getClientOriginalExtension();
            if (in_array($extension, ['png', 'jpg', 'gif', 'webp'])) {
                $fileName = date('YmdHis').'.'.$extension;
                $request->image->move(public_path('images/category'), $fileName);
                $category->image = $fileName;
            }
        }

        if ($category->save()) {
            $data = [
                'status' => true,
                'message' => 'Success',
                'category' => $category,
            ];
            return response()->json($data, 200);
        } else {
            return response()->json($category->errors(), 422);
        }
    }

    function update(Request $request, $id)
    {
        $category = Category::find($id);
        if ($category == null) {
            $data = [
                'status' => false,
                'message' => 'error',
                'category' => $category,
            ];
            return response()->json($data, 404);
        }
        $category->name = $request->name;
        $category->slug = Str::of($request->name)->slug('-');
        $category->sort_order = 1;
        $category->description = $request->description;
        $category->status = $request->status;
        $category->updated_at = date('Y-m-d H:i:s');
        $category->updated_by = 1; //login
        
        if ($request->hasFile('image') && $request->file('image')->isValid()) {
            $extension = $request->image->getClientOriginalExtension();
            
            // Kiểm tra định dạng hình ảnh
            if (in_array($extension, ['png', 'jpg', 'gif', 'webp'])) {
                $fileName = date('YmdHis') . '.' . $extension;
                $request->image->move(public_path('images/category'), $fileName);
                $category->image = $fileName;
            }
        }

        if ($category->save()) {
            $data = [
                'status' => true,
                'message' => 'Success',
                'category' => $category,
            ];
            return response()->json($data, 200);
        } else {
            $data = [
                'status' => false,
                'message' => 'hghg',
                'category' => $category,
            ];
            return response()->json($data, 200);
        }
    }

    function delete($id)
    {
        $category = Category::find($id);
        if ($category == null) {
            $data = [
                'status' => false,
                'message' => 'error',
                'category' => $category,
            ];
            return response()->json($data, 404);
        }
        $category->status = 0;
        $category->updated_at = date('Y-m-d H:i:s');
        $category->updated_by = 1; //login
        if ($category->save()) {
            $data = [
                'status' => true,
                'message' => 'Success',
                'category' => $category,
            ];
            return response()->json($data, 200);
        } else {
            $data = [
                'status' => false,
                'message' => 'hghg',
                'category' => $category,
            ];
            return response()->json($data, 200);
        }
    }

    function destroy($id)
    {
        $category = Category::find($id);
        if (!$category) {
            $data = [
                'status' => false,
                'message' => 'error',
                'category' => null,
            ];
            return response()->json($data, 404);
        }
        if ($category->delete()) {
            $data = [
                'status' => true,
                'message' => 'Success',
                'category' => null,
            ];
            return response()->json($data, 200);
        }
    }

    function restore($id)
    {
        $category = Category::find($id);
     
        $category->status = 2;
        $category->updated_at = date('Y-m-d H:i:s');
        $category->updated_by = 1; //login
        if ($category->save()) {
            $data = [
                'status' => true,
                'message' => 'Success',
                'category' => $category,
            ];
            return response()->json($data, 200);
        } else {
            $data = [
                'status' => false,
                'message' => 'hghg',
                'category' => $category,
            ];
            return response()->json($data, 200);
        }
    }
}
