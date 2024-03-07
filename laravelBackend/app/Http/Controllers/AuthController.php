<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        
        $user = new User();
        $user->name = $request->name;
        $user->username = $request->username;
        $user->password =  $request->password;
        $user->gender = $request->gender;
        $user->phone = $request->phone;
        $user->email = $request->email;
        $user->address = $request->address;
        $user->roles =  'user';
        $user->image = '' ;
        $user->created_at = date('Y-m-d H:i:s');
        $user->created_by = 1; //login

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


   
    public function login(Request $request)
    {
        $credentials = $request->only('username', 'password');

        if (Auth::attempt($credentials)) {
            return response()->json(Auth::user(), 200);
        }

        return response()->json(['error' => 'Unauthorized'], 401);
    }


    public function updatepassword(Request $request, $id)
     {
         try {
             $user = User::find($id);
     
             if (!$user) {
                 return response()->json([
                     'success' => false,
                     'message' => 'Không tìm thấy thương hiệu',
                 ], 404);
             }
     
             // Bảo tồn giá trị 'name' hiện tại nếu nó không được cung cấp trong yêu cầu
             $user->name = $request->has('name') ? $request->name : $user->name;
             $user->password = $request->password;
     
             // Lưu các thay đổi
             $user->save();
     
             return response()->json([
                 'success' => true,
                 'message' => 'Thành công',
                 'user' => $user
             ], 200);
         } catch (\Exception $e) {
             return response()->json([
                 'success' => false,
                 'message' => 'Có lỗi xảy ra trong quá trình cập nhật mật khẩu',
                 'error' => $e->getMessage(),
             ], 500);
         }
    }
   
   
}
