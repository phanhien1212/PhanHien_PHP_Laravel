<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
class PostController extends Controller
{
    function index()
    {
        $posts = Post::where('type','post')->whereIn('status', [1,2])->get();
        $data = [
            'status' => true,
            'message' => 'Success',
            'posts' => $posts,
        ];
        return response()->json($data, 200,);
    }

    function trash()
    {
        $posts = Post::where('status', 0)->get();
        $data = [
            'status' => true,
            'message' => 'Success',
            'posts' => $posts,
        ];
        return response()->json($data, 200);
    }

    function show($id)
    {
        $post = Post::find($id);
        if ($post == null) {
            $data = [
                'status' => false,
                'message' => 'error',
                'post' => $post,
            ];
            return response()->json($data, 404);
        }
        $data = [
            'status' => true,
            'message' => 'Success',
            'post' => $post,
        ];
        return response()->json($data, 200);
    }

    function store(Request $request)
    {
        $post = new Post();
        $post->title = $request->title;
        $post->slug = Str::of($request->title)->slug('-');
        $post->detail = $request->detail;
        $post->type = 'post';
        $post->description = $request->description;
        $post->status = $request->status;
        $post->created_at = date('Y-m-d H:i:s');
        $post->created_by = 1; //login

        if ($request->image != null) {
            $extension = $request->image->getClientOriginalExtension();
            if (in_array($extension, ['png', 'jpg', 'gif', 'webp'])) {
                $fileName = date('YmdHis') . '.' . $extension;
                $request->image->move(public_path('images/post'), $fileName);
                $post->image = $fileName;
            }
        }

        if ($post->save()) {
            $data = [
                'status' => true,
                'message' => 'Success',
                'post' => $post,
            ];
            return response()->json($data, 200);
        } else {
            return response()->json($post->errors(), 422);
        }
    }

    function update(Request $request, $id)
    {
        $post = Post::find($id);
        if ($post == null) {
            $data = [
                'status' => false,
                'message' => 'error',
                'post' => $post,
            ];
            return response()->json($data, 404);
        }
        $post->title = $request->title;
        $post->slug = Str::of($request->title)->slug('-');
        $post->detail = $request->detail;
        $post->description = $request->description;
        $post->status = $request->status;
        $post->updated_at = date('Y-m-d H:i:s');
        $post->updated_by = 1; //login

        if ($request->hasFile('image') && $request->file('image')->isValid()) {
            $extension = $request->image->getClientOriginalExtension();
            
            // Kiểm tra định dạng hình ảnh
            if (in_array($extension, ['png', 'jpg', 'gif', 'webp'])) {
                $fileName = date('YmdHis') . '.' . $extension;
                $request->image->move(public_path('images/post'), $fileName);
                $post->image = $fileName;
            }
        }

        if ($post->save()) {
            $data = [
                'status' => true,
                'message' => 'Success',
                'post' => $post,
            ];
            return response()->json($data, 200);
        } else {
            $data = [
                'status' => false,
                'message' => 'hghg',
                'post' => $post,
            ];
            return response()->json($data, 200);
        }
    }
    function delete($id)
    {
        $post = Post::find($id);
        if ($post == null) {
            $data = [
                'status' => false,
                'message' => 'error',
                'post' => $post,
            ];
            return response()->json($data, 404);
        }
        $post->status = 0;
        $post->updated_at = date('Y-m-d H:i:s');
        $post->updated_by = 1; //login
        if ($post->save()) {
            $data = [
                'status' => true,
                'message' => 'Success',
                'post' => $post,
            ];
            return response()->json($data, 200);
        } else {
            $data = [
                'status' => false,
                'message' => 'hghg',
                'post' => $post,
            ];
            return response()->json($data, 200);
        }
    }

    function destroy($id)
    {
        $post = Post::find($id);
        if (!$post) {
            $data = [
                'status' => false,
                'message' => 'error',
                'post' => null,
            ];
            return response()->json($data, 404);
        }
        if ($post->delete()) {
            $data = [
                'status' => true,
                'message' => 'Success',
                'post' => null,
            ];
            return response()->json($data, 200);
        }
    }

    function restore($id)
    {
        $post = Post::find($id);
     
        $post->status = 2;
        $post->updated_at = date('Y-m-d H:i:s');
        $post->updated_by = 1; //login
        if ($post->save()) {
            $data = [
                'status' => true,
                'message' => 'Success',
                'post' => $post,
            ];
            return response()->json($data, 200);
        } else {
            $data = [
                'status' => false,
                'message' => 'hghg',
                'post' => $post,
            ];
            return response()->json($data, 200);
        }
    }

    public function updateStatus(Request $request, $id)
     {
         try {
             $post = Post::find($id);
     
             if (!$post) {
                 return response()->json([
                     'success' => false,
                     'message' => 'Không tìm thấy thương hiệu',
                 ], 404);
             }
     
             // Bảo tồn giá trị 'name' hiện tại nếu nó không được cung cấp trong yêu cầu
             $post->name = $request->has('name') ? $request->name : $post->name;
             $post->status = $request->status;
     
             // Lưu các thay đổi
             $post->save();
     
             return response()->json([
                 'success' => true,
                 'message' => 'Thành công',
                 'post' => $post
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
