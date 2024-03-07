import { urlImage } from "../../../config";
import { useEffect, useState } from "react";
import ProductService from "../../../service/ProductService";
const TrashProduct = () => {
    const [products, setProducts] = useState([]);
    const [load, setLoad] = useState(Date.now());
    useEffect(() => {
        (async () => {
            const result = await ProductService.getList1();
            setProducts(result.data.products);
        })();
    }, [load]);
    const handDestroy = (id) => {
        (async () =>{
            const result = await ProductService.destroy(id);
             if(result.data.status === true)
             {
                 setLoad(Date.now());
             }
             })();  
      };

    const handRestore = (id) => {
        (async () => {
           
                const result = await ProductService.restore(id);
                if (result.data.status === true) {
                   
                    setLoad(Date.now());
                }
        })();
    };
    return (
        <div>
            <section className="content-header my-2">
                <h1 className="d-inline">Thùng rác sản phẩm</h1>
                <div className="row mt-3 align-items-center">
                    <div className="col-6">
                        <ul className="manager">
                            <li><a href="product_index.html">Tất cả (123)</a></li>
                            <li><a href="#">Xuất bản (12)</a></li>
                            <li><a href="product_trash.html">Rác (12)</a></li>
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
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th className="text-center" style={{ width: 30 }}>
                                <input type="checkbox" id="checkboxAll" />
                            </th>
                            <th className="text-center" style={{ width: 130 }}>Hình ảnh</th>
                            <th>Tên sản phẩm</th>
                            <th>Tên danh mục</th>
                            <th>Tên thương hiệu</th>
                            <th className="text-center" style={{ width: 30 }}>ID</th>
                        </tr>
                    </thead>
                    <tbody>
                    {products && products.map((product,index ) => (
                        <tr className="datarow">
                            <td>
                                <input type="checkbox" id="checkId" />
                            </td>
                            <td>
                                <img className="img-fluid" src={urlImage + "product/" + product.image} alt="product.jpg" />
                            </td>
                            <td>
                                <div className="name">
                                    <a href="product_edit.html">
                                        {product.name}
                                    </a>
                                </div>
                                <div className="function_style">
                                    <a href="#" className="btn btn-primary btn-sm" onClick={() => handRestore(product.id)}>
                                        <i className="fa fa-undo" />
                                    </a>
                                    <a href="#" className="btn btn-danger btn-sm" onClick={() => handDestroy(product.id)}>
                                        <i className="fa fa-trash" />
                                    </a>
                                </div>
                            </td>
                            <td>Tên danh mục</td>
                            <td>Tên Thuong hiệu</td>
                            <td className="text-center">{product.id}</td>
                        </tr>
                         ))}
                    </tbody>
                </table>
            </section>
        </div>

    );
}

export default TrashProduct;