<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CustomerController extends Controller
{
     function index()
    {
        $customers = User::where('roles','customer')->whereIn('status', [1, 2])->get();
        $data = [
            'status' => true,
            'message' => 'Success',
            'customers' => $customers,
        ];
        return response()->json($data, 200,);
    }

    function show($id)
    {
        $customer = User::find($id);
        if ($customer == null) {
            $data = [
                'status' => false,
                'message' => 'error',
                'customer' => $customer,
            ];
            return response()->json($data, 404);
        }
        $data = [
            'status' => true,
            'message' => 'Success',
            'customer' => $customer,
        ];
        return response()->json($data, 200);
    }

    function store(Request $request)
    {
        $customer = new User();
        $customer->name = $request->name;
        $customer->username = $request->username;
        $customer->password =  $request->password;
        $customer->gender = $request->gender;
        $customer->phone = $request->phone;
        $customer->email = $request->email;
        $customer->address = $request->address;
        $customer->roles =  'customer';
        $customer->created_at = date('Y-m-d H:i:s');
        $customer->created_by = 1; //login

        if ($request->image != null) {
            $extension = $request->image->getClientOriginalExtension();
            if (in_array($extension, ['png', 'jpg', 'gif', 'webp'])) {
                $fileName = date('YmdHis') . '.' . $extension;
                $request->image->move(public_path('images/customer'), $fileName);
                $customer->image = $fileName;
            }
        }

        if ($customer->save()) {
            $data = [
                'status' => true,
                'message' => 'Success',
                'customer' => $customer,
            ];
            return response()->json($data, 200);
        } else {
            return response()->json($customer->errors(), 422);
        }
    }

    function update(Request $request, $id)
    {
        $customer = User::find($id);
        if ($customer == null) {
            $data = [
                'status' => false,
                'message' => 'error',
                'customer' => $customer,
            ];
            return response()->json($data, 404);
        }
        $customer->name = $request->name;
        $customer->username = $request->username;
        $customer->password =  $request->password;
        $customer->gender = $request->gender;
        $customer->phone = $request->phone;
        $customer->email = $request->email;
        $customer->address = $request->address;
        $customer->status = $request->status;
        $customer->updated_at = date('Y-m-d H:i:s');
        $customer->updated_by = 1; //login


        if ($request->hasFile('image') && $request->file('image')->isValid()) {
            $extension = $request->image->getClientOriginalExtension();

            // Kiểm tra định dạng hình ảnh
            if (in_array($extension, ['png', 'jpg', 'gif', 'webp'])) {
                $fileName = date('YmdHis') . '.' . $extension;
                $request->image->move(public_path('images/customer'), $fileName);
                $customer->image = $fileName;
            }
        }

        if ($customer->save()) {
            $data = [
                'status' => true,
                'message' => 'Success',
                'customer' => $customer,
            ];
            return response()->json($data, 200);
        } else {
            $data = [
                'status' => false,
                'message' => 'hghg',
                'customer' => $customer,
            ];
            return response()->json($data, 200);
        }
    }

    function trash()
    {
        $customers = User::where('status', 0)->get();
        $data = [
            'status' => true,
            'message' => 'Success',
            'customers' => $customers,
        ];
        return response()->json($data, 200);
    }

    function delete($id)
    {
        $customer = User::find($id);
        if ($customer == null) {
            $data = [
                'status' => false,
                'message' => 'error',
                'customer' => $customer,
            ];
            return response()->json($data, 404);
        }
        $customer->status = 0;
        $customer->updated_at = date('Y-m-d H:i:s');
        $customer->updated_by = 1; //login
        if ($customer->save()) {
            $data = [
                'status' => true,
                'message' => 'Success',
                'customer' => $customer,
            ];
            return response()->json($data, 200);
        } else {
            $data = [
                'status' => false,
                'message' => 'hghg',
                'customer' => $customer,
            ];
            return response()->json($data, 200);
        }
    }

    function destroy($id)
    {
        $customer =  User::find($id);
        if (!$customer) {
            $data = [
                'status' => false,
                'message' => 'error',
                'customer' => null,
            ];
            return response()->json($data, 404);
        }
        if ($customer->delete()) {
            $data = [
                'status' => true,
                'message' => 'Success',
                'customer' => null,
            ];
            return response()->json($data, 200);
        }
    }

    function restore($id)
    {
        $customer = User::find($id);

        $customer->status = 2;
        $customer->updated_at = date('Y-m-d H:i:s');
        $customer->updated_by = 1; //login
        if ($customer->save()) {
            $data = [
                'status' => true,
                'message' => 'Success',
                'customer' => $customer,
            ];
            return response()->json($data, 200);
        } else {
            $data = [
                'status' => false,
                'message' => 'hghg',
                'customer' => $customer,
            ];
            return response()->json($data, 200);
        }
    }
}
