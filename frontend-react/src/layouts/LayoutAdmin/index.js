import { Outlet, Link, useNavigate } from "react-router-dom";
import { FaProductHunt } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "./LayoutAdmin.css";
import { useEffect, useState } from "react";
import UserService from "../../service/UserService";


const LayoutAdmin = () => {
  const [stored, setStored] = useState("");
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [load, setLoad] = useState(Date.now());
  function handleItemClick(item) {
    const hdlitem = document.getElementById(item);
    hdlitem.classList.toggle("active");
  }
  useEffect(() => {
    const fetchData = async () => {
      const storedUserId = localStorage.getItem("userId");
      console.log("storedUserId: " + storedUserId);
      if (storedUserId) {
        setStored(storedUserId);
        try {
          const result = await UserService.getById(storedUserId);
          setUser(result.data.user);
          console.log(result.data);
        } catch (error) {
          console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
        }
      
      }
    };

    fetchData();
  }, [load]);

  const handleLogout = () => {
    // Xóa userId khỏi localStorage
    localStorage.removeItem("userId");
    // Tăng giá trị load để kích thích useEffect chạy lại
   window.location.reload();
    // Chuyển hướng đến trang chính
    navigate("/login");
  };
  return (
    <>
      <section className="hdl-header sticky-top">
        <div className="container-fluid">
          <ul className="menutop">
            <li>
              <a href="">
                <i className="fa-brands fa-dashcube"></i> Shop Thời trang
              </a>
            </li>
            <li className="text-phai">
              <a href="" onClick={handleLogout}>
                <i className="fa-solid fa-power-off"></i> Thoát
              </a>
            </li>
            <li className="text-phai">
              <a href="">
                <i className="fa fa-user" aria-hidden="true"></i> {user.name}
              </a>
            </li>
          </ul>
        </div>
      </section>
      <section className="hdl-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2 bg-dark p-0 hdl-left">
              <div className="hdl-left">
                <div className="dashboard-name">
                  Bản điều khiển
                </div>
                <nav className="m-2 mainmenu">
                  <ul className="main">
                    <li className="hdlitem item-sub" id="item1" onClick={() => handleItemClick("item1")}>
                      <FaProductHunt className="icon-left" />
                      <a href="/admin/product">Sản phẩm</a>
                      <FaPlus className="icon-right" />
                      <ul className="submenu">
                        <li>
                          <a href="/admin/product">Tất cả sản phẩm</a>
                        </li>
                        <li>
                          <a href="/admin/productimport">Nhập hàng</a>
                        </li>
                        <li>
                          <a href="/admin/category">Danh mục</a>
                        </li>
                        <li>
                          <a href="/admin/brand">Thương hiệu</a>
                        </li>
                        <li>
                          <a href="/admin/productsale">Khuyễn mãi</a>
                        </li>
                      </ul>
                    </li>
                    <li className="hdlitem item-sub" id="item2" onClick={() => handleItemClick("item2")}>
                      <FaProductHunt className="icon-left" />
                      <a href="/admin/post">Bài viết</a>

                      <FaPlus className="icon-right" />
                      <ul className="submenu">
                        <li>
                          <a href="/admin/post">Tất cả bài viết</a>
                        </li>
                        <li>
                          <a href="/admin/topic">Chủ đề</a>
                        </li>
                        <li>
                          <a href="/admin/page">Trang đơn</a>
                        </li>
                      </ul>
                    </li>
                    <li className="hdlitem item-sub" id="item3" onClick={() => handleItemClick("item3")}>
                      <FaProductHunt className="icon-left" />
                      <a href="/admin/order">Quản lý bán hàng</a>
                      <FaPlus className="icon-right" />
                      <ul className="submenu">
                        <li>
                          <a href="/admin/order">Tất cả đơn hàng</a>
                        </li>
                        <li>
                          <a href="/admin/order/order_export">Xuất hàng</a>
                        </li>
                      </ul>
                    </li>
                    <li className="hdlitem">
                      <FaRegCircle className="icon-left" />
                      <a href="/admin/customer">Khách hàng</a>
                    </li>
                    <li className="hdlitem">
                      <FaRegCircle className="icon-left" />
                      <a href="/admin/contact">Liên hệ</a>
                    </li>
                    <li className="hdlitem item-sub" id="item4" onClick={() => handleItemClick("item4")}>
                      <FaProductHunt className="icon-left" />
                      <a href="#">Giao diện</a>
                      <FaPlus className="icon-right" />
                      <ul className="submenu">
                        <li>
                          <a href="/admin/menu">Menu</a>
                        </li>
                        <li>
                          <a href="/admin/banner">Banner</a>
                        </li>
                      </ul>
                    </li>
                    <li className="hdlitem item-sub" id="item5" onClick={() => handleItemClick("item5")}>
                      <FaProductHunt className="icon-left" />
                      <a href="#">Hệ thống</a>
                      <FaPlus className="icon-right" />
                      <ul className="submenu">
                        <li>
                          <a href="/admin/user">Thành viên</a>
                        </li>
                        <li>
                          <a href="/admin/config">Cấu hình</a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            <div className="col-md-10">
              <div className="content">
                <Outlet/>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
};

export default LayoutAdmin;