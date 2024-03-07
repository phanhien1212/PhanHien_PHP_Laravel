import ListBanner from "../pages/backend/Banner/ListBanner";
import CreateBanner from "../pages/backend/Banner/CreateBanner";
import TrashBanner from "../pages/backend/Banner/TrashBanner";
import EditBanner from "../pages/backend/Banner/EditBanner";
import ShowBanner from "../pages/backend/Banner/ShowBanner";
import EditBrand from "../pages/backend/Brand/EditBrand";
import ListBrand from "../pages/backend/Brand/ListBrand";
import ListCategory from "../pages/backend/Category/ListCategory";
import ListContact from "../pages/backend/Contact/ListContact";
import ListCustomer from "../pages/backend/Customer/ListCustomer";
import ListMenu from "../pages/backend/Menu/ListMenu";
import ListOrder from "../pages/backend/Order/ListOrder";
import ListPage from "../pages/backend/Page/ListPage";
import CreatePage from "../pages/backend/Page/CreatePage";
import { ListPost, EditPost, CreatePost, TrashPost, ShowPost } from "../pages/backend/Post";
import ListProduct from "../pages/backend/Product/ListProduct";
import CreateProduct from "../pages/backend/Product/CreateProduct";
import EditProduct from "../pages/backend/Product/EditProduct";
import ListTopic from "../pages/backend/Topic/ListTopic";
import ListUser from "../pages/backend/User/ListUser";
import TrashUser from "../pages/backend/User/TrashUser";
import EditUser from "../pages/backend/User/EditUser";
import ShowUser from "../pages/backend/User/ShowUser";
import ShowBrand from "../pages/backend/Brand/ShowBrand";
import TrashBrand from "../pages/backend/Brand/TrashBrand";
import EditCategory from "../pages/backend/Category/EditCategory";
import TrashCategory from "../pages/backend/Category/TrashCategory";
import ShowCategory from "../pages/backend/Category/ShowCategory";
import ReplyContact from "../pages/backend/Contact/ReplyContact";
import ShowContact from "../pages/backend/Contact/ShowContact";
import TrashContact from "../pages/backend/Contact/TrashContact";
import EditTopic from "../pages/backend/Topic/EditTopic";
import TrashProduct from "../pages/backend/Product/TrashProduct";
import ListProductSale from "../pages/backend/ProductSale/ListProductSale";
import CreateProductSale from "../pages/backend/ProductSale/CreateProductSale";
import ListImportProduct from "../pages/backend/ProductImport/ListImportProduct";
import ExportOrder from "../pages/backend/Order/ExportOrder";
import CreateImportProduct from "../pages/backend/ProductImport/CreateImportProduct";
import CreateCustomer from "../pages/backend/Customer/CreateCustomer";
import EditCustomer from "../pages/backend/Customer/EditCustomer";
import TrashCustomer from "../pages/backend/Customer/TrashCustomer";
import ShowCustomer from "../pages/backend/Customer/ShowCustomer";
import CreateUser from "../pages/backend/User/CreateUser";
import ShowOrder from "../pages/backend/Order/ShowOrder";
import TrashOder from "../pages/backend/Order/TrashOrder";
import EditPage from "../pages/backend/Page/EditPage";
import TrashPage from "../pages/backend/Page/TrashPage";
import EditMenu from "../pages/backend/Menu/EditMenu";
import ShowMenu from "../pages/backend/Menu/ShowMenu";
import TrashMenu from "../pages/backend/Menu/TrashMenu";
import Config from "../pages/backend/Config/Config";


const routerAdmin = [
  { path: '/admin/config', component: Config },
  { path: '/admin/brand', component: ListBrand },
  { path: '/admin/brand/edit/:id', component: EditBrand },
  { path: '/admin/brand/show/:id', component: ShowBrand },
  { path: '/admin/brand/trash/', component: TrashBrand },
  { path: '/admin/category/', component: ListCategory },
  { path: '/admin/category/edit/:id', component: EditCategory },
  { path: '/admin/category/show/:id', component: ShowCategory },
  { path: '/admin/category/trash/', component: TrashCategory },
  { path: '/admin/contact/', component: ListContact },
  { path: '/admin/contact/reply/:id', component: ReplyContact },
  { path: '/admin/contact/show/:id', component: ShowContact },
  { path: '/admin/contact/trash', component: TrashContact },
  { path: '/admin/menu/', component: ListMenu },
  { path: '/admin/menu/edit/:id', component: EditMenu },
  { path: '/admin/menu/show/:id', component: ShowMenu },
  { path: '/admin/menu/trash', component: TrashMenu },
  { path: '/admin/banner/', component: ListBanner },
  { path: '/admin/banner/create', component: CreateBanner },
  { path: '/admin/banner/edit/:id', component: EditBanner },
  { path: '/admin/banner/trash', component: TrashBanner },
  { path: '/admin/banner/show/:id', component: ShowBanner },
  { path: '/admin/banner/', component: ListBanner },
  { path: '/admin/banner/', component: ListBanner },
  { path: '/admin/customer/', component: ListCustomer },
  { path: '/admin/customer/create', component: CreateCustomer },
  { path: '/admin/customer/edit/:id', component: EditCustomer },
  { path: '/admin/customer/trash', component: TrashCustomer },
  { path: '/admin/customer/show/:id', component: ShowCustomer },
  { path: '/admin/order/', component: ListOrder },
  { path: '/admin/order/order_export', component: ExportOrder },
  { path: '/admin/order/show/:id', component: ShowOrder },
  { path: '/admin/order/trash', component: TrashOder },
  { path: '/admin/page/', component: ListPage },
  { path: '/admin/page/create/', component: CreatePage },
  { path: '/admin/page/edit/:id', component: EditPage },
  { path: '/admin/page/trash', component: TrashPage },
  { path: '/admin/post/', component: ListPost },
  { path: '/admin/post/edit/:id', component: EditPost },
  { path: '/admin/post/trash/', component: TrashPost },
  { path: '/admin/post/show/:id', component: ShowPost },
  { path: '/admin/post/create/', component: CreatePost },
  { path: '/admin/product/', component: ListProduct },
  { path: '/admin/product/create', component: CreateProduct },
  { path: '/admin/product/edit/:id', component: EditProduct },
  { path: '/admin/product/trash/', component: TrashProduct },
  { path: '/admin/topic/', component: ListTopic },
  { path: '/admin/topic/edit/:id', component: EditTopic },
  { path: '/admin/user/', component: ListUser },
  { path: '/admin/user/create', component: CreateUser },
  { path: '/admin/user/trash', component: TrashUser },
  { path: '/admin/user/edit/:id', component: EditUser },
  { path: '/admin/user/show/:id', component: ShowUser },
  { path: '/admin/productsale/', component: ListProductSale },
  { path: '/admin/productsale/createproductsale', component: CreateProductSale },
  { path: '/admin/productimport/', component: ListImportProduct },
  { path: '/admin/productimport/create_import_product', component: CreateImportProduct },
];

export default routerAdmin;
