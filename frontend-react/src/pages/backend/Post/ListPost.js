import { Link } from "react-router-dom";
import PostService from "../../../service/PostService";
import { useEffect, useState } from "react";
import { urlImage } from "../../../config";
const ListPost = () => {
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState(1);
    const [load, setLoad] = useState(Date.now());
    useEffect(() => {
        (async () => {
            const result = await PostService.getList();
            setPosts(result.data.posts);
        })();
    }, [load]);

    const handDelete = (id) => {
        (async () => {
            const result = await PostService.delete(id);
            if (result.data.status === true) {
                setLoad(Date.now());
            }
        })();
    };

    return (
        <div>
            <section className="content-header my-2">
                <h1 className="d-inline">Quản lý bài viết</h1>
                <Link to={"/admin/post/create"} className="btn-add">Thêm mới</Link>
                <div className="row mt-3 align-items-center">
                    <div className="col-6">
                        <ul className="manager">
                            <li><Link href="post_index.html">Tất cả (123)</Link></li>
                            <li><Link href="#">Xuất bản (12)</Link></li>
                            <li><Link to="/admin/post/trash">Rác (12)</Link></li>
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
                            <option value>Chủ đề</option>
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
                            <th>Tiêu đề bài viết</th>
                            <th>Tên danh mục</th>
                            <th className="text-center" style={{ width: 30 }}>ID</th>
                        </tr>
                    </thead>
                    <tbody>
                    {posts && posts.map((post, index) => (
                        <tr className="datarow">
                            <td>
                                <input type="checkbox" id="checkId" />
                            </td>
                            <td>
                                <img className="img-fluid" src={urlImage + "post/" + post.image} alt="post.jpg" />
                            </td>
                            <td>
                                <div className="name">
                                    <a href="post_edit.html">
                                        {post.title}
                                    </a>
                                </div>
                                <div className="function_style">
                                    <Link href="#" className="text-success mx-1">
                                        <i className="fa fa-toggle-on" />
                                    </Link>
                                    <Link to={"/admin/post/edit/" + post.id} className="text-primary mx-1">
                                        <i className="fa fa-edit" />
                                    </Link>
                                    <Link to={"/admin/post/show/" + post.id} className="text-info mx-1">
                                        <i className="fa fa-eye" />
                                    </Link>
                                    <Link onClick={() => handDelete(post.id)} className="text-danger mx-1">
                                        <i className="fa fa-trash" />
                                    </Link>
                                </div>
                            </td>
                            <td>{post.title}</td>
                            <td className="text-center">{post.id}</td>
                        </tr>
                         ))}
                    </tbody>
                </table>
            </section>
        </div>

    );
}

export default ListPost;