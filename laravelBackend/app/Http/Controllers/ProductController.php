<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Orderdetail;
use App\Models\Post;
use App\Models\Product;
use App\Models\ProductSale;
use App\Models\ProductStore;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ProductController extends Controller
{

    function index()
    {
        $products = Product::whereIn('status', [1, 2])->get();
        $data = [
            'status' => true,
            'message' => 'Success',
            'products' => $products,
        ];
        return response()->json($data, 200,);
    }

    function indexsale()
    {
        $products = ProductSale::all();
        $data = [
            'status' => true,
            'message' => 'Success',
            'products' => $products,
        ];
        return response()->json($data, 200,);
    }

    function trash()
    {
        $products = Product::where('status', 0)->get();
        $data = [
            'status' => true,
            'message' => 'Success',
            'products' => $products,
        ];
        return response()->json($data, 200);
    }

    function show($id)
    {
        $product = Product::find($id);
        if ($product == null) {
            $data = [
                'status' => false,
                'message' => 'error',
                'product' => $product,
            ];
            return response()->json($data, 404);
        }
        $data = [
            'status' => true,
            'message' => 'Success',
            'product' => $product,
        ];
        return response()->json($data, 200);
    }

    function showSlug($slug)
    {
        $product = Product::where('slug', $slug)->first();
        if ($product == null) {
            $data = [
                'status' => false,
                'message' => 'error',
                'product' => $product,
            ];
            return response()->json($data, 404);
        }
        $data = [
            'status' => true,
            'message' => 'Success',
            'product' => $product,
        ];
        return response()->json($data, 200);
    }

    function store(Request $request)
    {
        $product = new Product();
        $product->name = $request->name;
        $product->slug = Str::of($request->name)->slug('-');
        $product->brand_id = $request->brand_id;
        $product->category_id = $request->category_id;
        $product->description = $request->description;
        $product->detail = $request->detail;
        $product->price = $request->price;
        $product->status = $request->status;
        $product->created_at = date('Y-m-d H:i:s');
        $product->created_by = 1; //login

        if ($request->image != null) {
            $extension = $request->image->getClientOriginalExtension();
            if (in_array($extension, ['png', 'jpg', 'gif', 'webp'])) {
                $fileName = date('YmdHis') . '.' . $extension;
                $request->image->move(public_path('images/product'), $fileName);
                $product->image = $fileName;
            }
        }

        if ($product->save()) {
            $data = [
                'status' => true,
                'message' => 'Success',
                'product' => $product,
            ];
            return response()->json($data, 200);
        } else {
            return response()->json($product->errors(), 422);
        }
    }

    function update(Request $request, $id)
    {
        $product = Product::find($id);
        if ($product == null) {
            $data = [
                'status' => false,
                'message' => 'error',
                'product' => $product,
            ];
            return response()->json($data, 404);
        }
        $product->name = $request->name;
        $product->slug = Str::of($request->name)->slug('-');
        $product->brand_id = $request->brand_id;
        $product->category_id = $request->category_id;
        $product->description = $request->description;
        $product->detail = $request->detail;
        $product->price = $request->price;
        $product->status = $request->status;
        $product->updated_at = date('Y-m-d H:i:s');
        $product->updated_by = 1; //login

        if ($request->hasFile('image') && $request->file('image')->isValid()) {
            $extension = $request->image->getClientOriginalExtension();

            // Kiểm tra định dạng hình ảnh
            if (in_array($extension, ['png', 'jpg', 'gif', 'webp'])) {
                $fileName = date('YmdHis') . '.' . $extension;
                $request->image->move(public_path('images/product'), $fileName);
                $product->image = $fileName;
            }
        }

        if ($product->save()) {
            $data = [
                'status' => true,
                'message' => 'Success',
                'product' => $product,
            ];
            return response()->json($data, 200);
        } else {
            $data = [
                'status' => false,
                'message' => 'hghg',
                'product' => $product,
            ];
            return response()->json($data, 200);
        }
    }
    function delete($id)
    {
        $product = Product::find($id);
        if ($product == null) {
            $data = [
                'status' => false,
                'message' => 'error',
                'product' => $product,
            ];
            return response()->json($data, 404);
        }
        $product->status = 0;
        $product->updated_at = date('Y-m-d H:i:s');
        $product->updated_by = 1; //login
        if ($product->save()) {
            $data = [
                'status' => true,
                'message' => 'Success',
                'product' => $product,
            ];
            return response()->json($data, 200);
        } else {
            $data = [
                'status' => false,
                'message' => 'hghg',
                'product' => $product,
            ];
            return response()->json($data, 200);
        }
    }

    function destroy($id)
    {
        $product = Product::find($id);
        if (!$product) {
            $data = [
                'status' => false,
                'message' => 'error',
                'product' => null,
            ];
            return response()->json($data, 404);
        }
        if ($product->delete()) {
            $data = [
                'status' => true,
                'message' => 'Success',
                'product' => null,
            ];
            return response()->json($data, 200);
        }
    }

    function restore($id)
    {
        $product = Product::find($id);

        $product->status = 2;
        $product->updated_at = date('Y-m-d H:i:s');
        $product->updated_by = 1; //login
        if ($product->save()) {
            $data = [
                'status' => true,
                'message' => 'Success',
                'product' => $product,
            ];
            return response()->json($data, 200);
        } else {
            $data = [
                'status' => false,
                'message' => 'hghg',
                'product' => $product,
            ];
            return response()->json($data, 200);
        }
    }

    public function productcategory($limit, $category_id = 0)
    {
        $listid = array();
        array_push($listid, $category_id + 0);
        $args_cat1 = [
            ['parent_id', '=', $category_id + 0],
            ['status', '=', 1]
        ];
        $list_category1 = Category::where($args_cat1)->get();
        if (count($list_category1) > 0) {
            foreach ($list_category1 as $row1) {
                array_push($listid, $row1->id);
                $args_cat2 = [
                    ['parent_id', '=', $row1->id],
                    ['status', '=', 1]
                ];
                $list_category2 = Category::where($args_cat2)->get();
                if (count($list_category2) > 0) {
                    foreach ($list_category2 as $row2) {
                        array_push($listid, $row2->id);
                    }
                }
            }
        }
        $products = Product::where('status', '=', 1)
            ->whereIn('category_id', $listid)
            ->orderBy('created_at', 'DESC')->limit($limit)->get();
        return response()->json(
            [
                'success' => true,
                'message' => 'Tải dữ liệu thành công',
                'products' => $products
            ],
            200
        );
    }
    public function productall()
    {
        $products = Product::whereIn('status', [1, 2])->get();
        $data = [
            'status' => true,
            'message' => 'Success',
            'products' => $products,
        ];
        return response()->json($data, 200,);
    }



    function productlimit($limit)
    {
        $products = Product::where('status', '=', 1)

            ->limit($limit)
            ->get();

        $data = [
            'status' => true,
            'message' => 'Success',
            'products' => $products,
        ];
        return response()->json($data, 200);
    }


    function productnew($limit)
    {
        $productstore = ProductStore::select('product_id', DB::raw("SUM(qty) as total_qty"))
            ->groupBy('product_id');

        $products = Product::where('product.status', 1)
            ->leftJoin('productsale', 'product.id', '=', 'productsale.product_id')
            ->joinSub($productstore, "productstore", function ($join) {
                $join->on('product.id', '=', 'productstore.product_id');
            })
            ->orderBy('product.created_at', 'desc')
            ->select("product.id", "product.name", "product.image", "product.price", "product.slug", "productsale.pricesale")
            ->limit($limit)
            ->get();

        $data = [
            'status' => true,
            'message' => 'success',
            'products' => $products,
        ];

        return response()->json($data, 200);
    }



    function productsale($limit)
    {
        $productstores = ProductStore::select('product_id', DB::raw('SUM(qty) as total_qty'))
            ->groupBy('product_id')
            ->getQuery();  // Get the underlying query builder instance

        $products = Product::where('product.status', 1)
            ->whereIn('product.id', $productstores->pluck('product_id'))
            ->where('productsale.date_begin', '<=', Carbon::now())
            ->where('productsale.date_end', '>=', Carbon::now())
            ->leftJoin('productsale', function ($join) {
                $join->on('product.id', '=', 'productsale.product_id');
            })
            ->joinSub($productstores, 'productstore', function ($join) {
                $join->on('product.id', '=', 'productstore.product_id');
            })
            ->orderBy('product.created_at', 'desc')
            ->select(
                'product.id',
                'product.name',
                'product.image',
                'product.price',
                'product.slug',
                'productsale.pricesale',
                'productsale.date_begin',
                'productsale.date_end'
            )
            ->limit($limit)
            ->get();

        $data = [
            'status' => true,
            'message' => 'success',
            'products' => $products,
        ];

        return response()->json($data, 200);
    }

    function producthotbuy($limit)
    {
        // Lấy tổng số lượng sản phẩm được mua trong kho
        $productstore = ProductStore::select('product_id', DB::raw('sum(qty) as total_qty'))
            ->groupBy('product_id');

        // Lấy tổng số lượng sản phẩm được mua trong đơn hàng
        $orderdetail = Orderdetail::select('product_id', DB::raw('sum(qty) as buy_qty'))
            ->groupBy('product_id');

        // Tạo truy vấn chính
        $products = Product::where('product.status', 1)
            ->leftJoin('productsale', 'product.id', '=', 'productsale.product_id')
            ->joinSub($productstore, 'productstore', function ($join) {
                $join->on('product.id', '=', 'productstore.product_id');
            })
            ->joinSub($orderdetail, 'orderdetail', function ($join) {
                $join->on('product.id', '=', 'orderdetail.product_id');
            })
            ->orderBy('orderdetail.buy_qty', 'desc')
            ->limit($limit)
            ->get();

        $data = [
            'status' => true,
            'message' => 'success',
            'products' => $products,
        ];

        return response()->json($data, 200);
    }


    public function storesale(Request $request)
    {
        $productsale = new ProductSale();
        $productsale->product_id = $request->product_id;
        $productsale->pricesale = $request->pricesale;
        $productsale->date_begin = $request->date_begin;
        $productsale->date_end = $request->date_end;
        $productsale->qty = $request->qty ?? 0;
        $productsale->created_at = date('Y-m-d H:i:s');
        $productsale->created_by = 1;
        if ($productsale->save()) {
            $result = [
                'status' => true,
                'message' => "Thêm dữ liệu vào bảng khuyến mãi thành công",
                'productsale' => $productsale
            ];
            return response()->json($result, 200);
        }
        $result = [
            'status' => false,
            'message' => "Lỗi",
            'productsale' => null
        ];
        return response()->json($result, 200);
    }

    public function productsaleadmin()
    {
        $products = Product::where('product.status', '!=', 0)
            ->leftJoin('productsale', 'product.id', '=', 'productsale.product_id')
            ->whereNotNull('productsale.product_id') // Chỉ bao gồm sản phẩm có product_id tương ứng trong db_productstore
            ->orderBy('product.created_at', 'desc')
            ->select(
                "product.id",
                "product.name",
                "product.price",
                "product.image",
                "productsale.pricesale",
                "productsale.date_begin",
                "productsale.date_end",
            )
            ->get();

        $data = [
            'status' => true,
            'message' => 'success',
            'products' => $products,
        ];

        return response()->json($data, 200);
    }


    public function productstore()
    {
        $productstore = ProductStore::select('product_id', DB::raw('SUM(qty) as store_qty'), DB::raw('AVG(price) as store_price'))
            ->groupBy('product_id');

        $products = Product::where('product.status', '!=', 0)
            ->joinSub($productstore, 'productstore', function ($join) {
                $join->on('product.id', '=', 'productstore.product_id');
            })
            ->whereNotNull('productstore.product_id')
            ->orderBy('product.created_at', 'desc')
            ->select(
                "product.id",
                "product.name",
                "product.category_id",
                "product.brand_id",
                "product.image",
                "productstore.store_price",
                "productstore.store_qty",
            )
            ->get();

        $data = [
            'status' => true,
            'message' => 'success',
            'products' => $products,
        ];

        return response()->json($data, 200);
    }


    public function storeproductstore(Request $request)
    {
        $product = new ProductStore();
        $product->product_id = $request->product_id; //form
        $product->price = $request->price; //form
        $product->qty = $request->qty; //form
        $product->created_at = date('Y-m-d H:i:s');
        $product->created_by = 1;
        $product->save();
        if ($product->save()) {
            $data = [
                'status' => true,
                'message' => 'Success',
                'product' => $product,
            ];
            return response()->json($data, 200);
        } else {
            return response()->json($product->errors(), 422);
        }
    }

    public function search(Request $request, $keyword): JsonResponse
    {
        try {
            $indexProductsResponse = $this->index();
            $indexProductsData = json_decode($indexProductsResponse->content(), true);
            $products = $indexProductsData['products'];
    
            // Lọc danh sách sản phẩm theo từ khóa
            $filteredProducts = collect($products)->filter(function ($product) use ($keyword) {
                return stripos($product['name'], $keyword) !== false;
            })->values();
    
                           $posts = Post::where('status', '!=', 0)
                           ->where('type', 'post') // Thêm điều kiện type=post vào đây
                           ->where(function ($query) use ($keyword) {
                               $query->where('title', 'like', '%' . $keyword . '%');
                           })
                           ->get();
                       
    
            $data = [
                'status' => true,
                'message' => 'Success',
                'products' => $filteredProducts,
                'posts' => $posts,
            ];
    
            return response()->json($data, 200);
        } catch (\Exception $e) {
            $data = [
                'status' => false,
                'message' => 'Error: ' . $e->getMessage(),
            ];
    
            return response()->json($data, 500);
        }
    }

}
