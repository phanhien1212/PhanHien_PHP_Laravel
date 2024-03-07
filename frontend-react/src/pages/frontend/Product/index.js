import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import CategoryService from '../../../service/CategoryService';
import BrandService from '../../../service/BrandService';
import ProductService from '../../../service/ProductService';
const Product = ({ handlePriceFilter, giamProducts, tangProducts,FilterCategory, FilterBrand }) => {
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [load, setLoad] = useState(Date.now());
  const [brands, setBrands] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await CategoryService.getList(); // Thêm trang vào yêu cầu API
        setCategories(response.data.categories);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ProductService.productall(); // Thêm trang vào yêu cầu API
        setProducts(response.data.products);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [load]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await BrandService.getList(); // Thêm trang vào yêu cầu API
        setBrands(response.data.brands);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleCheckboxChange = (price) => {
    setSelectedPrice(price);
    handlePriceFilter(price); // Gọi hàm xử lý khi giá thay đổi
  };

  

  return (
    <div className="layout-collections 1001666735">
      <div className="breadcrumb-shop">
        <div className="container">
          <div className="breadcrumb-list">
            <ol className="breadcrumb breadcrumb-arrows">
              <li itemProp="itemListElement">
                <a href="/" target="_self" itemProp="item"><span itemProp="name">Trang chủ</span></a>
                <meta itemProp="position" content={1} />
              </li>
              <li className="active">
                <span itemProp="item"><strong>Tất cả sản phẩm</strong></span>
                <meta />
              </li>
            </ol>
          </div>
        </div>
      </div>
      <div className="collection-banner-header">
        <div className="container container-xs-pd0"><img className="img-banner" src={require('../../../assets/408262752_684668803753403_5067146374617434954_n.jpg')} alt="Tất cả sản phẩm" /></div>
      </div>
      <div className="wrapper-mainCollection">
        <div className="collection-heading">
          <div className="container">
            <div className="bgwhite-heading">
              <div className="row">
                <div className="col-md-3 col-sm-12 col-xs-12">
                  <h1 className="title">Tất cả sản phẩm</h1>

                </div>
                <div className="col-md-3 col-sm-12 col-xs-12">
                  <div className="collection-sortbyfilter-container">
                    <div className="collection-sortby-filter">
                      <div className="collection-filterby">
                        <div className="layered_filter_title boxstyle-mb" data-layered-click="#layered_filter_mobile">
                          <p className="title_filter"><span className="icon-filter"><svg viewBox="0 0 20 20">
                            <path fill="none" strokeWidth={2} strokeLinejoin="round" strokeMiterlimit={10} d="M12 9v8l-4-4V9L2 3h16z" /></svg></span> <span className="icon-close"><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" /></svg></span> Bộ lọc</p>
                        </div>
                      </div>
                      <div className="collection-sortby">
                        <div className="layered_filter_title boxstyle-mb" data-layered-click="#layered_sortby_mobile">
                          <p className="title_filter">
                            <span class="icon-filter"><i class="fa fa-sort-alpha-asc" aria-hidden="true"></i></span>
                            <span className="icon-close">
                              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" /></span> Thương hiệu</p>
                        </div>
                      </div>
                    </div>

                    <div className="collection-sortby-option layered_filter_mobileContent" id="layered_sortby_mobile">
                  
                        <ul className="sort-by sort-by-content" >
                        {brands &&
                  brands.map((brand, index) => (
                          <li className=''><span onClick={() => FilterBrand(brand.id)}
                          to="/product">{brand.name}</span></li>
                          ))}
                        </ul>
                    
                    </div>

                  </div>

                </div>
                <div className="col-md-3 col-sm-12 col-xs-12">
                  <div className="collection-sortbyfilter-container">
                    <div className="collection-sortby-filter">
                      <div className="collection-filterby">
                        <div className="layered_filter_title boxstyle-mb" data-layered-click="#layered_filter_mobile">
                          <p className="title_filter"><span className="icon-filter"><svg viewBox="0 0 20 20">
                            <path fill="none" strokeWidth={2} strokeLinejoin="round" strokeMiterlimit={10} d="M12 9v8l-4-4V9L2 3h16z" /></svg></span> <span className="icon-close"><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" /></svg></span> Bộ lọc</p>
                        </div>
                      </div>
                      <div className="collection-sortby">
                        <div className="layered_filter_title boxstyle-mb" data-layered-click="#layered_sortby_mobile">
                          <p className="title_filter">
                            <span class="icon-filter"><i class="fa fa-sort-alpha-asc" aria-hidden="true"></i></span>
                            <span className="icon-close">
                              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" /></span> Danh mục</p>
                        </div>
                      </div>
                    </div>

                    <div className="collection-sortby-option layered_filter_mobileContent" id="layered_sortby_mobile">
                     
                        <ul className="sort-by sort-by-content" >
                            {categories &&
                  categories
                    .filter((category) => category.parent_id === 0)
                    .map((category, index) => (
                          <li className=''><span  onClick={() => FilterCategory(category.id)}>{category.name}</span></li>
                          ))}
                        </ul>
                      
                    </div>

                  </div>

                </div>

                <div className="col-md-3 col-sm-12 col-xs-12">
                  <div className="collection-sortbyfilter-container">
                    <div className="collection-sortby-filter">
                      <div className="collection-filterby">
                        <div className="layered_filter_title boxstyle-mb" data-layered-click="#layered_filter_mobile">
                          <p className="title_filter"><span className="icon-filter"><svg viewBox="0 0 20 20">
                            <path fill="none" strokeWidth={2} strokeLinejoin="round" strokeMiterlimit={10} d="M12 9v8l-4-4V9L2 3h16z" /></svg></span> <span className="icon-close"><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" /></svg></span> Bộ lọc</p>
                        </div>
                      </div>
                      <div className="collection-sortby">
                        <div className="layered_filter_title boxstyle-mb" data-layered-click="#layered_sortby_mobile">
                          <p className="title_filter">
                            <span class="icon-filter"><i class="fa fa-sort-alpha-asc" aria-hidden="true"></i></span>
                            <span className="icon-close">
                              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" /></span> Sắp xếp</p>
                        </div>
                      </div>
                    </div>
                    <div className="collection-sortby-option layered_filter_mobileContent" id="layered_sortby_mobile">
                      <ul className="sort-by sort-by-content" >
                        <li className='active'><span>Sản phẩm nổi bật</span></li>
                        <li onClick={tangProducts}><span>Giá: Tăng dần</span></li>
                        <li onClick={giamProducts}><span>Giá: Giảm dần</span></li>
                        <li ><span>Tên: A-Z</span></li>
                        <li><span>Tên: Z-A</span></li>
                        <li><Link to={"/product/productsale"}><span>Giảm giá</span></Link></li>
                        <li><Link to={"/product/productnew"}><span>Mới nhất</span></Link></li>
                        <li><Link to={"/product/producthotbuy"}><span>Bán chạy nhất</span></Link></li>
                        <li><span>Tồn kho giảm dần</span></li>
                      </ul>
                    </div>

                  </div>

                </div>

              </div>

            </div>
          </div>
        </div>
        <div className="collection-filter">
          <div className="container">
            <div className="wrapper_layered_filter">
              <div className="layered_filter_container">
                <div className="layered_filter_title hidden-xs hidden-sm">
                  <p className="title_filter"><span className="icon-filter"><svg viewBox="0 0 20 20">
                    <path fill="none" strokeWidth={2} strokeLinejoin="round" strokeMiterlimit={10} d="M12 9v8l-4-4V9L2 3h16z" /></svg></span> Bộ lọc</p>
                </div>
                <div className="layered_filter_group layered_filter_mobileContent" id="layered_filter_mobile">
                  <div className="row clearfix">
                    <div className="filter_group col-md-3 col-sm-12 col-xs-12" aria-expanded="true">
                      <div className="filter_group_block">
                        <div className="filter_group-subtitle">
                          <span>Lọc giá</span>
                          <span class="icon-control"><i class="fa fa-chevron-down" aria-hidden="true"></i></span>
                        </div>
                        <div className="filter_group-content filter-price">
                          <ul className="checkbox-list">
                            <li><input type="checkbox" id="p1" onChange={() => handleCheckboxChange('<100000')} /> <label htmlFor="p1" ><span>Dưới</span> 100.000₫</label></li>
                            <li><input type="checkbox" id="p2" onChange={() => handleCheckboxChange('100000-250000')} /> <label htmlFor="p2">100.000₫ - 250.000₫</label></li>
                            <li><input type="checkbox" id="p3" onChange={() => handleCheckboxChange('250000-500000')} /> <label htmlFor="p3">250.000₫ - 500.000₫</label></li>
                            <li><input type="checkbox" id="p4" onChange={() => handleCheckboxChange('500000-800000')} /> <label htmlFor="p4">500.000₫ - 800.000₫</label></li>
                            <li><input type="checkbox" id="p5" onChange={() => handleCheckboxChange('>800000')} /> <label htmlFor="p5"><span>Trên</span> 800.000₫</label></li>
                          </ul>
                        </div>
                      </div>
                    </div>{/* ./filter color */}
                    <div className="filter_group col-md-3 col-sm-12 col-xs-12" aria-expanded="true">
                      <div className="filter_group_block">
                        <div className="filter_group-subtitle">
                          <span>Màu sắc</span>
                          <span class="icon-control"><i class="fa fa-chevron-down" aria-hidden="true"></i></span>
                        </div>
                        <div className="filter_group-content filter-color">
                          <ul className="checkbox-list clearfix">
                            <li><input type="checkbox" id="data-color-p1" /> <label htmlFor="data-color-p1" style={{ backgroundColor: '#eb11eb' }}>Tím</label></li>
                            <li><input type="checkbox" id="data-color-p2" /> <label htmlFor="data-color-p2" style={{ backgroundColor: '#ffff05' }}>Vàng</label></li>
                            <li><input type="checkbox" id="data-color-p3" /> <label htmlFor="data-color-p3" style={{ backgroundColor: '#f54105' }}>Cam</label></li>
                            <li><input type="checkbox" id="data-color-p4" /> <label htmlFor="data-color-p4" style={{ backgroundColor: '#f23895' }}>Hồng</label></li>
                            <li><input type="checkbox" id="data-color-p5" /> <label htmlFor="data-color-p5" style={{ backgroundColor: '#000000' }}>Đen</label></li>
                            <li><input type="checkbox" id="data-color-p6" /> <label htmlFor="data-color-p6" style={{ backgroundColor: '#cccaca' }}>Xám</label></li>
                            <li><input type="checkbox" id="data-color-p7" /> <label htmlFor="data-color-p7" style={{ backgroundColor: '#fffcfc' }}>Trắng</label></li>
                            <li><input type="checkbox" id="data-color-p8" /> <label htmlFor="data-color-p8" style={{ backgroundColor: '#1757eb' }}>Xanh dương</label></li>
                            <li><input type="checkbox" id="data-color-p9" /> <label htmlFor="data-color-p9" style={{ backgroundColor: '#099116' }}>Xanh</label></li>
                            <li><input type="checkbox" id="data-color-p10" /> <label htmlFor="data-color-p10" style={{ backgroundColor: '#52ff52' }}>Xanh lá</label></li>
                          </ul>
                        </div>
                      </div>
                    </div>{/* ./filter size */}

                    <div className="filter_group col-md-3 col-sm-12 col-xs-12" aria-expanded="true">
                      <div className="filter_group_block">
                        <div className="filter_group-subtitle">
                          <span>Kích thước</span>
                          <span class="icon-control"><i class="fa fa-chevron-down" aria-hidden="true"></i></span>
                        </div>
                        <div className="filter_group-content filter-size">
                          <ul className="checkbox-list">
                            <li><input type="checkbox" defaultValue="S" /> <label>S</label></li>
                            <li><input type="checkbox" defaultValue=" M" /> <label >M</label></li>
                            <li><input type="checkbox" defaultValue=" L" /> <label >L</label></li>
                            <li><input type="checkbox" defaultValue=" XS" /> <label >XS</label></li>
                          </ul>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
              <div className="layered_filter_tags">
                <div className="filter_tags">
                  Lọc giá: <span className="filter_tags_remove"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 50 50" xmlSpace="preserve">
                    <path fill="#333" d="M9.016 40.837a1.001 1.001 0 0 0 1.415-.001l14.292-14.309 14.292 14.309a1 1 0 1 0 1.416-1.413L26.153 25.129 40.43 10.836a1 1 0 1 0-1.415-1.413L24.722 23.732 10.43 9.423a1 1 0 1 0-1.415 1.413l14.276 14.293L9.015 39.423a1 1 0 0 0 .001 1.414z" /></svg></span>
                </div>
                <div className="filter_tags">
                  Màu sắc: <span className="filter_tags_remove"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 50 50" xmlSpace="preserve">
                    <path fill="#333" d="M9.016 40.837a1.001 1.001 0 0 0 1.415-.001l14.292-14.309 14.292 14.309a1 1 0 1 0 1.416-1.413L26.153 25.129 40.43 10.836a1 1 0 1 0-1.415-1.413L24.722 23.732 10.43 9.423a1 1 0 1 0-1.415 1.413l14.276 14.293L9.015 39.423a1 1 0 0 0 .001 1.414z" /></svg></span>
                </div>
                <div className="filter_tags">
                  Kích thước: <span className="filter_tags_remove"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 50 50" xmlSpace="preserve">
                    <path fill="#333" d="M9.016 40.837a1.001 1.001 0 0 0 1.415-.001l14.292-14.309 14.292 14.309a1 1 0 1 0 1.416-1.413L26.153 25.129 40.43 10.836a1 1 0 1 0-1.415-1.413L24.722 23.732 10.43 9.423a1 1 0 1 0-1.415 1.413l14.276 14.293L9.015 39.423a1 1 0 0 0 .001 1.414z" /></svg></span>
                </div>
                <div className="filter_tags filter_tags_remove_all">
                  <span>Xóa hết</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Outlet />
        <input type="text" className="hidden" id="coll-handle" defaultValue="(collectionid:product=1001666735)" />
      </div>
    </div>

  )

};


export default Product;