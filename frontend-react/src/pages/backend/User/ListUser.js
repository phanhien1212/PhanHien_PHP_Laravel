import { useEffect, useState } from "react";
import UserService from "../../../service/UserService";
import { urlImage } from "../../../config";
import { Link } from "react-router-dom";

const ListUser = () => {
    const [users, setUsers] = useState([]);
    const [status, setStatus] = useState(1);
    const [load, setLoad] = useState(Date.now());
    useEffect(() => {
        (async () => {
           
            const result = await UserService.getList();
            setUsers(result.data.users);
            
        })();
    }, [load]);

    const handDelete = (id) => {
        (async () => {
            const result = await UserService.deleteUser(id);
            if (result.data.status === true) {
                setLoad(Date.now());
            }
        })();
    };
    return (
        <div>
            <section className="content-header my-2">
                <h1 className="d-inline">Thành viên</h1>
                <a href="/admin/user/create" className="btn-add">Thêm mới</a>
                <div className="row mt-3 align-items-center">
                    <div className="col-6">
                        <ul className="manager">
                            <li><a href="user_index.html">Tất cả (123)</a></li>
                            <li><a href="#">Xuất bản (12)</a></li>
                            <li><a href="/admin/user/trash">Rác (12)</a></li>
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
                                <input type="checkbox" id="checkAll" />
                            </th>
                            <th className="text-center" style={{ width: 90 }}>Hình ảnh</th>
                            <th>Họ tên</th>
                            <th>Điện thoại</th>
                            <th>Email</th>
                            <th className="text-center" style={{ width: 30 }}>ID</th>
                        </tr>
                    </thead>
                    <tbody>
                    {users && users.map((user, index) => (
                        <tr className="datarow">
                            <td className="text-center">
                                <input type="checkbox" id="checkId" />
                            </td>
                            <td>
                                <img className="img-fluid" src={urlImage + "user/" + user.image} alt="user.jpg" />
                            </td>
                            <td>
                                <div className="name">
                                    <a href="menu_index.html">
                                        {user.name}
                                    </a>
                                </div>
                                <div className="function_style">
                                    <Link href="#" className="text-success mx-1">
                                        <i className="fa fa-toggle-on" />
                                    </Link>
                                    <Link to={"/admin/user/edit/" + user.id} className="text-primary mx-1">
                                        <i className="fa fa-edit" />
                                    </Link>
                                    <Link to={"/admin/user/show/" + user.id} className="text-info mx-1">
                                        <i className="fa fa-eye" />
                                    </Link>
                                    <Link onClick={() => handDelete(user.id)} className="text-danger mx-1">
                                        <i className="fa fa-trash" />
                                    </Link>
                                </div>
                            </td>
                            <td> {user.phone}</td>
                            <td> {user.email}</td>
                            <td className="text-center"> {user.id}</td>
                        </tr>
                         ))}
                    </tbody>
                </table>
            </section>
            </div>
            );
}

export default ListUser;