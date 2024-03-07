import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import MenuService from "../../../service/MenuService";
import { urlImage } from "../../../config";

const ShowMenu = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [menu, setMenu] = useState({});
    const [menus, setMenus] = useState([]);
    const [load, setLoad] = useState(Date.now());
  
    console.log("id" + id);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const result = await MenuService.getById(id);
          const resultMenus = await MenuService.getList();
          const menuData = result.data.menu;
         setMenus(result.data.menus);
          setMenu(menuData);
        } catch (error) {
          console.error("Error fetching menu data:", error);
        }
      };
      fetchData();
    }, [id, load]);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const resultMenus = await MenuService.getList();
        
         setMenus(resultMenus.data.menus);
        } catch (error) {
          console.error("Error fetching menu data:", error);
        }
      };
      fetchData();
    }, [load]);
   
    const handDelete = async () => {
      try {
        const result = await MenuService.delete(id);
        if (result.data.status === true) {
          // After successful deletion, navigate to the list page
          navigate("/admin/menu");
        }
      } catch (error) {
        console.error("Error deleting menu:", error);
        // Handle error if necessary
      }
    };
    return ( 
        <div>
        <div className="content">
          <section className="content-header my-2">
            <h1 className="d-inline">Chi tiết</h1>
            <div className="row mt-2 align-items-center">
              <div className="col-md-12 text-end">
                <Link to="/admin/menu" className="btn btn-primary btn-sm">
                  <i className="fa fa-arrow-left" /> Về danh sách
                </Link>
                <Link
                  to={`/admin/menu/update/${id}`}
                  className="btn btn-success btn-sm"
                >
                  <i className="fa fa-edit" /> Sửa
                </Link>
  
                <button
                  onClick={() => handDelete(id)}
                  className="btn btn-danger btn-sm"
                >
                  <i className="fa fa-trash" /> Xóa
                </button>
              </div>
            </div>
          </section>
          <section className="content-body my-2">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th style={{ width: 180 }}>Tên trường</th>
                  <th>Giá trị</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>id</td>
                  <td>{menu.id}</td>
</tr>
                <tr>
                  <td>name</td>
                  <td>{menu.name}</td>
                </tr>
                <tr>
                  <td>type</td>
                  <td>{menu.type}</td>
                </tr>
                <tr>
                  <td>position</td>
                  <td>{menu.position}</td>
                </tr>
                <tr>
                  <td>table_id</td>
                  <td>{menu.table_id}</td>
                </tr>
                <tr>
                  <td>parent_id</td>
                  <td>menu.parent_id</td>
                </tr>
                <tr>
                  <td>sort_order</td>
                  <td>{menu.sort_order}</td>
                </tr>
                <tr>
                  <td>description</td>
                  <td>{menu.description}</td>
                </tr>
               
                <tr>
                  <td>status</td>
                  <td>{menu.status === 1 ? "Đã xuất bản" : "Chưa xuất bản"}</td>
                </tr>
                <tr>
                  <td>updated_at</td>
                  <td>{menu.updated_at}</td>
                </tr>
                <tr>
                  <td>updated_by</td>
                  <td>{menu.updated_by}</td>
                </tr>
                <tr>
                  <td>created_at</td>
                  <td>{menu.created_at}</td>
                </tr>
                <tr>
                  <td>created_by</td>
                  <td>{menu.created_by}</td>
                </tr>
              </tbody>
            </table>
          </section>
        </div>
      </div>
     );
}
 
export default ShowMenu;