import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CustomerService from '../../../../src/service/CustomerService';
import { urlImage } from "../../../config";
const ManageAccount = () => {
    const [stored, setStored] = useState("");
    const [user, setUser] = useState({});
    const storedUserId = localStorage.getItem("userId");
    useEffect(() => {
        const fetchData = async () => {
          if (storedUserId) {
            setStored(storedUserId);
            try {
              const result = await CustomerService.getById(storedUserId);
              setUser(result.data.customer);
            } catch (error) {
              console.error("Lỗi khi lấy dữ liệu người dùng:", error);
            }
          }
        };
    
        fetchData();
      }, []);
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-4">
                    {/* Profile Image */}
                    <img src={urlImage + "user/" + user.image} alt="Profile Image" width={200}  className="img-fluid rounded-circle" />
                </div>
                <div className="col-md-8">
                    {/* User Info */}
                    <h2>User Profile</h2>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Phone:</strong> {user.phone}</p>
                    <p><strong>Address:</strong> {user.address}</p>
                    <Link to="/change-password"><button type="submit" class="button btn-save">Đổi mật khẩu</button></Link>
                </div>
            </div>
        </div>

    );
}

export default ManageAccount;