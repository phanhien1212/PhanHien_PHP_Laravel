import { useEffect, useState } from "react";
import BrandService from "../../../service/BrandService";
import { Link, useParams } from "react-router-dom";
const ShowBrand = () => {
    const { id } = useParams();
    const [brand, setBrand] = useState([]);

    useEffect(() => {
        (async () => {
            const result = await BrandService.getById(id);
            setBrand(result.data.brand);
        })();
    }, [id]);
    return (
        <div>
            <section className="content-header my-2">
                <h1 className="d-inline">Chi tiết</h1>
                <div className="row mt-2 align-items-center">
                    <div className="col-md-12 text-end">
                        <Link to="/admin/brand/" className="btn btn-primary btn-sm">
                            <i className="fa fa-arrow-left" /> Về danh sách
                        </Link>
                        <Link href="brand_edit.html" className="btn btn-success btn-sm">
                            <i className="fa fa-edit" /> Sửa
                        </Link>
                        <Link href="brand_index.html" className="btn btn-danger btn-sm">
                            <i className="fa fa-trash" /> Xóa
                        </Link>
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
                        {brand && (
                            <tr>
                                <td>{brand.id}</td>
                                <td>{brand.status}</td>
                            </tr>
                        )}
                    </tbody>

                </table>
            </section>
        </div>

    );
}

export default ShowBrand;