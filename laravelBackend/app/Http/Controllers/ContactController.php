<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
class ContactController extends Controller
{
    function index()
    {
        $contacts = Contact::whereIn('status', [1,2])->get();
        $data = [
            'status' => true,
            'message' => 'Success',
            'contacts' => $contacts,
        ];
        return response()->json($data, 200,);
    }

    function show($id)
    {
        $contact = Contact::find($id);
        if($contact==null)
        {
            $data = [
                'status' => false,
                'message' => 'error',
                'contact' => $contact,
            ];
            return response()->json($data, 404);
        }
        $data = [
            'status' => true,
            'message' => 'Success',
            'contact' => $contact,
        ];
        return response()->json($data, 200);
    }

    function trash()
    {
        $contacts = Contact::where('status', 0)->get();
        $data = [
            'status' => true,
            'message' => 'Success',
            'contacts' => $contacts,
        ];
        return response()->json($data, 200);
    }

    public function reply(Request $request,$id)
    {
        $contact = Contact::find($id);
            if ($contact == null) {
                $data = [
                    'status' => false,
                    'message' => 'error',
                    'contact' => $contact,
                ];
                return response()->json($data, 404);
            }
            $contact->content = $request->content;
            $contact->updated_at = date('Y-m-d H:i:s');
            $contact->updated_by = 1; //login
            

            if ($contact->save()) {
                $data = [
                    'status' => true,
                    'message' => 'Success',
                    'contact' => $contact,
                ];
                return response()->json($data, 200);
            } else {
                $data = [
                    'status' => false,
                    'message' => 'hghg',
                    'contact' => $contact,
                ];
                return response()->json($data, 200);
            }
    }

    function delete($id)
    {
        $contact = Contact::find($id);
        if ($contact == null) {
            $data = [
                'status' => false,
                'message' => 'error',
                'contact' => $contact,
            ];
            return response()->json($data, 404);
        }
        $contact->status = 0;
        $contact->updated_at = date('Y-m-d H:i:s');
        $contact->updated_by = 1; //login
        if ($contact->save()) {
            $data = [
                'status' => true,
                'message' => 'Success',
                'contact' => $contact,
            ];
            return response()->json($data, 200);
        } else {
            $data = [
                'status' => false,
                'message' => 'hghg',
                'contact' => $contact,
            ];
            return response()->json($data, 200);
        }
    }

    function destroy($id)
    {
        $contact =  Contact::find($id);
        if (!$contact) {
            $data = [
                'status' => false,
                'message' => 'error',
                'contact' => null,
            ];
            return response()->json($data, 404);
        }
        if ($contact->delete()) {
            $data = [
                'status' => true,
                'message' => 'Success',
                'contact' => null,
            ];
            return response()->json($data, 200);
        }
    }

    function restore($id)
    {
        $contact = Contact::find($id);

        $contact->status = 2;
        $contact->updated_at = date('Y-m-d H:i:s');
        $contact->updated_by = 1; //login
        if ($contact->save()) {
            $data = [
                'status' => true,
                'message' => 'Success',
                'contact' => $contact,
            ];
            return response()->json($data, 200);
        } else {
            $data = [
                'status' => false,
                'message' => 'hghg',
                'contact' => $contact,
            ];
            return response()->json($data, 200);
        }
    }




}
