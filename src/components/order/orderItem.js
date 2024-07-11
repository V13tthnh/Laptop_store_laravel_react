import { NavLink } from "react-router-dom";
import useAuthContext from "../../context/AuthContext";
import { Button } from "@mui/material";
import OrderDeleteModal from "./OrderDeleteModal";
import api from "../../api/api";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { cancelOrder, reOrder } from "../../api/order";

export default function OrderItem({ orders, reload }) {
  const { token, user } = useAuthContext();
  const [loading, setLoading] = useState();
  const [errors, setErrors] = useState();

  const ORDER_STATUS = {
    1: "Chờ xử lý",
    2: "Đã xác nhận",
    3: "Đang giao hàng",
    4: "Đã hủy",
    5: "Đã nhân được hàng",
  };

  const handleCancelOrder = async (id) => {
    try {
      await cancelOrder({ order_id: id });
    } catch (error) {
      console.error("Failed to load addresses:", error);
    } finally {
      toast.success("Đơn hàng đã được hủy thành công.");
      reload();
      setLoading(false);
    }
  };

  const handleReOrder = async (id) => {
    try {
      const response = await reOrder({ order_id: id });
      if (response.data.status) {
        toast.success(response.data.message);
        reload();
      }
    } catch (error) {
      console.error("Failed to load addresses:", error);
    } finally {
      toast.success("Đơn hàng đã được mua lại.");
      reload();
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      {orders &&
        orders.map((order) => {
          return (
            <>
              <div className="order-item hisOrderType_1 ">
                <div className="item-head ">
                  <div className="head-info inline">
                    <div className="order_id">
                      <b>Đơn hàng:</b>&nbsp;<span>#{order.id} </span>
                    </div>
                  </div>
                  <b className="success order-status" data-status="Success" style={order.status === 5 ? { color: 'rgba(40, 199, 111, 0.7)' } : {}}>
                    {ORDER_STATUS[order.status]}
                  </b>
                </div>
                <div className="item-content">
                  {order.products.map((product) => {
                    return (
                      <>
                        <div className="content-left">
                          <NavLink
                            to={`/laptop/${product.slug}`}
                            className="thumb-wrapper ordertypeweb_5"
                          >
                            <img
                              className="thumb-main"
                              src={`http://localhost:8000/${product.first_image?.url}`}
                              alt=""
                            />
                          </NavLink>
                        </div>
                        <div className="content-right">
                          <NavLink
                            to={`/laptop/${product.slug}`}
                            data-id="12481SH23030022190  "
                            className="order_item order-name"
                          >
                            {product.name}
                          </NavLink>
                        </div>
                      </>
                    );
                  })}
                </div>
                <div className="content-wrapper_right">
                  <p className="total-price_wrapper" style={{ color: "red" }}>
                    <span className="total-price">
                      Tổng tiền: <b>{order.total}</b>
                    </span>
                  </p>

                  <div className="order-info__paymentdetail"></div>
                </div>
                <div className="item-foot">
                  <div className="link ">
                    <NavLink
                      to={`/account/order/detail/${order.id}`}
                      data-id="12481SH23030022190  "
                      className="btn-detail"
                      onclick="SaveScrollBtnDetail()"
                    >
                      Xem chi tiết
                    </NavLink>
                    {order.status === 1 &&  order.formality !== 1 && (
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleCancelOrder(order.id)}
                      >
                        Hủy đơn
                      </Button>
                    )}
                    {order.status === 4 && (
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleReOrder(order.id)}
                      >
                        Mua lại
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </>
          );
        })}
    </>
  );
}
