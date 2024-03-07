<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
class PageController extends Controller
{
    function index()
    {
        $pages = Post::where('type','page')->whereIn('status', [1,2])->get();
        $data = [
            'status' => true,
            'message' => 'Success',
            'pages' => $pages,
        ];
        return response()->json($data, 200,);
    }

    function trash()
    {
        $pages = Post::where('status', 0)->get();
        $data = [
            'status' => true,
            'message' => 'Success',
            'pages' => $pages,
        ];
        return response()->json($data, 200);
    }

    function show($id)
    {
        $page = Post::find($id);
        if ($page == null) {
            $data = [
                'status' => false,
                'message' => 'error',
                'page' => $page,
            ];
            return response()->json($data, 404);
        }
        $data = [
            'status' => true,
            'message' => 'Success',
            'page' => $page,
        ];
        return response()->json($data, 200);
    }

    function store(Request $request)
    {
        $page = new Post();
        $page->title = $request->title;
        $page->slug = Str::of($request->title)->slug('-');
        $page->detail = $request->detail;
        $page->type = 'page';
        $page->description = $request->description;
        $page->status = $request->status;
        $page->created_at = date('Y-m-d H:i:s');
        $page->created_by = 1; //login

        if ($request->image != null) {
            $extension = $request->image->getClientOriginalExtension();
            if (in_array($extension, ['png', 'jpg', 'gif', 'webp'])) {
                $fileName = date('YmdHis') . '.' . $extension;
                $request->image->move(public_path('images/page'), $fileName);
                $page->image = $fileName;
            }
        }

        if ($page->save()) {
            $data = [
                'status' => true,
                'message' => 'Success',
                'page' => $page,
            ];
            return response()->json($data, 200);
        } else {
            return response()->json($page->errors(), 422);
        }
    }

    function update(Request $request, $id)
    {
        $page = Post::find($id);
        if ($page == null) {
            $data = [
                'status' => false,
                'message' => 'error',
                'page' => $page,
            ];
            return response()->json($data, 404);
        }
        $page->title = $request->title;
        $page->slug = Str::of($request->title)->slug('-');
        $page->detail = $request->detail;
        $page->description = $request->description;
        $page->status = $request->status;
        $page->updated_at = date('Y-m-d H:i:s');
        $page->updated_by = 1; //login

        if ($request->hasFile('image') && $request->file('image')->isValid()) {
            $extension = $request->image->getClientOriginalExtension();
            
            // Kiểm tra định dạng hình ảnh
            if (in_array($extension, ['png', 'jpg', 'gif', 'webp'])) {
                $fileName = date('YmdHis') . '.' . $extension;
                $request->image->move(public_path('images/page'), $fileName);
                $page->image = $fileName;
            }
        }

        if ($page->save()) {
            $data = [
                'status' => true,
                'message' => 'Success',
                'page' => $page,
            ];
            return response()->json($data, 200);
        } else {
            $data = [
                'status' => false,
                'message' => 'hghg',
                'page' => $page,
            ];
            return response()->json($data, 200);
        }
    }
    function delete($id)
    {
        $page = Post::find($id);
        if ($page == null) {
            $data = [
                'status' => false,
                'message' => 'error',
                'page' => $page,
            ];
            return response()->json($data, 404);
        }
        $page->status = 0;
        $page->updated_at = date('Y-m-d H:i:s');
        $page->updated_by = 1; //login
        if ($page->save()) {
            $data = [
                'status' => true,
                'message' => 'Success',
                'page' => $page,
            ];
            return response()->json($data, 200);
        } else {
            $data = [
                'status' => false,
                'message' => 'hghg',
                'page' => $page,
            ];
            return response()->json($data, 200);
        }
    }

    function destroy($id)
    {
        $page = Post::find($id);
        if (!$page) {
            $data = [
                'status' => false,
                'message' => 'error',
                'page' => null,
            ];
            return response()->json($data, 404);
        }
        if ($page->delete()) {
            $data = [
                'status' => true,
                'message' => 'Success',
                'page' => null,
            ];
            return response()->json($data, 200);
        }
    }

    function restore($id)
    {
        $page = Post::find($id);
     
        $page->status = 2;
        $page->updated_at = date('Y-m-d H:i:s');
        $page->updated_by = 1; //login
        if ($page->save()) {
            $data = [
                'status' => true,
                'message' => 'Success',
                'page' => $page,
            ];
            return response()->json($data, 200);
        } else {
            $data = [
                'status' => false,
                'message' => 'hghg',
                'page' => $page,
            ];
            return response()->json($data, 200);
        }
    }
}
