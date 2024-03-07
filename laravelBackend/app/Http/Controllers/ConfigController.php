<?php

namespace App\Http\Controllers;

use App\Models\Config;
use Illuminate\Http\Request;

class ConfigController extends Controller
{
        function index()
    {
        // Lấy phần tử mới nhất dựa trên trường created_at
        $config = Config::whereIn('status',[1,2])->latest('created_at')->first();
        
        $data = [
            'status' => true,
            'message' => 'Success',
            'config' => $config,
        ];
        
        return response()->json($data, 200);
    }

    function store(Request $request)
    {
        $config = new Config();
        $config->author = $request->author;
        $config->email = $request->email;
        $config->phone = $request->phone;
        $config->zalo = $request->zalo;
        $config->facebook = $request->facebook;
        $config->address = $request->address;
        $config->youtube = $request->youtube;
        $config->metadesc = $request->metadesc;
        $config->metakey = $request->metakey;
        $config->status = $request->status;
        $config->created_at = date('Y-m-d H:i:s');
        $config->created_by = 1; //login

        

        if ($config->save()) {
            $data = [
                'status' => true,
                'message' => 'Success',
                'config' => $config,
            ];
            return response()->json($data, 200);
        } else {
            return response()->json($config->errors(), 422);
        }
    }
}
