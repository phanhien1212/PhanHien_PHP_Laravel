<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BannerController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ConfigController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderdetailController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\TopicController;
use App\Http\Controllers\UserController;
use App\Models\Orderdetail;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
Route::prefix('banner')->group(function () {
    Route::get('index', [BannerController::class, 'index']); //danh sach
    Route::get('trash', [BannerController::class, 'trash']); //danh sach
    Route::get('show/{id}', [BannerController::class, 'show']); //mot mau tin
    Route::post('store', [BannerController::class, 'store']); // luu moi
    Route::post('updateStatus/{id}', [BannerController::class, 'updateStatus']); // cap nhat
    Route::post('update/{id}', [BannerController::class, 'update']); // cap nhat
    Route::post('delete/{id}', [BannerController::class, 'delete']); // cap nhat
    Route::delete('destroy/{id}', [BannerController::class, 'destroy']); 
    Route::post('restore/{id}', [BannerController::class, 'restore']); 
   
    
});
Route::prefix('brand')->group(function () {
    Route::get('index', [BrandController::class, 'index']); //danh sach
    Route::get('trash', [BrandController::class, 'trash']); //danh sach
    Route::get('show/{id}', [BrandController::class, 'show']); //mot mau tin
    Route::post('store', [BrandController::class, 'store']); // luu moi
    Route::post('updateStatus/{id}', [BrandController::class, 'updateStatus']); // cap nhat
    Route::post('update/{id}', [BrandController::class, 'update']); // cap nhat
    Route::post('delete/{id}', [BrandController::class, 'delete']); // cap nhat
    Route::delete('destroy/{id}', [BrandController::class, 'destroy']); 
    Route::post('restore/{id}', [BrandController::class, 'restore']); 
   
    
});

Route::prefix('category')->group(function () {
    Route::get('index', [CategoryController::class, 'index']); //danh sach
    Route::get('trash', [CategoryController::class, 'trash']); //danh sach
    Route::get('show/{id}', [CategoryController::class, 'show']); //mot mau tin
    Route::post('store', [CategoryController::class, 'store']); // luu moi
    Route::post('update/{id}', [CategoryController::class, 'update']); // cap nhat
    Route::post('delete/{id}', [CategoryController::class, 'delete']); // cap nhat
    Route::delete('destroy/{id}', [CategoryController::class, 'destroy']); // xoa
    Route::post('restore/{id}', [CategoryController::class, 'restore']); 
   
});

Route::prefix('config')->group(function () {
    Route::get('index', [ConfigController::class, 'index']); //danh sach
    Route::post('store', [ConfigController::class, 'store']); 
});

Route::prefix('contact')->group(function () {
    Route::get('index', [ContactController::class, 'index']); //danh sach
    Route::get('trash', [ContactController::class, 'trash']); 
    Route::get('show/{id}', [ContactController::class, 'show']); //mot mau tin
    Route::post('reply/{id}', [ContactController::class, 'reply']); // luu moi
    Route::delete('destroy/{id}', [ContactController::class, 'destroy']); 
    Route::post('delete/{id}', [ContactController::class, 'delete']);// xoa
    Route::post('restore/{id}', [ContactController::class, 'restore']); 
});

Route::prefix('menu')->group(function () {
    Route::get('index', [MenuController::class, 'index']); //danh sach
    Route::get('show/{id}', [MenuController::class, 'show']); //mot mau tin
    Route::get('trash', [MenuController::class, 'trash']); 
    Route::post('store', [MenuController::class, 'store']); // luu moi
    Route::post('update/{id}', [MenuController::class, 'update']); // cap nhat
    Route::delete('destroy/{id}', [MenuController::class, 'destroy']); // xoa
    Route::post('delete/{id}', [MenuController::class, 'delete']);
    Route::post('restore/{id}', [MenuController::class, 'restore']); 
});


Route::prefix('order')->group(function () {
    Route::get('index', [OrderController::class, 'index']); //danh sach
    Route::get('show/{id}', [OrderController::class, 'show']); //mot mau tin
    Route::delete('destroy/{id}', [OrderController::class, 'destroy']);
    Route::get('trash', [OrderController::class, 'trash']); 
    Route::post('delete/{id}', [OrderController::class, 'delete']);
    Route::post('restore/{id}', [OrderController::class, 'restore']); 
    Route::post('storeexport', [OrderController::class, 'storeexport']); // xoa  
    Route::post('dathang', [OrderController::class, 'dathang']); 
    Route::get('productorder/{id}', [OrderController::class, 'productorder']); 
});


Route::prefix('orderdetail')->group(function () {
    Route::get('index', [OrderdetailController::class, 'index']); //danh sach
    Route::get('show/{id}', [OrderdetailController::class, 'show']); //mot mau tin
    Route::post('store', [OrderdetailController::class, 'store']); // luu moi
    Route::post('update/{id}', [OrderdetailController::class, 'update']); // cap nhat
    Route::delete('destroy/{id}', [OrderdetailController::class, 'destroy']); // xoa
});

Route::prefix('post')->group(function () {
    Route::get('index', [PostController::class, 'index']); //danh sach
    Route::get('show/{id}', [PostController::class, 'show']); //mot mau tin
    Route::get('trash', [PostController::class, 'trash']); //danh sach
    Route::post('store', [PostController::class, 'store']); // luu moi
    Route::post('update/{id}', [PostController::class, 'update']); // cap nhat
    Route::post('delete/{id}', [PostController::class, 'delete']); // cap nhat
    Route::post('restore/{id}', [PostController::class, 'restore']); 
    Route::delete('destroy/{id}', [PostController::class, 'destroy']); // xoa
});

Route::prefix('page')->group(function () {
    Route::get('index', [PageController::class, 'index']); //danh sach
    Route::get('show/{id}', [PageController::class, 'show']); //mot mau tin
    Route::get('trash', [PageController::class, 'trash']); //danh sach
    Route::post('store', [PageController::class, 'store']); // luu moi
    Route::post('update/{id}', [PageController::class, 'update']); // cap nhat
    Route::post('delete/{id}', [PageController::class, 'delete']); // cap nhat
    Route::post('restore/{id}', [PageController::class, 'restore']); 
    Route::delete('destroy/{id}', [PageController::class, 'destroy']); // xoa
});

Route::prefix('topic')->group(function () {
    Route::get('index', [TopicController::class, 'index']); //danh sach
    Route::get('show/{id}', [TopicController::class, 'show']); //mot mau tin
    Route::get('trash', [TopicController::class, 'trash']); //danh sach
    Route::post('store', [TopicController::class, 'store']); // luu moi
    Route::post('update/{id}', [TopicController::class, 'update']); // cap nhat
    Route::post('delete/{id}', [TopicController::class, 'delete']); // cap nhat
    Route::delete('destroy/{id}', [TopicController::class, 'destroy']); // xoa
    Route::post('restore/{id}', [TopicController::class, 'restore']); 
});


Route::prefix('user')->group(function () {
    Route::get('index', [UserController::class, 'index']); //danh sach
    Route::get('show/{id}', [UserController::class, 'show']);
    Route::post('store', [UserController::class, 'store']);
    Route::get('trash', [UserController::class, 'trash']); //danh sach
    Route::post('update/{id}', [UserController::class, 'update']); // cap nhat
    Route::post('delete/{id}', [UserController::class, 'delete']); // cap nhat
    Route::delete('destroy/{id}', [UserController::class, 'destroy']); // xoa
    Route::post('restore/{id}', [UserController::class, 'restore']); 
});

Route::prefix('customer')->group(function () {
    Route::get('index', [CustomerController::class, 'index']); //danh sach
    Route::get('show/{id}', [CustomerController::class, 'show']);
    Route::post('store', [CustomerController::class, 'store']);
    Route::get('trash', [CustomerController::class, 'trash']); //danh sach
    Route::post('update/{id}', [CustomerController::class, 'update']); // cap nhat
    Route::post('delete/{id}', [CustomerController::class, 'delete']); // cap nhat
    Route::delete('destroy/{id}', [CustomerController::class, 'destroy']); // xoa
    Route::post('restore/{id}', [CustomerController::class, 'restore']); 
});

Route::prefix('product')->group(function () {
    Route::get('index', [ProductController::class, 'index']); //danh sach
    Route::get('indexsale', [ProductController::class, 'indexsale']); //danh sach
    Route::get('trash', [ProductController::class, 'trash']); //danh sach
    Route::get('show/{id}', [ProductController::class, 'show']); //mot mau tin
    Route::get('showSlug/{slug}', [ProductController::class, 'showSlug']); //mot mau tin
    Route::post('store', [ProductController::class, 'store']); // luu moi
    Route::post('update/{id}', [ProductController::class, 'update']); // cap nhat
    Route::post('delete/{id}', [ProductController::class, 'delete']); // cap nhat
    Route::delete('destroy/{id}', [ProductController::class, 'destroy']); // xoa
    Route::post('restore/{id}', [ProductController::class, 'restore']); 
    Route::get('productall', [ProductController::class, 'productall']); //danh sach
    Route::get('productlimit/{limit}', [ProductController::class, 'productlimit']); //danh sach
    Route::get('productnew/{limit}', [ProductController::class, 'productnew']); //danh sach
    Route::get('productsale/{limit}', [ProductController::class, 'productsale']); //danh sach
    Route::get('producthotbuy/{limit}', [ProductController::class, 'producthotbuy']);
    Route::post('storesale', [ProductController::class, 'storesale']);
    Route::get('productsaleadmin', [ProductController::class, 'productsaleadmin']);
    Route::get('productstore', [ProductController::class, 'productstore']);
    Route::post('storeproductstore', [ProductController::class, 'storeproductstore']);
    Route::get('search/{keyword}',[ProductController::class,'search']);//tìm kiếm
});

Route::post('register', [AuthController::class, 'register']);
Route::post('updatepassword/{id}',[AuthController::class,'updatepassword']);//Cập nhật
Route::post('login', [AuthController::class, 'login']);