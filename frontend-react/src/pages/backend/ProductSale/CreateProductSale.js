import { useEffect, useState } from "react";
import ProductService from "../../../service/ProductService";
import { urlImage } from "../../../config";

const CreateProductSale = () => {
    const [products, setProducts] = useState([]);
   
    const [load, setLoad] = useState(Date.now());

    const handleSale = async (id) => {
        try {
          const datebegin = document.getElementById("datebegin" + id);
          const dateend = document.getElementById("dateend" + id);
          const pricesale = document.getElementById("pricesale" + id);
      
          const productsale = {
            product_id: id,
            pricesale: pricesale.value,
            date_begin: datebegin.value,
            date_end: dateend.value,
          
          };
          console.log(productsale);
      
          await ProductService.storesale(productsale);
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
    }, [load]);
    
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
                        <th>Ngày BĐ</th>
                        <th>Ngày kết thúc</th>
                        <th>Giá sale</th>
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
                        <td>
                            <input name="datebegin" id={"datebegin" + product.id}  type="date" style={{border: "1px solid"}}  />
                        </td>
                        <td>  
                            <input name="dateend" id={"dateend" + product.id} type="date" style={{border: "1px solid"}}  />
                        </td>
                        <td>
                            <input  name="pricesale" id={"pricesale" + product.id} type="number"  style={{ width: 180,border: "1px solid" }} />
                        </td>
                        <td>
                            <button class=""  onClick={() => handleSale(product.id)} style={ {backgroundColor: '#04AA6D',borderRadius:"6px",border:'none', color:'white',fontSize:16,width:100,height:35 }}>Thêm KM</button>
                        </td>
                        
                    </tr>
                     ))}
                </tbody>
            </table>
        </section>
    </div>

     );
}
 
export default CreateProductSale;