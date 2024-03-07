import Product from ".";
import { useEffect, useState } from 'react';
import ProductService from '../../../service/ProductService';

import ProductItem from '../../../components/ProductItem';

const ProductHotBuy = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ProductService.producthotbuy(5); // Thay đổi limit và category_id tùy ý
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const itemsPerPage = 5; // Số lượng mục trên mỗi trang

  const pageCount = Math.ceil(products.length / itemsPerPage);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = products.slice(startIndex, endIndex);

    return ( 
      <div>
        <Product/>
        <div className="collection-listproduct" id="collection-body">
          <div className="container">
            <div className="wraplist-collection">
              <div className="listProduct-row listProduct-resize listProduct-filter">
                {currentItems.map((product) => (
                  <div style-id className="col-md-cus5 col-sm-6 col-xs-6 product-loop" key={product.slug} >
                    <ProductItem product={product} />
                  </div>
                ))}


              </div>


              <nav aria-label="..." style={{ marginLeft: "470px" }}>
                  <ul className="pagination">
                    <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
                      <a className="page-link" href="#" onClick={() => handlePageClick(currentPage - 1)} tabindex="-1">
                        Previous
                      </a>
                    </li>
                    {[...Array(pageCount)].map((_, index) => (
                      <li key={index} className={`page-item ${currentPage === index ? 'active' : ''}`}>
                        <a className="page-link" href="#" onClick={() => handlePageClick(index)}>
                          {index + 1}
                          {currentPage === index && <span className="sr-only">(current)</span>}
                        </a>
                      </li>
                    ))}
                    <li className={`page-item ${currentPage === pageCount - 1 ? 'disabled' : ''}`}>
                      <a className="page-link" href="#" onClick={() => handlePageClick(currentPage + 1)}>
                        Next
                      </a>
                    </li>
                  </ul>
                </nav>
            </div>
          </div>
        </div>
</div>


     );
}
 
export default ProductHotBuy;