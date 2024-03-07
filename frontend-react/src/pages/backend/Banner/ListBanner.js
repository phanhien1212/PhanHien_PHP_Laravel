import { Link } from "react-router-dom";
import BannerService from "../../../service/BannerService";
import { useEffect, useState } from "react";
import { urlImage } from "../../../config";
const ListBanner = () => {
    const [banners, setBanners] = useState([]);
  
    const [status, setStatus] = useState(1);
    const [load, setLoad] = useState(Date.now());
    useEffect(() => {
        (async () => {
            const result = await BannerService.getList();
            setBanners(result.data.banners);
        })();
    }, [load]);

    const handDelete = (id) => {
        (async () => {
            const result = await BannerService.deleteBanner(id);
            if (result.data.status === true) {
                setLoad(Date.now());
            }
        })();
    };
    return (
        <div>
            <section className="content-header my-2">
                <h1 className="d-inline">Banner</h1>
                <a className="btn-add" href="/admin/banner/create">Thêm mới</a>
                <div className="row mt-3 align-items-center">
                    <div className="col-6">
                        <ul className="manager">
                            <li><a href="banner_index.html">Tất cả (123)</a></li>
                            <li><a href="#">Xuất bản (12)</a></li>
                            <li><a href="/admin/banner/trash">Rác (12)</a></li>
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
                            <option value>Tất cả vị trí</option>
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
                            <th>Tên banner</th>
                            <th>Vị trí</th>
                            <th>Liên kết</th>
                            <th className="text-center" style={{ width: 30 }}>ID</th>
                        </tr>
                    </thead>
                    <tbody>
                    {banners && banners.map((banner, index) => (
                        <tr className="datarow">
                            <td className="text-center">
                                <input type="checkbox" />
                            </td>
                            <td>
                                <img  src={urlImage + "banner/" + banner.image} alt="banner.jpg" />
                            </td>
                            <td>
                                <div className="name">
                                    <a href="banner_edit.html">
                                        {banner.name}
                                    </a>
                                </div>
                                <div className="function_style">
                                    <a href="#" className="text-success mx-1">
                                        <i className="fa fa-toggle-on" />
                                    </a>
                                    <Link to={"/admin/banner/edit/" + banner.id} className="text-primary mx-1">
                                        <i className="fa fa-edit" />
                                    </Link>
                                    <Link to={"/admin/banner/show/" + banner.id}  className="text-info mx-1">
                                        <i className="fa fa-eye" />
                                    </Link>
                                    <Link onClick={() => handDelete(banner.id)} className="text-danger mx-1">
                                        <i className="fa fa-trash" />
                                    </Link>
                                </div>
                            </td>
                            <td>{banner.position}</td>
                            <td>{banner.link}</td>
                            <td className="text-center">{banner.id}</td>
                        </tr>
                         ))}
                    </tbody>
                </table>
            </section>
        </div>

    );
}

export default ListBanner;