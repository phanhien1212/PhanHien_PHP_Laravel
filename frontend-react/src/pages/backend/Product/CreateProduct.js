import { useEffect, useState } from "react";
import ProductService from "../../../service/ProductService";
import CategoryService from "../../../service/CategoryService";
import BrandService from "../../../service/BrandService";
const CreateProduct = () => {
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [category_id, setCategoryId] = useState("");
    const [brand_id, setBrandId] = useState("");
    const [products, setProducts] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [detail, setDetail] = useState("");
    const [price, setPrice] = useState("");
    const [status, setStatus] = useState(1);
    const [load, setLoad] = useState(Date.now());

    useEffect(() => {
        (async () => {
            const result = await CategoryService.getList();
            setCategories(result.data.categories);
            const results = await BrandService.getList();
            setBrands(results.data.brands);
        })();
    }, [load]);

    const handSubmit = async (event) => {
        event.preventDefault();
        var image = document.getElementById("image");
       var product = new FormData();
       product.append("name",name);
       product.append("description",description);
       product.append("status",status);
       product.append("detail",detail);
       product.append("brand_id",brand_id);
       product.append("category_id",category_id);
       product.append("price",price);

       product.append("image",image.files.length === 0 ? "" : image.files[0]);
       (async () =>{
       const result = await ProductService.store(product);
        if(result.data.status === true)
        {
            setLoad(Date.now());
        }
        })();
      }
    return (
        <div>
            <section className="content-header my-2">
                <h1 className="d-inline">Thêm sản phẩm</h1>
                <div className="mt-1 text-end">
                    <a className="btn btn-sm btn-primary" href="product_index.html">
                        <i className="fa fa-arrow-left" /> Về danh sách
                    </a>
                </div>
            </section>
            <section className="content-body my-2">
            <form onSubmit={handSubmit}>
                <div className="row">
                    <div className="col-md-9">
                        <div className="mb-3">
                            <label><strong>Tên sản phẩm (*)</strong></label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nhập tên sản phẩm" name="name" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label><strong>Chi tiết (*)</strong></label>
                            <textarea name="detail" value={detail} onChange={(e) => setDetail(e.target.value)} placeholder="Nhập chi tiết sản phẩm" rows={7} className="form-control" defaultValue={""} />
                        </div>
                        <div className="mb-3">
                            <label><strong>Mô tả (*)</strong></label>
                            <textarea name="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="form-control" placeholder="Nhập mô tả" defaultValue={""} />
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="box-container mt-4 bg-white">
                            <div className="box-header py-1 px-2 border-bottom">
                                <strong>Đăng</strong>
                            </div>
                            <div className="box-body p-2 border-bottom">
                                <select name="status" className="form-select">
                                    <option value={1}>Xuất bản</option>
                                    <option value={2}>Chưa xuất bản</option>
                                </select>
                            </div>
                            <div className="box-footer text-end px-2 py-2">
                                <button type="submit" className="btn btn-success btn-sm text-end">
                                    <i className="fa fa-save" aria-hidden="true" /> Đăng
                                </button>
                            </div>
                        </div>
                        <div className="box-container mt-2 bg-white">
                            <div className="box-header py-1 px-2 border-bottom">
                                <strong>Danh mục(*)</strong>
                            </div>
                            <div className="box-body p-2 border-bottom">
                                <select name="category_id" className="form-select" value={category_id} onChange={(e) => setCategoryId(e.target.value)}>
                                    <option value>Chọn danh mục</option>
                                    <option value={1}>Tên danh mục</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                        ))}
                                </select>
                            </div>
                        </div>
                        <div className="box-container mt-2 bg-white">
                            <div className="box-header py-1 px-2 border-bottom">
                                <strong>Thương hiệu(*)</strong>
                            </div>
                            <div className="box-body p-2 border-bottom">
                                <select name="brand_id" className="form-select" value={brand_id} onChange={(e) => setBrandId(e.target.value)}>
                                    <option value>Chọn thương hiêu</option>
                                    <option value={1}>Tên danh mục</option>
                                    {brands.map((brand) => (
                                        <option key={brand.id} value={brand.id}>
                                            {brand.name}
                                        </option>
                                        ))}
                                </select>
                            </div>
                        </div>
                        <div className="box-container mt-2 bg-white">
                            <div className="box-header py-1 px-2 border-bottom">
                                <strong>Giá và số lượng</strong>
                            </div>
                            <div className="box-body p-2 border-bottom">
                                <div className="mb-3">
                                    <label><strong>Giá bán (*)</strong></label>
                                    <input type="number" defaultValue={10000} min={10000} value={price} onChange={(e) => setPrice(e.target.value)} name="price" className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label><strong>Giá khuyến mãi (*)</strong></label>
                                    <input type="number" defaultValue={10000} min={10000} name="pricesale" className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label><strong>Số lượng (*)</strong></label>
                                    <input type="number" defaultValue={1} min={1} name="qty" className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div className="box-container mt-2 bg-white">
                            <div className="box-header py-1 px-2 border-bottom">
                                <strong>Hình đại diện(*)</strong>
                            </div>
                            <div className="box-body p-2 border-bottom">
                                <input type="file" id="image" className="form-control" />
                            </div>
                        </div>
                    </div>
                </div>
                </form>
            </section>
        </div>

    );
}

export default CreateProduct;