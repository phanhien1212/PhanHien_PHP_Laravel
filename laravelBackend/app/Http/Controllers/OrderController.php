<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Orderdetail;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    function index()
    {
        $orders = Order::whereIn('status', [1, 2])->get();
        $data = [
            'status' => true,
            'message' => 'Success',
            'orders' => $orders,
        ];
        return response()->json($data, 200,);
    }

    function show($id)
    {
        $order = Order::find($id);
        if($order==null)
        {
            $data = [
                'status' => false,
                'message' => 'error',
                'order' => $order,
            ];
            return response()->json($data, 404);
        }
        $data = [
            'status' => true,
            'message' => 'Success',
            'order' => $order,
        ];
        return response()->json($data, 200);
    }

    function trash()
    {
        $orders = Order::where('status', 0)->get();
        $data = [
            'status' => true,
            'message' => 'Success',
            'orders' => $orders,
        ];
        return response()->json($data, 200);
    }

    function delete($id)
    {
        $order = Order::find($id);
        if ($order == null) {
            $data = [
                'status' => false,
                'message' => 'error',
                'order' => $order,
            ];
            return response()->json($data, 404);
        }
        $order->status = 0;
        $order->updated_at = date('Y-m-d H:i:s');
        $order->updated_by = 1; //login
        if ($order->save()) {
            $data = [
                'status' => true,
                'message' => 'Success',
                'order' => $order,
            ];
            return response()->json($data, 200);
        } else {
            $data = [
                'status' => false,
                'message' => 'hghg',
                'order' => $order,
            ];
            return response()->json($data, 200);
        }
    }

    function destroy($id)
    {
        $order =  Order::find($id);
        if (!$order) {
            $data = [
                'status' => false,
                'message' => 'error',
                'order' => null,
            ];
            return response()->json($data, 404);
        }
        if ($order->delete()) {
            $data = [
                'status' => true,
                'message' => 'Success',
                'order' => null,
            ];
            return response()->json($data, 200);
        }
    }

    function restore($id)
    {
        $order = Order::find($id);

        $order->status = 2;
        $order->updated_at = date('Y-m-d H:i:s');
        $order->updated_by = 1; //login
        if ($order->save()) {
            $data = [
                'status' => true,
                'message' => 'Success',
                'order' => $order,
            ];
            return response()->json($data, 200);
        } else {
            $data = [
                'status' => false,
                'message' => 'hghg',
                'order' => $order,
            ];
            return response()->json($data, 200);
        }
    }

    public function dathang(Request $request)
    {
        $listcart=$request->listcart;
        $user_id=$request->user_id;
        $user=User::find($user_id);
        $order=new Order();
        $order->user_id=$user_id;
        $order->delivery_name=$request->delivery_name;
        $order->delivery_gender=$user->gender;
        $order->delivery_email =$request->delivery_email;
        $order->delivery_phone=$request->delivery_phone;
        $order->delivery_address=$request->delivery_address;
        $order->note=$request->note;
        $order->type='online';
        $order->created_at=date('Y-m-d H:i:s');
        $order->created_by=1;
        $order->status=1;
        if($order->save()){
            foreach($listcart as $cart)
            {
                $product=Product::find($cart['id']);
                $orderdetail=new Orderdetail();
                $orderdetail->order_id=$order->id;
                $orderdetail->product_id=$cart['id'];
                $orderdetail->price=$product->price;
                $orderdetail->qty=$cart['qty'];
                $orderdetail->discount=0;
                $orderdetail->amount=$product->price*$cart['qty'];
                $orderdetail->save();
            }
        }
    }

     public function storeexport(Request $request)
    {
        $listcart=$request->listcart;
        $user_id=$request->user_id;
        $user=User::find($user_id);
        $order=new Order();
        $order->user_id=$user_id;
        $order->delivery_name=$user->name;
        $order->delivery_gender=$user->gender;
        $order->delivery_email=$user->email;
        $order->delivery_phone=$user->phone;
        $order->delivery_address=$user->address;
        $order->note='Mua tại quầy';
        $order->type='shop';
        $order->created_at=date('Y-m-d H:i:s');
        $order->created_by=1;
        $order->status=1;
        if($order->save()){
            foreach($listcart as $cart)
            {
                $product=Product::find($cart['id']);
                $orderdetail=new Orderdetail();
                $orderdetail->order_id=$order->id;
                $orderdetail->product_id=$cart['id'];
                $orderdetail->price=$product->price;
                $orderdetail->qty=$cart['qty'];
                $orderdetail->discount=0;
                $orderdetail->amount=$product->price*$cart['qty'];
                $orderdetail->save();
            }
        }
    }

    function productorder($id)
    {
        $order = Order::find($id);
    
        // Kiểm tra nếu không tìm thấy đơn hàng
        if ($order == null) {
            $data = [
                'status' => false,
                'message' => 'Không tìm thấy đơn hàng',
                'order' => null,
                'order_details' => null,
            ];
            return response()->json($data, 404);
        }
    
        // Lấy tất cả các đơn hàng từ bảng OrderDetail có order_id bằng id của đơn hàng trong bảng Order
        $orderDetails = Orderdetail::where('order_id', $order->id)->get();
    
        // Lấy ra product_id của mỗi đơn hàng
    
        // Tạo một mảng mới chứa thông tin sản phẩm, hình ảnh và tên
      
    
        $data = [
            'status' => true,
            'message' => 'Thành công',
           
            'order_details' => $orderDetails,
        ];
    
        return response()->json($data, 200);
    }

}
