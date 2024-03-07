<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    function index()
    {
        $users = User::whereIn('roles',['admin','user'])->whereIn('status', [1, 2])->get();
        $data = [
            'status' => true,
            'message' => 'Success',
            'users' => $users,
        ];
        return response()->json($data, 200,);
    }

    function show($id)
    {
        $user = User::find($id);
        if ($user == null) {
            $data = [
                'status' => false,
                'message' => 'error',
                'user' => $user,
            ];
            return response()->json($data, 404);
        }
        $data = [
            'status' => true,
            'message' => 'Success',
            'user' => $user,
        ];
        return response()->json($data, 200);
    }

    function store(Request $request)
    {
        $user = new User();
        $user->name = $request->name;
        $user->username = $request->username;
        $user->password =  $request->password;
        $user->gender = $request->gender;
        $user->phone = $request->phone;
        $user->email = $request->email;
        $user->address = $request->address;
        $user->roles =  'admin,user';
        $user->created_at = date('Y-m-d H:i:s');
        $user->created_by = 1; //login

        if ($request->image != null) {
            $extension = $request->image->getClientOriginalExtension();
            if (in_array($extension, ['png', 'jpg', 'gif', 'webp'])) {
                $fileName = date('YmdHis') . '.' . $extension;
                $request->image->move(public_path('images/user'), $fileName);
                $user->image = $fileName;
            }
        }

        if ($user->save()) {
            $data = [
                'status' => true,
                'message' => 'Success',
                'user' => $user,
            ];
            return response()->json($data, 200);
        } else {
            return response()->json($user->errors(), 422);
        }
    }

    function update(Request $request, $id)
    {
        $user = User::find($id);
        if ($user == null) {
            $data = [
                'status' => false,
                'message' => 'error',
                'user' => $user,
            ];
            return response()->json($data, 404);
        }
        $user->name = $request->name;
        $user->username = $request->username;
        $user->password =  $request->password;
        $user->gender = $request->gender;
        $user->phone = $request->phone;
        $user->email = $request->email;
        $user->address = $request->address;
        $user->status = $request->status;
        $user->updated_at = date('Y-m-d H:i:s');
        $user->updated_by = 1; //login


        if ($request->hasFile('image') && $request->file('image')->isValid()) {
            $extension = $request->image->getClientOriginalExtension();

            // Kiểm tra định dạng hình ảnh
            if (in_array($extension, ['png', 'jpg', 'gif', 'webp'])) {
                $fileName = date('YmdHis') . '.' . $extension;
                $request->image->move(public_path('images/user'), $fileName);
                $user->image = $fileName;
            }
        }

        if ($user->save()) {
            $data = [
                'status' => true,
                'message' => 'Success',
                'user' => $user,
            ];
            return response()->json($data, 200);
        } else {
            $data = [
                'status' => false,
                'message' => 'hghg',
                'user' => $user,
            ];
            return response()->json($data, 200);
        }
    }

    function trash()
    {
        $users = User::where('status', 0)->get();
        $data = [
            'status' => true,
            'message' => 'Success',
            'users' => $users,
        ];
        return response()->json($data, 200);
    }

    function delete($id)
    {
        $user = User::find($id);
        if ($user == null) {
            $data = [
                'status' => false,
                'message' => 'error',
                'user' => $user,
            ];
            return response()->json($data, 404);
        }
        $user->status = 0;
        $user->updated_at = date('Y-m-d H:i:s');
        $user->updated_by = 1; //login
        if ($user->save()) {
            $data = [
                'status' => true,
                'message' => 'Success',
                'user' => $user,
            ];
            return response()->json($data, 200);
        } else {
            $data = [
                'status' => false,
                'message' => 'hghg',
                'user' => $user,
            ];
            return response()->json($data, 200);
        }
    }

    function destroy($id)
    {
        $user =  User::find($id);
        if (!$user) {
            $data = [
                'status' => false,
                'message' => 'error',
                'user' => null,
            ];
            return response()->json($data, 404);
        }
        if ($user->delete()) {
            $data = [
                'status' => true,
                'message' => 'Success',
                'user' => null,
            ];
            return response()->json($data, 200);
        }
    }

    function restore($id)
    {
        $user = User::find($id);

        $user->status = 2;
        $user->updated_at = date('Y-m-d H:i:s');
        $user->updated_by = 1; //login
        if ($user->save()) {
            $data = [
                'status' => true,
                'message' => 'Success',
                'user' => $user,
            ];
            return response()->json($data, 200);
        } else {
            $data = [
                'status' => false,
                'message' => 'hghg',
                'user' => $user,
            ];
            return response()->json($data, 200);
        }
    }
}
