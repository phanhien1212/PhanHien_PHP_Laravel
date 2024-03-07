import { Link } from "react-router-dom";
import { urlImage } from "../config";

const ProductItem = (props) => {
    const product = props.product;
    return ( 
        <div className="product-inner product-resize">
                      <div className="proloop-image">
                        <div className="product--image image-resize">
                          <div className="product--image__inner">
                            <Link  to={"/product-detail/" + product.slug}>
                              <div className="prod-img first-image"><img className="img-loop" src={urlImage + "product/" + product.image} alt=" Áo thun GOLDIE REQUIEM FOR A DREAM 100% cotton 2 chiều " /></div>
                              <div className="prod-img second-image hovered-img hidden-xs"><img className="img-loop" src={urlImage + "product/" + product.image} alt=" Áo thun GOLDIE REQUIEM FOR A DREAM 100% cotton 2 chiều " /></div></Link>
                          </div>
                        </div>
                      </div>
                      <div className="proloop-detail">
                        <h3><Link to={"/product-detail/" + product.slug} className="quickview-product">{product.name}</Link></h3>
                        <p className="proloop--price on_sale"><span className="price">{product.price}₫</span> <span className="price-del">{product.price}₫</span></p>
                      </div>
                    </div>
     );
}
 
export default ProductItem;