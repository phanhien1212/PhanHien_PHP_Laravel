import { useState } from "react";
import ConfigService from "../../../service/ConfigService";

const Config = () => {
    const [author, setAuthor] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [facebook, setFacebook] = useState("");
    const [zalo, setZalo] = useState("");
    const [address, setAddress] = useState("");
    const [youtube, setYoutube] = useState("");
    const [metadesc, setMetadesc] = useState("");
    const [metakey, setMetakey] = useState("");
    const [status, setStatus] = useState("1");
    const [load, setLoad] = useState(Date.now());
    const handleSubmit = (event) => {
        event.preventDefault();
      
        var addCategory = new FormData();
        addCategory.append("author", author);
        addCategory.append("email", email);
        addCategory.append("phone", phone);
        addCategory.append("facebook", facebook);
        addCategory.append("zalo", zalo);
        addCategory.append("address", address);
        addCategory.append("youtube", youtube);
        addCategory.append("metadesc", metadesc);
        addCategory.append("metakey", metakey);
        addCategory.append("status", status);
               (async () => {
          const result = await ConfigService.store(addCategory);
    
          if (result.data.status === true) {
            setAuthor("");
            setEmail("");
            setPhone("");
            setFacebook("");
            setZalo("");
            setAddress("");
            setYoutube("");
            setMetadesc("");
            setMetakey("");
            // Tải lại danh sách danh mục
            setLoad(Date.now());
          }
        })();
      };
    return ( 
       <div className="content">
  <section className="content-header my-2">
    <h1 className="d-inline">Cấu hình website</h1>
  </section>
  <section className="content-body my-3">
    <form action method="post" onSubmit={handleSubmit}>
      <input type="hidden" name="id" defaultValue />
      <div className="mb-3">
        <label htmlFor="author"><strong>Tác giả(*)</strong></label>
        <input type="text" name="author" value={author} onChange={(e)=>setAuthor(e.target.value)} defaultValue id="author" className="form-control" />
      </div>
      <div className="mb-3">
        <label htmlFor="email"><strong>Email(*)</strong></label>
        <input type="text" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} defaultValue id="email" className="form-control" />
      </div>
      <div className="mb-3">
        <label htmlFor="phone"><strong>Điện thoại(*)</strong></label>
        <input type="text" name="phone" value={phone} onChange={(e)=>setPhone(e.target.value)} defaultValue id="phone" className="form-control" />
      </div>
      <div className="mb-3">
        <label htmlFor="zalo"><strong>Zalo(*)</strong></label>
<input type="text" name="zalo" defaultValue value={zalo} onChange={(e)=>setZalo(e.target.value)} id="zalo" className="form-control" />
      </div>
      <div className="mb-3">
        <label htmlFor="facebook"><strong>Facebook cá nhân(*)</strong></label>
        <input type="text" name="facebook" defaultValue value={facebook} onChange={(e)=>setFacebook(e.target.value)}id="facebook" className="form-control" />
      </div>
      <div className="mb-3">
        <label htmlFor="address"><strong>Địa chỉ(*)</strong></label>
        <input type="text" name="address" defaultValue value={address} onChange={(e)=>setAddress(e.target.value)} id="address" className="form-control" />
      </div>
      <div className="mb-3">
        <label htmlFor="youtube"><strong>Kênh Youtube(*)</strong></label>
        <input type="text" name="youtube" defaultValue value={youtube} onChange={(e)=>setYoutube(e.target.value)} id="youtube" className="form-control" />
      </div>
      <div className="mb-3">
        <label htmlFor="metadesc"><strong>Mô tả seo(*)</strong></label>
        <textarea name="metadesc" id="metadesc" value={metadesc} onChange={(e)=>setMetadesc(e.target.value)} className="form-control" defaultValue={""} />
      </div>
      <div className="mb-3">
        <label htmlFor="metakey"><strong>Từ khóa seo(*)</strong></label>
        <textarea name="metakey" id="metakey" value={metakey} onChange={(e)=>setMetakey(e.target.value)}className="form-control" defaultValue={""} />
      </div>
      <div className="mb-3">
        <label htmlFor="status"><strong>Trạng thái</strong></label>
        <select name="status" id="status" value={status} onChange={(e)=>setStatus(e.target.value)}className="form-control">
          <option value={1}>Online
          </option>
          <option value={2}>Offline
          </option>
        </select>
      </div>
      <div className="mb-3">
        <button type="submit" className="btn btn-success">
          <i className="fa fa-save" aria-hidden="true" /> Lưu cấu hình
        </button>
      </div>
    </form>
  </section>
</div>

     );
}
 
export default Config;