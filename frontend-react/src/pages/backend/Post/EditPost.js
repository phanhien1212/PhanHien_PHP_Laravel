import { useEffect, useState } from "react";
import PostService from "../../../service/PostService";
import { useParams } from "react-router-dom";
import { urlImage } from "../../../config";
const EditPost = () => {
    const { id } = useParams();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [detail, setDetail] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [status, setStatus] = useState(1);
  const [load, setLoad] = useState(Date.now());

  useEffect(() => {
    (async () => {
      const result = await PostService.getById(id);
      const postData = result.data.post;
        setTitle(postData.title);
        setSlug(postData.slug);
        setDescription(postData.description);
        setDetail(postData.detail);
        setStatus(postData.status);
        setImageUrl(`${urlImage}post/${postData.image}`);
    })();
  }, [id,load]);


    const handSubmit = async (event) => {
        event.preventDefault();
    
        var image = document.getElementById("image");
        var post = new FormData();
        post.append("title", title);
        post.append("description", description);
        post.append("detail", detail);
        post.append("status", status);
        post.append("image", image.files.length === 0 ? "" : image.files[0]);
    
    
        const result = await PostService.update(id, post);
        console.log(result.data); // Log response từ API để kiểm tra lỗi
        if (result.data.status === true) {
    
          setLoad(Date.now());
        }
    
      };

      const handleImageChange = (e) => {
        setImageUrl(URL.createObjectURL(e.target.files[0]));
    };
    return (
        <div>
            <section className="content-header my-2">
                <h1 className="d-inline">Cập nhật bài viết</h1>
                <div className="text-end">
                    <a href="post_index.html" className="btn btn-sm btn-success">
                        <i className="fa fa-arrow-left" /> Về danh sách
                    </a>
                </div>
            </section>
            <section className="content-body my-2">
            <form onSubmit={handSubmit}>
                <div className="row">
                    <div className="col-md-9">
                        <div className="mb-3">
                            <label><strong>Tiêu đề bài viết (*)</strong></label>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} name="title" className="form-control" placeholder="Nhập tiêu đề" />
                        </div>
                        <div className="mb-3">
                            <label><strong>Slug (*)</strong></label>
                            <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} name="slug" className="form-control" placeholder="Slug" />
                        </div>
                        <div className="mb-3">
                            <label><strong>Chi tiết (*)</strong></label>
                            <textarea name="detail" value={detail} onChange={(e) => setDetail(e.target.value)}  rows={7} className="form-control" placeholder="Nhập chi tiết" defaultValue={""} />
                        </div>
                        <div className="mb-3">
                            <label><strong>Mô tả (*)</strong></label>
                            <textarea name="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className="form-control" placeholder="Mô tả" defaultValue={""} />
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="box-container mt-4 bg-white">
                            <div className="box-header py-1 px-2 border-bottom">
                                <strong>Đăng</strong>
                            </div>
                            <div className="box-body p-2 border-bottom">
                                <p>Chọn trạng thái đăng</p>
                                <select name="status" className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                                    <option value={1}>Xuất bản</option>
                                    <option value={2}>Chưa xuất bản</option>
                                </select>
                            </div>
                            <div className="box-footer text-end px-2 py-3">
                                <button type="submit" className="btn btn-success btn-sm text-end">
                                    <i className="fa fa-save" aria-hidden="true" /> Đăng
                                </button>
                            </div>
                        </div>
                        <div className="box-container mt-2 bg-white">
                            <div className="box-header py-1 px-2 border-bottom">
                                <strong>Chủ đề (*)</strong>
                            </div>
                            <div className="box-body p-2 border-bottom">
                                <select name="topic_id" className="form-select">
                                    <option value>None</option>
                                    <option value={1}>Tên chủ đề</option>
                                </select>
                            </div>
                        </div>
                        <div className="box-container mt-2 bg-white">
                            <div className="box-header py-1 px-2 border-bottom">
                                <strong>Hình đại diện</strong>
                            </div>
                            <div className="box-body p-2 border-bottom">
                                <input type="file" id="image" className="form-control"  onChange={handleImageChange} />
                                {imageUrl && <img src={imageUrl} alt="Post Image" />}
                            </div>
                        </div>
                    </div>
                </div>
                </form>
            </section>
        </div>

    );
}

export default EditPost;