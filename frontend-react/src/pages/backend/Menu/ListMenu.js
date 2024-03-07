import { useEffect, useState } from "react";
import { FaEdit, FaEye, FaToggleOff, FaToggleOn, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import MenuService from "../../../service/MenuService";
import CategoryService from "../../../service/CategoryService";
import BrandService from "../../../service/BrandService";
import TopicService from "../../../service/TopicService";
import PageService from "../../../service/PageService";
const ListMenu = () => {
    const [load, setLoad] = useState(Date.now());
    const [menus, setMenus] = useState([]);
    const [categories, setCategories] = useState([]);
    const [topics, setTopics] = useState([]);
    const [position, setPosition] = useState("mainmenu");
    const [link, setLink] = useState("");
    const [name, setName] = useState("");
    const [brands, setBrands] = useState([]);
    const [pages, setPages] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const resultmenu = await MenuService.getList();
          const resultcategory = await CategoryService.getList();
          const resultbrand = await BrandService.getList();
          const resulttopic = await TopicService.getList();
          const resultpage = await PageService.getList();
  
          setMenus(resultmenu.data.menus);
          setCategories(resultcategory.data.categories);
          setBrands(resultbrand.data.brands);
          setTopics(resulttopic.data.topics);
          setPages(resultpage.data.pages);
        } catch (error) {
          console.error("Lỗi khi tải dữ liệu:", error);
        }
      };
  
      fetchData();
    }, [load]);

    const handleSubmit = async (event) => {
        try {
          event.preventDefault();
          const nameBtn = event.nativeEvent.submitter.name;
          const menu = {
            position: position,
          };
    
          if (nameBtn === "ADDCATEGORY") {
            const categoryid = [];
            const categoryidchecked = document.querySelectorAll(".categoryid");
            categoryidchecked.forEach(function (item) {
              if (item.checked) {
                categoryid.push(item.value);
              }
            });
            alert(categoryid);
            menu["ADDCATEGORY"] = nameBtn;
            menu["categoryid"] = categoryid;
          }
    
          if (nameBtn === "ADDBRAND") {
            const brandid = [];
            const brandidchecked = document.querySelectorAll(".brandid");
            brandidchecked.forEach(function (item) {
                if (item.checked) {
                    brandid.push(item.value);
                  }
                });
                menu["ADDBRAND"] = nameBtn;
                menu["brandid"] = brandid;
              }
              if (nameBtn === "ADDTOPIC") {
                const topicid = [];
                const topicidchecked = document.querySelectorAll(".topicid");
                topicidchecked.forEach(function (item) {
                  if (item.checked) {
                    topicid.push(item.value);
                  }
                });
                menu["ADDTOPIC"] = nameBtn;
                menu["topicid"] = topicid;
              }
              if (nameBtn === "ADDCUSTOM") {
                menu["ADDCUSTOM"] = nameBtn;
                menu["name"] = name;
                menu["link"] = link;
              }
        
              console.log(menu);
              const result = await MenuService.store(menu);
              setLoad(Date.now());
            } catch (error) {
              // Thông báo lỗi khi có lỗi trong quá trình xử lý
              console.error("Lỗi xử lý:", error);
            }
          };

          const handDelete = (id) => {
            (async () => {
                const result = await MenuService.deleteMenu(id);
                if (result.data.status === true) {
                    setLoad(Date.now());
                }
            })();
        };
    return ( 
        <div>
            <section className="content-header my-2">
                <h1 className="d-inline">Quản lý menu</h1>
                <div className="row mt-3 align-items-center">
                <div className="col-6">
                    <ul className="manager">
                    <li><a href="menu_index.html">Tất cả (123)</a></li>
                    <li><a href="#">Xuất bản (12)</a></li>
                    <li><a href="/admin/menu/trash">Rác (12)</a></li>
                    </ul>
                </div>
                <div className="col-6 text-end">
                    <input type="text" className="search d-inline" />
                    <button className="d-inline btnsearch">Tìm kiếm</button>
                </div>
                </div>
            </section>
            <section className="content-body my-2">
                <div className="row">
                <form className="col-md-3" onSubmit={handleSubmit}>
                    <ul className="list-group">
                    <li className="list-group-item mb-2">
                        <select name="postion" className="form-control">
                        <option value="mainmenu">Main Menu</option>
                        <option value="footermenu">Footer Menu</option>
                        </select>
                    </li>
                    <li className="list-group-item mb-2 border">
                        <a className="d-block collapsed" href="#multiCollapseCategory" data-bs-toggle="collapse" aria-expanded="false">
                        Danh mục sản phẩm
                        </a>
                        <div className="multi-collapse border-top mt-2 collapse" id="multiCollapseCategory" style={{}}>
                        {categories &&
                    categories.map((category, index) => (
                      <div className="form-check" key={index}>
                        <input
                          name="categoryid[]"
                          className="form-check-input categoryid"
                          value={category.id}
                          type="checkbox"
                          defaultValue
                          id={"categoryid" + category.id}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={"categoryid" + category.id}
                        >
                          {category.name}
                        </label>
                      </div>
                    ))}
                        <div className="my-3">
                            <button name="ADDCATEGORY" type="submit" className="btn btn-sm btn-success form-control">Thêm</button>
                        </div>
                        </div>
                    </li>
                    <li className="list-group-item mb-2 border">
                <Link
                  className="d-block"
                  to="#multiCollapseBrand"
                  data-bs-toggle="collapse"
                  aria-expanded="true"
                >
                  Thương hiệu
                </Link>

                <div
                  className="multi-collapse border-top mt-2 collapse show"
                  id="multiCollapseBrand"
                  style={{}}
                >
                  {brands &&
                    brands.map((brand, index) => (
                      <div className="form-check">
                        <input
                          name="brandid[]"
                          value={brand.id}
                          className="form-check-input brandid"
                          type="checkbox"
                          defaultValue
                          id={"brandid" + brand.id}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={"brandid" + brand.id}
                        >
                          {brand.name}
                        </label>
                      </div>
                    ))}
                  <div className="my-3">
                    <button
                      name="ADDBRAND"
                      type="submit"
                      className="btn btn-sm btn-success form-control"
                    >
                      Thêm
                    </button>
                  </div>
                </div>
              </li>
              <li className="list-group-item mb-2 border">
                <Link
                  className="d-block"
                  to="#multiCollapseTopic"
                  data-bs-toggle="collapse"
                  aria-expanded="true"
                >
                  Chủ đề bài viết
                </Link>
                <div
                  className="multi-collapse border-top mt-2 collapse show"
                  id="multiCollapseTopic"
                  style={{}}
                >
                  {topics &&
                    topics.map((topic, index) => (
                      <div className="form-check">
                        <input
                          name="topicid[]"
                          value={topic.id}
                          className="form-check-input topicid"
                          type="checkbox"
                          defaultValue
                          id={"topicid" + topic.id}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={"topicid" + topic.id}
                        >
                          {topic.name}
                        </label>
                      </div>
                    ))}
                  <div className="my-3">
                    <button
name="ADDTOPIC"
                      type="submit"
                      className="btn btn-sm btn-success form-control"
                    >
                      Thêm
                    </button>
                  </div>
                </div>
              </li>
              <li className="list-group-item mb-2 border">
                <Link
                  className="d-block"
                  to="#multiCollapsePage"
                  data-bs-toggle="collapse"
                  aria-expanded="true"
                >
                  Trang đơn
                </Link>
                <div
                  className="multi-collapse border-top mt-2 collapse show"
                  id="multiCollapsePage"
                  style={{}}
                >
                  {pages &&
                    pages.map((page, index) => (
                      <div className="form-check">
                        <input
                          name="pageid[]"
                          value={page.id}
                          className="form-check-input pageid"
                          type="checkbox"
                          defaultValue
                          id={"pageid" + page.id}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={"pageid" + page.id}
                        >
                          {page.title}
                        </label>
                      </div>
                    ))}
                  <div className="my-3">
                    <button
                      name="ADDPAGE"
                      type="submit"
                      className="btn btn-sm btn-success form-control"
                    >
                      Thêm
                    </button>
                  </div>
                </div>
              </li>
              <li className="list-group-item mb-2 border">
                <Link
                  className="d-block"
                  to="#multiCollapseCustom"
                  data-bs-toggle="collapse"
                  aria-expanded="true"
                >
                  Tùy biến liên kết
                </Link>
                <div
                  className="multi-collapse border-top mt-2 collapse show"
                  id="multiCollapseCustom"
                  style={{}}
                >
                  <div className="mb-3">
                    <label>Tên menu</label>
                    <input
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label>Liên kết</label>
                    <input
                      type="text"
                      name="link"
                      value={link}
onChange={(e) => setLink(e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="my-3">
                    <button
                      name="ADDCUSTOM"
                      type="submit"
                      className="btn btn-sm btn-success form-control"
                    >
                      Thêm
                    </button>
                  </div>
                </div>
              </li>
                    </ul>
                    </form>
                <div className="col-md-9">
                    <div className="row mt-1 align-items-center">
                    <div className="col-md-8">
                        <select name className="d-inline me-1">
                        <option value>Hành động</option>
                        <option value>Bỏ vào thùng rác</option>
                        </select>
                        <button className="btnapply">Áp dụng</button>
                    </div>
                    <div className="col-md-4 text-end">
                        <nav aria-label="Page navigation example">
                        <ul className="pagination pagination-sm justify-content-end">
                            <li className="page-item disabled">
                            <a className="page-link">«</a>
                            </li>
                            <li className="page-item"><a className="page-link" href="#">1</a></li>
                            <li className="page-item"><a className="page-link" href="#">2</a></li>
                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                            <li className="page-item">
                            <a className="page-link" href="#">»</a>
                            </li>
                        </ul>
                        </nav>
                    </div>
                    </div>
                    <table className="table table-bordered">
                    <thead>
                        <tr>
                        <th className="text-center" style={{width: 30}}>
                            <input type="checkbox" id="checkboxAll" />
                        </th>
                        <th>Tên menu</th>
                        <th>Liên kết</th>
                        <th>Vị trí</th>
                        <th className="text-center" style={{width: 30}}>ID</th>
                        </tr>
                    </thead>
                    <tbody>
                    {menus && menus.map((menu, index) => (
                        <tr className="datarow">
                        <td className="text-center">
                            <input type="checkbox" id="checkId" />
                        </td>
                        <td>
                            <div className="name">
                            {menu.name}
                            </div>
                            <div className="function_style">
                            <button  className={menu.status === 1 ? "border-0 px-1 text-success" : "border-0 px-1 text-danger"}>
                                                    {menu.status === 1 ?<FaToggleOn/> : <FaToggleOff/>}
                            </button>
                            <a href="#" className="text-success mx-1">
                                <i className="fa fa-toggle-on" />
                            </a>
                            <Link to={"/admin/menu/edit/" + menu.id} className="text-primary mx-1">
                               <FaEdit/>
                            </Link>
                            <Link to={"/admin/menu/show/" + menu.id}  className="text-info mx-1">
                                <FaEye/>
                            </Link>
                            <Link  onClick={() => handDelete(menu.id)} className="text-danger mx-1">
                                <FaTrash/>
                            </Link>
                            </div>
                        </td>
                        <td>{menu.link}</td>
                        <td>{menu.sort_order}</td>
                        <td className="text-center">{menu.id}</td>
                        </tr>
                         ))}
                    </tbody>
                    </table>
                </div>
                </div>
            </section>
            </div>

     );
}
 
export default ListMenu;