import { NavLink } from "react-router-dom";
import LeftSidebar from "./LeftSidebar";
import OrderItem from "../order/orderItem";
import { useEffect } from "react";
import useAuthContext from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Orders() {
  const { token } = useAuthContext();
  useEffect(() => {
    if (!token) {
      navigator("/login");
      setTimeout(() => {
        toast.error("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại");
      }, 1000);
      return;
    }
  }, [token]);
  
  return (
    <>
      <ToastContainer />
      <div className="page-section mb-60">
        <div className="container">
          <section className="wrapper">
            <LeftSidebar />
            <div className="main">
              <div className="menutop">
                <h2>Đơn hàng đã mua</h2>
              </div>
              <div className="filter">
                <div className="filter-type">
                  <div className="filter-type_scroll">
                    <a
                      href="javascript:;"
                      data-id="0"
                      className="active"
                      onclick="ClickTabFillter(this)"
                    >
                      Tất cả
                    </a>
                    <a
                      href="javascript:;"
                      data-id="5"
                      className=""
                      onclick="ClickTabFillter(this)"
                    >
                      Chờ xử lý
                    </a>
                    <a
                      href="javascript:;"
                      data-id="6"
                      className=""
                      onclick="ClickTabFillter(this)"
                    >
                      Đã xác nhận
                    </a>
                    <a
                      href="javascript:;"
                      data-id="7"
                      className=""
                      onclick="ClickTabFillter(this)"
                    >
                      Đang chuyển hàng
                    </a>
                    <a
                      href="javascript:;"
                      data-id="8"
                      className=""
                      onclick="ClickTabFillter(this)"
                    >
                      Đang giao hàng
                    </a>
                    <a
                      href="javascript:;"
                      data-id="9"
                      className=""
                      onclick="ClickTabFillter(this)"
                    >
                      Đã hủy
                    </a>
                    <a
                      href="javascript:;"
                      data-id="10"
                      className=""
                      onclick="ClickTabFillter(this)"
                    >
                      Thành công
                    </a>
                  </div>
                </div>
              </div>{" "}
              <div className="list" id="list_order">
                <OrderItem />
                <OrderItem />
                <OrderItem />
                <OrderItem />
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
