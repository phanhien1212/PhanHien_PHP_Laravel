import { useEffect, useState } from "react";
import CustomerService from "../../../service/CustomerService";
import { useParams } from "react-router-dom";

const ShowCustomer = () => {
    const { id } = useParams();
    const [customer, setCustomer] = useState([]);

    useEffect(() => {
        (async () => {
            const result = await CustomerService.getById(id);
            setCustomer(result.data.customer);
        })();
    }, [id]);
    return (
        <div className="content">
            <section className="content-header my-2">
                <h1 className="d-inline">Chi tiết</h1>
                <div className="row mt-2 align-items-center">
                    <div className="col-md-12 text-end">
                        <a href="customer_index.html" className="btn btn-primary btn-sm">
                            <i className="fa fa-arrow-left" /> Về danh sách
                        </a>
                        <a href="customer_edit.html" className="btn btn-success btn-sm">
                            <i className="fa fa-edit" /> Sửa
                        </a>
                        <a href="customer_index.html" className="btn btn-danger btn-sm">
                            <i className="fa fa-trash" /> Xóa
                        </a>
                    </div>
                </div>
            </section>
            <section className="content-body my-2">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th style={{ width: 180 }}>Tên trường</th>
                            <th>Giá trị</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customer && (
                            <tr>
                                <td>{customer.id}</td>
                                <td>{customer.status}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </section>
        </div>

    );
}

export default ShowCustomer;