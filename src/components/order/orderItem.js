import { useState } from "react";
import { NavLink } from "react-router-dom";
import useAuthContext from "../../context/AuthContext";
import { deleteAddress } from "../../api/address";
import { getAllOrders } from "../../api/order";
import LoadingPage from "../common/LoadingPage";

export default function OrderItem(props) {
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const { user } = useAuthContext();

  const ORDER_STATUS = {
    1: "Chờ xử lý",
    2: "Đã xác nhận",
    3: "Đang chuyển hàng",
    4: "Đang giao hàng",
    5: "Đã nhận được hàng",
    6: "Đã hủy",
    7: "Trả hàng/Hoàn tiền",
  };
  
  const handleGetAllOrders = async () => {
    try {
    setLoading(true);
      var response = await getAllOrders({user_id: user?.id});
      setOrders(response.data);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ submit: "Failed to add address" });
      }
    }finally{
        setLoading(false);
    }
  };

  useState(() => {
    handleGetAllOrders();
    console.log(orders)
  }, []);

if(loading){
    return <LoadingPage/>
}

  return (
    <>
      {orders &&
        orders.map((item) => {
          return (
            <>
              <div className="order-item hisOrderType_1 ">
                <div className="item-head ">
                  <div className="head-info inline">
                    <div className="order_id">
                      <b>Đơn hàng:</b>&nbsp;<span>#12481SH23030022190 </span>
                    </div>
                  </div>
                  <b className="success order-status" data-status="Success">
                 {ORDER_STATUS[item.status]}
                  </b>
                </div>
                <div className="item-content">
                  <div className="content-left">
                    <a
                      href="/lich-su-mua-hang/don-hang-erp-12481SO23030022191"
                      data-id="12481SH23030022190  "
                      className="thumb-wrapper ordertypeweb_5"
                    >
                      <img
                        className="thumb-main"
                        src="images/product/hp-15-fd0303tu-i3-a2nl4pa-glr-2.jpg"
                      />
                    </a>
                  </div>
                  <div className="content-right">
                    <a
                      href="/lich-su-mua-hang/"
                      data-id="12481SH23030022190  "
                      className="order_item order-name"
                      onclick="SaveScrollBtnDetail()"
                    >
                      Laptop HP 15 fd0303TU i3 1315U/8GB/512GB/Win11 (A2NL4PA)
                    </a>
                    <div className="content-wrapper_right">
                      <p className="total-price_wrapper">
                        Tổng tiền:
                        <span className="total-price"> 170.000.000₫</span>
                      </p>

                      <div className="order-info__paymentdetail"></div>
                    </div>
                  </div>
                </div>
                <div className="item-foot">
                  <div className="link ">
                    <NavLink
                      to="/account/order/detail"
                      data-id="12481SH23030022190  "
                      className="btn-detail"
                      onclick="SaveScrollBtnDetail()"
                    >
                      Xem chi tiết
                    </NavLink>
                  </div>
                </div>
              </div>
            </>
          );
        })}
    </>
  );
}
