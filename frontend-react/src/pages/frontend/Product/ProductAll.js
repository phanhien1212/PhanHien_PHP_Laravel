import { useEffect, useState } from 'react';
import ProductService from '../../../service/ProductService';
import { Link } from 'react-router-dom';
import Product from '.';
import ProductItem from '../../../components/ProductItem';
import FilterCategory from '../../frontend/Product/index';
const ProductAll = () => {
  const [products, setProducts] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [load, setLoad] = useState(Date.now());
  const [tempProducts, setTempProducts] = useState([]);
  const [productPrice, setProductsPrice] = useState(null);  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ProductService.productall(); // Thêm trang vào yêu cầu API
        setProducts(response.data.products);
        setTempProducts(response.data.products);
        console.log()
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const giamProducts = () => {
    const sortedProducts = [...products].sort((a, b) => b.price - a.price);
    setProducts(sortedProducts);
  };

  const tangProducts = () => {
    const sortedProducts = [...products].sort((a, b) => a.price - b.price);
    setProducts(sortedProducts);
  };
  

  const itemsPerPage = 5; // Số lượng mục trên mỗi trang

  const pageCount = Math.ceil(products.length / itemsPerPage);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = products.slice(startIndex, endIndex);

 

  const handlePriceFilter = async (price) => {
    let updatedSelectedPrices = [...selectedPrices];

    // Xử lý checkbox giá được chọn hoặc bỏ chọn
    if (price === null) {
      updatedSelectedPrices = [];
    } else if (updatedSelectedPrices.includes(price)) {
      updatedSelectedPrices = updatedSelectedPrices.filter((selectedPrice) => selectedPrice !== price);
    } else {
      updatedSelectedPrices.push(price);
    }

    setSelectedPrices(updatedSelectedPrices);

    // Lọc danh sách sản phẩm dựa trên giá hoặc hiển thị tất cả sản phẩm
    try {
      let filteredProducts = [];

      if (updatedSelectedPrices.length > 0) {
        // Nếu có giá được chọn, thì lọc theo giá
        const response = await ProductService.productall(); // Thay đổi limit và category_id tùy ý
        filteredProducts = (productPrice===null?tempProducts:productPrice).filter((product) => {
          for (const selectedPrice of updatedSelectedPrices) {
            if (selectedPrice === '<100000' && product.price < 100000) return true;
            if (selectedPrice === '100000-250000' && product.price >= 100000 && product.price <= 250000) return true;
            if (selectedPrice === '250000-500000' && product.price > 250000 && product.price <= 500000) return true;
            if (selectedPrice === '500000-800000' && product.price > 500000 && product.price <= 800000) return true;
            if (selectedPrice === '800000<' && product.price > 800000) return true;
          }
          return false;
        });
      } else {
        // Nếu không có giá được chọn, hiển thị tất cả sản phẩm
        const response = await ProductService.productall(); // Thay đổi limit và category_id tùy ý
        filteredProducts = response.data.products;
      }

      setProducts(filteredProducts);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const FilterCategory = async (category_id) => {
    const childCategories = categories.filter(
      (category) => category.parent_id === category_id
    );
  
    const selectedCategories = [
      category_id,
      ...childCategories.map((cat) => cat.id),
    ];
  
    const filteredProducts = tempProducts.filter((product) =>
      selectedCategories.includes(product.category_id)
    );
  
    console.log("gghh",filteredProducts);
    
    setProducts(filteredProducts);
    setProductsPrice(filteredProducts)
  };
  console.log(productPrice);
  
  const FilterBrand = async (brand_id) => {
    // Filter products based on selected brand
    const filteredProducts = tempProducts.filter(
      (product) => product.brand_id === brand_id
    );

    console.log(filteredProducts);
    setProducts(filteredProducts);
    setProductsPrice(filteredProducts)
  };
  return (
    <div>
      <Product handlePriceFilter={handlePriceFilter} FilterBrand={FilterBrand} FilterCategory={FilterCategory} giamProducts={giamProducts }  tangProducts={tangProducts } />
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

export default ProductAll;