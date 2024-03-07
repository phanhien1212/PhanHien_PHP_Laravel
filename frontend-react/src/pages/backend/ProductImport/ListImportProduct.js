import { useEffect, useState } from "react";
import ProductService from "../../../service/ProductService";
import CategoryService from "../../../service/CategoryService";
import BrandService from "../../../service/BrandService";
import { urlImage } from "../../../config";
import { Link } from "react-router-dom";
const ListImportProduct = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [load, setLoad] = useState(Date.now());

    useEffect(() => {
        (async () => {
            const result1 = await ProductService.productstore();
            setProducts(result1.data.products);
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

    const getCategoryName = (categoryId) => {
        const category = categories.find((cat) => cat.id === categoryId);
        return category ? category.name : "Không có";
      };
      const getBrandName = (brandId) => {
        const brand = brands.find((brand) => brand.id === brandId);
        return brand ? brand.name : "Không có";
      };
    
    return (
        <div>
            <section className="content-header my-2">
                <h1 className="d-inline">Nhập sản phẩm</h1>
                <Link to="/admin/productimport/create_import_product" className="btn-add">Thêm mới</Link>
                <div className="row mt-3 align-items-center">
                    <div className="col-12 text-end">
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
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th className="text-center" style={{ width: 90 }}>Hình ảnh</th>
                            <th>Tên sản phẩm</th>
                            <th>Tên danh mục</th>
                            <th>Tên thương hiệu</th>
                            <th style={{ width: 90 }} className="text-center">Số lượng</th>
                            <th style={{ width: 180 }} className="text-center">Giá nhập</th>
                           
                        </tr>
                    </thead>
                    <tbody>
                    {products && products.map((product, index)=> (
                        
                        <tr className="datarow">
                            <td>
                                <img className="img-fluid" src={urlImage + "product/" + product.image} alt />
                            </td>
                            <td>{product.name}</td>
                            <td>{getCategoryName(product.category_id)}</td>
                            <td>{getBrandName(product.brand_id)}</td>
                            <td>{product.store_qty}</td>
                            <td>{product.store_price}</td>
                            
                        </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>

    );
}

export default ListImportProduct;