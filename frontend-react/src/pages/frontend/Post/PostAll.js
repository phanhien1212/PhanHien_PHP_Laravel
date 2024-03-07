import { useEffect, useState } from "react";

import { urlImage } from '../../../config';
import currency from 'currency.js'
import axios from 'axios';
import Header from '../../../layouts/LayoutSite/Header';
import PostService from "../../../service/PostService";
import TopicService from "../../../service/TopicService";
const PostAll = () => {

  const [load, setLoad] = useState(Date.now());
  const [currentPage, setCurrentPage] = useState(0);
  const [topics, setTopics] = useState([]);
  const [posts, setPosts] = useState([]);
  const [tempPosts, setTempPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const resultPost= await PostService.getList();
      setPosts(resultPost.data.posts)
      setTempPosts(resultPost.data.posts)
      const resultTopic = await TopicService.getList();
      setTopics(resultTopic.data.topics);
    };
    fetchData();
  }, []);
  const FilterTopic = async (topic_id) => {
    // Filter products based on selected brand
    const filteredPosts = tempPosts.filter(
      (post) => post.topic_id === topic_id
    );

    console.log(filteredPosts);
    setPosts(filteredPosts);
    setLoad(Date.now());
  };
  const itemsPerPage = 3; // Số lượng mục trên mỗi trang
  const pageCount = Math.ceil(posts.length / itemsPerPage);
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = posts.slice(startIndex, endIndex);
  return (
    <>
      <div className="layout-collections 1001666735">

        <div className="wrapper-mainCollection">
          <div className="collection-heading">
            <div className="container">
              <div className="bgwhite-heading">
                <div className="row">
                  <div className="col-md-9 col-sm-12 col-xs-12" style={{ left: 443 }}>
                    <h1 className="title">Tất cả bài viết</h1>
                  </div>
                  <div class="col-md-3 col-sm-12 col-xs-12">
                    <div class="collection-sortbyfilter-container">
                      <div class="collection-sortby-filter">
                        <div class="collection-filterby"><div class="layered_filter_title boxstyle-mb" data-layered-click="#layered_filter_mobile"><p class="title_filter"><span class="icon-filter"><svg viewBox="0 0 20 20"><path fill="none" stroke-width="2" stroke-linejoin="round" stroke-miterlimit="10" d="M12 9v8l-4-4V9L2 3h16z"></path></svg></span> <span class="icon-close"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg></span> Bộ lọc</p></div></div><div class="collection-sortby"><div class="layered_filter_title boxstyle-mb" data-layered-click="#layered_sortby_mobile"><p class="title_filter"><span class="icon-filter"><i class="fa fa-sort-alpha-asc" aria-hidden="true"></i></span><span class="icon-close"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></span> Chủ đề</p></div></div></div>
                        <div class="collection-sortby-option layered_filter_mobileContent" id="layered_sortby_mobile">
                          <ul class="sort-by sort-by-content">
                          { topics && topics.map((topic) => (
                            <li ><span onClick={() => FilterTopic(topic.id)}
                            to={`/topic/${topic.slug}`}>{topic.name}</span></li>
                            ))}
                            </ul>
                          </div>
                        
                        </div>
                          
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
                    
                    {currentItems.map((post) => (
                
                      <div style={{ width: "31%", marginLeft: 20 }} className="col-md-cus5 col-sm-6 col-xs-6 product-loop" >
                        <div className="product-inner product-resize">
                          <div className="proloop-image">
                            <div className="product--image image-resize">
                              <div className="product--image__inner">
                                <a href={"/post-detail/" + post.id}>
                                  <div className="prod-img first-image"><img className="img-loop" src={urlImage + "post/" + post.image} /></div>
                                  <div className="prod-img second-image hovered-img hidden-xs"><img className="img-loop" src={urlImage + "post/" + post.image} /></div>
                                </a>
                              </div>
                            </div>
                            <a href={"/post-detail/" + post.id} className="proloop-link quickview-product" title={post.name} />
                          </div>
                          <div className="proloop-detail">
                            <h3 style={{ textAlign: "center", fontSize: 20, fontWeight: 600, color: "#252525" }}><a href={"/post-detail/" + post.id} className="quickview-product">{post.title}</a></h3>
                            <p style={{ textAlign: "center", fontSize: 11, marginTop: -5, fontWeight: 500, color: "black" }} className="proloop--price on_sale">
                              <span style={{ color: "#707070" }} className="price">{post.detail}</span>

                            </p>
                          </div>
                        </div>

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
          </div><input type="text" className="hidden" id="coll-handle" defaultValue="(collectionid:product=1001666735)" />
        </div>
      </div>
    </>
  );
}

export default PostAll;