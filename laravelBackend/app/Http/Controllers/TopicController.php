<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Topic;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class TopicController extends Controller
{
    public function index()
    {
        $topics = Topic::whereIn('status', [1,2])->get();
        $data = [
            'status' => true,
            'message' => 'Success',
            'topics' => $topics,
        ];
        return response()->json($data, 200,);
    }

    function trash()
    {
        $topics = Topic::where('status', 0)->get();
        $data = [
            'status' => true,
            'message' => 'Success',
            'topics' => $topics,
        ];
        return response()->json($data, 200);
    }

    function show($id)
    {
        $topic = Topic::find($id);
        if ($topic == null) {
            $data = [
                'status' => false,
                'message' => 'error',
                'topic' => $topic,
            ];
            return response()->json($data, 404);
        }
        $data = [
            'status' => true,
            'message' => 'Success',
            'topic' => $topic,
        ];
        return response()->json($data, 200);
    }

    function store(Request $request)
    {
        $topic = new Topic();
        $topic->name = $request->name;
        $topic->slug = Str::of($request->name)->slug('-');
        $topic->sort_order = 1;
        $topic->description = $request->description;
        $topic->status = $request->status;
        $topic->created_at = date('Y-m-d H:i:s');
        $topic->created_by = 1; //login


        if ($topic->save()) {
            $data = [
                'status' => true,
                'message' => 'Success',
                'topic' => $topic,
            ];
            return response()->json($data, 200);
        } else {
            return response()->json($topic->errors(), 422);
        }
    }

    function update(Request $request, $id)
    {
        $topic = Topic::find($id);
        if ($topic == null) {
            $data = [
                'status' => false,
                'message' => 'error',
                'topic' => $topic,
            ];
            return response()->json($data, 404);
        }
        $topic->name = $request->name;
        $topic->slug = Str::of($request->name)->slug('-');
        $topic->sort_order = 1;
        $topic->description = $request->description;
        $topic->status = $request->status;
        $topic->updated_at = date('Y-m-d H:i:s');
        $topic->updated_by = 1; //login
        

        if ($topic->save()) {
            $data = [
                'status' => true,
                'message' => 'Success',
                'topic' => $topic,
            ];
            return response()->json($data, 200);
        } else {
            $data = [
                'status' => false,
                'message' => 'hghg',
                'topic' => $topic,
            ];
            return response()->json($data, 200);
        }
    }
    function delete($id)
    {
        $topic = Topic::find($id);
        if ($topic == null) {
            $data = [
                'status' => false,
                'message' => 'error',
                'topic' => $topic,
            ];
            return response()->json($data, 404);
        }
        $topic->status = 0;
        $topic->updated_at = date('Y-m-d H:i:s');
        $topic->updated_by = 1; //login
        if ($topic->save()) {
            $data = [
                'status' => true,
                'message' => 'Success',
                'topic' => $topic,
            ];
            return response()->json($data, 200);
        } else {
            $data = [
                'status' => false,
                'message' => 'hghg',
                'topic' => $topic,
            ];
            return response()->json($data, 200);
        }
    }

    function destroy($id)
    {
        $topic = Topic::find($id);
        if (!$topic) {
            $data = [
                'status' => false,
                'message' => 'error',
                'topic' => null,
            ];
            return response()->json($data, 404);
        }
        if ($topic->delete()) {
            $data = [
                'status' => true,
                'message' => 'Success',
                'topic' => null,
            ];
            return response()->json($data, 200);
        }
    }

    function restore($id)
    {
        $topic = Topic::find($id);
     
        $topic->status = 2;
        $topic->updated_at = date('Y-m-d H:i:s');
        $topic->updated_by = 1; //login
        if ($topic->save()) {
            $data = [
                'status' => true,
                'message' => 'Success',
                'topic' => $topic,
            ];
            return response()->json($data, 200);
        } else {
            $data = [
                'status' => false,
                'message' => 'hghg',
                'topic' => $topic,
            ];
            return response()->json($data, 200);
        }
    }
}
