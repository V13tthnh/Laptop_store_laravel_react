import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faFileInvoice } from "@fortawesome/free-solid-svg-icons";
import { faAddressBook } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import useAuthContext from "../../context/AuthContext";

export default function LeftSidebar(props) {
  const { token, user, logout } = useAuthContext();

  const logoutHandle = () => {
    logout();
  };

  return (
    <>
      <div className="menuleft">
        <div className="menuleft__name"></div>
        <ul>
          <li className="active">
            <NavLink to="/account/profile">
              <FontAwesomeIcon icon={faUser} size="sm" /> Thông tin tài khoản
            </NavLink>
          </li>
          <li className="">
            <NavLink to="/account/change-password">
              <FontAwesomeIcon icon={faLock} size="sm" /> Đổi mật khẩu
            </NavLink>
          </li>
          <li className="active">
            <NavLink to="/account/orders">
              <FontAwesomeIcon icon={faFileInvoice} size="sm" /> Quản lý Đơn
              hàng
            </NavLink>
          </li>
          <li className="">
            <NavLink to="/account/addresses">
              <FontAwesomeIcon icon={faAddressBook} size="sm" /> Sổ địa chỉ
            </NavLink>
          </li>
          <li className="active">
            <NavLink to="/account/wishlist">
              <FontAwesomeIcon icon={faHeart} size="sm" /> Danh sách yêu thích
            </NavLink>
          </li>
        </ul>
        <a href="#" className="btn-logout" onClick={logoutHandle}>
          Đăng Xuất
        </a>
      </div>
    </>
  );
}
