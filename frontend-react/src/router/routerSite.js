import ProductItemSale from "../components/ProductItemSale.js";
import Home from "../pages/frontend/Home";
import Login from "../pages/frontend/Home/Login.js";
import Product from "../pages/frontend/Product";
import ProductDetail from "../pages/frontend/ProductDetail.js";
import Cart from "../pages/frontend/Cart/Cart.js";
import ProductHotBuy from "../pages/frontend/Product/ProductHotBuy.js";
import ProductNew from "../pages/frontend/Product/ProductNew.js";
import ProductSale from "../pages/frontend/Product/ProductSale.js";
import ProductAll from "../pages/frontend/Product/ProductAll.js";
import Register from "../pages/frontend/Home/Register.js";
import SearchProduct from "../pages/frontend/Product/SearchProduct.js";
import PostAll from "../pages/frontend/Post/PostAll.js";
import PostDetail from "../pages/frontend/Post/PostDetail.js";
import PageDetail from "../pages/frontend/Page/PageDetail.js";
import ManageAccount from "../pages/frontend/Home/ManageAccount.js";
import ChangePassword from "../pages/frontend/Home/ChangePassword.js";


const routerSite = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/manage-account', component: ManageAccount },
  { path: '/change-password', component: ChangePassword },
  { path: '/register', component: Register },
  { path: '/product', component: Product },
  { path: '/product/', component: ProductAll },
  { path: '/product-detail/:slug', component: ProductDetail },
  { path: '/product/productsale', component: ProductSale },
  { path: '/product/productnew', component: ProductNew },
  { path: '/product/producthotbuy', component: ProductHotBuy },
  { path: '/product/searchproduct', component: SearchProduct },
  { path: '/post', component: PostAll },
  { path: '/post-detail/:id', component: PostDetail },
  { path: '/pages/:id', component: PageDetail },
  { path: '/cart', component: Cart },
];


export default routerSite;
