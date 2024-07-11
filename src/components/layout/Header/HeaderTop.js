import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faUser,
  faRightFromBracket,
  faAddressBook,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { faFileInvoice } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../../../api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuthContext from "../../../context/AuthContext";

export default function HeaderTop() {
  const { token, user, getUser, logout } = useAuthContext();

  useEffect(() => {
    if (token) {
      
    }
  }, [token]);

  const logoutHandle = () => {
    logout();
  };

  return (
    <>
      <div className="header-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-4">
              <div className="header-top-left">
                <ul className="phone-wrap">
                  <li>
                    <span>Hotline:</span>
                    <a href="#">(+123) 123 321 345</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-9 col-md-8">
              <div className="header-top-right">
                <ul className="ht-menu">
                  <li>
                    <span className="language-selector-wrapper">
                      Ngôn ngữ :
                    </span>
                    <div className="ht-language-trigger">
                      <span>Tiếng việt</span>
                    </div>
                  </li>
                  {user && token ? (
                    <li>
                      <span className="currency-selector-wrapper">
                        <div className="dropdown">
                          <button
                            style={{
                              backgroundColor: "#f8f9f9",
                              color: "#111111",
                              border: "none",
                              fontSize: "12px",
                            }}
                            className="btn btn-secondary dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            Xin chào, {user.full_name}
                          </button>
                          <div
                            className="dropdown-menu"
                            aria-labelledby="dropdownMenuButton"
                          >
                            <NavLink
                              className="dropdown-item"
                              to="/account/profile"
                            >
                              <FontAwesomeIcon icon={faUser} />{" "}
                              <span> Thông tin tài khoản</span>
                            </NavLink>
                            <NavLink
                              className="dropdown-item"
                              to="/account/orders"
                            >
                              <FontAwesomeIcon icon={faFileInvoice} />{" "}
                              <span>Tra cứu đơn hàng</span>
                            </NavLink>
                            <NavLink
                              className="dropdown-item"
                              to="/account/change-password"
                            >
                              <FontAwesomeIcon icon={faLock} />
                              <span> Đổi mật khẩu</span>
                            </NavLink>
                            <NavLink
                              className="dropdown-item"
                              to="/account/addresses"
                            >
                              <FontAwesomeIcon icon={faAddressBook} />
                              <span> Sổ địa chỉ</span>
                            </NavLink>
                            <NavLink
                              className="dropdown-item"
                              to="/account/wishlist"
                            >
                              <FontAwesomeIcon icon={faHeart} />
                              <span> Sản phẩm yêu thích</span>
                            </NavLink>
                            <a
                              href=""
                              className="dropdown-item"
                              onClick={logoutHandle}
                            >
                              <FontAwesomeIcon icon={faRightFromBracket} />
                              <span> Đăng xuất</span>
                            </a>
                          </div>
                        </div>
                      </span>
                    </li>
                  ) : (
                    <li>
                      <div className="currency-selector-wrapper">
                        <NavLink to="/login">
                          <span>Đăng nhập</span>
                        </NavLink>{" "}
                        <span>/ </span>
                        <NavLink to="/register">
                          <span>Đăng ký</span>
                        </NavLink>
                      </div>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
