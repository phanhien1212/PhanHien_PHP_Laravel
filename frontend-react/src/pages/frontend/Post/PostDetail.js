import { useEffect, useState } from "react";
import PostService from "../../../service/PostService";
import { useParams } from "react-router-dom";
import { urlImage } from "../../../config";

const PostDetail = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await PostService.getById(id);
        setPost(response.data.post);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await PostService.getList();
        console.log('API Response:', response.data);
        setPosts(response.data.posts);

      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);
  return (
    <main className="wrapperMain_content ">	<div className="layout-article">
      <div className="breadcrumb-shop"><div className="container">
        <div className="breadcrumb-list blog-breadcrumb ">
          <ol className="breadcrumb breadcrumb-arrows" itemScope itemType="http://schema.org/BreadcrumbList">
            <li itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
              <a href="/" target="_self" itemProp="item"><span itemProp="name">Trang chủ</span></a>
              <meta itemProp="position" content={1} />
            </li>
            <li itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
              <a href="" itemProp="item">
                <span itemProp="name">Tin tức</span>
              </a>
              <meta itemProp="position" content={2} />
            </li>
            <li className="active" itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
              <span itemProp="item" content="https://degrey.vn/blogs/news/follow-degrey"><strong itemProp="name">Follow Degrey</strong></span>
              <meta itemProp="position" content={3} />
            </li>
          </ol>
        </div>
      </div></div>
      <div className="wrapper-contentArticle" id="article-tbofcontent-scroll">
        <div className="container">
          <div className="row">
            <div className="col-md-9 col-sm-8 col-xs-12 blogs-main--detail">
              <div className="heading-article">
                <h1>{post.title}</h1>
                <div className="article-post-meta">
                  <span className="author">bởi: VN GOLDIE</span>
                  <span className="date">
                    <time pubdate dateTime="11 Tháng 07, 2022">11 Tháng 07, 2022</time>
                  </span>
                  <span className="comment"><i className="comment-icon fa fa-comment-o" />
                    <a href="/blogs/news/follow-degrey#comments">
                      0<span> Bình luận</span>
                    </a>
                  </span>
                </div>
              </div>
              <div className="inforArticle-content">
                <div className="article-content">
                  <div className="box-article-heading clearfix">
                    <div className="background-img">
                     
                    </div>
                  </div>
                  <div style={{marginTop:-30}} className="box-article-detail typeList-style article-table-contents"><p style={{textAlign: 'justify'}}><span style={{fontSize: '12pt', textAlign: 'justify'}}>{post.detail}&nbsp;</span></p>
</div>
                  <div className="box-article-navigation post-navigation articleToolbar ">
                    <div className="flex-row-articleToolbar">
                      <div className="articleToolbar-title col-md-8 col-sm-12 col-xs-12">
                        <p>Đang xem:<span>{post.title}</span></p>
                      </div>
                      <div className="articleToolbar-navigation col-md-4 col-sm-12 col-xs-12 ">
                        <div className="articleToolbar--nav">
                          <span>
                            <a href="/blogs/news/happy-birthday-xoai-beu-lai-gia-them-1-tuoi" title>Bài sau</a>
                            <svg className="arrow-right" role="presentation" viewBox="0 0 11 18">
                              <path d="M1.5 1.5l8 7.5-8 7.5" strokeWidth={2} stroke="currentColor" fill="none" fillRule="evenodd" strokeLinecap="square" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="article-comment" id="comments">
                  <div className="article-comment-form">
                    <div className="title-bl"><h3>Viết bình luận</h3></div>
                    <div id="comment">
                      <div id="comment" className="comment">
                        <div className="comment_form">
                          <form acceptCharset="UTF-8" action="/blogs/news/follow-degrey/comments" className="comment-form" id="article--comment-form" method="post">
                            <input name="form_type" type="hidden" defaultValue="new_comment" />
                            <input name="utf8" type="hidden" defaultValue="✓" />
                            <div className="row">
                              <div className="col-md-6 col-sm-6 col-xs-12">
                                <div className="form-group">
                                  <input required type="text" id="comment_author" name="comment[author]" size={40} className="text form-control" placeholder="Tên của bạn " />
                                </div>
                              </div>
                              <div className="col-md-6 col-sm-6 col-xs-12">
                                <div className="form-group">
                                  <input required type="text" id="comment_email" name="comment[email]" size={40} className="text form-control" placeholder="Email của bạn" />
                                </div>
                              </div>
                            </div>
                            <div className="form-group">
                              <textarea id="comment_body" name="comment[body]" cols={40} rows={5} className="text form-control" placeholder="Viết bình luận ..." required="required" defaultValue={""} />
                              <div className="sitebox-recaptcha ">
                                This site is protected by reCAPTCHA and the Google
                                <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Privacy Policy</a>
                                and <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer">Terms of Service</a> apply.
                              </div>
                            </div>
                            <div className="notice">Bình luận của bạn sẽ được duyệt trước khi đăng lên</div>
                            <button type="submit" className="readmore button btn-rb clear-fix" id="comment-submit">Gửi bài viết</button>
                            <input id="b8c7baad9ed54c9b87504d29a80c1fa5" name="g-recaptcha-response" type="hidden" defaultValue="03AFcWeA6yQMPLksgzzLXNk9uDEtxrh58Q2zQ0tkVtA0liu9C1YDqBOga-5KwqEC2k5HFn2CGHmbHVpJIWKD6Po9qvrhy4gUcQ_u3tepnOBVJZMt8TrRpT22H2Y3CbZMI6q07mHCRJSOV_-7pc23TBhd_etb90e7qU3plN4rZDhB4X0i8bZM66K2trkUxdsqBjTvYcNQk4BRrpZqQxM_6S-5ZtjXuJ8fQhCboIsR-jHH79kgzZyHKRfJDfPK6_o61tQP9swGv6-iN2lTuzf-QDMEcLHvyScY_UVkmdMsOnaFgYlC0mbqfCZ_1QLhk8onD6tcxYFSOHwo2TA5xB0-xsnTVJ_CJV1OgN2cNPiaRFF8RxhPZhI6UGGOSrs4euhhLvZdeIq8U99zDhs4arAnCZ1i8qvJIIGP-gw1bVll3aTbuT-KvA1JcsPHamed61GnAP74xIRCLT4GAO1SkJtLn4ZoSEp0Mwi4DHwa9RIBfGpcbMSolRDdb-kPQCs26TKbccMFLuxzWHQ3wAg2CH5GFTnMKSwGm-jLwrSw" />
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="article-related">
                  <h3 className="title-blog-related">
                    <span>
                      Bài viết liên quan</span>
                  </h3>
                  <div className="content-blogs-related">
                    <div className="list-blogs-related row">
                    {posts.map((post) => (
                      <article className="article-post col-md-3 col-sm-6">
                        <div className="post-image">
                          <a href=""><img src={urlImage + "post/" + post.image} /></a>
                        </div>
                        <div className="post-content">
                          <h3><a href="">{post.title}</a></h3>
                        </div>
                      </article>
                      
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-4 col-xs-12 blogs-aside--sticky">
              <aside className="sidebar-blogs">
                <div className="group-sidebox">
                  <div className="sidebox-title ">
                    <h3 className="htitle">Các bài viết khác<span className="fa fa-angle-down" /></h3>
                  </div>
                  <div className="sidebox-content sidebox-content-togged">
                    <div className="list-blogs-latest">
                    {posts.map((post) => (
                      <div className="item-article clearfix ">
                        <div className="post-image">
                          <a href="">
                            <img className=" lazyloaded" src={urlImage + "post/" + post.image} alt="Goldie" /></a>
                        </div>
                        <div className="post-content">
                          <h3><a href="/blogs/news/follow-degrey">{post.title}</a></h3>
                          <p className="post-meta">
                            <span className="cate"><a href="">Tin tức</a></span>
                          </p>
                        </div>
                      </div>
                      
                       ))}
                    </div>
                  </div>
                </div>
                <div className="group-sidebox">
                  <div className="sidebox-title ">
                    <h3 className="htitle">Danh mục bài viết<span className="fa fa-angle-down" /></h3>
                  </div>
                  <div className="sidebox-content sidebox-content-togged">
                    <ul className="menuList-links">
                      <li className><a href="/" title="Trang chủ"><span>Trang chủ</span></a></li>
                      <li className><a href="/collections/tat-ca-san-pham" title="Sản phẩm"><span>Sản phẩm</span></a></li>
                      <li className><a href="/pages/stores" title="Store"><span>Store</span></a></li>
                      <li className><a href="/pages/about-us" title="Giới thiệu"><span>Giới thiệu</span></a></li>
                    </ul>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
        <div className="table-content-button"><button className="btn-icolist"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511.994 511.994"><path d="M35.537 292.17l-.225-.863 14.613-15.857c9.495-10.333 16.006-18.227 19.544-23.47s5.3-11.326 5.3-18.148c0-10.135-3.326-18.146-9.974-23.984-6.65-5.83-15.9-8.76-27.775-8.76-11.174 0-20.15 3.467-26.923 10.412S.06 226.807.3 236.795l.15.34 24.473.002c0-4.403 1.076-8.9 3.227-12.097s5.105-4.73 8.863-4.73c4.202 0 7.355 1.26 9.457 3.73s3.152 5.8 3.152 9.955c0 2.917-1.04 6.36-3.115 10.313s-5.72 8.458-10.122 13.5L1.28 294.304v15.478h74.847v-17.6h-40.6zM51.9 127.068V37.72L1.28 45.283v17.945h24.215v63.84H1.28v19.812h74.846v-19.812zm21.156 299.964c-3.265-4.33-7.8-7.542-13.574-9.668 5.092-2.325 9.16-5.55 12.2-9.677s4.56-8.643 4.56-13.534c0-9.84-3.5-17.442-10.53-22.806s-16.4-8.046-28.1-8.046c-10.087 0-18.665 2.67-25.736 8S1.418 384.007 1.716 392.6l.15.83h24.327c0-4.403 1.233-5.774 3.707-7.654s5.34-3 8.603-3c4.154 0 7.317 1.065 9.495 3.4s3.262 5.142 3.262 8.555c0 4.3-1.2 7.868-3.632 10.3s-5.884 3.837-10.384 3.837h-11.75v17.6h11.75c4.995 0 8.863 1.475 11.608 3.872s4.117 6.358 4.117 11.597c0 3.76-1.312 6.943-3.93 9.415s-6.133 3.74-10.534 3.74c-3.857 0-7.13-1.662-9.827-4s-4.042-4.803-4.042-9.206H.16l-.147.95c-.247 10.087 3.423 18.042 11.013 23.357s16.453 8.1 26.588 8.1c11.77 0 21.435-2.765 29-8.427S77.96 452.44 77.96 442.55c0-6.033-1.63-11.195-4.894-15.523zm75.7-64.426h363.227v72.645H148.767zm0-143.09h363.227v72.645H148.767zm0-147.483h363.227v72.645H148.767z" /></svg></button> </div><div className="table-content-fixed"><div className="table-of-header"><span className="hTitle"> Các nội dung chính</span><span className="hClose"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.001 512.001"><path d="M284.286 256.002L506.143 34.144c7.81-7.81 7.81-20.475 0-28.285s-20.475-7.81-28.285 0L256 227.717 34.143 5.86c-7.81-7.81-20.475-7.81-28.285 0s-7.81 20.475 0 28.285L227.715 256 5.858 477.86c-7.81 7.81-7.81 20.475 0 28.285C9.763 510.05 14.882 512 20 512a19.94 19.94 0 0 0 14.143-5.857L256 284.287l221.857 221.857C481.762 510.05 486.88 512 492 512a19.94 19.94 0 0 0 14.143-5.857c7.81-7.81 7.81-20.475 0-28.285L284.286 256.002z" /></svg></span></div><div id="clone-table" className="table-of-contents" /></div></div>
    </div>
    </main>


  );
}

export default PostDetail;
