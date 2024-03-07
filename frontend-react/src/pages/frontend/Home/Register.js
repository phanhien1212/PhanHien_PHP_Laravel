import axios from 'axios';
import UserService from '../../../service/UserService';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        gender: '',
        phone: '',
        address: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Gửi yêu cầu POST đến đối tượng Spring Boot
            const response = await UserService.register(formData);

            if (response.status === 200) {
                const user = response.data.user;
                console.log(user)
                // Lưu ID người dùng vào Local Storage
                localStorage.setItem("userId", user.id);
                const storedUserId = localStorage.getItem("userId");
                console.log("storedUserId: " + storedUserId);
  
                // Thông báo đăng ký thành công
                alert("Đăng ký thành công");
                
                // Chuyển hướng đến trang chính
                navigate("/");
                // Làm mới trang để cập nhật thông tin
                window.location.reload();
            } else {
                // Xử lý lỗi đăng ký thất bại
                console.error('Registration failed');
            }
        } catch (error) {
            // Xử lý lỗi khi gọi API
            console.error(error.response.data);
            alert("Đăng ký không thành công. Vui lòng thử lại.");
        }
    };
    

    
    return (
        <div className="sec-80">
            <div className="form__wrap con">
                <h2 className="sec-title form__title">Tạo tài khoản</h2>
                <form onSubmit={handleSubmit} action id="mona-register-popup">
                    <div className="form">
                        <input type="text" name="name" onChange={handleChange} required className="rs-form form__inp" placeholder="Họ và tên" />
                        <input type="text" name="username" onChange={handleChange} required className="rs-form form__inp" placeholder="Tên người dùng" />
                        <input type="email" name="email"onChange={handleChange} required className="rs-form form__inp" placeholder="Email" />
                        <input type="tel" name="phone" onChange={handleChange} minLength={10} maxLength={10} required className="rs-form form__inp" placeholder="Số điện thoại" />
                        <input type="text" name="address" onChange={handleChange} required className="rs-form form__inp" placeholder="Địa chỉ" />
                        <div style={{fontSize:15,marginBottom:10}} >
                        <input name="gender"  onChange={handleChange} type="radio" value="Nam" style={{marginLeft:0}}  />Nam
                        <input name="gender"onChange={handleChange} type="radio" value="Nữ" style={{marginLeft: 20}} />Nữ
                        </div>
                       
                        <input type="password" onChange={handleChange}  name="password" required className="rs-form form__inp" placeholder="Mật khẩu" />
                       
                        
                        <div className="form__bot form__mb m-cus-btn-f-register">
                            <button type="submit" className="rs-form btn-pri c-whi form__submit-small m-btn-loading disabled">
                                Tạo                          </button>
                        </div>
                        <span className="dp-block form__bot m-cus-text-regis">
                            Nếu sdt hoặc email của bạn báo đã tồn tại, bấm <a href="https://levents.asia/my-account/login/" className> vào đây </a> và login với sdt hoặc email đó với một mật khẩu bất kì để kích hoạt tài khoản hoặc liên hệ với bộ phận cskh của Levents để được hỗ trợ                      </span>
                            <div id="response-register">

                            <p className='text-danger' id='errorregister'></p>
                            </div>
                    </div>
                </form>
            </div>
        </div>

    );
}

export default Register;