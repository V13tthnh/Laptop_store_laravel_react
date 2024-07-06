import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import product1 from "../../assets/images/product/ava_6809afe39f3141cf9497e2465cbf.jpg";
import product2 from "../../assets/images/product/ava_39a1d4796c6a4d0c9c9c7ba46a71.jpg";
import SingleProduct from "./SingleProduct";
import { useEffect, useState } from "react";
import api from "../../api/api";

const responsive = {
  largeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export default function BestSeller() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api
      .get("/laptops")
      .then((res) => {
        if(res.data.status){
          setProducts(res.data.data)
        }
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <section
        className="best-seller container"
        style={{ background: "#fff", marginTop: "20px", borderRadius: "10px" }}
      >
        <div className="product-area pt-60 pb-50">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="li-product-tab" style={{ marginLeft: "17px" }}>
                  <ul className="nav li-product-menu">
                    <li>
                      <a
                        className="active"
                        data-toggle="tab"
                        href="#li-new-product"
                      >
                        <span style={{ fontFamily: "Arial, sans-serif" }}>
                          Mới nhập
                        </span>
                      </a>
                    </li>
                    <li>
                      <a data-toggle="tab" href="#li-bestseller-product">
                        <span style={{ fontFamily: "Arial,sans-serif" }}>
                          Bán chạy
                        </span>
                      </a>
                    </li>
                    <li>
                      <a data-toggle="tab" href="#li-featured-product">
                        <span style={{ fontFamily: "Arial,sans-serif" }}>
                          Nổi bật
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="tab-content" style={{ marginLeft: "15px" }}>
              <div
                id="li-new-product"
                className="tab-pane active show"
                role="tabpanel"
              >
                <div className="row">
                  <div className="product-active">
                    <section
                      className="bestseller"
                      style={{ marginTop: "20px" }}
                    >
                      <div className="container">
                        <Carousel
                          autoPlay={true}
                          draggable={false}
                          showDots={false}
                          responsive={responsive}
                          ssr={true} 
                          infinite={true}
                          autoPlaySpeed={2000}
                          keyBoardControl={true}
                          customTransition="all .5"
                          transitionDuration={500}
                          containerClass="carousel-container"
                          removeArrowOnDeviceType={["tablet", "mobile"]}
                          deviceType={"desktop"}
                          dotListClass="custom-dot-list-style"
                          itemClass="carousel-item-padding-40-px"
                        >
                          {products?.map((product) => (
                            <SingleProduct data={product} />
                          ))}
                        </Carousel>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
              <div
                id="li-bestseller-product"
                className="tab-pane"
                role="tabpanel"
              >
                <div className="row">
                  <div className="product-active">
                    <div className="col-lg-12">
                      <div className="single-product-wrap">
                        <div className="product-image">
                          <a href="single-product.html">
                            <img
                              src="images/product/large-size/1.jpg"
                              alt="Li's Product Image"
                            />
                          </a>
                          <span className="sticker">New</span>
                        </div>
                        <div className="product_desc">
                          <div className="product_desc_info">
                            <div className="product-review">
                              <h5 className="manufacturer">
                                <a href="shop-left-sidebar.html">
                                  Graphic Corner
                                </a>
                              </h5>
                              <div className="rating-box">
                                <ul className="rating">
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li className="no-star">
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li className="no-star">
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <h4>
                              <a
                                className="product_name"
                                href="single-product.html"
                              >
                                Laptop Asus Vivobook Go 15 E1504FA R5
                                7520U/16GB/512GB/Chuột/Win11 (NJ776W)
                              </a>
                            </h4>
                            <div className="price-box">
                              <span className="new-price">$46.80</span>
                            </div>
                          </div>
                          <div className="add-actions">
                            <ul className="add-actions-link">
                              <li className="add-cart active">
                                <a href="#">Add to cart</a>
                              </li>
                              <li>
                                <a
                                  className="links-details"
                                  href="wishlist.html"
                                >
                                  <i className="fa fa-heart-o"></i>
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  title="quick view"
                                  className="quick-view-btn"
                                  data-toggle="modal"
                                  data-target="#exampleModalCenter"
                                >
                                  <i className="fa fa-eye"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="single-product-wrap">
                        <div className="product-image">
                          <a href="single-product.html">
                            <img
                              src="images/product/large-size/1.jpg"
                              alt="Li's Product Image"
                            />
                          </a>
                          <span className="sticker">New</span>
                        </div>
                        <div className="product_desc">
                          <div className="product_desc_info">
                            <div className="product-review">
                              <h5 className="manufacturer">
                                <a href="shop-left-sidebar.html">
                                  Studio Design
                                </a>
                              </h5>
                              <div className="rating-box">
                                <ul className="rating">
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li className="no-star">
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li className="no-star">
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <h4>
                              <a
                                className="product_name"
                                href="single-product.html"
                              >
                                Laptop Lenovo Ideapad 3 15IAU7 i3
                                1215U/8GB/256GB/Win11 (82RK00RWVN)
                              </a>
                            </h4>
                            <div className="price-box">
                              <span className="new-price new-price-2">
                                $71.80
                              </span>
                              <span className="old-price">$77.22</span>
                              <span className="discount-percentage">-7%</span>
                            </div>
                          </div>
                          <div className="add-actions">
                            <ul className="add-actions-link">
                              <li className="add-cart active">
                                <a href="#">Add to cart</a>
                              </li>
                              <li>
                                <a
                                  className="links-details"
                                  href="wishlist.html"
                                >
                                  <i className="fa fa-heart-o"></i>
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  title="quick view"
                                  className="quick-view-btn"
                                  data-toggle="modal"
                                  data-target="#exampleModalCenter"
                                >
                                  <i className="fa fa-eye"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="single-product-wrap">
                        <div className="product-image">
                          <a href="single-product.html">
                            <img
                              src="images/product/large-size/1.jpg"
                              alt="Li's Product Image"
                            />
                          </a>
                          <span className="sticker">New</span>
                        </div>
                        <div className="product_desc">
                          <div className="product_desc_info">
                            <div className="product-review">
                              <h5 className="manufacturer">
                                <a href="shop-left-sidebar.html">
                                  Graphic Corner
                                </a>
                              </h5>
                              <div className="rating-box">
                                <ul className="rating">
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li className="no-star">
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li className="no-star">
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <h4>
                              <a
                                className="product_name"
                                href="single-product.html"
                              >
                                Laptop Asus Vivobook Go 15 E1504FA R5
                                7520U/16GB/512GB/Chuột/Win11 (NJ776W)
                              </a>
                            </h4>
                            <div className="price-box">
                              <span className="new-price">$46.80</span>
                            </div>
                          </div>
                          <div className="add-actions">
                            <ul className="add-actions-link">
                              <li className="add-cart active">
                                <a href="#">Add to cart</a>
                              </li>
                              <li>
                                <a
                                  className="links-details"
                                  href="wishlist.html"
                                >
                                  <i className="fa fa-heart-o"></i>
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  title="quick view"
                                  className="quick-view-btn"
                                  data-toggle="modal"
                                  data-target="#exampleModalCenter"
                                >
                                  <i className="fa fa-eye"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="single-product-wrap">
                        <div className="product-image">
                          <a href="single-product.html">
                            <img
                              src="images/product/large-size/1.jpg"
                              alt="Li's Product Image"
                            />
                          </a>
                          <span className="sticker">New</span>
                        </div>
                        <div className="product_desc">
                          <div className="product_desc_info">
                            <div className="product-review">
                              <h5 className="manufacturer">
                                <a href="shop-left-sidebar.html">
                                  Studio Design
                                </a>
                              </h5>
                              <div className="rating-box">
                                <ul className="rating">
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li className="no-star">
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li className="no-star">
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <h4>
                              <a
                                className="product_name"
                                href="single-product.html"
                              >
                                Laptop Lenovo Ideapad 3 15IAU7 i3
                                1215U/8GB/256GB/Win11 (82RK00RWVN)
                              </a>
                            </h4>
                            <div className="price-box">
                              <span className="new-price new-price-2">
                                $71.80
                              </span>
                              <span className="old-price">$77.22</span>
                              <span className="discount-percentage">-7%</span>
                            </div>
                          </div>
                          <div className="add-actions">
                            <ul className="add-actions-link">
                              <li className="add-cart active">
                                <a href="#">Add to cart</a>
                              </li>
                              <li>
                                <a
                                  className="links-details"
                                  href="wishlist.html"
                                >
                                  <i className="fa fa-heart-o"></i>
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  title="quick view"
                                  className="quick-view-btn"
                                  data-toggle="modal"
                                  data-target="#exampleModalCenter"
                                >
                                  <i className="fa fa-eye"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="single-product-wrap">
                        <div className="product-image">
                          <a href="single-product.html">
                            <img
                              src="images/product/large-size/1.jpg"
                              alt="Li's Product Image"
                            />
                          </a>
                          <span className="sticker">New</span>
                        </div>
                        <div className="product_desc">
                          <div className="product_desc_info">
                            <div className="product-review">
                              <h5 className="manufacturer">
                                <a href="shop-left-sidebar.html">
                                  Graphic Corner
                                </a>
                              </h5>
                              <div className="rating-box">
                                <ul className="rating">
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li className="no-star">
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li className="no-star">
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <h4>
                              <a
                                className="product_name"
                                href="single-product.html"
                              >
                                Laptop Asus Vivobook Go 15 E1504FA R5
                                7520U/16GB/512GB/Chuột/Win11 (NJ776W)
                              </a>
                            </h4>
                            <div className="price-box">
                              <span className="new-price">$46.80</span>
                            </div>
                          </div>
                          <div className="add-actions">
                            <ul className="add-actions-link">
                              <li className="add-cart active">
                                <a href="#">Add to cart</a>
                              </li>
                              <li>
                                <a
                                  className="links-details"
                                  href="wishlist.html"
                                >
                                  <i className="fa fa-heart-o"></i>
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  title="quick view"
                                  className="quick-view-btn"
                                  data-toggle="modal"
                                  data-target="#exampleModalCenter"
                                >
                                  <i className="fa fa-eye"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="single-product-wrap">
                        <div className="product-image">
                          <a href="single-product.html">
                            <img
                              src="images/product/large-size/1.jpg"
                              alt="Li's Product Image"
                            />
                          </a>
                          <span className="sticker">New</span>
                        </div>
                        <div className="product_desc">
                          <div className="product_desc_info">
                            <div className="product-review">
                              <h5 className="manufacturer">
                                <a href="shop-left-sidebar.html">
                                  Studio Design
                                </a>
                              </h5>
                              <div className="rating-box">
                                <ul className="rating">
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li className="no-star">
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li className="no-star">
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <h4>
                              <a
                                className="product_name"
                                href="single-product.html"
                              >
                                Laptop Lenovo Ideapad 3 15IAU7 i3
                                1215U/8GB/256GB/Win11 (82RK00RWVN)
                              </a>
                            </h4>
                            <div className="price-box">
                              <span className="new-price new-price-2">
                                $71.80
                              </span>
                              <span className="old-price">$77.22</span>
                              <span className="discount-percentage">-7%</span>
                            </div>
                          </div>
                          <div className="add-actions">
                            <ul className="add-actions-link">
                              <li className="add-cart active">
                                <a href="#">Add to cart</a>
                              </li>
                              <li>
                                <a
                                  className="links-details"
                                  href="wishlist.html"
                                >
                                  <i className="fa fa-heart-o"></i>
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  title="quick view"
                                  className="quick-view-btn"
                                  data-toggle="modal"
                                  data-target="#exampleModalCenter"
                                >
                                  <i className="fa fa-eye"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                id="li-featured-product"
                className="tab-pane"
                role="tabpanel"
              >
                <div className="row">
                  <div className="product-active ">
                    <div className="col-lg-12">
                      <div className="single-product-wrap">
                        <div className="product-image">
                          <a href="single-product.html">
                            <img
                              src="images/product/large-size/3.jpg"
                              alt="Li's Product Image"
                            />
                          </a>
                          <span className="sticker">New</span>
                        </div>
                        <div className="product_desc">
                          <div className="product_desc_info">
                            <div className="product-review">
                              <h5 className="manufacturer">
                                <a href="shop-left-sidebar.html">
                                  Graphic Corner
                                </a>
                              </h5>
                              <div className="rating-box">
                                <ul className="rating">
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li className="no-star">
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li className="no-star">
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <h4>
                              <a
                                className="product_name"
                                href="single-product.html"
                              >
                                Laptop Asus Vivobook Go 15 E1504FA R5
                                7520U/16GB/512GB/Chuột/Win11 (NJ776W)
                              </a>
                            </h4>
                            <div className="price-box">
                              <span className="new-price">$46.80</span>
                            </div>
                          </div>
                          <div className="add-actions">
                            <ul className="add-actions-link">
                              <li className="add-cart active">
                                <a href="#">Add to cart</a>
                              </li>
                              <li>
                                <a
                                  className="links-details"
                                  href="wishlist.html"
                                >
                                  <i className="fa fa-heart-o"></i>
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  title="quick view"
                                  className="quick-view-btn"
                                  data-toggle="modal"
                                  data-target="#exampleModalCenter"
                                >
                                  <i className="fa fa-eye"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="single-product-wrap">
                        <div className="product-image">
                          <a href="single-product.html">
                            <img
                              src="images/product/large-size/5.jpg"
                              alt="Li's Product Image"
                            />
                          </a>
                          <span className="sticker">New</span>
                        </div>
                        <div className="product_desc">
                          <div className="product_desc_info">
                            <div className="product-review">
                              <h5 className="manufacturer">
                                <a href="shop-left-sidebar.html">
                                  Studio Design
                                </a>
                              </h5>
                              <div className="rating-box">
                                <ul className="rating">
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li className="no-star">
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li className="no-star">
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <h4>
                              <a
                                className="product_name"
                                href="single-product.html"
                              >
                                Laptop Lenovo Ideapad 3 15IAU7 i3
                                1215U/8GB/256GB/Win11 (82RK00RWVN)
                              </a>
                            </h4>
                            <div className="price-box">
                              <span className="new-price new-price-2">
                                $71.80
                              </span>
                              <span className="old-price">$77.22</span>
                              <span className="discount-percentage">-7%</span>
                            </div>
                          </div>
                          <div className="add-actions">
                            <ul className="add-actions-link">
                              <li className="add-cart active">
                                <a href="#">Add to cart</a>
                              </li>
                              <li>
                                <a
                                  className="links-details"
                                  href="wishlist.html"
                                >
                                  <i className="fa fa-heart-o"></i>
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  title="quick view"
                                  className="quick-view-btn"
                                  data-toggle="modal"
                                  data-target="#exampleModalCenter"
                                >
                                  <i className="fa fa-eye"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="single-product-wrap">
                        <div className="product-image">
                          <a href="single-product.html">
                            <img
                              src="images/product/large-size/7.jpg"
                              alt="Li's Product Image"
                            />
                          </a>
                          <span className="sticker">New</span>
                        </div>
                        <div className="product_desc">
                          <div className="product_desc_info">
                            <div className="product-review">
                              <h5 className="manufacturer">
                                <a href="shop-left-sidebar.html">
                                  Graphic Corner
                                </a>
                              </h5>
                              <div className="rating-box">
                                <ul className="rating">
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li className="no-star">
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li className="no-star">
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <h4>
                              <a
                                className="product_name"
                                href="single-product.html"
                              >
                                Laptop Asus Vivobook Go 15 E1504FA R5
                                7520U/16GB/512GB/Chuột/Win11 (NJ776W)
                              </a>
                            </h4>
                            <div className="price-box">
                              <span className="new-price">$46.80</span>
                            </div>
                          </div>
                          <div className="add-actions">
                            <ul className="add-actions-link">
                              <li className="add-cart active">
                                <a href="#">Add to cart</a>
                              </li>
                              <li>
                                <a
                                  className="links-details"
                                  href="wishlist.html"
                                >
                                  <i className="fa fa-heart-o"></i>
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  title="quick view"
                                  className="quick-view-btn"
                                  data-toggle="modal"
                                  data-target="#exampleModalCenter"
                                >
                                  <i className="fa fa-eye"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="single-product-wrap">
                        <div className="product-image">
                          <a href="single-product.html">
                            <img
                              src="images/product/large-size/9.jpg"
                              alt="Li's Product Image"
                            />
                          </a>
                          <span className="sticker">New</span>
                        </div>
                        <div className="product_desc">
                          <div className="product_desc_info">
                            <div className="product-review">
                              <h5 className="manufacturer">
                                <a href="shop-left-sidebar.html">
                                  Studio Design
                                </a>
                              </h5>
                              <div className="rating-box">
                                <ul className="rating">
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li className="no-star">
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li className="no-star">
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <h4>
                              <a
                                className="product_name"
                                href="single-product.html"
                              >
                                Laptop Lenovo Ideapad 3 15IAU7 i3
                                1215U/8GB/256GB/Win11 (82RK00RWVN)
                              </a>
                            </h4>
                            <div className="price-box">
                              <span className="new-price new-price-2">
                                $71.80
                              </span>
                              <span className="old-price">$77.22</span>
                              <span className="discount-percentage">-7%</span>
                            </div>
                          </div>
                          <div className="add-actions">
                            <ul className="add-actions-link">
                              <li className="add-cart active">
                                <a href="#">Add to cart</a>
                              </li>
                              <li>
                                <a
                                  className="links-details"
                                  href="wishlist.html"
                                >
                                  <i className="fa fa-heart-o"></i>
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  title="quick view"
                                  className="quick-view-btn"
                                  data-toggle="modal"
                                  data-target="#exampleModalCenter"
                                >
                                  <i className="fa fa-eye"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="single-product-wrap">
                        <div className="product-image">
                          <a href="single-product.html">
                            <img
                              src="images/product/large-size/11.jpg"
                              alt="Li's Product Image"
                            />
                          </a>
                          <span className="sticker">New</span>
                        </div>
                        <div className="product_desc">
                          <div className="product_desc_info">
                            <div className="product-review">
                              <h5 className="manufacturer">
                                <a href="shop-left-sidebar.html">
                                  Graphic Corner
                                </a>
                              </h5>
                              <div className="rating-box">
                                <ul className="rating">
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li className="no-star">
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li className="no-star">
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <h4>
                              <a
                                className="product_name"
                                href="single-product.html"
                              >
                                Laptop Asus Vivobook Go 15 E1504FA R5
                                7520U/16GB/512GB/Chuột/Win11 (NJ776W)
                              </a>
                            </h4>
                            <div className="price-box">
                              <span className="new-price">$46.80</span>
                            </div>
                          </div>
                          <div className="add-actions">
                            <ul className="add-actions-link">
                              <li className="add-cart active">
                                <a href="#">Add to cart</a>
                              </li>
                              <li>
                                <a
                                  className="links-details"
                                  href="wishlist.html"
                                >
                                  <i className="fa fa-heart-o"></i>
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  title="quick view"
                                  className="quick-view-btn"
                                  data-toggle="modal"
                                  data-target="#exampleModalCenter"
                                >
                                  <i className="fa fa-eye"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="single-product-wrap">
                        <div className="product-image">
                          <a href="single-product.html">
                            <img
                              src="images/product/large-size/12.jpg"
                              alt="Li's Product Image"
                            />
                          </a>
                          <span className="sticker">New</span>
                        </div>
                        <div className="product_desc">
                          <div className="product_desc_info">
                            <div className="product-review">
                              <h5 className="manufacturer">
                                <a href="shop-left-sidebar.html">
                                  Studio Design
                                </a>
                              </h5>
                              <div className="rating-box">
                                <ul className="rating">
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li className="no-star">
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li className="no-star">
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <h4>
                              <a
                                className="product_name"
                                href="single-product.html"
                              >
                                Laptop Lenovo Ideapad 3 15IAU7 i3
                                1215U/8GB/256GB/Win11 (82RK00RWVN)
                              </a>
                            </h4>
                            <div className="price-box">
                              <span className="new-price new-price-2">
                                $71.80
                              </span>
                              <span className="old-price">$77.22</span>
                              <span className="discount-percentage">-7%</span>
                            </div>
                          </div>
                          <div className="add-actions">
                            <ul className="add-actions-link">
                              <li className="add-cart active">
                                <a href="#">Add to cart</a>
                              </li>
                              <li>
                                <a
                                  className="links-details"
                                  href="wishlist.html"
                                >
                                  <i className="fa fa-heart-o"></i>
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  title="quick view"
                                  className="quick-view-btn"
                                  data-toggle="modal"
                                  data-target="#exampleModalCenter"
                                >
                                  <i className="fa fa-eye"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="best-seller container"
        style={{ background: "#fff", marginTop: "20px", borderRadius: "10px" }}
      >
        <div className="product-area pt-60 pb-50">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="li-product-tab" style={{ marginLeft: "17px" }}>
                  <ul className="nav li-product-menu">
                    <li>
                      <a
                        className="active"
                        data-toggle="tab"
                        href="#li-new-product"
                      >
                        <span style={{ fontFamily: "Arial, sans-serif" }}>
                          Mới nhập
                        </span>
                      </a>
                    </li>
                    <li>
                      <a data-toggle="tab" href="#li-bestseller-product">
                        <span style={{ fontFamily: "Arial,sans-serif" }}>
                          Bán chạy
                        </span>
                      </a>
                    </li>
                    <li>
                      <a data-toggle="tab" href="#li-featured-product">
                        <span style={{ fontFamily: "Arial,sans-serif" }}>
                          Nổi bật
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="tab-content" style={{ marginLeft: "15px" }}>
              <div
                id="li-new-product"
                className="tab-pane active show"
                role="tabpanel"
              >
                <div className="row">
                  <div className="product-active">
                    <section
                      className="bestseller"
                      style={{ marginTop: "20px" }}
                    >
                      <div className="container">
                        <Carousel
                          autoPlay={true}
                          draggable={false}
                          showDots={false}
                          responsive={responsive}
                          ssr={true} // means to render carousel on server-side.
                          infinite={true}
                          autoPlaySpeed={2000}
                          keyBoardControl={true}
                          customTransition="all .5"
                          transitionDuration={500}
                          containerClass="carousel-container"
                          removeArrowOnDeviceType={["tablet", "mobile"]}
                          deviceType={"desktop"}
                          dotListClass="custom-dot-list-style"
                          itemClass="carousel-item-padding-40-px"
                        >
                          <SingleProduct url={product1} />
                          <SingleProduct url={product2} />
                          <SingleProduct url={product1} />
                          <SingleProduct url={product2} />
                          <SingleProduct url={product1} />
                        </Carousel>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
              <div
                id="li-bestseller-product"
                className="tab-pane"
                role="tabpanel"
              >
                <div className="row">
                  <div className="product-active">
                    <div className="col-lg-12">
                      <div className="single-product-wrap">
                        <div className="product-image">
                          <a href="single-product.html">
                            <img
                              src="images/product/large-size/1.jpg"
                              alt="Li's Product Image"
                            />
                          </a>
                          <span className="sticker">New</span>
                        </div>
                        <div className="product_desc">
                          <div className="product_desc_info">
                            <div className="product-review">
                              <h5 className="manufacturer">
                                <a href="shop-left-sidebar.html">
                                  Graphic Corner
                                </a>
                              </h5>
                              <div className="rating-box">
                                <ul className="rating">
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li className="no-star">
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li className="no-star">
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <h4>
                              <a
                                className="product_name"
                                href="single-product.html"
                              >
                                Laptop Asus Vivobook Go 15 E1504FA R5
                                7520U/16GB/512GB/Chuột/Win11 (NJ776W)
                              </a>
                            </h4>
                            <div className="price-box">
                              <span className="new-price">$46.80</span>
                            </div>
                          </div>
                          <div className="add-actions">
                            <ul className="add-actions-link">
                              <li className="add-cart active">
                                <a href="#">Add to cart</a>
                              </li>
                              <li>
                                <a
                                  className="links-details"
                                  href="wishlist.html"
                                >
                                  <i className="fa fa-heart-o"></i>
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  title="quick view"
                                  className="quick-view-btn"
                                  data-toggle="modal"
                                  data-target="#exampleModalCenter"
                                >
                                  <i className="fa fa-eye"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="single-product-wrap">
                        <div className="product-image">
                          <a href="single-product.html">
                            <img
                              src="images/product/large-size/1.jpg"
                              alt="Li's Product Image"
                            />
                          </a>
                          <span className="sticker">New</span>
                        </div>
                        <div className="product_desc">
                          <div className="product_desc_info">
                            <div className="product-review">
                              <h5 className="manufacturer">
                                <a href="shop-left-sidebar.html">
                                  Studio Design
                                </a>
                              </h5>
                              <div className="rating-box">
                                <ul className="rating">
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li className="no-star">
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li className="no-star">
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <h4>
                              <a
                                className="product_name"
                                href="single-product.html"
                              >
                                Laptop Lenovo Ideapad 3 15IAU7 i3
                                1215U/8GB/256GB/Win11 (82RK00RWVN)
                              </a>
                            </h4>
                            <div className="price-box">
                              <span className="new-price new-price-2">
                                $71.80
                              </span>
                              <span className="old-price">$77.22</span>
                              <span className="discount-percentage">-7%</span>
                            </div>
                          </div>
                          <div className="add-actions">
                            <ul className="add-actions-link">
                              <li className="add-cart active">
                                <a href="#">Add to cart</a>
                              </li>
                              <li>
                                <a
                                  className="links-details"
                                  href="wishlist.html"
                                >
                                  <i className="fa fa-heart-o"></i>
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  title="quick view"
                                  className="quick-view-btn"
                                  data-toggle="modal"
                                  data-target="#exampleModalCenter"
                                >
                                  <i className="fa fa-eye"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="single-product-wrap">
                        <div className="product-image">
                          <a href="single-product.html">
                            <img
                              src="images/product/large-size/1.jpg"
                              alt="Li's Product Image"
                            />
                          </a>
                          <span className="sticker">New</span>
                        </div>
                        <div className="product_desc">
                          <div className="product_desc_info">
                            <div className="product-review">
                              <h5 className="manufacturer">
                                <a href="shop-left-sidebar.html">
                                  Graphic Corner
                                </a>
                              </h5>
                              <div className="rating-box">
                                <ul className="rating">
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li className="no-star">
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li className="no-star">
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <h4>
                              <a
                                className="product_name"
                                href="single-product.html"
                              >
                                Laptop Asus Vivobook Go 15 E1504FA R5
                                7520U/16GB/512GB/Chuột/Win11 (NJ776W)
                              </a>
                            </h4>
                            <div className="price-box">
                              <span className="new-price">$46.80</span>
                            </div>
                          </div>
                          <div className="add-actions">
                            <ul className="add-actions-link">
                              <li className="add-cart active">
                                <a href="#">Add to cart</a>
                              </li>
                              <li>
                                <a
                                  className="links-details"
                                  href="wishlist.html"
                                >
                                  <i className="fa fa-heart-o"></i>
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  title="quick view"
                                  className="quick-view-btn"
                                  data-toggle="modal"
                                  data-target="#exampleModalCenter"
                                >
                                  <i className="fa fa-eye"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="single-product-wrap">
                        <div className="product-image">
                          <a href="single-product.html">
                            <img
                              src="images/product/large-size/1.jpg"
                              alt="Li's Product Image"
                            />
                          </a>
                          <span className="sticker">New</span>
                        </div>
                        <div className="product_desc">
                          <div className="product_desc_info">
                            <div className="product-review">
                              <h5 className="manufacturer">
                                <a href="shop-left-sidebar.html">
                                  Studio Design
                                </a>
                              </h5>
                              <div className="rating-box">
                                <ul className="rating">
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li className="no-star">
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li className="no-star">
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <h4>
                              <a
                                className="product_name"
                                href="single-product.html"
                              >
                                Laptop Lenovo Ideapad 3 15IAU7 i3
                                1215U/8GB/256GB/Win11 (82RK00RWVN)
                              </a>
                            </h4>
                            <div className="price-box">
                              <span className="new-price new-price-2">
                                $71.80
                              </span>
                              <span className="old-price">$77.22</span>
                              <span className="discount-percentage">-7%</span>
                            </div>
                          </div>
                          <div className="add-actions">
                            <ul className="add-actions-link">
                              <li className="add-cart active">
                                <a href="#">Add to cart</a>
                              </li>
                              <li>
                                <a
                                  className="links-details"
                                  href="wishlist.html"
                                >
                                  <i className="fa fa-heart-o"></i>
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  title="quick view"
                                  className="quick-view-btn"
                                  data-toggle="modal"
                                  data-target="#exampleModalCenter"
                                >
                                  <i className="fa fa-eye"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="single-product-wrap">
                        <div className="product-image">
                          <a href="single-product.html">
                            <img
                              src="images/product/large-size/1.jpg"
                              alt="Li's Product Image"
                            />
                          </a>
                          <span className="sticker">New</span>
                        </div>
                        <div className="product_desc">
                          <div className="product_desc_info">
                            <div className="product-review">
                              <h5 className="manufacturer">
                                <a href="shop-left-sidebar.html">
                                  Graphic Corner
                                </a>
                              </h5>
                              <div className="rating-box">
                                <ul className="rating">
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li className="no-star">
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li className="no-star">
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <h4>
                              <a
                                className="product_name"
                                href="single-product.html"
                              >
                                Laptop Asus Vivobook Go 15 E1504FA R5
                                7520U/16GB/512GB/Chuột/Win11 (NJ776W)
                              </a>
                            </h4>
                            <div className="price-box">
                              <span className="new-price">$46.80</span>
                            </div>
                          </div>
                          <div className="add-actions">
                            <ul className="add-actions-link">
                              <li className="add-cart active">
                                <a href="#">Add to cart</a>
                              </li>
                              <li>
                                <a
                                  className="links-details"
                                  href="wishlist.html"
                                >
                                  <i className="fa fa-heart-o"></i>
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  title="quick view"
                                  className="quick-view-btn"
                                  data-toggle="modal"
                                  data-target="#exampleModalCenter"
                                >
                                  <i className="fa fa-eye"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="single-product-wrap">
                        <div className="product-image">
                          <a href="single-product.html">
                            <img
                              src="images/product/large-size/1.jpg"
                              alt="Li's Product Image"
                            />
                          </a>
                          <span className="sticker">New</span>
                        </div>
                        <div className="product_desc">
                          <div className="product_desc_info">
                            <div className="product-review">
                              <h5 className="manufacturer">
                                <a href="shop-left-sidebar.html">
                                  Studio Design
                                </a>
                              </h5>
                              <div className="rating-box">
                                <ul className="rating">
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li className="no-star">
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li className="no-star">
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <h4>
                              <a
                                className="product_name"
                                href="single-product.html"
                              >
                                Laptop Lenovo Ideapad 3 15IAU7 i3
                                1215U/8GB/256GB/Win11 (82RK00RWVN)
                              </a>
                            </h4>
                            <div className="price-box">
                              <span className="new-price new-price-2">
                                $71.80
                              </span>
                              <span className="old-price">$77.22</span>
                              <span className="discount-percentage">-7%</span>
                            </div>
                          </div>
                          <div className="add-actions">
                            <ul className="add-actions-link">
                              <li className="add-cart active">
                                <a href="#">Add to cart</a>
                              </li>
                              <li>
                                <a
                                  className="links-details"
                                  href="wishlist.html"
                                >
                                  <i className="fa fa-heart-o"></i>
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  title="quick view"
                                  className="quick-view-btn"
                                  data-toggle="modal"
                                  data-target="#exampleModalCenter"
                                >
                                  <i className="fa fa-eye"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                id="li-featured-product"
                className="tab-pane"
                role="tabpanel"
              >
                <div className="row">
                  <div className="product-active ">
                    <div className="col-lg-12">
                      <div className="single-product-wrap">
                        <div className="product-image">
                          <a href="single-product.html">
                            <img
                              src="images/product/large-size/3.jpg"
                              alt="Li's Product Image"
                            />
                          </a>
                          <span className="sticker">New</span>
                        </div>
                        <div className="product_desc">
                          <div className="product_desc_info">
                            <div className="product-review">
                              <h5 className="manufacturer">
                                <a href="shop-left-sidebar.html">
                                  Graphic Corner
                                </a>
                              </h5>
                              <div className="rating-box">
                                <ul className="rating">
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li className="no-star">
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li className="no-star">
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <h4>
                              <a
                                className="product_name"
                                href="single-product.html"
                              >
                                Laptop Asus Vivobook Go 15 E1504FA R5
                                7520U/16GB/512GB/Chuột/Win11 (NJ776W)
                              </a>
                            </h4>
                            <div className="price-box">
                              <span className="new-price">$46.80</span>
                            </div>
                          </div>
                          <div className="add-actions">
                            <ul className="add-actions-link">
                              <li className="add-cart active">
                                <a href="#">Add to cart</a>
                              </li>
                              <li>
                                <a
                                  className="links-details"
                                  href="wishlist.html"
                                >
                                  <i className="fa fa-heart-o"></i>
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  title="quick view"
                                  className="quick-view-btn"
                                  data-toggle="modal"
                                  data-target="#exampleModalCenter"
                                >
                                  <i className="fa fa-eye"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="single-product-wrap">
                        <div className="product-image">
                          <a href="single-product.html">
                            <img
                              src="images/product/large-size/5.jpg"
                              alt="Li's Product Image"
                            />
                          </a>
                          <span className="sticker">New</span>
                        </div>
                        <div className="product_desc">
                          <div className="product_desc_info">
                            <div className="product-review">
                              <h5 className="manufacturer">
                                <a href="shop-left-sidebar.html">
                                  Studio Design
                                </a>
                              </h5>
                              <div className="rating-box">
                                <ul className="rating">
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li className="no-star">
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li className="no-star">
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <h4>
                              <a
                                className="product_name"
                                href="single-product.html"
                              >
                                Laptop Lenovo Ideapad 3 15IAU7 i3
                                1215U/8GB/256GB/Win11 (82RK00RWVN)
                              </a>
                            </h4>
                            <div className="price-box">
                              <span className="new-price new-price-2">
                                $71.80
                              </span>
                              <span className="old-price">$77.22</span>
                              <span className="discount-percentage">-7%</span>
                            </div>
                          </div>
                          <div className="add-actions">
                            <ul className="add-actions-link">
                              <li className="add-cart active">
                                <a href="#">Add to cart</a>
                              </li>
                              <li>
                                <a
                                  className="links-details"
                                  href="wishlist.html"
                                >
                                  <i className="fa fa-heart-o"></i>
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  title="quick view"
                                  className="quick-view-btn"
                                  data-toggle="modal"
                                  data-target="#exampleModalCenter"
                                >
                                  <i className="fa fa-eye"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="single-product-wrap">
                        <div className="product-image">
                          <a href="single-product.html">
                            <img
                              src="images/product/large-size/7.jpg"
                              alt="Li's Product Image"
                            />
                          </a>
                          <span className="sticker">New</span>
                        </div>
                        <div className="product_desc">
                          <div className="product_desc_info">
                            <div className="product-review">
                              <h5 className="manufacturer">
                                <a href="shop-left-sidebar.html">
                                  Graphic Corner
                                </a>
                              </h5>
                              <div className="rating-box">
                                <ul className="rating">
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li className="no-star">
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li className="no-star">
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <h4>
                              <a
                                className="product_name"
                                href="single-product.html"
                              >
                                Laptop Asus Vivobook Go 15 E1504FA R5
                                7520U/16GB/512GB/Chuột/Win11 (NJ776W)
                              </a>
                            </h4>
                            <div className="price-box">
                              <span className="new-price">$46.80</span>
                            </div>
                          </div>
                          <div className="add-actions">
                            <ul className="add-actions-link">
                              <li className="add-cart active">
                                <a href="#">Add to cart</a>
                              </li>
                              <li>
                                <a
                                  className="links-details"
                                  href="wishlist.html"
                                >
                                  <i className="fa fa-heart-o"></i>
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  title="quick view"
                                  className="quick-view-btn"
                                  data-toggle="modal"
                                  data-target="#exampleModalCenter"
                                >
                                  <i className="fa fa-eye"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="single-product-wrap">
                        <div className="product-image">
                          <a href="single-product.html">
                            <img
                              src="images/product/large-size/9.jpg"
                              alt="Li's Product Image"
                            />
                          </a>
                          <span className="sticker">New</span>
                        </div>
                        <div className="product_desc">
                          <div className="product_desc_info">
                            <div className="product-review">
                              <h5 className="manufacturer">
                                <a href="shop-left-sidebar.html">
                                  Studio Design
                                </a>
                              </h5>
                              <div className="rating-box">
                                <ul className="rating">
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li className="no-star">
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li className="no-star">
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <h4>
                              <a
                                className="product_name"
                                href="single-product.html"
                              >
                                Laptop Lenovo Ideapad 3 15IAU7 i3
                                1215U/8GB/256GB/Win11 (82RK00RWVN)
                              </a>
                            </h4>
                            <div className="price-box">
                              <span className="new-price new-price-2">
                                $71.80
                              </span>
                              <span className="old-price">$77.22</span>
                              <span className="discount-percentage">-7%</span>
                            </div>
                          </div>
                          <div className="add-actions">
                            <ul className="add-actions-link">
                              <li className="add-cart active">
                                <a href="#">Add to cart</a>
                              </li>
                              <li>
                                <a
                                  className="links-details"
                                  href="wishlist.html"
                                >
                                  <i className="fa fa-heart-o"></i>
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  title="quick view"
                                  className="quick-view-btn"
                                  data-toggle="modal"
                                  data-target="#exampleModalCenter"
                                >
                                  <i className="fa fa-eye"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="single-product-wrap">
                        <div className="product-image">
                          <a href="single-product.html">
                            <img
                              src="images/product/large-size/11.jpg"
                              alt="Li's Product Image"
                            />
                          </a>
                          <span className="sticker">New</span>
                        </div>
                        <div className="product_desc">
                          <div className="product_desc_info">
                            <div className="product-review">
                              <h5 className="manufacturer">
                                <a href="shop-left-sidebar.html">
                                  Graphic Corner
                                </a>
                              </h5>
                              <div className="rating-box">
                                <ul className="rating">
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li className="no-star">
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li className="no-star">
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <h4>
                              <a
                                className="product_name"
                                href="single-product.html"
                              >
                                Laptop Asus Vivobook Go 15 E1504FA R5
                                7520U/16GB/512GB/Chuột/Win11 (NJ776W)
                              </a>
                            </h4>
                            <div className="price-box">
                              <span className="new-price">$46.80</span>
                            </div>
                          </div>
                          <div className="add-actions">
                            <ul className="add-actions-link">
                              <li className="add-cart active">
                                <a href="#">Add to cart</a>
                              </li>
                              <li>
                                <a
                                  className="links-details"
                                  href="wishlist.html"
                                >
                                  <i className="fa fa-heart-o"></i>
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  title="quick view"
                                  className="quick-view-btn"
                                  data-toggle="modal"
                                  data-target="#exampleModalCenter"
                                >
                                  <i className="fa fa-eye"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="single-product-wrap">
                        <div className="product-image">
                          <a href="single-product.html">
                            <img
                              src="images/product/large-size/12.jpg"
                              alt="Li's Product Image"
                            />
                          </a>
                          <span className="sticker">New</span>
                        </div>
                        <div className="product_desc">
                          <div className="product_desc_info">
                            <div className="product-review">
                              <h5 className="manufacturer">
                                <a href="shop-left-sidebar.html">
                                  Studio Design
                                </a>
                              </h5>
                              <div className="rating-box">
                                <ul className="rating">
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li className="no-star">
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li className="no-star">
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <h4>
                              <a
                                className="product_name"
                                href="single-product.html"
                              >
                                Laptop Lenovo Ideapad 3 15IAU7 i3
                                1215U/8GB/256GB/Win11 (82RK00RWVN)
                              </a>
                            </h4>
                            <div className="price-box">
                              <span className="new-price new-price-2">
                                $71.80
                              </span>
                              <span className="old-price">$77.22</span>
                              <span className="discount-percentage">-7%</span>
                            </div>
                          </div>
                          <div className="add-actions">
                            <ul className="add-actions-link">
                              <li className="add-cart active">
                                <a href="#">Add to cart</a>
                              </li>
                              <li>
                                <a
                                  className="links-details"
                                  href="wishlist.html"
                                >
                                  <i className="fa fa-heart-o"></i>
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  title="quick view"
                                  className="quick-view-btn"
                                  data-toggle="modal"
                                  data-target="#exampleModalCenter"
                                >
                                  <i className="fa fa-eye"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="best-seller container"
        style={{ background: "#fff", marginTop: "20px", borderRadius: "10px" }}
      >
        <div className="product-area pt-60 pb-50">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="li-product-tab" style={{ marginLeft: "17px" }}>
                  <ul className="nav li-product-menu">
                    <li>
                      <a
                        className="active"
                        data-toggle="tab"
                        href="#li-new-product"
                      >
                        <span style={{ fontFamily: "Arial, sans-serif" }}>
                          Mới nhập
                        </span>
                      </a>
                    </li>
                    <li>
                      <a data-toggle="tab" href="#li-bestseller-product">
                        <span style={{ fontFamily: "Arial,sans-serif" }}>
                          Bán chạy
                        </span>
                      </a>
                    </li>
                    <li>
                      <a data-toggle="tab" href="#li-featured-product">
                        <span style={{ fontFamily: "Arial,sans-serif" }}>
                          Nổi bật
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="tab-content" style={{ marginLeft: "15px" }}>
              <div
                id="li-new-product"
                className="tab-pane active show"
                role="tabpanel"
              >
                <div className="row">
                  <div className="product-active">
                    <section
                      className="bestseller"
                      style={{ marginTop: "20px" }}
                    >
                      <div className="container">
                        <Carousel
                          autoPlay={true}
                          draggable={false}
                          showDots={false}
                          responsive={responsive}
                          ssr={true} // means to render carousel on server-side.
                          infinite={true}
                          autoPlaySpeed={2000}
                          keyBoardControl={true}
                          customTransition="all .5"
                          transitionDuration={500}
                          containerClass="carousel-container"
                          removeArrowOnDeviceType={["tablet", "mobile"]}
                          deviceType={"desktop"}
                          dotListClass="custom-dot-list-style"
                          itemClass="carousel-item-padding-40-px"
                        >
                          <SingleProduct url={product1} />
                          <SingleProduct url={product2} />
                          <SingleProduct url={product1} />
                          <SingleProduct url={product2} />
                          <SingleProduct url={product1} />
                        </Carousel>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
              <div
                id="li-bestseller-product"
                className="tab-pane"
                role="tabpanel"
              >
                <div className="row">
                  <div className="product-active">
                    <div className="col-lg-12">
                      <div className="single-product-wrap">
                        <div className="product-image">
                          <a href="single-product.html">
                            <img
                              src="images/product/large-size/1.jpg"
                              alt="Li's Product Image"
                            />
                          </a>
                          <span className="sticker">New</span>
                        </div>
                        <div className="product_desc">
                          <div className="product_desc_info">
                            <div className="product-review">
                              <h5 className="manufacturer">
                                <a href="shop-left-sidebar.html">
                                  Graphic Corner
                                </a>
                              </h5>
                              <div className="rating-box">
                                <ul className="rating">
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li className="no-star">
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li className="no-star">
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <h4>
                              <a
                                className="product_name"
                                href="single-product.html"
                              >
                                Laptop Asus Vivobook Go 15 E1504FA R5
                                7520U/16GB/512GB/Chuột/Win11 (NJ776W)
                              </a>
                            </h4>
                            <div className="price-box">
                              <span className="new-price">$46.80</span>
                            </div>
                          </div>
                          <div className="add-actions">
                            <ul className="add-actions-link">
                              <li className="add-cart active">
                                <a href="#">Add to cart</a>
                              </li>
                              <li>
                                <a
                                  className="links-details"
                                  href="wishlist.html"
                                >
                                  <i className="fa fa-heart-o"></i>
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  title="quick view"
                                  className="quick-view-btn"
                                  data-toggle="modal"
                                  data-target="#exampleModalCenter"
                                >
                                  <i className="fa fa-eye"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="single-product-wrap">
                        <div className="product-image">
                          <a href="single-product.html">
                            <img
                              src="images/product/large-size/1.jpg"
                              alt="Li's Product Image"
                            />
                          </a>
                          <span className="sticker">New</span>
                        </div>
                        <div className="product_desc">
                          <div className="product_desc_info">
                            <div className="product-review">
                              <h5 className="manufacturer">
                                <a href="shop-left-sidebar.html">
                                  Studio Design
                                </a>
                              </h5>
                              <div className="rating-box">
                                <ul className="rating">
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li className="no-star">
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li className="no-star">
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <h4>
                              <a
                                className="product_name"
                                href="single-product.html"
                              >
                                Laptop Lenovo Ideapad 3 15IAU7 i3
                                1215U/8GB/256GB/Win11 (82RK00RWVN)
                              </a>
                            </h4>
                            <div className="price-box">
                              <span className="new-price new-price-2">
                                $71.80
                              </span>
                              <span className="old-price">$77.22</span>
                              <span className="discount-percentage">-7%</span>
                            </div>
                          </div>
                          <div className="add-actions">
                            <ul className="add-actions-link">
                              <li className="add-cart active">
                                <a href="#">Add to cart</a>
                              </li>
                              <li>
                                <a
                                  className="links-details"
                                  href="wishlist.html"
                                >
                                  <i className="fa fa-heart-o"></i>
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  title="quick view"
                                  className="quick-view-btn"
                                  data-toggle="modal"
                                  data-target="#exampleModalCenter"
                                >
                                  <i className="fa fa-eye"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="single-product-wrap">
                        <div className="product-image">
                          <a href="single-product.html">
                            <img
                              src="images/product/large-size/1.jpg"
                              alt="Li's Product Image"
                            />
                          </a>
                          <span className="sticker">New</span>
                        </div>
                        <div className="product_desc">
                          <div className="product_desc_info">
                            <div className="product-review">
                              <h5 className="manufacturer">
                                <a href="shop-left-sidebar.html">
                                  Graphic Corner
                                </a>
                              </h5>
                              <div className="rating-box">
                                <ul className="rating">
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li className="no-star">
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li className="no-star">
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <h4>
                              <a
                                className="product_name"
                                href="single-product.html"
                              >
                                Laptop Asus Vivobook Go 15 E1504FA R5
                                7520U/16GB/512GB/Chuột/Win11 (NJ776W)
                              </a>
                            </h4>
                            <div className="price-box">
                              <span className="new-price">$46.80</span>
                            </div>
                          </div>
                          <div className="add-actions">
                            <ul className="add-actions-link">
                              <li className="add-cart active">
                                <a href="#">Add to cart</a>
                              </li>
                              <li>
                                <a
                                  className="links-details"
                                  href="wishlist.html"
                                >
                                  <i className="fa fa-heart-o"></i>
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  title="quick view"
                                  className="quick-view-btn"
                                  data-toggle="modal"
                                  data-target="#exampleModalCenter"
                                >
                                  <i className="fa fa-eye"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="single-product-wrap">
                        <div className="product-image">
                          <a href="single-product.html">
                            <img
                              src="images/product/large-size/1.jpg"
                              alt="Li's Product Image"
                            />
                          </a>
                          <span className="sticker">New</span>
                        </div>
                        <div className="product_desc">
                          <div className="product_desc_info">
                            <div className="product-review">
                              <h5 className="manufacturer">
                                <a href="shop-left-sidebar.html">
                                  Studio Design
                                </a>
                              </h5>
                              <div className="rating-box">
                                <ul className="rating">
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li className="no-star">
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li className="no-star">
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <h4>
                              <a
                                className="product_name"
                                href="single-product.html"
                              >
                                Laptop Lenovo Ideapad 3 15IAU7 i3
                                1215U/8GB/256GB/Win11 (82RK00RWVN)
                              </a>
                            </h4>
                            <div className="price-box">
                              <span className="new-price new-price-2">
                                $71.80
                              </span>
                              <span className="old-price">$77.22</span>
                              <span className="discount-percentage">-7%</span>
                            </div>
                          </div>
                          <div className="add-actions">
                            <ul className="add-actions-link">
                              <li className="add-cart active">
                                <a href="#">Add to cart</a>
                              </li>
                              <li>
                                <a
                                  className="links-details"
                                  href="wishlist.html"
                                >
                                  <i className="fa fa-heart-o"></i>
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  title="quick view"
                                  className="quick-view-btn"
                                  data-toggle="modal"
                                  data-target="#exampleModalCenter"
                                >
                                  <i className="fa fa-eye"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="single-product-wrap">
                        <div className="product-image">
                          <a href="single-product.html">
                            <img
                              src="images/product/large-size/1.jpg"
                              alt="Li's Product Image"
                            />
                          </a>
                          <span className="sticker">New</span>
                        </div>
                        <div className="product_desc">
                          <div className="product_desc_info">
                            <div className="product-review">
                              <h5 className="manufacturer">
                                <a href="shop-left-sidebar.html">
                                  Graphic Corner
                                </a>
                              </h5>
                              <div className="rating-box">
                                <ul className="rating">
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li className="no-star">
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li className="no-star">
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <h4>
                              <a
                                className="product_name"
                                href="single-product.html"
                              >
                                Laptop Asus Vivobook Go 15 E1504FA R5
                                7520U/16GB/512GB/Chuột/Win11 (NJ776W)
                              </a>
                            </h4>
                            <div className="price-box">
                              <span className="new-price">$46.80</span>
                            </div>
                          </div>
                          <div className="add-actions">
                            <ul className="add-actions-link">
                              <li className="add-cart active">
                                <a href="#">Add to cart</a>
                              </li>
                              <li>
                                <a
                                  className="links-details"
                                  href="wishlist.html"
                                >
                                  <i className="fa fa-heart-o"></i>
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  title="quick view"
                                  className="quick-view-btn"
                                  data-toggle="modal"
                                  data-target="#exampleModalCenter"
                                >
                                  <i className="fa fa-eye"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="single-product-wrap">
                        <div className="product-image">
                          <a href="single-product.html">
                            <img
                              src="images/product/large-size/1.jpg"
                              alt="Li's Product Image"
                            />
                          </a>
                          <span className="sticker">New</span>
                        </div>
                        <div className="product_desc">
                          <div className="product_desc_info">
                            <div className="product-review">
                              <h5 className="manufacturer">
                                <a href="shop-left-sidebar.html">
                                  Studio Design
                                </a>
                              </h5>
                              <div className="rating-box">
                                <ul className="rating">
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li className="no-star">
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li className="no-star">
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <h4>
                              <a
                                className="product_name"
                                href="single-product.html"
                              >
                                Laptop Lenovo Ideapad 3 15IAU7 i3
                                1215U/8GB/256GB/Win11 (82RK00RWVN)
                              </a>
                            </h4>
                            <div className="price-box">
                              <span className="new-price new-price-2">
                                $71.80
                              </span>
                              <span className="old-price">$77.22</span>
                              <span className="discount-percentage">-7%</span>
                            </div>
                          </div>
                          <div className="add-actions">
                            <ul className="add-actions-link">
                              <li className="add-cart active">
                                <a href="#">Add to cart</a>
                              </li>
                              <li>
                                <a
                                  className="links-details"
                                  href="wishlist.html"
                                >
                                  <i className="fa fa-heart-o"></i>
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  title="quick view"
                                  className="quick-view-btn"
                                  data-toggle="modal"
                                  data-target="#exampleModalCenter"
                                >
                                  <i className="fa fa-eye"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                id="li-featured-product"
                className="tab-pane"
                role="tabpanel"
              >
                <div className="row">
                  <div className="product-active ">
                    <div className="col-lg-12">
                      <div className="single-product-wrap">
                        <div className="product-image">
                          <a href="single-product.html">
                            <img
                              src="images/product/large-size/3.jpg"
                              alt="Li's Product Image"
                            />
                          </a>
                          <span className="sticker">New</span>
                        </div>
                        <div className="product_desc">
                          <div className="product_desc_info">
                            <div className="product-review">
                              <h5 className="manufacturer">
                                <a href="shop-left-sidebar.html">
                                  Graphic Corner
                                </a>
                              </h5>
                              <div className="rating-box">
                                <ul className="rating">
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li className="no-star">
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li className="no-star">
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <h4>
                              <a
                                className="product_name"
                                href="single-product.html"
                              >
                                Laptop Asus Vivobook Go 15 E1504FA R5
                                7520U/16GB/512GB/Chuột/Win11 (NJ776W)
                              </a>
                            </h4>
                            <div className="price-box">
                              <span className="new-price">$46.80</span>
                            </div>
                          </div>
                          <div className="add-actions">
                            <ul className="add-actions-link">
                              <li className="add-cart active">
                                <a href="#">Add to cart</a>
                              </li>
                              <li>
                                <a
                                  className="links-details"
                                  href="wishlist.html"
                                >
                                  <i className="fa fa-heart-o"></i>
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  title="quick view"
                                  className="quick-view-btn"
                                  data-toggle="modal"
                                  data-target="#exampleModalCenter"
                                >
                                  <i className="fa fa-eye"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="single-product-wrap">
                        <div className="product-image">
                          <a href="single-product.html">
                            <img
                              src="images/product/large-size/5.jpg"
                              alt="Li's Product Image"
                            />
                          </a>
                          <span className="sticker">New</span>
                        </div>
                        <div className="product_desc">
                          <div className="product_desc_info">
                            <div className="product-review">
                              <h5 className="manufacturer">
                                <a href="shop-left-sidebar.html">
                                  Studio Design
                                </a>
                              </h5>
                              <div className="rating-box">
                                <ul className="rating">
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li className="no-star">
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li className="no-star">
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <h4>
                              <a
                                className="product_name"
                                href="single-product.html"
                              >
                                Laptop Lenovo Ideapad 3 15IAU7 i3
                                1215U/8GB/256GB/Win11 (82RK00RWVN)
                              </a>
                            </h4>
                            <div className="price-box">
                              <span className="new-price new-price-2">
                                $71.80
                              </span>
                              <span className="old-price">$77.22</span>
                              <span className="discount-percentage">-7%</span>
                            </div>
                          </div>
                          <div className="add-actions">
                            <ul className="add-actions-link">
                              <li className="add-cart active">
                                <a href="#">Add to cart</a>
                              </li>
                              <li>
                                <a
                                  className="links-details"
                                  href="wishlist.html"
                                >
                                  <i className="fa fa-heart-o"></i>
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  title="quick view"
                                  className="quick-view-btn"
                                  data-toggle="modal"
                                  data-target="#exampleModalCenter"
                                >
                                  <i className="fa fa-eye"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="single-product-wrap">
                        <div className="product-image">
                          <a href="single-product.html">
                            <img
                              src="images/product/large-size/7.jpg"
                              alt="Li's Product Image"
                            />
                          </a>
                          <span className="sticker">New</span>
                        </div>
                        <div className="product_desc">
                          <div className="product_desc_info">
                            <div className="product-review">
                              <h5 className="manufacturer">
                                <a href="shop-left-sidebar.html">
                                  Graphic Corner
                                </a>
                              </h5>
                              <div className="rating-box">
                                <ul className="rating">
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li className="no-star">
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li className="no-star">
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <h4>
                              <a
                                className="product_name"
                                href="single-product.html"
                              >
                                Laptop Asus Vivobook Go 15 E1504FA R5
                                7520U/16GB/512GB/Chuột/Win11 (NJ776W)
                              </a>
                            </h4>
                            <div className="price-box">
                              <span className="new-price">$46.80</span>
                            </div>
                          </div>
                          <div className="add-actions">
                            <ul className="add-actions-link">
                              <li className="add-cart active">
                                <a href="#">Add to cart</a>
                              </li>
                              <li>
                                <a
                                  className="links-details"
                                  href="wishlist.html"
                                >
                                  <i className="fa fa-heart-o"></i>
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  title="quick view"
                                  className="quick-view-btn"
                                  data-toggle="modal"
                                  data-target="#exampleModalCenter"
                                >
                                  <i className="fa fa-eye"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="single-product-wrap">
                        <div className="product-image">
                          <a href="single-product.html">
                            <img
                              src="images/product/large-size/9.jpg"
                              alt="Li's Product Image"
                            />
                          </a>
                          <span className="sticker">New</span>
                        </div>
                        <div className="product_desc">
                          <div className="product_desc_info">
                            <div className="product-review">
                              <h5 className="manufacturer">
                                <a href="shop-left-sidebar.html">
                                  Studio Design
                                </a>
                              </h5>
                              <div className="rating-box">
                                <ul className="rating">
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li className="no-star">
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li className="no-star">
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <h4>
                              <a
                                className="product_name"
                                href="single-product.html"
                              >
                                Laptop Lenovo Ideapad 3 15IAU7 i3
                                1215U/8GB/256GB/Win11 (82RK00RWVN)
                              </a>
                            </h4>
                            <div className="price-box">
                              <span className="new-price new-price-2">
                                $71.80
                              </span>
                              <span className="old-price">$77.22</span>
                              <span className="discount-percentage">-7%</span>
                            </div>
                          </div>
                          <div className="add-actions">
                            <ul className="add-actions-link">
                              <li className="add-cart active">
                                <a href="#">Add to cart</a>
                              </li>
                              <li>
                                <a
                                  className="links-details"
                                  href="wishlist.html"
                                >
                                  <i className="fa fa-heart-o"></i>
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  title="quick view"
                                  className="quick-view-btn"
                                  data-toggle="modal"
                                  data-target="#exampleModalCenter"
                                >
                                  <i className="fa fa-eye"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="single-product-wrap">
                        <div className="product-image">
                          <a href="single-product.html">
                            <img
                              src="images/product/large-size/11.jpg"
                              alt="Li's Product Image"
                            />
                          </a>
                          <span className="sticker">New</span>
                        </div>
                        <div className="product_desc">
                          <div className="product_desc_info">
                            <div className="product-review">
                              <h5 className="manufacturer">
                                <a href="shop-left-sidebar.html">
                                  Graphic Corner
                                </a>
                              </h5>
                              <div className="rating-box">
                                <ul className="rating">
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li className="no-star">
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li className="no-star">
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <h4>
                              <a
                                className="product_name"
                                href="single-product.html"
                              >
                                Laptop Asus Vivobook Go 15 E1504FA R5
                                7520U/16GB/512GB/Chuột/Win11 (NJ776W)
                              </a>
                            </h4>
                            <div className="price-box">
                              <span className="new-price">$46.80</span>
                            </div>
                          </div>
                          <div className="add-actions">
                            <ul className="add-actions-link">
                              <li className="add-cart active">
                                <a href="#">Add to cart</a>
                              </li>
                              <li>
                                <a
                                  className="links-details"
                                  href="wishlist.html"
                                >
                                  <i className="fa fa-heart-o"></i>
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  title="quick view"
                                  className="quick-view-btn"
                                  data-toggle="modal"
                                  data-target="#exampleModalCenter"
                                >
                                  <i className="fa fa-eye"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="single-product-wrap">
                        <div className="product-image">
                          <a href="single-product.html">
                            <img
                              src="images/product/large-size/12.jpg"
                              alt="Li's Product Image"
                            />
                          </a>
                          <span className="sticker">New</span>
                        </div>
                        <div className="product_desc">
                          <div className="product_desc_info">
                            <div className="product-review">
                              <h5 className="manufacturer">
                                <a href="shop-left-sidebar.html">
                                  Studio Design
                                </a>
                              </h5>
                              <div className="rating-box">
                                <ul className="rating">
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li>
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li className="no-star">
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                  <li className="no-star">
                                    <i className="fa fa-star-o"></i>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <h4>
                              <a
                                className="product_name"
                                href="single-product.html"
                              >
                                Laptop Lenovo Ideapad 3 15IAU7 i3
                                1215U/8GB/256GB/Win11 (82RK00RWVN)
                              </a>
                            </h4>
                            <div className="price-box">
                              <span className="new-price new-price-2">
                                $71.80
                              </span>
                              <span className="old-price">$77.22</span>
                              <span className="discount-percentage">-7%</span>
                            </div>
                          </div>
                          <div className="add-actions">
                            <ul className="add-actions-link">
                              <li className="add-cart active">
                                <a href="#">Add to cart</a>
                              </li>
                              <li>
                                <a
                                  className="links-details"
                                  href="wishlist.html"
                                >
                                  <i className="fa fa-heart-o"></i>
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  title="quick view"
                                  className="quick-view-btn"
                                  data-toggle="modal"
                                  data-target="#exampleModalCenter"
                                >
                                  <i className="fa fa-eye"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
