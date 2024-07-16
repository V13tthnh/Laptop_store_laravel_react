import { NavLink, useNavigate, useParams } from "react-router-dom";
import LeftSidebar from "./LeftSidebar";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import useAuthContext from "../../context/AuthContext";

import "react-toastify/dist/ReactToastify.css";
import { getOrderDetail } from "../../api/order";
import LoadingPage from "../common/LoadingPage";
import { showFailedAlert } from "../../utils/toastify";

const ORDER_STATUS = {
  1: "Chờ xử lý",
  2: "Đã xác nhận",
  3: "Đang giao hàng",
  4: "Đã hủy",
  5: "Đã nhân được hàng",
};

const ORDER_PAYMENT = {
  1: "Thanh toán VNPay",
  2: "Thanh toán khi nhận hàng",
};

export default function OrderDetail() {
  const { token, user } = useAuthContext();
  const [orderDetail, setOrderDetail] = useState(null);
  const navigator = useNavigate();
  let { id } = useParams();

  useEffect(() => {
    if (!token && !user) {
      navigator("/login");
      showFailedAlert("Vui lòng đăng nhập lại");
      return;
    }
  }, [token]);

  const handleGetOrderDetail = async () => {
    try {
      const response = await getOrderDetail({ order_id: id });
      setOrderDetail(response.data);
    } catch (e) {
      console.log(e);
      return;
    }
  };

  useEffect(() => {
    handleGetOrderDetail();
  }, []);

  if (!orderDetail) {
    return (
      <>
        <LoadingPage />
      </>
    );
  }

  const formatCurrency = (total) => {
    return total.toLocaleString("vi-VN") + " vnđ";
  };

  return (
    <>
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
                      <span>#{orderDetail.id}</span>
                    </p>

                    <p className="order-title__statusname success">
                      <span>- </span>
                      {ORDER_STATUS[orderDetail.status]}
                    </p>
                  </div>
                </aside>
                <aside>
                  <p className="order-title__buydate">
                    Đặt lúc: {orderDetail.created_at}
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
                        {user.gender === "Nam" ? "Anh" : "Chị"} {orderDetail.name}
                        <label>- {orderDetail.phone}</label>
                      </span>
                    </p>
                  </div>
                  <div>
                    <span className="order-info__label">Nhận tại: </span>
                    <p>
                      {orderDetail.address.address_detail +
                        ", " +
                        orderDetail.address.ward +
                        ", " +
                        orderDetail.address.district +
                        ", " +
                        orderDetail.address.district}
                    </p>
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
                      <span>{ORDER_PAYMENT[orderDetail.formality]}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="order-detail">
                <h2>
                  <FontAwesomeIcon icon={faShoppingBag} />
                  <span>Thông tin sản phẩm</span>
                </h2>
                {orderDetail.products.map((product) => {
                  return (
                    <>
                      <div className="product-item ">
                        <NavLink to={`/laptop/${product.slug}`}>
                          <img
                            src={`http://localhost:8000/${product.first_image?.url}`}
                            alt=""
                          />
                        </NavLink>

                        <div className="product-item__info">
                          <NavLink to={`/laptop/${product.slug}`}>
                            <p>{product.name}</p>
                          </NavLink>
                          <p className="product-item__quantity">
                            Số lượng: {product.pivot.quantity}
                          </p>
                        </div>

                        <div className="product-item__price">
                          <p>{formatCurrency(product.pivot.price)}</p>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
              <div className="order-price">
                <p>
                  <span>Tạm tính:</span>
                  <span>{formatCurrency(orderDetail.subtotal)}</span>
                </p>
                <p>
                  <span>Giảm giá:</span>
                  <span>{formatCurrency(orderDetail.discount)}</span>
                </p>
                <p>
                  <span>Tổng tiền:</span>
                  <span>{orderDetail.total}</span>
                </p>
                <p className="totalpaid">
                  <span>Số tiền đã thanh toán:</span>
                  {orderDetail.formality === 1 ? (
                    <>
                      <b>{orderDetail.total}</b>
                    </>
                  ) : orderDetail.status === 5 ? (
                    <>
                      <b>{orderDetail.total}</b>
                    </>
                  ) : (
                    <>
                      <b>Chưa thanh toán</b>
                    </>
                  )}
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
