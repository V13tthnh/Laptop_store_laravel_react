import { useNavigate } from "react-router-dom";
import LeftSidebar from "./LeftSidebar";
import OrderItem from "../order/orderItem";
import { useEffect, useState } from "react";
import useAuthContext from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getOrders } from "../../api/order";
import LoadingPage from "../common/LoadingPage";

const ORDER_STATUS = {
  ALL: 0,
  PENDING: 1,
  CONFIRMED: 2,
  SHIPPING: 3,
  CANCELLED: 4,
  COMPLETED: 5,
};

export default function Orders() {
  const { token, user } = useAuthContext();
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [originalOrders, setOriginalOrders] = useState([]);
  const [filter, setFilter] = useState(ORDER_STATUS.ALL);
  const navigator = useNavigate();

  useEffect(() => {
    if (!token && !user) {
      setTimeout(() => {
        navigator("/login");
        toast.error("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại");
      }, 3000);
      return;
    }
  }, [token]);

  const handleGetAllOrders = async () => {
    try {
      setLoading(true);
      var response = await getOrders({ user_id: user.id });
      setOrders(response.data);
      setOriginalOrders(response.data);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ submit: "Failed to add address" });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetAllOrders();
  }, []);

  const reloadOrder = () => {
    handleGetAllOrders();
  }

  if (loading) {
    return <LoadingPage />;
  }

  const handleFilterChange = (status) => {
    if (status === ORDER_STATUS.ALL) {
      setOrders(originalOrders);
    } else {;
      setOrders(originalOrders)
      
      const filtered = orders.filter((order) => order.status === status);
      setOrders(filtered);
    }
    setFilter(status);
  };

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
                      className=""
                      onClick={() => handleFilterChange(ORDER_STATUS.ALL)}
                    >
                      Tất cả
                    </a>
                    <a
                      href="javascript:;"
                      data-id="5"
                      className=""
                      onClick={() => handleFilterChange(ORDER_STATUS.PENDING)}
                    >
                      Chờ xử lý
                    </a>
                    <a
                      href="javascript:;"
                      data-id="6"
                      className=""
                      onClick={() => handleFilterChange(ORDER_STATUS.CONFIRMED)}
                    >
                      Đã xác nhận
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
                      onClick={() => handleFilterChange(ORDER_STATUS.CANCELLED)}
                    >
                      Đã hủy
                    </a>
                    <a
                      href="javascript:;"
                      data-id="10"
                      className=""
                      onClick={() => handleFilterChange(ORDER_STATUS.COMPLETED)}
                    >
                      Đã nhận được hàng
                    </a>
                  </div>
                </div>
              </div>
              <div className="list" id="list_order">
                <OrderItem orders={orders} reload={reloadOrder}/>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
