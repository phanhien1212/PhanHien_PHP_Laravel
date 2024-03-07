import React, { useEffect, useState } from 'react';
import ProductService from '../../../service/ProductService';
import { urlImage } from '../../../config';
import currency from 'currency.js'
import axios from 'axios';
import Header from '../../../layouts/LayoutSite/Header';
const SearchProduct = () => {

  const [products, setProducts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [load, setLoad] = useState(Date.now());


  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedProductIdsString = localStorage.getItem("search");
        const resultproduct = await ProductService.search(
          storedProductIdsString
        );
        setProducts(resultproduct.data.products);
        setPosts(resultproduct.data.posts);

        console.log(resultproduct.data.products);
        console.log(resultproduct.data.posts);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
      }
    };

    fetchData();
  }, [load]);



  return (
    <>
      <div className="layout-collections 1001666735">

        <div className="wrapper-mainCollection">
          <div className="collection-heading">
            <div className="container">
              <div className="bgwhite-heading">
                <div className="row">
                  <div className="col-md-9 col-sm-12 col-xs-12" style={{ left: 443 }}>
                    <h1 className="title">Tìm kiếm sản phẩm</h1>
                  </div>

                </div>
              </div>
            </div>
          </div>

          <div className="collection-listproduct" id="collection-body">
            <div className="container">
              <div className="wraplist-collection">
                <div className="listProduct-row listProduct-resize listProduct-filter">

                  <div>
                    {products.map((product) => (
                      <div key={product.id} product-id={product.id} style-id className="col-md-cus5 col-sm-6 col-xs-6 product-loop" data-id={product.id}>
                        <div className="product-inner product-resize">
                          <div className="proloop-image">
                            <div className="product--image image-resize">
                              <div className="product--image__inner">
                                <a href={"/product-detail/" + product.id}>
                                  <div className="prod-img first-image"><img className="img-loop" src={urlImage + "product/" + product.image} alt={product.name} /></div>
                                  <div className="prod-img second-image hovered-img hidden-xs"><img className="img-loop" src={urlImage + "product/" + product.image} alt={product.name} /></div>
                                </a>
                              </div>
                            </div>
                            <a href="#" className="proloop-link quickview-product" title={product.name} />
                          </div>
                          <div className="proloop-detail">
                            <h3><a href={"/product-detail/" + product.id} className="quickview-product">{product.name}</a></h3>
                            <p className="proloop--price on_sale">
                              <span className="price">{currency(product.price, { separator: '.', decimal: ',', symbol: '' }).format()}₫</span>
                              {product.price !== product.original_price && (
                                <span className="price-del">{currency(product.price, { separator: '.', decimal: ',', symbol: '' }).format()}₫</span>
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>


              </div>
            </div>
          </div><input type="text" className="hidden" id="coll-handle" defaultValue="(collectionid:product=1001666735)" />
        </div>
      </div>


      <div className="layout-collections 1001666735">

        <div className="wrapper-mainCollection">
          <div className="collection-heading">
            <div className="container">
              <div className="bgwhite-heading">
                <div className="row">
                  <div className="col-md-9 col-sm-12 col-xs-12" style={{ left: 443 }}>
                    <h1 className="title">Tìm kiếm bài viết</h1>
                  </div>

                </div>
              </div>
            </div>
          </div>

          <div className="list-blogs-latest">
          {posts.map((post) => (
            <div className="item-article clearfix ">
              <div className="post-image"><a href>
                <img className=" lazyloaded" src={urlImage + "post/" + post.image} alt="Goldie" />
              </a></div><div className="post-content">
                <h3>
                  <a href="">{post.title}</a></h3>
                <p className="post-meta"><span className="cate"><a href>{post.detail}</a></span></p></div>
                
              </div>
               ))}
          </div>

        </div>
      </div>

    </>
  )
};
export default SearchProduct;