import { useEffect, useState } from "react";

import ContactService from "../../../service/ContactService";
import { useParams } from "react-router-dom";
const ReplyContact = () => {
    const [contacts, setContacts] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [replay_id, setReplayId] = useState("");
    const [status, setStatus] = useState(1);
    const [load, setLoad] = useState(Date.now());
    const [contact, setContact] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await ContactService.getById(id);
            setContact(response.data.contact);
            setName(response.data.name);
            setTitle(response.data.title);
            setEmail(response.data.email);
            setPhone(response.data.phone);
            setContent(response.data.content);
            setReplayId(response.data.setReplayId);
            
            setStatus(response.data.status);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, [id]);

    useEffect(() => {
        (async () => {
            const result = await ContactService.getList();
            setContacts(result.data.contacts);
            
        })();
    }, [load]);

    const handSubmit = async (event) => {
        event.preventDefault();
        var contact = new FormData();
        contact.append("content", content);
        
        (async () => {
            const result = await ContactService.reply(id,contact);
            if (result.data.status === true) {
                setLoad(Date.now());
            }
        })();
    }


   

    
    return (
        <div>
            <form onSubmit={handSubmit} action method="post" encType="multipart/form-data">
            <section className="content-header my-2">
                <h1 className="d-inline">Trả lời liên hệ</h1>
                <div className="text-end">
                    <a href="contact_index.html" className="btn btn-sm btn-success">
                        <i className="fa fa-arrow-left" /> Về danh sách
                    </a>
                    <button type="submit" className="btn btn-success btn-sm text-end">
                        <i className="fa fa-save" aria-hidden="true" /> Trả lời liên hệ
                    </button>
                </div>
            </section>
            <section className="content-body my-2">
                <div className="row">
                    <div className="col-4">
                        <div className="mb-3">
                            <label htmlFor="name" className="text-main">Họ tên</label>
                            <input type="text" name="name" value={contact.name} id="name" className="form-control" placeholder="Nhập họ tên" readOnly />
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="mb-3">
                            <label htmlFor="phone" className="text-main">Điện thoại</label>
                            <input type="text" name="phone" value={contact.phone} id="phone" className="form-control" placeholder="Nhập điện thoại" readOnly />
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="mb-3">
                            <label htmlFor="email" className="text-main">Email</label>
                            <input type="text" name="email" value={contact.email} id="email" className="form-control" placeholder="Nhập email" readOnly />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="mb-3">
                            <label htmlFor="title" className="text-main">Tiêu đề</label>
                            <input type="text" name="title" value={contact.title} id="title" className="form-control" placeholder="Nhập tiêu đề" readOnly />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="content_old" className="text-main">Nội dung</label>
                            <textarea name="content_old" value={contact.content} id="content_old" className="form-control" placeholder="Nhập nội dung liên hệ" readOnly defaultValue={""} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="content" className="text-main">Nội dung trả lời</label>
                            <textarea name="content" onChange={(e) => setContent(e.target.value)} id="content" className="form-control" placeholder="Nhập nội dung liên hệ" rows={5} defaultValue={""} />
                        </div>
                    </div>
                </div>
            </section>
            </form>
        </div>

    );
}

export default ReplyContact;