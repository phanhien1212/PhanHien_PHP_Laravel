import { useEffect, useState } from "react";
import UserService from "../../../service/UserService";
const CreateUser = () => {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
   
    const [status, setStatus] = useState(1);
    const [load, setLoad] = useState(Date.now());
    useEffect(() => {
        (async () => {
            const result = await UserService.getList();
            setUsers(result.data.users);
        })();
    }, [load]);


    const handSubmit = async (event) => {
        event.preventDefault();
        var image = document.getElementById("image");
        var user = new FormData();
        user.append("name", name);
        user.append("username", username);
        user.append("email", email);
        user.append("phone", phone);
        user.append("gender", gender);
        user.append("password", password);
        user.append("address", address);
        user.append("status", status);
       
        user.append("image", image.files.length === 0 ? "" : image.files[0]);
        (async () => {
            const result = await UserService.store(user);
            if (result.data.status === true) {
                setLoad(Date.now());
            }
        })();
    }
    return (
        <div>
             <form onSubmit={handSubmit} action method="post" encType="multipart/form-data">
            <section className="content-header my-2">
                <h1 className="d-inline">Thêm thành viên</h1>
                <div className="row mt-2 align-items-center">
                    <div className="col-md-12 text-end">
                        <button className="btn btn-success btn-sm" name="THEM">
                            <i className="fa fa-save" /> Lưu [Thêm]
                        </button>
                        <a href="user_index.html" className="btn btn-primary btn-sm">
                            <i className="fa fa-arrow-left" /> Về danh sách
                        </a>
                    </div>
                </div>
            </section>
            <section className="content-body my-2">
               
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label><strong>Tên đăng nhập(*)</strong></label>
                                <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control" placeholder="Tên đăng nhập" />
                            </div>
                            <div className="mb-3">
                                <label><strong>Mật khẩu(*)</strong></label>
                                <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Mật khẩu" />
                            </div>
                            <div className="mb-3">
                                <label><strong>Xác nhận mật khẩu(*)</strong></label>
                                <input type="password" name="re_password" value={password} onChange={(e) => setPassword(e.target.value)}  className="form-control" placeholder="Xác nhận mật khẩu" />
                            </div>
                            <div className="mb-3">
                                <label><strong>Email(*)</strong></label>
                                <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="Email" />
                            </div>
                            <div className="mb-3">
                                <label><strong>Xác nhận email(*)</strong></label>
                                <input type="text" name="re_email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="Xác nhận email" />
                            </div>
                            <div className="mb-3">
                                <label><strong>Điện thoại(*)</strong></label>
                                <input type="text" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control" placeholder="Điện thoại" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label><strong>Họ tên (*)</strong></label>
                                <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} className="form-control" placeholder="Họ tên" />
                            </div>
                            <div className="mb-3">
                                <label><strong>Giới tính</strong></label>
                                <select name="gender" id="gender" className="form-select" value={gender}  onChange={(e) => setGender(e.target.value)}>
                                    <option>Chọn giới tinh</option>
                                    <option >Nam</option>
                                    <option >Nữ</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label><strong>Địa chỉ</strong></label>
                                <input type="text" name="address" value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" placeholder="Địa chỉ" />
                            </div>
                            <div className="mb-3">
                                <label><strong>Hình đại diện</strong></label>
                                <input type="file"  id="image" name="image" className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label><strong>Trạng thái</strong></label>
                                <select name="status" className="form-select" onChange={(e) => setStatus(e.target.value)}>
                                    <option value={1}>Xuất bản</option>
                                    <option value={2}>Chưa xuất bản</option>
                                </select>
                            </div>
                        </div>
                    </div>
                
            </section>
            </form>
            </div>
            );
    
}

export default CreateUser;