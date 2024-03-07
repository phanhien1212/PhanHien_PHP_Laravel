import { useEffect, useState } from "react";
import { urlImage } from "../../../config";
import ContactService from "../../../service/ContactService";
import { Link } from "react-router-dom";
const ListContact = () => {
    const [contacts, setContacts] = useState([]);
    const [load, setLoad] = useState(Date.now());
    useEffect(() => {
        (async () => {
            const result = await ContactService.getList();
            setContacts(result.data.contacts);
        })();
    }, [load]);

    const handDelete = (id) => {
        (async () => {
            const result = await ContactService.deleteContact(id);
            if (result.data.status === true) {
                setLoad(Date.now());
            }
        })();
    };
    return (
        <div className="content">
            <div>
                <div>
                    <section className="content-header my-2">
                        <h1 className="d-inline">Liên hệ</h1>
                        <div className="row mt-3 align-items-center">
                            <div className="col-6">
                                <ul className="manager">
                                    <li><a href="contact_index.html">Tất cả (123)</a></li>
                                    <li><a href="#">Xuất bản (12)</a></li>
                                    <li><a href="/admin/contact/trash">Rác (12)</a></li>
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
                                        <input type="checkbox" id="checkboxAll" />
                                    </th>
                                    <th>Họ tên</th>
                                    <th>Điện thoại</th>
                                    <th>Email</th>
                                    <th>Tiêu đề</th>
                                    <th className="text-center" style={{ width: 30 }}>ID</th>
                                </tr>
                            </thead>
                            <tbody>
                            {contacts && contacts.map((contact, index) => (
                                <tr className="datarow">
                                    <td className="text-center">
                                        <input type="checkbox" id="checkId" />
                                    </td>
                                    <td>
                                        <div className="name">
                                            <a href="contact_reply.html">{contact.name}</a>
                                        </div>
                                        <div className="function_style">
                                            <a href="#" className="text-success mx-1">
                                                <i className="fa fa-toggle-on" />
                                            </a>
                                            <Link to={"/admin/contact/reply/" + contact.id} className="text-primary mx-1">
                                                <i className="fa fa-edit" /> Trả lời
                                            </Link>
                                            <Link  to={"/admin/contact/show/" + contact.id} className="text-info mx-1">
                                                <i className="fa fa-eye" />
                                            </Link>
                                            <Link onClick={() => handDelete(contact.id)} className="text-danger mx-1">
                                                <i className="fa fa-trash" />
                                            </Link>
                                        </div>
                                    </td>
                                    <td>{contact.phone}</td>
                                    <td>{contact.email}</td>
                                    <td>{contact.title}</td>
                                    <td className="text-center">{contact.id}</td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                </div>

            </div>

        </div>

    );
}

export default ListContact;