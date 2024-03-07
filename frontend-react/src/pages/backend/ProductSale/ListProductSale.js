import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductService from "../../../service/ProductService";
import { urlImage } from "../../../config";
const ListProductSale = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        (async () => {
            const result = await ProductService.productsaleadmin();
            setProducts(result.data.products);
        })();
    }, []);
    
    return (
        <div>
            <section className="content-header my-2">
                <h1 className="d-inline">Khuyến mãi</h1>

              <Link to="/admin/productsale/createproductsale" className="btn-add">Thêm mới</Link>


                <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                ...
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary">Understood</button>
                            </div>
                        </div>
                    </div>
                </div>

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
                <table className="table table-bordered" id="mytable2">
                    <thead>
                        <tr>
                            <th className="text-center" style={{ width: 30 }}>
                                <input type="checkbox" id="checkboxAll" />
                            </th>
                            <th className="text-center"  style={{ width: 90 }}>Hình ảnh</th>
                            <th>Tên sản phẩm</th>
                            <th>Giá bán</th>
                            <th>Ngày BĐ</th>
                            <th>Ngày kết thúc</th>
                            <th>Giá sale</th>
                        </tr>
                    </thead>
                    <tbody>
                    {products && products.map((product, index) => (
                        <tr className="datarow">
                            <td className="text-center">
                                <input type="checkbox" id="checkId" />
                            </td>
                            <td>
                                <img style={{ width: 90 }} src={urlImage + "product/" + product.image} alt="hh" />
                            </td>
                            <td>
                                <div className="name">
                                    {product.name}
                                </div>
                                <div className="function_style">
                                    <a className="mx-1 text-success" href="#">
                                        <i className="fas fa-toggle-on" />
                                    </a>
                                    <a className="mx-1 text-primary" href="#">
                                        <i className="fas fa-edit" />
                                    </a>
                                    <a className="mx-1 text-info" href="#">
                                        <i className="fas fa-eye" />
                                    </a>
                                    <a className="mx-1 text-danger" href="#">
                                        <i className="fas fa-trash" />
                                    </a>
                                </div>
                            </td>
                            <td>{product.price}</td>
                            <td>{product.date_begin}</td>
                            <td>{product.date_end}</td>
                            <td>{product.pricesale}</td>
                        </tr>
                         ))}
                    </tbody>
                </table>
            </section>
        </div>

    );
}

export default ListProductSale;