<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Menu;
use App\Models\Post;
use App\Models\Topic;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    function index()
    {
        $menus = Menu::whereIn('status', [1, 2])->get();
        $data = [
            'status' => true,
            'message' => 'Success',
            'menus' => $menus,
        ];
        return response()->json($data, 200,);
    }

    function show($id)
    {
        $menu = Menu::find($id);
        if($menu==null)
        {
            $data = [
                'status' => false,
                'message' => 'error',
                'menu' => $menu,
            ];
            return response()->json($data, 404);
        }
        $data = [
            'status' => true,
            'message' => 'Success',
            'menu' => $menu,
        ];
        return response()->json($data, 200);
    }

    function trash()
    {
        $menus = Menu::where('status', 0)->get();
        $data = [
            'status' => true,
            'message' => 'Success',
            'menus' => $menus,
        ];
        return response()->json($data, 200);
    }

    function delete($id)
    {
        $menu = Menu::find($id);
        if ($menu == null) {
            $data = [
                'status' => false,
                'message' => 'error',
                'menu' => $menu,
            ];
            return response()->json($data, 404);
        }
        $menu->status = 0;
        $menu->updated_at = date('Y-m-d H:i:s');
        $menu->updated_by = 1; //login
        if ($menu->save()) {
            $data = [
                'status' => true,
                'message' => 'Success',
                'menu' => $menu,
            ];
            return response()->json($data, 200);
        } else {
            $data = [
                'status' => false,
                'message' => 'hghg',
                'menu' => $menu,
            ];
            return response()->json($data, 200);
        }
    }

    function destroy($id)
    {
        $menu =  Menu::find($id);
        if (!$menu) {
            $data = [
                'status' => false,
                'message' => 'error',
                'menu' => null,
            ];
            return response()->json($data, 404);
        }
        if ($menu->delete()) {
            $data = [
                'status' => true,
                'message' => 'Success',
                'menu' => null,
            ];
            return response()->json($data, 200);
        }
    }

    function restore($id)
    {
        $menu = Menu::find($id);

        $menu->status = 2;
        $menu->updated_at = date('Y-m-d H:i:s');
        $menu->updated_by = 1; //login
        if ($menu->save()) {
            $data = [
                'status' => true,
                'message' => 'Success',
                'menu' => $menu,
            ];
            return response()->json($data, 200);
        } else {
            $data = [
                'status' => false,
                'message' => 'hghg',
                'menu' => $menu,
            ];
            return response()->json($data, 200);
        }
    }

    public function store(Request $request)
    {
        // Kiểm tra nút ADDCATEGORY có được nhấn hay không
        if ($request->has('ADDCATEGORY')) {
            $categoryIds = $request->categoryid;
    
            // Kiểm tra xem $categoryIds là một mảng
          
                foreach ($categoryIds as $categoryId) {
                    $category = Category::find($categoryId);
    
                    // Kiểm tra xem có category được tìm thấy hay không
                    if ($category) {
                        $menu = new Menu();
    
                        // Thực hiện các thao tác với menu
                        $menu->table_id = $category->id;
                        $menu->name = $category->name;
                        $menu->sort_order = 1;
                        $menu->parent_id = 0;
                        $menu->link = "/category/" . $category->slug;
                        $menu->description = $category->description;
                        $menu->type = "category";
                        $menu->position = $request->position;
                        $menu->status = 2;
                        $menu->created_at = now(); // Sử dụng hàm now() để lấy thời gian hiện tại
                        $menu->created_by = 1; // Thay đổi tùy thuộc vào logic của bạn
    
                        // Lưu menu vào cơ sở dữ liệu
                        $menu->save();
                    } else {
                        return response()->json(['error' => 'Category not found.'], 404);
                    }
                }
    
                $data = [
                    'status' => true,
                    'message' => 'Success',
                    'menu' => $menu,  // Chú ý: Nếu bạn muốn trả về danh sách tất cả các menus thay vì chỉ menu cuối cùng, bạn cần sử dụng một mảng để lưu trữ các menu và trả về mảng đó.
                ];
                
                return response()->json($data, 200);
            }
        if ($request->has('ADDBRAND')) {
            $brandIds = $request->brandid;
    
            // Kiểm tra xem $brandIds là một mảng
          
                foreach ($brandIds as $brandId) {
                    $brand = Brand::find($brandId);
    
                    // Kiểm tra xem có brand được tìm thấy hay không
                    if ($brand) {
                        $menu = new Menu();
    
                        // Thực hiện các thao tác với menu
                        $menu->table_id = $brand->id;
                        $menu->name = $brand->name;
                        $menu->sort_order = 1;
                        $menu->parent_id = 0;
                        $menu->link = "/brand/" . $brand->slug;
                        $menu->description = $brand->description;
                        $menu->type = "brand";
$menu->position = $request->position;
                        $menu->status = 2;
                        $menu->created_at = now(); // Sử dụng hàm now() để lấy thời gian hiện tại
                        $menu->created_by = 1; // Thay đổi tùy thuộc vào logic của bạn
    
                        // Lưu menu vào cơ sở dữ liệu
                        $menu->save();
                    } else {
                        return response()->json(['error' => 'Category not found.'], 404);
                    }
                }
    
                $data = [
                    'status' => true,
                    'message' => 'Success',
                    'menu' => $menu,  // Chú ý: Nếu bạn muốn trả về danh sách tất cả các menus thay vì chỉ menu cuối cùng, bạn cần sử dụng một mảng để lưu trữ các menu và trả về mảng đó.
                ];
                
                return response()->json($data, 200);
            }
        if ($request->has('ADDTOPIC')) {
            $topicIds = $request->topicid;
    
            // Kiểm tra xem $topicIds là một mảng
          
                foreach ($topicIds as $topicId) {
                    $topic = Topic::find($topicId);
    
                    // Kiểm tra xem có topic được tìm thấy hay không
                    if ($topic) {
                        $menu = new Menu();
    
                        // Thực hiện các thao tác với menu
                        $menu->table_id = $topic->id;
                        $menu->name = $topic->name;
                        $menu->sort_order = 1;
                        $menu->parent_id = 0;
                        $menu->link = "/topic/" . $topic->slug;
                        $menu->description = $topic->description;
                        $menu->type = "topic";
                        $menu->position = $request->position;
                        $menu->status = 2;
                        $menu->created_at = now(); // Sử dụng hàm now() để lấy thời gian hiện tại
                        $menu->created_by = 1; // Thay đổi tùy thuộc vào logic của bạn
    
                        // Lưu menu vào cơ sở dữ liệu
                        $menu->save();
                    } else {
                        return response()->json(['error' => 'Category not found.'], 404);
                    }
                }
    
                $data = [
                    'status' => true,
                    'message' => 'Success',
                    'menu' => $menu,  // Chú ý: Nếu bạn muốn trả về danh sách tất cả các menus thay vì chỉ menu cuối cùng, bạn cần sử dụng một mảng để lưu trữ các menu và trả về mảng đó.
                ];
                
                return response()->json($data, 200);
            }
        if ($request->has('ADDPAGE')) {
$pageIds = $request->pageid;
    
            // Kiểm tra xem $pageIds là một mảng
          
                foreach ($pageIds as $pageId) {
                    $page = Post::find($pageId);
    
                    // Kiểm tra xem có page được tìm thấy hay không
                    if ($page) {
                        $menu = new Menu();
    
                        // Thực hiện các thao tác với menu
                        $menu->table_id = $page->id;
                        $menu->name = $page->title;
                        $menu->sort_order = 1;
                        $menu->parent_id = 0;
                        $menu->link = "/page/" . $page->slug;
                        $menu->description = $page->description;
                        $menu->type = "page";
                        $menu->position = $request->position;
                        $menu->status = 2;
                        $menu->created_at = now(); // Sử dụng hàm now() để lấy thời gian hiện tại
                        $menu->created_by = 1; // Thay đổi tùy thuộc vào logic của bạn
    
                        // Lưu menu vào cơ sở dữ liệu
                        $menu->save();
                    } else {
                        return response()->json(['error' => 'Category not found.'], 404);
                    }
                }
    
                $data = [
                    'status' => true,
                    'message' => 'Success',
                    'menu' => $menu,  // Chú ý: Nếu bạn muốn trả về danh sách tất cả các menus thay vì chỉ menu cuối cùng, bạn cần sử dụng một mảng để lưu trữ các menu và trả về mảng đó.
                ];
                
                return response()->json($data, 200);
            }
      
        if ($request->has('ADDCUSTOM')) {
                        $menu = new Menu();
    
                        // Thực hiện các thao tác với menu
                        $menu->name = $request->name;
                        $menu->sort_order = 1;
                        $menu->parent_id = 0;
                        $menu->link =$request->link;
                        $menu->type = "custom";
                        $menu->position = $request->position;
                        $menu->status = 2;
                        $menu->created_at = now(); // Sử dụng hàm now() để lấy thời gian hiện tại
                        $menu->created_by = 1; // Thay đổi tùy thuộc vào logic của bạn
    
                        // Lưu menu vào cơ sở dữ liệu
                        $menu->save();
    
                $data = [
                    'status' => true,
                    'message' => 'Success',
'menu' => $menu,  // Chú ý: Nếu bạn muốn trả về danh sách tất cả các menus thay vì chỉ menu cuối cùng, bạn cần sử dụng một mảng để lưu trữ các menu và trả về mảng đó.
                ];
                
                return response()->json($data, 200);
            }
      
       
    }

    function update(Request $request, $id)
    {
        $menu = Menu::find($id);
        if ($menu == null) {
            $data = [
                'status' => false,
                'message' => 'error',
                'menu' => $menu,
            ];
            return response()->json($data, 404);
        }
        $menu->name = $request->name;
        $menu->table_id = $request->table_id;
        $menu->sort_order = $request->sort_order;
        $menu->parent_id = $request->parent_id;
        $menu->link = $request->link;
        $menu->type = $request->type;
        $menu->description = $request->description;
        $menu->position = $request->position;
        $menu->status = $request->status;
        $menu->updated_at = date('Y-m-d H:i:s');
        $menu->updated_by = 1; //login
       

        
        
        if ($menu->save()) {
            $data = [
                'status' => true,
                'message' => 'Success',
                'menu' => $menu,
            ];
            return response()->json($data, 200);
        } else {
            $data = [
                'status' => false,
                'message' => 'hghg',
                'menu' => $menu,
            ];
            return response()->json($data, 200);
        }
    }
}
