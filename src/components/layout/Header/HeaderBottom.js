import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaptop } from "@fortawesome/free-solid-svg-icons";
import { faHeadset } from "@fortawesome/free-solid-svg-icons";
import { faGamepad } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faTicket } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { getAllCategories } from "../../../api/categories";

export default function HeaderBottom() {
  const [categoryData, setCategoryData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(()=>{
    handleGetCategories();
  }, []);

  const handleGetCategories = async () => {
    try {
      var data = await getAllCategories();
      setCategoryData(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="header-bottom header-sticky d-none d-lg-block d-xl-block">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="hb-menu">
                <nav>
                  <ul>
                    <li>
                      <NavLink to="/">
                        <FontAwesomeIcon icon={faHome} size="lg" /> Trang chủ
                      </NavLink>
                    </li>
                    <li className="megamenu-holder">
                      <NavLink to="/product">
                        <FontAwesomeIcon icon={faLaptop} size="lg" /> Laptop
                      </NavLink>
                      <ul className="megamenu hb-megamenu">
                        <li>
                          <NavLink to="/product">Thương hiệu</NavLink>
                          <ul>
                            <li>
                              <a href="shop-3-column.html">Shop 3 Column</a>
                            </li>
                            <li>
                              <a href="shop-4-column.html">Shop 4 Column</a>
                            </li>
                            <li>
                              <a href="shop-left-sidebar.html">
                                Shop Left Sidebar
                              </a>
                            </li>
                            <li>
                              <a href="shop-right-sidebar.html">
                                Shop Right Sidebar
                              </a>
                            </li>
                            <li>
                              <a href="shop-list.html">Shop List</a>
                            </li>
                            <li>
                              <a href="shop-list-left-sidebar.html">
                                Shop List Left Sidebar
                              </a>
                            </li>
                            <li>
                              <a href="shop-list-right-sidebar.html">
                                Shop List Right Sidebar
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <a href="single-product-gallery-left.html">
                            Nhu cầu
                          </a>
                          <ul>
                            <li>
                              <a href="single-product-carousel.html">
                                Single Product Carousel
                              </a>
                            </li>
                            <li>
                              <a href="single-product-gallery-left.html">
                                Single Product Gallery Left
                              </a>
                            </li>
                            <li>
                              <a href="single-product-gallery-right.html">
                                Single Product Gallery Right
                              </a>
                            </li>
                            <li>
                              <a href="single-product-tab-style-top.html">
                                Single Product Tab Style Top
                              </a>
                            </li>
                            <li>
                              <a href="single-product-tab-style-left.html">
                                Single Product Tab Style Left
                              </a>
                            </li>
                            <li>
                              <a href="single-product-tab-style-right.html">
                                Single Product Tab Style Right
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <a href="single-product.html">Cấu hình</a>
                          <ul>
                            <li>
                              <a href="single-product.html">Single Product</a>
                            </li>
                            <li>
                              <a href="single-product-sale.html">
                                Single Product Sale
                              </a>
                            </li>
                            <li>
                              <a href="single-product-group.html">
                                Single Product Group
                              </a>
                            </li>
                            <li>
                              <a href="single-product-normal.html">
                                Single Product Normal
                              </a>
                            </li>
                            <li>
                              <a href="single-product-affiliate.html">
                                Single Product Affiliate
                              </a>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                    <li className="megamenu-holder">
                      <NavLink to="/product">
                        <FontAwesomeIcon icon={faGamepad} size="lg" /> Laptop
                        Gaming
                      </NavLink>
                      <ul className="megamenu hb-megamenu">
                        <li>
                          <a href="shop-left-sidebar.html">Shop Page Layout</a>
                          <ul>
                            <li>
                              <a href="shop-3-column.html">Shop 3 Column</a>
                            </li>
                            <li>
                              <a href="shop-4-column.html">Shop 4 Column</a>
                            </li>
                            <li>
                              <a href="shop-left-sidebar.html">
                                Shop Left Sidebar
                              </a>
                            </li>
                            <li>
                              <a href="shop-right-sidebar.html">
                                Shop Right Sidebar
                              </a>
                            </li>
                            <li>
                              <a href="shop-list.html">Shop List</a>
                            </li>
                            <li>
                              <a href="shop-list-left-sidebar.html">
                                Shop List Left Sidebar
                              </a>
                            </li>
                            <li>
                              <a href="shop-list-right-sidebar.html">
                                Shop List Right Sidebar
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <a href="single-product-gallery-left.html">
                            Single Product Style
                          </a>
                          <ul>
                            <li>
                              <a href="single-product-carousel.html">
                                Single Product Carousel
                              </a>
                            </li>
                            <li>
                              <a href="single-product-gallery-left.html">
                                Single Product Gallery Left
                              </a>
                            </li>
                            <li>
                              <a href="single-product-gallery-right.html">
                                Single Product Gallery Right
                              </a>
                            </li>
                            <li>
                              <a href="single-product-tab-style-top.html">
                                Single Product Tab Style Top
                              </a>
                            </li>
                            <li>
                              <a href="single-product-tab-style-left.html">
                                Single Product Tab Style Left
                              </a>
                            </li>
                            <li>
                              <a href="single-product-tab-style-right.html">
                                Single Product Tab Style Right
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <a href="single-product.html">Single Products</a>
                          <ul>
                            <li>
                              <a href="single-product.html">Single Product</a>
                            </li>
                            <li>
                              <a href="single-product-sale.html">
                                Single Product Sale
                              </a>
                            </li>
                            <li>
                              <a href="single-product-group.html">
                                Single Product Group
                              </a>
                            </li>
                            <li>
                              <a href="single-product-normal.html">
                                Single Product Normal
                              </a>
                            </li>
                            <li>
                              <a href="single-product-affiliate.html">
                                Single Product Affiliate
                              </a>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="shop-left-sidebar.html">
                        <FontAwesomeIcon icon={faTicket} size="lg" />
                        Khuyến mãi
                      </a>
                    </li>
                    {/* <li>
                      <a href="shop-left-sidebar.html">
                        <FontAwesomeIcon icon={faHeadset} size="lg" /> Hỗ trợ
                      </a>
                    </li> */}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
