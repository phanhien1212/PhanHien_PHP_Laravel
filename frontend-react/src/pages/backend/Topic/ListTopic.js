import { useEffect, useState } from "react";
import TopicService from "../../../service/TopicService";
import { Link } from "react-router-dom";
const ListTopic = () => {
    const [topics, setTopics] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState(1);
    const [load, setLoad] = useState(Date.now());
    useEffect(() => {
        (async () => {
            const result = await TopicService.getList();
            setTopics(result.data.topics);
        })();
    }, [load]);
    
    const handleStatus  = (id) => {
        alert(id);
    }
    
    const handDelete = (id) => {
        (async () =>{
            const result = await TopicService.delete(id);
             if(result.data.status === true)
             {
                 setLoad(Date.now());
             }
             })();  
      };
    
  const handSubmit = async (event) => {
    event.preventDefault();
   var topic = new FormData();
   topic.append("name",name);
   topic.append("description",description);
   topic.append("status",status);
   (async () =>{
   const result = await TopicService.store(topic);
    if(result.data.status === true)
    {
        setLoad(Date.now());
    }
    })();
  }
    return (  
        <div>
            <section className="content-header my-2">
                <h1 className="d-inline">Chủ đề bài viết</h1>
                <hr style={{ border: 'none' }} />
            </section>
            <section className="content-body my-2">
                <div className="row">
                    <div className="col-md-4">
                    <form onSubmit={handSubmit}>
                        <div className="mb-3">
                            <label><strong>Tên chủ đề (*)</strong></label>
                            <input value={name} onChange={(e) => setName(e.target.value)} type="text" name="name" className="form-control" placeholder="Tên chủ để" />
                        </div>
                        <div className="mb-3">
                            <label><strong><strong>Mô tả</strong></strong></label>
                            <textarea  value={description} onChange={(e) => setDescription(e.target.value)} name="description" rows={6} className="form-control" placeholder="Mô tả" defaultValue={""} />
                        </div>
                        <div className="mb-3">
                            <label><strong>Trạng thái</strong></label>
                            <select name="status" className="form-control"  onChange={(e) => setStatus(e.target.value)}>
                                <option value={1}>Xuất bản</option>
                                <option value={2}>Chưa xuất bản</option>
                            </select>
                        </div>
                        <div className="mb-3 text-end">
                            <button className="btn btn-sm btn-success" type="submit" name="THEM">
                                <i className="fa fa-save" /> Lưu[Cập nhật]
                            </button>
                        </div>
                        </form>
                    </div>
                    <div className="col-md-8">
                        <div className="row mt-3 align-items-center">
                            <div className="col-12">
                                <ul className="manager">
                                    <li><Link href="brand_index.html">Tất cả (123)</Link></li>
                                    <li><Link href="#">Xuất bản (12)</Link></li>
                                    <li><Link to="/admin/topic/trash">Rác (12)</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="row my-2 align-items-center">
                            <div className="col-md-6">
                                <select name className="d-inline me-1">
                                    <option value>Hành động</option>
                                    <option value>Bỏ vào thùng rác</option>
                                </select>
                                <button className="btnapply">Áp dụng</button>
                            </div>
                            <div className="col-md-6 text-end">
                                <input type="text" className="search d-inline" />
                                <button className="d-inline">Tìm kiếm</button>
                            </div>
                        </div>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th className="text-center" style={{ width: 30 }}>
                                        <input type="checkbox" id="checkboxAll" />
                                    </th>
                                    <th>Tên chủ đề</th>
                                    <th>Tên slug</th>
                                    <th className="text-center" style={{ width: 30 }}>ID</th>
                                </tr>
                            </thead>
                            <tbody>
                                {topics && topics.map((topic, index ) => (
                                <tr className="datarow" key={index}>
                                    <td>
                                        <input type="checkbox" id="checkId" />
                                    </td>
                                    <td>
                                        <div className="name">
                                            <Link href="topic_edit.html">
                                                {topic.name}
                                            </Link>
                                        </div>
                                        <div className="function_style">
                                            <Link href="#" className="text-success mx-1">
                                                <i className="fa fa-toggle-on" />
                                            </Link>
                                            <Link to={"/admin/topic/edit/" + topic.id} className="text-primary mx-1">
                                                <i className="fa fa-edit" />
                                            </Link>
                                            <Link to={"/admin/topic/show/" + topic.id} className="text-info mx-1">
                                                <i className="fa fa-eye" />
                                            </Link>
                                            <Link onClick={() => handDelete(topic.id)} className="text-danger mx-1">
                                                <i className="fa fa-trash" />
                                            </Link>
                                        </div>
                                    </td>
                                    <td>{topic.slug}</td>
                                    <td className="text-center"> {topic.id}</td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>

    );
}
 
export default ListTopic;