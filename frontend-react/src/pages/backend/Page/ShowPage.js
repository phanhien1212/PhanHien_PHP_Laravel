import { useEffect, useState } from "react";
import PageService from "../../../service/PageService";
import { Link, useParams } from "react-router-dom";
const ShowPage = () => {
    const { id } = useParams();
    const [page, setPage] = useState([]);

    useEffect(() => {
        (async () => {
            const result = await PageService.getById(id);
            setPage(result.data.page);
        })();
    }, [id]);
    return (
        <div>
            <section className="content-header my-2">
                <h1 className="d-inline">Chi tiết</h1>
                <div className="row mt-2 align-items-center">
                    <div className="col-md-12 text-end">
                        <a href="page_index.html" className="btn btn-primary btn-sm">
                            <i className="fa fa-arrow-left" /> Về danh sách
                        </a>
                        <a href="page_edit.html" className="btn btn-success btn-sm">
                            <i className="fa fa-edit" /> Sửa
                        </a>
                        <a href="page_index.html" className="btn btn-danger btn-sm">
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
                    {page && (
                            <tr>
                                <td>{page.id}</td>
                                <td>{page.status}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </section>
        </div>

    );
}

export default ShowPage;