import { useEffect, useState } from "react";
import UserService from "../../../service/UserService";
import { urlImage } from "../../../config";
import CustomerService from "../../../service/CustomerService";
import { Link } from "react-router-dom";
const ListCustomer = () => {
    const [customers, setCustomers] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState(1);
    const [load, setLoad] = useState(Date.now());
    useEffect(() => {
        (async () => {
           
            const result = await CustomerService.getList();
            setCustomers(result.data.customers);
            
        })();
    }, [load]);

    const handDelete = (id) => {
        (async () => {
            const result = await CustomerService.deleteCustomer(id);
            if (result.data.status === true) {
                setLoad(Date.now());
            }
        })();
    };
    return (
        <div>
            <section className="content-header my-2">
                <h1 className="d-inline">Khách hàng</h1>
                <a className="btn-add" href="/admin/customer/create">Thêm mới</a>
                <div className="row mt-3 align-items-center">
                    <div className="col-6">
                        <ul className="manager">
                            <li><a href="customer_index.html">Tất cả (123)</a></li>
                            <li><a href="#">Xuất bản (12)</a></li>
                            <li><a href="/admin/customer/trash">Rác (12)</a></li>
                        </ul>
                    </div>
                    <div className="col-6 text-end">
                        <input type="text" className="search d-inline" />
                        <button className="d-inlin btnsearch">Tìm kiếm</button>
                    </div>
                </div>
                <div className="row mt-1 align-items-center">
                    <div className="col-md-8">
                        <select name className="d-inline me-1">
                            <option value>Hành động</option>
                            <option value>Bỏ vào thùng rác</option>
                        </select>
                        <button className="btnapply">Áp dụng</button>
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
                            <th>Họ tên</th>
                            <th>Điện thoại</th>
                            <th>Email</th>
                            <th className="text-center" style={{ width: 30 }}>ID</th>
                        </tr>
                    </thead>
                    <tbody>
                    {customers && customers.map((customer, index) => (
                        <tr className="datarow">
                            <td>
                                <input type="checkbox" id="checkId" />
                            </td>
                            <td>
                                <img className="img-fluid"  src={urlImage + "customer/" + customer.image}  alt="customer.jpg" />
                            </td>
                            <td>
                                <div className="name">
                                    <a href="customer_edit.html">{customer.name}</a>
                                </div>
                                <div className="function_style">
                                    <a href="" className="text-success mx-1">
                                        <i className="fa fa-toggle-on" />
                                    </a>
                                    <Link to={"/admin/customer/edit/" + customer.id} className="text-primary mx-1">
                                        <i className="fa fa-edit" />
                                    </Link>
                                    <Link to={"/admin/customer/show/" + customer.id} className="text-info mx-1">
                                        <i className="fa fa-eye" />
                                    </Link>
                                    <Link onClick={() => handDelete(customer.id)} className="text-danger mx-1">
                                        <i className="fa fa-trash" />
                                    </Link>
                                </div>
                            </td>
                            <td>{customer.phone}</td>
                            <td>{customer.email}</td>
                            <td className="text-center">{customer.id}</td>
                        </tr>
                         ))}
                    </tbody>
                </table>
            </section>
        </div>

    );
}

export default ListCustomer;