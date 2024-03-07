import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OrderService from "../../../service/OrderService";
const ListOrder = () => {
    const [orders, setOrders] = useState([]);
   
    const [status, setStatus] = useState(1);
    const [load, setLoad] = useState(Date.now());
    useEffect(() => {
        (async () => {
            const result = await OrderService.getList();
            setOrders(result.data.orders);
            
        })();
    }, [load]);

    const handDelete = (id) => {
        (async () => {
            const result = await OrderService.deleteOrder(id);
            if (result.data.status === true) {
                setLoad(Date.now());
            }
        })();
    };
    return (
        <div>
            <section className="content-header my-2">
                <h1 className="d-inline">Quản lý đơn hàng</h1>
                <div className="row mt-3 align-items-center">
                    <div className="col-6">
                        <ul className="manager">
                            <li><a href="#">Tất cả (123)</a></li>
                            <li><a href="#">Xuất bản (12)</a></li>
                            <li><a href="/admin/order/trash">Rác (12)</a></li>
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
                            <option value>Chọn tháng</option>
                            <option value>Tháng 9</option>
                        </select>
                        <select name className="d-inline me-1">
                            <option value>Chọn năm</option>
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
                            <th>Họ tên khách hàng</th>
                            <th>Điện thoại</th>
                            <th>Email</th>
                            <th>Ngày đặt hàng</th>
                            <th className="text-center" style={{ width: 30 }}>ID</th>
                        </tr>
                    </thead>
                    <tbody>
                    {orders && orders.map((order, index) => (
                        <tr className="datarow">
                            <td>
                                <input type="checkbox" id="checkId" />
                            </td>
                            <td>
                                <div className="name">
                                    <a href="order_show.html">
                                        {order.delivery_name}
                                    </a>
                                </div>
                                <div className="function_style">
                                    <a href="#" className="text-success mx-1">
                                        <i className="fa fa-toggle-on" />
                                    </a>
                                    <a href="order_edit.html" className="text-primary mx-1">
                                        <i className="fa fa-edit" />
                                    </a>
                                    <Link to={"/admin/order/show/" + order.id} className="text-info mx-1">
                                        <i className="fa fa-eye" />
                                    </Link>
                                    <Link  onClick={() => handDelete(order.id)} className="text-danger mx-1">
                                        <i className="fa fa-trash" />
                                    </Link>
                                </div>
                            </td>
                            <td> {order.delivery_phone}</td>
                            <td> {order.delivery_email}</td>
                            <td>{order.created_at}</td>
                            <td className="text-center"> {order.id}</td>
                        </tr>
                          ))}
                    </tbody>
                </table>
            </section>
        </div>

    );
}

export default ListOrder;