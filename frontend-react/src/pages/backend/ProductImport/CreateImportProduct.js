import { useEffect, useState } from "react";
import ProductService from "../../../service/ProductService";
import { urlImage } from "../../../config";
import CategoryService from "../../../service/CategoryService";
import BrandService from "../../../service/BrandService";
const CreateImportProduct = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [load, setLoad] = useState(Date.now());

    const handleImport = async (id) => {
        try {
          const qty = document.getElementById("qty" + id);
          const price = document.getElementById("price" + id);
      
          const productstore = {
            product_id: id,
            qty: qty.value,
            price: price.value,
          };
          console.log(productstore);
      
          await ProductService.storeproductstore(productstore);
          alert("Thêm sản phẩm thành công")
          setLoad(Date.now()); // Kích hoạt tải lại sản phẩm sau khi gửi thành công
        } catch (error) {
          console.error("Lỗi khi gửi khuyến mãi sản phẩm:", error);
          if (error.response) {
            console.error("Dữ liệu phản hồi:", error.response.data);
      }
    }
  };

    useEffect(() => {
        (async () => {
            const result = await ProductService.getList();
            setProducts(result.data.products);
            
            
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const result2 = await CategoryService.getList();
            setCategories(result2.data.categories);
           
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const result3 = await BrandService.getList();
            setBrands(result3.data.brands);
           
        })();
    }, []);
    
    const getCategoryName = (categoryId) => {
        const category = categories.find((cat) => cat.id === categoryId);
        return category ? category.name : "Không có";
      };
      const getBrandName = (brandId) => {
        const brand = brands.find((brand) => brand.id === brandId);
        return brand ? brand.name : "Không có";
      };

    return ( 
        <div>
        <section className="content-header my-2">
            <h1 className="d-inline">Tất cả sản phẩm</h1>
            
        </section>
        <section className="content-body my-2">
            <table className="table table-bordered" id="mytable2">
                <thead>
                    <tr>
                        <th className="text-center" style={{ width: 30 }}>
                            <input type="checkbox" id="checkboxAll" />
                        </th>
                        <th className="text-center" style={{ width: 90 }}>Hình ảnh</th>
                        <th>Tên sản phẩm</th>
                        <th>Tên danh mục</th>
                        <th>Tên thương hiệu</th>
                        <th>Số lượng</th>
                        <th>Giá nhập</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {products && products.map((product, index) => (
                    <tr className="datarow">
                        <td className="text-center">
                            <input type="checkbox" id="checkId" />
                        </td>
                        <td>
                            <img style={{ width: 90 }} src={urlImage + "product/" + product.image} alt="hh" />
                        </td>
                        <td>
                            <div className="name">
                                {product.name}
                            </div>
                            
                        </td>
                        <td>{getCategoryName(product.category_id)}</td>
                        <td>{getBrandName(product.brand_id)}</td>
                        <td>
                            <input  name="qty" id={"qty" + product.id} type="number"  style={{ width: 180,border: "1px solid" }} />
                        </td>
                        <td>
                            <input  name="price" id={"price" + product.id} type="number"  style={{ width: 180,border: "1px solid" }} />
                        </td>
                        <td>
                            <button class="text-center"  onClick={() => handleImport(product.id)} style={ {backgroundColor: '#04AA6D',borderRadius:"6px",border:'none', color:'white',fontSize:16,width:100,height:35 }}>Thêm KM</button>
                        </td>
                        
                    </tr>
                     ))}
                </tbody>
            </table>
        </section>
    </div>

     );
}
 
export default CreateImportProduct;