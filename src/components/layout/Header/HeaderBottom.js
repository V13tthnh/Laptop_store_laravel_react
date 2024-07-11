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

  useEffect(() => {
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
                      <NavLink to="/laptop">
                        <FontAwesomeIcon icon={faLaptop} size="lg" /> Laptop
                      </NavLink>
                      <ul className="megamenu hb-megamenu">
                        {categoryData &&
                          categoryData.map((item) => {
                            return (
                              <>
                                <li>
                                  <p>
                                    <b>{item.name}</b>
                                  </p>
                                  <ul>
                                    {item.children.map((item) => {
                                      return (
                                        <>
                                         <li>
                                            <NavLink to={`/laptop?categoryId=${item.id}`}>
                                              {item.name}
                                            </NavLink>
                                          </li>
                                        </>
                                      );
                                    })}
                                  </ul>
                                </li>
                              </>
                            );
                          })}
                      </ul>
                    </li>
                    <li className="megamenu-holder">
                      <NavLink to="/laptop">
                        <FontAwesomeIcon icon={faGamepad} size="lg" /> Laptop
                        Gaming
                      </NavLink>
                      <ul className="megamenu hb-megamenu">
                        {categoryData &&
                          categoryData.map((item) => {
                            return (
                              <>
                                <li>
                                  <p>
                                    <b>{item.name}</b>
                                  </p>
                                  <ul>
                                    {item.children.map((item) => {
                                      return (
                                        <>
                                          <li>
                                            <NavLink to={`/laptop?categoryId=${item.id}`}>
                                              {item.name}
                                            </NavLink>
                                          </li>
                                        </>
                                      );
                                    })}
                                  </ul>
                                </li>
                              </>
                            );
                          })}
                      </ul>
                    </li>
                    {/* <li>
                      <a href="shop-left-sidebar.html">
                        <FontAwesomeIcon icon={faTicket} size="lg" />
                        Khuyến mãi
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
