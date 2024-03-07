import { useParams } from "react-router-dom";
import CategoryService from "../../../service/CategoryService";
import { useEffect, useState } from "react";
const ShowCategory = () => {
    const { id } = useParams();
    const [category, setCategory] = useState([]);

    useEffect(() => {
        (async () => {
            const result = await CategoryService.getById(id);
            setCategory(result.data.category);
        })();
    }, [id]);
    return (
        <div>
            <section className="content-header my-2">
                <h1 className="d-inline">Chi tiết</h1>
                <div className="row mt-2 align-items-center">
                    <div className="col-md-12 text-end">
                        <a href="category_index.html" className="btn btn-primary btn-sm">
                            <i className="fa fa-arrow-left" /> Về danh sách
                        </a>
                        <a href="category_edit.html" className="btn btn-success btn-sm">
                            <i className="fa fa-edit" /> Sửa
                        </a>
                        <a href="category_index.html" className="btn btn-danger btn-sm">
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
                    {category && (
                        <tr>
                            <td>{category.id}</td>
                            <td>{category.status}</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </section>
        </div>

    );
}

export default ShowCategory;