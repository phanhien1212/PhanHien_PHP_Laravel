import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MenuService from "../../../service/MenuService";
import { FaUndo } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";

const TrashMenu = () => {
    const [menus, setMenus] = useState([]);
    const [load, setLoad] = useState(Date.now());
    useEffect(() => {
        (async () => {
            const result = await MenuService.getList1();
            setMenus(result.data.menus);
        })();
    },[load]);
    const handleDestroy = (id) => {
        (async () => {
            const result = await MenuService.destroy(id);
            if (result.data.status === true) {
                setLoad(Date.now());
            }
        })();
    };
    
      
    const handleReStore= (id) => {
        (async () =>{
            const res = await MenuService.restore(id);
            
             if(res.data.status === true)
             {
                 setLoad(Date.now());
             }
             })();  
      };
    return ( 
        <div className="content">
  <section className="content-header my-2">
    <h1 className="d-inline">Thùng rác menu</h1>
    <div className="row mt-3 align-items-center">
      <div className="col-6">
        <ul className="manager">
          <li><Link to="/admin/menu">Tất cả (123)</Link></li>
          <li><Link to="#">Xuất bản (12)</Link></li>
          <li><Link to="menu_trash.html">Rác (12)</Link></li>
        </ul>
      </div>
      <div className="col-6 text-end">
        <input type="text" className="search d-inline" />
        <button className="d-inline btnsearch">Tìm kiếm</button>
      </div>
    </div>
    <div className="row mt-1 align-items-center">
      <div className="col-md-8">
        <select name className="d-inline me-1">
          <option value>Hành động</option>
          <option value>Bỏ vào thùng rác</option>
        </select>
        <button className="btnapply">Áp dụng</button>
        <select name className="d-inline me-1">
          <option value>Tất cả danh mục</option>
        </select>
        <select name className="d-inline me-1">
          <option value>Tất cả thương hiệu</option>
        </select>
        <button className="btnfilter">Lọc</button>
      </div>
      <div className="col-md-4 text-end">
        <nav aria-label="Page navigation example">
          <ul className="pagination pagination-sm justify-content-end">
            <li className="page-item disabled">
              <Link className="page-link">«</Link>
            </li>
            <li className="page-item"><Link className="page-link" to="#">1</Link></li>
            <li className="page-item"><Link className="page-link" to="#">2</Link></li>
            <li className="page-item"><Link className="page-link" to="#">3</Link></li>
            <li className="page-item">
              <Link className="page-link" to="#">»</Link>
            </li>
          </ul>
        </nav>
</div>
    </div>
  </section>
  <section className="content-body my-2">
    <table className="table table-bordered">
      <thead>
        <tr>
          <th className="text-center" style={{width: 30}}>
            <input type="checkbox" id="checkboxAll" />
          </th>
          <th>Tên menu</th>
          <th>Liên kết</th>
          <th>Vị trí</th>
        </tr>
      </thead>
      <tbody>
      {menus &&
                  menus.map((menu, index) => (
        <tr className="datarow">
          <td>
            <input type="checkbox" id="checkId" />
          </td>
          <td>
            <div className="name">
              <Link to="menu_show.html">
               {menu.name}
              </Link>
            </div>
            <div className="function_style">
            <button  onClick={()=>handleReStore(menu.id)} className="px-1 text-primary border-0 bg-light">
                                                    <FaUndo/>
                                                </button>
                                <button onClick={()=>handleDestroy(menu.id)} className="px-1 text-danger border-0 bg-light">
                                                    <FaTrash/>
                                                </button>
            </div>
          </td>
          <td>{menu.link}</td>
          <td>{menu.position}</td>
        </tr>
            ))}
      </tbody>
    </table>
  </section>
</div>

     );
}
 
export default TrashMenu;