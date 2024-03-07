import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import MenuService from "../../../service/MenuService";

const EditMenu = () => {
    const [position, setPosition] = useState("mainmenu");
    const [name, setName] = useState("");
    const [link, setLink] = useState("");
    const [status, setStatus] = useState("");
    const [parent_id, setParentId] = useState("");
    const [sort_order, setSortOrder] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [table_id, setTableId] = useState("");
    const [menu, setMenu] = useState([]);
    const [menus, setMenus] = useState([]);
    const [load, setLoad] = useState(Date.now());
    const navigate = useNavigate ();  // Initialize useHistory
    const { id } = useParams();
    useEffect(() => {
        const fetchData = async () => {
          try {

            const resultMenus = await MenuService.getList();
            setMenus(resultMenus.data.menus)
            const result = await MenuService.getById(id);
            const menuData = result.data.menu;
            console.log(result.data.menu)
            setName(menuData.name);
            setPosition(menuData.position)
            setLink(menuData.link)
            setDescription(menuData.description)
            setTableId(menuData.table_id)
            setType(menuData.type)
            setParentId(menuData.parent_id)
            setSortOrder(menuData.sort_order)
            setStatus(menuData.status);
            setMenu(menuData);
          } catch (error) {
            console.error("Error fetching brand data:", error);
          }
        };
        fetchData();
      }, [ load]);
      const handleSubmit = async (e) => {
        e.preventDefault();
      
        const formData = new FormData();
        formData.append("name", name);
        formData.append("link", link);
        formData.append("position", position);
        formData.append("status", status);
        formData.append("table_id", table_id);
        formData.append("parent_id", parent_id);
        formData.append("sort_order", sort_order);
        formData.append("description", description);
        formData.append("type", type);
      
        try {
          // Gọi API hoặc hàm xử lý cập nhật menu ở đây
          await MenuService.update(id, formData);
      
         
          alert("Cập nhật thành công");
          navigate('/admin/menu');
        } catch (error) {
          console.error("Error updating menu:", error);
        }
      };
      
    return ( 
        <div className="content">
  <section className="content-header my-2">
    <h1 className="d-inline">Cập nhật menu</h1>
    <div className="text-end">
      <Link to="menu_index.html" className="btn btn-sm btn-success">
        <i className="fa fa-arrow-left" /> Về danh sách
      </Link>
    </div>
  </section>
  <section className="content-body my-2">
<form className="row" onSubmit={handleSubmit}>
      <div className="col-md-9">
        <div className="mb-3">
          <label htmlFor="name"><strong>Tên menu</strong></label>
          <input defaultValue type="text" value={name} onChange={(e)=>setName(e.target.value)} name="name" id="name" className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="link"><strong>Liên kết</strong></label>
          <input defaultValue type="text" value={link} onChange={(e)=>setLink(e.target.value)}  name="link" id="link" className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="position"><strong>Vị trí</strong></label>
          <select name="position" id="position" value={position} onChange={(e)=>setPosition(e.target.value)}  className="form-control">
            <option value="mainmenu">Main
              Menu</option>
            <option value="footermenu">Footer Menu</option>
          </select>
        </div>
      </div>
      <div className="col-md-3">
        <div className="box-container mt-4 bg-white">
          <div className="box-header py-1 px-2 border-bottom">
            <strong>Đăng</strong>
          </div>
          <div className="box-body p-2 border-bottom">
            <p>Chọn trạng thái đăng</p>
            <select name="status" value={status} onChange={(e)=>setStatus(e.target.value)}  className="form-control">
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
            <strong>Cấp cha</strong>
          </div>
          <select name="parent_id" id="parent_id" value={parent_id} onChange={(e)=>setParentId(e.target.value)} className="form-control">
          <option value="0">Chọn cấp cha</option>
          {menus.map((menu) => (
                  <option key={menu.id} value={menu.id}>
                    {menu.name}
                  </option>
                ))}
          </select>
        </div>
        <div className="box-container mt-2 bg-white">
          <div className="box-header py-1 px-2 border-bottom">
            <strong>Thứ tự</strong>
          </div>
          <div className="box-body p-2 border-bottom">
            <select name="sort_order" value={sort_order} onChange={(e)=>setSortOrder(e.target.value)} className="form-control">ư
            <option value="">Chọn thứ tự</option>
            {menus.map((item) => (
    <option key={item.id} value={item.sort_order + 1}>
      Sau: {item.name}
    </option>
  ))}
            </select>
</div>
        </div>
      </div>
    </form>
  </section>
</div>

     );
}
 
export default EditMenu;