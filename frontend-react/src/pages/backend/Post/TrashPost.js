import { useEffect, useState } from "react";
import PostService from "../../../service/PostService";
import { urlImage } from "../../../config";
import { Link } from "react-router-dom";
const TrashPost = () => {
    const [posts, setPosts] = useState([]);
    const [load, setLoad] = useState(Date.now());
    useEffect(() => {
        (async () => {
            const result = await PostService.getList1();
            setPosts(result.data.posts);
        })();
    }, [load]);
    
    const handDestroy = (id) => {
        (async () =>{
            const result = await PostService.destroy(id);
             if(result.data.status === true)
             {
                 setLoad(Date.now());
             }
             })();  
      };

    const handRestore = (id) => {
        (async () => {
           
                const result = await PostService.restore(id);
                if (result.data.status === true) {
                   
                    setLoad(Date.now());
                }
        })();
    };
    return (
        <div>
            <section className="content-header my-2">
                <h1 className="d-inline">Thùng rác bài viết</h1>
                <div className="row mt-3 align-items-center">
                    <div className="col-6">
                        <ul className="manager">
                            <li><a href="post_index.html">Tất cả (123)</a></li>
                            <li><a href="#">Xuất bản (12)</a></li>
                            <li><a href="post_trash.html">Rác (12)</a></li>
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
                    {posts && posts.map((post,index ) => (
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
                                    <Link href="#" className="text-primary mx-1" onClick={() => handRestore(post.id)}>
                                        <i className="fa fa-undo" />
                                    </Link>
                                    <Link href="#" className="text-danger mx-1" onClick={() => handDestroy(post.id)}>
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

export default TrashPost;