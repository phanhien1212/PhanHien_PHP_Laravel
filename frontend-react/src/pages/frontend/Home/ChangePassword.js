import { useEffect, useState } from "react";
import CustomerService from "../../../service/CustomerService";

const ChangePassword = () => {
    const [user, setUser] = useState({});
  const [password, setPassword] = useState("");
  const [load, setLoad] = useState(Date.now());
  const [newPassword, setNewPassword] = useState("");
  const [repeatedNewPassword, setRepeatedNewPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const fetchData = async () => {
      if (storedUserId) {
        try {
          const result = await CustomerService.getById(storedUserId);
          setUser(result.data.customer);
        } catch (error) {
          console.error("Lỗi khi lấy dữ liệu người dùng:", error);
        }
      }
    };
    fetchData();
  }, [load]);
  console.log(user);
  const handleChangePassword = async (e) => {
    e.preventDefault();

    
    try {
        if (password !== user.password) {
            document.getElementById("errorChangepassword").innerText="Mật khẩu cũ không khớp"
            return;
        }
        if (repeatedNewPassword !== newPassword) {
            document.getElementById("errorChangepassword").innerText="Nhập lại mật khẩu sai"
            return;
        }
      const user_id = localStorage.getItem("userId");
      var addProduct = new FormData();
      addProduct.append("password", newPassword);
      await CustomerService.updatepassword(user_id, addProduct);

      alert("Đổi mật khẩu thành công");
      setPassword("")
      setNewPassword("")
      setRepeatedNewPassword("")
      setRepeatedNewPassword("")
      document.getElementById("errorChangepassword").innerText=""
    } catch (error) {
      console.error("Lỗi khi cập nhật mật khẩu:", error);
      setError("Đã xảy ra lỗi khi đổi mật khẩu");
    }
  };

    return ( 
        <div className="sec-80">
        <div className="form__wrap con">
            <h2 className="sec-title form__title">Đổi mật khẩu</h2>
            <form action id="mona-login-form" onSubmit={handleChangePassword} >
                <div className="form">
                    
                                   
                    <input type="password"name="password"  value={password} onChange={(e) => setPassword(e.target.value)} required className="rs-form form__inp" placeholder="Mật khẩu cũ" />
                    <input type="password"name="password"  value={newPassword} onChange={(e) => setNewPassword(e.target.value)}  required className="rs-form form__inp" placeholder="Mật khẩu mới" />
                    <input type="password"name="password"  value={repeatedNewPassword} onChange={(e) => setRepeatedNewPassword(e.target.value)}  required className="rs-form form__inp" placeholder="Nhập lại mật khẩu" />
                
                    {/* <div className="form__check">
                        <label htmlFor="user_remember" className="fl-con">
                            <input type="checkbox" name="user_remember" defaultValue="yes" id="user_remember" className="dp-none" />
                            <div className="form__cbox" />
                            <div className="form__ctxt hov-df">
                                Ghi nhớ tài khoản                              </div>
                        </label>
                    </div> */}
                    <div className="fl-wrap aln-ct form__bot form__mb">
                        
                        <button type="submit" className="rs-form btn-pri c-whi form__submit-small m-btn-loading">
                            Đổi mật khẩu                         
                            </button>
                        
                    </div>
                    <div id="errorChangepassword">
                    <p className='text-danger' id='errorChangepassword'></p>
                    </div>
                </div>
            </form>
        </div>
    </div>

     );
}
 
export default ChangePassword;