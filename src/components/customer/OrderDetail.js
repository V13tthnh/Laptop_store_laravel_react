import { NavLink } from "react-router-dom";
import LeftSidebar from "./LeftSidebar";
import React, { useEffect } from "react";
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import useAuthContext from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function OrderDetail() {
  const {token} = useAuthContext();

  useEffect(()=>{
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
    <ToastContainer/>
      <div className="page-section mb-60">
        <div className="container">
          <section className="wrapper">
            <LeftSidebar />
            <div className="main">
              <div className="order-title">
                <aside>
                  <div>
                    <p>
                      <span>Chi tiết đơn hàng</span>
                      <span>#12481SO23030022191</span>
                    </p>

                    <p className="order-title__statusname success">
                      <span>- </span>
                      Đã nhận hàng
                    </p>
                  </div>
                </aside>
                <aside>
                  <p className="order-title__buydate">
                    Đặt lúc: 15:34 Thứ Ba, 07/03/2023
                  </p>
                </aside>
              </div>
              <div className="order-info ">
                <div className="order-info__user">
                  <h2>
                    <FontAwesomeIcon icon={faLocationDot} />
                    <span>Thông tin nhận hàng</span>
                  </h2>
                  <div className="order-info__user__customer">
                    <span className="order-info__label">Người nhận:</span>
                    <p id="receiver-info">
                      <span className="order-info__user__customer--name">
                        Anh Đinh Viết Thành <label>- 0703169460</label>
                      </span>
                    </p>
                  </div>
                  <div>
                    <span className="order-info__label">Nhận tại: </span>
                    <p>
                      Siêu thị 95 Lê Quang Định, Phường 14, Quận Bình Thạnh, TP
                      Hồ Chí Minh
                    </p>
                  </div>

                  <div>
                    <span className="order-info__label">Nhận lúc:</span>
                    <p> Trước 15:34 - Thứ Ba (07/03)</p>
                  </div>
                  <input type="hidden" name="hdOrderPhone" value="" />
                </div>

                <div className="order-info__payment">
                  <h2>
                    <FontAwesomeIcon icon={faCreditCard} />
                    <span>Hình thức thanh toán</span>
                  </h2>
                  <div className="order-info__paymentdetail">
                    <p className="payment-text">
                      <span>Thanh toán khi nhận hàng</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="order-detail">
                <h2>
                <FontAwesomeIcon icon={faShoppingBag} />
                  <span>Thông tin sản phẩm</span>
                </h2>
                <div className="product-item ">
                  <a href="https://www.thegioididong.com/adapter-sac/adapter-sac-usb-24a-ava-cs-tc021-trang">
                    {" "}
                    <img src="https://cdn.tgdd.vn/Products/Images/9499/264378/adapter-sac-usb-24a-ava-cs-tc021-trang-170722-023903-400x400.jpg" />
                  </a>

                  <div className="product-item__info">
                    <a href="https://www.thegioididong.com/adapter-sac/adapter-sac-usb-24a-ava-cs-tc021-trang">
                      <p>Adapter Sạc 2.4A AVA+ CS-TC021 Trắng</p>
                    </a>
                    <p className="product-item__quantity">Số lượng: 1</p>
                  </div>

                  <div className="product-item__price">
                    <p>170.000₫</p>
                  </div>
                </div>
              </div>
              <div className="order-price">
                <p>
                  <span>Tạm tính:</span>
                  <span>170.000₫</span>
                </p>
                <p>
                  <span>Tổng tiền:</span>
                  <span>170.000₫</span>
                </p>
                <p className="totalpaid">
                  <span>Số tiền đã thanh toán:</span>
                  <b>170.000₫</b>
                </p>
              </div>
              <div className="order-payment" id="payment-partial"></div>
              <div className="detail-short-link-otp"></div>
              <div className="order-payment__action">
                <NavLink to="/account/orders" className="back-to-listing">
                  Về trang danh sách đơn hàng
                </NavLink>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
