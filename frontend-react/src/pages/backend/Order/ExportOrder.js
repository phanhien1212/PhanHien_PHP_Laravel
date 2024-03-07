import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductService from "../../../service/ProductService";
import CategoryService from "../../../service/CategoryService";
import BrandService from "../../../service/BrandService";
import { urlImage } from "../../../config";
import UserService from "../../../service/UserService";
import { useParams } from "react-router-dom";
import OrderService from "../../../service/OrderService";
const ExportOrder = () => {
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [idCustomer, setIdCustomer] = useState("");
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [load, setLoad] = useState(Date.now());
    const [productSelects, setProductSelects] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [orderDetails, setOrderDetails] = useState([]);
    useEffect(() => {
        (async () => {
            const result = await UserService.getList();
            setUsers(result.data.users);


        })();
    }, [load]);


    useEffect(() => {
        (async () => {
            const result = await ProductService.getList();
            setProducts(result.data.products);

        })();
    }, [load]);

    useEffect(() => {
        (async () => {
            const result2 = await CategoryService.getList();
            setCategories(result2.data.categories);

        })();
    }, [load]);

    useEffect(() => {
        (async () => {
            const result3 = await BrandService.getList();
            setBrands(result3.data.brands);

        })();
    }, [load]);

    const SaveKH = async (id) => {
        try {
            (async () => {
                const result = await UserService.getById(id);

                const user = result.data.user;
                setName(user.name)
                setPhone(user.phone)
                setEmail(user.email)
                setAddress(user.address)
                setIdCustomer(user.id)

            })();
            setLoad(Date.now()); // Kích hoạt tải lại sản phẩm sau khi gửi thành công
        } catch (error) {
            console.error("Lỗi khi gửi khuyến mãi sản phẩm:", error);
            if (error.response) {
                console.error("Dữ liệu phản hồi:", error.response.data);
            }
        }
    };

    const getCategoryName = (categoryId) => {
        const category = categories.find((cat) => cat.id === categoryId);
        return category ? category.name : "Không có";
    };
    const getBrandName = (brandId) => {
        const brand = brands.find((brand) => brand.id === brandId);
        return brand ? brand.name : "Không có";
    };


    const HandleSelectProduct = async (id) => {
        const  ElImage= document.querySelector("#image" + id);
        const  Elname= document.querySelector("#name" + id);
        const  Elcategoryname= document.querySelector("#categoryname" + id);
        const  Elbrandname= document.querySelector("#brandname" + id);
        const  Elprice= document.querySelector("#price" + id);
        const productselect={
          id:id,
          image:ElImage.value,
          name:Elname.value,
          categoryname:Elcategoryname.value,
          brandname:Elbrandname.value,
          price:Elprice.value,
        }
    
       var arrayNew=[...productSelects,productselect];
       setProductSelects(arrayNew);
       const updatedOrderDetails = [...orderDetails, {
        id: id,
        qty: quantities[id] || 0,
      }];
      setOrderDetails(updatedOrderDetails);
    
      };

    const handleQtyChange = (productId, event) => {
        const newQuantities = { ...quantities, [productId]: parseInt(event.target.value, 10) || 0 };
        setQuantities(newQuantities);
    };

    const getTotal = (productId) => {
        const qty = quantities[productId] || 0;
        const product = productSelects.find(product => product.id === productId);
        return qty * product.price;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const data = {
            user_id: idCustomer,
            listcart: orderDetails.map(orderDetail => ({
              id: orderDetail.id,
              qty: quantities[orderDetail.id] || 0,
            })),
          };
    
          
          const response = await OrderService.storeexport(data);
    
          
          if (response.status === 200) {
            alert("Tạo đơn hàng mới thành công")
            setLoad(Date.now()); 
          } else {
            console.error("Lỗi khi tạo đơn hàng:", response.data);
          }
        } catch (error) {
          console.error("Lỗi khi gửi đơn hàng:", error);
        }
      };


      const handleRemoveProduct = (productId) => {
        // Lọc ra danh sách sản phẩm mới mà không chứa sản phẩm có ID cần xóa
        const updatedProducts = productSelects.filter((product) => product.id !== productId);
        setProductSelects(updatedProducts);
      };
    return (
        <div>

            <section className="content-header my-2">
                <h1 className="d-inline">Xuất Hàng</h1>
                <a href className="btn btn-secondary btn-sm">Thêm mới</a>
                <div className="row mt-3 align-items-center">
                    <div className="col-6">
                        <ul className="manager">
                            <li><a href="#">Tất cả (123)</a></li>
                            <li><a href="#">Xuất bản (12)</a></li>
                            <li><a href="#">Rác (12)</a></li>
                        </ul>
                    </div>
                    <div className="col-6 text-end">
                        <input type="text" className="search d-inline" />
                        <button className="d-inline btnsearch">Tìm kiếm</button>
                    </div>
                </div>
                <div className="row mt-1 align-items-center">
                    <div className="col-md-8">
                        <select name className="d-inline me-1">
                            <option value>Hành động</option>
                            <option value>Bỏ vào thùng rác</option>
                        </select>
                        <button className="btnapply">Áp dụng</button>
                        <select name className="d-inline me-1">
                            <option value>Tất cả danh mục</option>
                        </select>
                        <select name className="d-inline me-1">
                            <option value>Tất cả thương hiệu</option>
                        </select>
                        <button className="btnfilter">Lọc</button>
                    </div>
                    <div className="col-md-4 text-end">
                        <nav aria-label="Page navigation example">
                            <ul className="pagination pagination-sm justify-content-end">
                                <li className="page-item disabled">
                                    <a className="page-link">«</a>
                                </li>
                                <li className="page-item"><a className="page-link" href="#">1</a></li>
                                <li className="page-item"><a className="page-link" href="#">2</a></li>
                                <li className="page-item"><a className="page-link" href="#">3</a></li>
                                <li className="page-item">
                                    <a className="page-link" href="#">»</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </section>
            <section className="content-body my-2">
                <div className="row">
                    <div class="col-12 my-2">
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                            Chọn khách hàng
                        </button>

                        <div class="modal fade in" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content" style={{ width: 800, right: 50 }}>
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-1" id="staticBackdropLabel">Tất cả khách hàng</h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">

                                        <section className="content-body my-2">
                                            <table className="table table-bordered" id="mytable2">
                                                <thead>
                                                    <tr>
                                                        <th className="text-center" style={{ width: 30 }}>
                                                            <input type="checkbox" id="checkboxAll" />
                                                        </th>
                                                        <th>Id</th>
                                                        <th>Họ tên</th>
                                                        <th>Giới tính</th>
                                                        <th>Email</th>
                                                        <th>Phone</th>
                                                        <th>Address</th>

                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {users && users.map((user, index) => (
                                                        <tr className="datarow">
                                                            <td className="text-center">
                                                                <input type="checkbox" id="checkId" />
                                                            </td>

                                                            <td>
                                                                <div className="name">
                                                                    {user.id}
                                                                </div>

                                                            </td>
                                                            <td> {user.name}</td>
                                                            <td> {user.gender}</td>
                                                            <td> {user.email}</td>
                                                            <td> {user.phone}</td>
                                                            <td>
                                                                {user.address}
                                                            </td>

                                                            <td>
                                                                <button class="text-center" onClick={() => SaveKH(user.id)} style={{ backgroundColor: '#04AA6D', borderRadius: "6px", border: 'none', color: 'white', fontSize: 16, width: 100, height: 35 }}>Chọn KH</button>
                                                            </td>

                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </section>

                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="button" class="btn btn-primary">Understood</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
                <form action id="mona-register-popup">
                    <div className="row" id="rowshowcustome">
                        <div className="col-md-2">
                            <label>Họ tên (*)</label>
                            <input type="text" value={name} name="delivery_name" className="form-control" readOnly />
                        </div>
                        <div className="col-md-3">
                            <label>Email (*)</label>
                            <input type="text" value={email} name="delivery_email" className="form-control" readOnly />
                        </div>
                        <div className="col-md-2">
                            <label>Điện thoại (*)</label>
                            <input type="text" value={phone} name="delivery_phone" className="form-control" readOnly />
                        </div>
                        <div className="col-md-3">
                            <label>Địa chỉ (*)</label>
                            <input type="text" value={address} name="delivery_address" className="form-control" readOnly />
                        </div>
                        <input type="hidden"  value={idCustomer} name="user_id" />
                        
                        
                    </div>
                </form>
                <div className="row my-3">
                    <div className="col-12 my-2">
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#chonsanpham">
                            Chọn sản phẩm
                        </button>

                        <div class="modal fade in" id="chonsanpham" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content" style={{ width: 1000, right: 110 }}>
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-1" id="staticBackdropLabel">Tất cả sản phẩm</h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">

                                        <section className="content-body my-2">
                                            <table className="table table-bordered" id="mytable2">
                                                <thead>
                                                    <tr>
                                                        <th className="text-center" style={{ width: 30 }}>
                                                            <input type="checkbox" id="checkboxAll" />
                                                        </th>
                                                        <th className="text-center" style={{ width: 90 }}>
                                                            Hình ảnh
                                                        </th>
                                                        <th>Tên sản phẩm</th>
                                                        <th>Tên danh mục</th>
                                                        <th>Tên thương hiệu</th>
                                                        <th style={{ width: 180 }} className="text-center">
                                                            Giá
                                                        </th>

                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {products && products.map((product, index) => (
                                                        <tr className="datarow">
                                                            <td className="text-center">
                                                                <input type="checkbox" id="checkId" />
                                                            </td>

                                                            <td>
                                                                <input
                                                                    type="hidden"
                                                                    id={"image" + product.id}
                                                                    name="image"
                                                                    style={{ width: 180 }}
                                                                    value={product.image}
                                                                />
                                                                <img
                                                                    className="img-fluid"
                                                                    src={urlImage + "product/" + product.image}

                                                                    alt="product.jpg"
                                                                />

                                                            </td>
                                                            <td> <input
                                                                type="hidden"
                                                                id={"name" + product.id}
                                                                name="name"
                                                                value={product.name}
                                                                style={{ width: 180 }}
                                                            />{product.name}</td>
                                                            <td><input
                                                                type="hidden"
                                                                id={"categoryname" + product.id}
                                                                name="categoryname"
                                                                value={getCategoryName(product.category_id)}
                                                                style={{ width: 180 }}
                                                            />{getCategoryName(product.category_id)} </td>
                                                            <td><input
                                                                type="hidden"
                                                                value={getBrandName(product.brand_id)}
                                                                id={"brandname" + product.id}
                                                                name="brandname"
                                                                style={{ width: 180 }}
                                                            />{getBrandName(product.brand_id)} </td>
                                                            <td> <input
                                                                type="hidden"
                                                                id={"price" + product.id}
                                                                name="price"
                                                                style={{ width: 180 }}
                                                                value={product.price}
                                                            />{product.price}</td>

                                                            <td>
                                                                <button class="text-center" onClick={() => HandleSelectProduct(product.id)} style={{ backgroundColor: '#04AA6D', borderRadius: "6px", border: 'none', color: 'white', fontSize: 16, width: 100, height: 35 }}>Thêm SP</button>
                                                            </td>

                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </section>

                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="button" class="btn btn-primary">Understood</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-12">
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th className="text-center" style={{ width: 140 }}>Hình ảnh</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Tên danh mục</th>
                                    <th>Tên thương hiệu</th>
                                    <th>Giá</th>
                                    <th>Số lượng</th>
                                    <th>Thành tiền</th>
                                    <th />
                                </tr>
                            </thead>
                            <tbody id="bodyproduct">
                                {productSelects && productSelects.map((product, index) => (
                                    <tr>
                                        <td>
                                            <img className="img-fluid" src={urlImage + "product/" + product.image} alt="h" />
                                        </td>
                                        <td>{product.name}</td>
                                        <td>{product.categoryname}</td>
                                        <td>{product.brandname}</td>
                                        <td>{product.price}</td>
                                        <td><input style={{ width: 60 }} onChange={(e) => handleQtyChange(product.id, e)} name="qty[]" type="number" min={0} />
                                        </td>
                                        <td>{getTotal(product.id)}</td>
                                        <td>
                                            <button onClick={() => handleRemoveProduct(product.id)} className="btn btn-danger btn-xs px-2">X</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="col-md">
                            <button type="submit" style={{top:20}} className="rs-form btn-pri c-whi form__submit-small m-btn-loading disabled">
                                Tạo đơn hàng                         
                            </button>
                        </div>
                    </div>
                </div>
                </form>
            </section>
        </div>

    );
}

export default ExportOrder;