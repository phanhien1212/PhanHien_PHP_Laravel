import { Link, useParams } from "react-router-dom";
import { urlImage } from "../../../config";
import { useEffect, useState } from "react";
import TopicService from "../../../service/TopicService";
const EditTopic = () => {
    const { id } = useParams();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(1);
  const [load, setLoad] = useState(Date.now());

  useEffect(() => {
    (async () => {
      const result = await TopicService.getById(id);
      const topicData = result.data.topic;
        setName(topicData.name);
        setSlug(topicData.slug);
        setDescription(topicData.description);
        setStatus(topicData.status);
       
    })();
  }, [id,load]);

  const handSubmit = async (event) => {
    event.preventDefault();

   
    var topic = new FormData();
    topic.append("name", name);
    topic.append("description", description);
    topic.append("status", status);


    const result = await TopicService.update(id, topic);
    console.log(result.data); // Log response từ API để kiểm tra lỗi
    if (result.data.status === true) {

      setLoad(Date.now());
    }

  };
    return (
        <div>
            <section className="content-header my-2">
                <h1 className="d-inline">Cập nhật chủ đề</h1>
                <div className="text-end">
                    <a className="btn btn-sm btn-primary" href="topic_index.html">Về danh sách</a>
                </div>
            </section>
            <section className="content-body my-2">
            <form onSubmit={handSubmit} >
                <div className="row">
                    <div className="col-md-9">
                        <div className="mb-3">
                            <label><strong>Tên chủ đề (*)</strong></label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} name="name" id="name" placeholder="Nhập tên chủ đề" className="form-control" required />
                        </div>
                        <div className="mb-3">
                            <label><strong>Slug</strong></label>
                            <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} name="slug" id="slug" placeholder="Nhập slug" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label><strong>Mô tả</strong></label>
                            <textarea name="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={6} className="form-control" placeholder="Nhập mô tả" defaultValue={""} />
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="box-container mt-4 bg-white">
                            <div className="box-header py-1 px-2 border-bottom">
                                <strong>Đăng</strong>
                            </div>
                            <div className="box-body p-2 border-bottom">
                                <p>Chọn trạng thái đăng</p>
                                <select name="status" className="form-select">
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
                        <div className="box-container mt-4 bg-white">
                            <div className="box-header py-1 px-2 border-bottom">
                                <strong>Thứ tự</strong>
                            </div>
                            <div className="box-body p-2 border-bottom">
                                <select name="sort_order" className="form-select">
                                    <option value>Sau</option>
                                    <option value={2}>sau</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                </form>
            </section>
        </div>

    );
}

export default EditTopic
    ;