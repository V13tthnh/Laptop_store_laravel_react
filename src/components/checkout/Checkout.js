import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Box, TextField } from "@mui/material";
import CheckoutProductInfo from "./CheckoutProductInfo";
import { useEffect, useRef, useState } from "react";
import AddAddressModal from "./AddAddressModal";
import AddressRow from "./AddressRow";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faHome } from "@fortawesome/free-solid-svg-icons";
import { getAllAddresses } from "../../api/address";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../redux/slices/CartSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuthContext from "../../context/AuthContext";
import api from "../../api/api";
import LoadingPage from "../common/LoadingPage";
import { clearCoupon } from "../../redux/slices/CouponSlice";

export default function Checkout(props) {
  const dispatch = useDispatch();
  const coupon = useSelector((state) => state.coupon.items);
  const [loading, setLoading] = useState(false);
  const [selectPayment, setSelectPayment] = useState(null);
  const [selectAddress, setSelectAddress] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const { user, token } = useAuthContext();
  const cartItems = useSelector((state) => state.cart.items);
  const cartTotal = useSelector((state) => state.cart.total);
  const navigator = useNavigate();
  const [note, setNote] = useState(null);
  const params = useLocation();
  const navigate = useNavigate();

  const search = new URLSearchParams(params.search);
  const vnp_ResponseCode = search.get("vnp_ResponseCode");

  const loadAddresses = async () => {
    try {
      const data = await getAllAddresses(user.id);
      setAddresses(data.data);
    } catch (error) {
      console.error("Failed to load addresses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      setTimeout(() => {
        toast.error("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại");
      }, 1000);
      return;
    }

    loadAddresses();

    if (vnp_ResponseCode !== null) {
      axios
        .post(
          `http://127.0.0.1:8000/api/vnp/callback`,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
          vnp_ResponseCode
        )
        .then((res) => {
          if (res.data.success) {
            dispatch(clearCart());
            dispatch(clearCoupon());
            setTimeout(() => {
              toast.success("Cảm ơn bạn đã mua hàng.");
              navigator("/account/orders");
            }, 2000);
          } else {
            navigator("/checkout");
            toast.error(res.data.message);
          }
        })
        .catch((error) => console.log(error));
    }
  }, [token, vnp_ResponseCode]);

  if (!token || !addresses || !user) {
    return (
      <>
        <LoadingPage />
      </>
    );
  }

  const handleReload = (message) => {
    loadAddresses();
    toast.success(message);
  };

  const handlePaymentVNPayChange = () => {
    setSelectPayment(1);
  };

  const handlePaymentCODChange = () => {
    setSelectPayment(2);
  };

  const handleAddressChange = (event) => {
    setSelectAddress(event.target.value);
  };

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  const formatCurrency = (total) => {
    return total.toLocaleString("vi-VN") + " vnđ";
  };

  const checkDiscount = () => {
    if (coupon.type === 1) {
      return (calculateTotal(cartItems) * coupon.value) / 100;
    }
    if (coupon.type === 2) {
      return coupon.value;
    }

    if (coupon.type === 3) {
      return coupon.value;
    }
  };

  const parseToNumber = (num) => {
    if (typeof num === "number") {
      return num;
    }
    if (typeof num === "string") {
      const numberStr = num.replace(/\./g, "").replace(" vnđ", "");
      const number = parseFloat(numberStr);
      return number;
    }
  };

  const calculateTotal = (cart) => {
    return cart.reduce((total, product) => {
      return total + parseToNumber(product.unit_price) * product.quantity;
    }, 0);
  };

  const handleCheckout = (event) => {
    event.preventDefault();
    if (selectPayment === null) {
      toast.error("Bạn chưa chọn hình thức thanh toán.");
      return;
    }
    const jsonOrders = {
      user_id: user?.id,
      name: user?.full_name,
      phone: user?.phone,
      subtotal: calculateTotal(cartItems),
      discount: coupon ? checkDiscount(coupon.type) : 0,
      total: cartTotal,
      formality: selectPayment,
      note: note,
      product_id: [],
      product_quantity: [],
      product_price: [],
      product_total: [],
    };
    if (selectPayment === 1) {
      VNPPaymentCheckout(jsonOrders);
    }
    if (selectPayment === 2) {
      CODPaymentCheckout(jsonOrders);
    }
  };

  const CODPaymentCheckout = (jsonOrders) => {
    for (let i = 0; i < cartItems.length; i++) {
      jsonOrders.product_id[i] = cartItems[i].id;
      jsonOrders.product_quantity[i] = cartItems[i].quantity;
      jsonOrders.product_price[i] = parseToNumber(cartItems[i].unit_price);
      jsonOrders.product_total[i] =
        parseToNumber(cartItems[i].unit_price) * cartItems[i].quantity;
    }

    api
      .post("/checkout", jsonOrders, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        dispatch(clearCart());
        dispatch(clearCoupon());
        setTimeout(() => {
          toast.success("Cảm ơn bạn đã mua hàng.");
          navigate("/account/orders");
        }, 3000);
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          toast.error(error.response.data.errors);
        } else {
          toast.error(error.response.data.message);
        }
      });
  };

  const VNPPaymentCheckout = (jsonOrders) => {
    for (let i = 0; i < cartItems.length; i++) {
      jsonOrders.product_id[i] = cartItems[i].id;
      jsonOrders.product_quantity[i] = cartItems[i].quantity;
      jsonOrders.product_price[i] = parseToNumber(cartItems[i].unit_price);
      jsonOrders.product_total[i] =
        parseToNumber(cartItems[i].unit_price) * cartItems[i].quantity;
    }

    axios
      .post(`http://127.0.0.1:8000/api/checkout-online`, jsonOrders, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.success) {
          window.location.href = response.data.data;
        }
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          toast.error(error.response.data.errors);
        } else {
          toast.error(error.response.data.message);
        }
      });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {token && (
        <>
          <div className="container">
            <div class="breadcrumb-area">
              <div class="container">
                <div class="breadcrumb-content">
                  <ul>
                    <li>
                      <NavLink to="/">
                        <FontAwesomeIcon icon={faHome} size="sm" /> Trang chủ
                      </NavLink>
                    </li>

                    <li>
                      <NavLink to={`/laptop`}>Thanh toán</NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="css-rf24tk">
            <div
              className="teko-row css-zbluka"
              style={{ marginLeft: "-8px", marginRight: "-8px" }}
            >
              <div
                className="teko-col teko-col-8 css-17ajfcv"
                style={{ paddingLeft: "8px", paddingRight: "8px" }}
              >
                <div className="teko-card css-1eks86m">
                  <div className="teko-card-body css-0">
                    <div className="css-1557c61">
                      <div className="css-1ms22as">
                        <div type="subtitle" className="css-2927is">
                          Thông tin nhận hàng
                        </div>
                        <div
                          className="teko-row teko-row-start css-4sc7mn"
                          style={{
                            marginLeft: "-8px",
                            marginRight: "-8px",
                            rowGap: "16px",
                          }}
                        >
                          <div
                            data-content-region-name="addressShipping"
                            data-track-content="true"
                            data-content-name="addNewAddress"
                            className="teko-col teko-col-6 css-17ajfcv"
                            style={{ paddingLeft: "8px", paddingRight: "8px" }}
                          >
                            <AddAddressModal onAddSuccess={handleReload} />
                          </div>
                        </div>

                        <div
                          class="teko-col teko-col-6 css-17ajfcv"
                          style={{ paddingLeft: "8px", paddingRight: "8px" }}
                        >
                          {addresses &&
                            addresses.map((item) => {
                              return (
                                <AddressRow
                                  id={item.id}
                                  data={item}
                                  reLoad={handleReload}
                                />
                              );
                            })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="css-176y93t">
                  <div className="css-1v4kstc">
                    <Box
                      component="form"
                      noValidate
                      autoComplete="off"
                      sx={{
                        "& .MuiTextField-root": { m: 1, width: "78ch" },
                      }}
                    >
                      <div>
                        <TextField
                          size="small"
                          id="outlined-multiline-flexible"
                          label="  Ghi chú cho đơn hàng"
                          maxRows={12}
                          value={note}
                          onChange={handleNoteChange}
                        />
                      </div>
                    </Box>
                  </div>
                </div>

                <div className="teko-card css-1rtntgf">
                  <div className="teko-card-header-checkout css-0">
                    <div>
                      <div type="title" className="css-2927is">
                        Phương thức thanh toán
                      </div>
                      <div
                        type="body"
                        color="textSecondary"
                        className="css-1npqwgp"
                      >
                        Thông tin thanh toán của bạn sẽ luôn được bảo mật
                      </div>
                    </div>
                  </div>
                  <div className="teko-card-body css-0">
                    <div
                      className="teko-row teko-row-start css-7vjpsl"
                      style={{
                        marginLeft: "-8px",
                        marginRight: "-8px",
                        rowGap: "16px",
                      }}
                    >
                      <div
                        className="teko-col teko-col-6 css-17ajfcv"
                        style={{ paddingLeft: "8px", paddingRight: "8px" }}
                        onClick={handlePaymentVNPayChange}
                      >
                        <div
                          data-content-region-name="paymentMethod"
                          data-track-content="true"
                          data-content-name="VNPAY_GATEWAY"
                          data-content-target="VNPAY_GATEWAY"
                          className={`${
                            selectPayment === 1 ? "css-1014eaz" : "css-64rk53"
                          }`}
                          style={{ height: "100%" }}
                        >
                          <div type="subtitle" className="css-yukwon">
                            Thanh toán VNPAY-PAY
                            <span style={{ paddingLeft: "5px" }}>
                              <span className="css-1q01xub">
                                <div
                                  type="caption"
                                  color="white"
                                  className="css-143zsia"
                                >
                                  Khuyên dùng
                                </div>
                              </span>
                            </span>
                          </div>
                          <div
                            type="body"
                            color="textSecondary"
                            className="css-ah9bk2"
                          >
                            Thanh toán qua Internet Banking, Visa, Master, JCB,
                            VNPAY-PAY
                          </div>
                          <div type="body" className="css-1dqxh16"></div>
                          {/* tạo dấu check */}
                          {selectPayment === 1 ? (
                            <>
                              <div className="css-18wywdr"></div>
                              <span className="css-mpv07g">
                                <FontAwesomeIcon
                                  icon={faCheck}
                                  style={{
                                    color: "#ffffff",
                                    height: "20",
                                    width: "20",
                                    size: "20",
                                  }}
                                />
                              </span>
                            </>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <div
                        className="teko-col teko-col-6 css-17ajfcv"
                        style={{ paddingLeft: "8px", paddingRight: "8px" }}
                        onClick={handlePaymentCODChange}
                      >
                        <div
                          data-content-region-name="paymentMethod"
                          data-track-content="true"
                          data-content-name="COD"
                          data-content-target="COD"
                          className={`${
                            selectPayment === 2 ? "css-1014eaz" : "css-64rk53"
                          }`}
                          style={{ height: "100%" }}
                        >
                          <div type="subtitle" className="css-yukwon">
                            Thanh toán khi nhận hàng
                            <span style={{ paddingLeft: "5px" }}></span>
                          </div>
                          <div
                            type="body"
                            color="textSecondary"
                            className="css-ah9bk2"
                          >
                            Thanh toán bằng tiền mặt
                          </div>
                          <div type="body" className="css-1dqxh16"></div>
                          {selectPayment === 2 ? (
                            <div>
                              <div className="css-18wywdr"></div>
                              <span className="css-mpv07g">
                                <FontAwesomeIcon
                                  icon={faCheck}
                                  style={{
                                    color: "#ffffff",
                                    height: "20",
                                    width: "20",
                                    size: "20",
                                  }}
                                />
                              </span>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="teko-col teko-col-4 css-17ajfcv"
                style={{ paddingLeft: "8px", paddingRight: "8px" }}
              >
                <CheckoutProductInfo products={props?.carts} />
                <div className="css-cssveg">
                  <div className=" css-27abj6">
                    <div className="teko-card css-6j0k0x">
                      <div className="teko-card-body css-0">
                        <div className="css-nouyrl">
                          <table className="css-qc9cbn">
                            <tbody>
                              <tr>
                                <td color="#848788" className="css-8ogxmh">
                                  <div className="css-99sejg">
                                    Tổng tạm tính &nbsp;
                                    <div className="css-1777v"></div>
                                  </div>
                                </td>
                                <td
                                  data-att-label="Tổng tạm tính"
                                  className="css-1xrkmkn"
                                >
                                  {formatCurrency(calculateTotal(cartItems))}
                                </td>
                              </tr>
                              <tr>
                                <td color="#848788" className="css-13izjcd">
                                  <div className="css-99sejg">
                                    Phí vận chuyển &nbsp;
                                    <div className="css-1777v"></div>
                                  </div>
                                </td>
                                <td
                                  data-att-label="Phí vận chuyển"
                                  className="css-fsu5pb"
                                >
                                  Miễn phí
                                </td>
                              </tr>

                              {coupon && (
                                <>
                                  <tr>
                                    <td color="#848788" className="css-13izjcd">
                                      <div className="css-99sejg">
                                        Mã giảm giá &nbsp;
                                        <div className="css-1777v">
                                          <div className="css-uqc57n">
                                            {coupon.code}
                                          </div>
                                        </div>
                                      </div>
                                    </td>
                                    <td
                                      data-att-label="Mã giảm giá"
                                      className="css-fsu5pb"
                                    >
                                      {coupon.type === 1
                                        ? `-${formatCurrency(
                                            (calculateTotal(cartItems) *
                                              coupon.value) /
                                              100
                                          )}`
                                        : coupon.type === 2
                                        ? `-${formatCurrency(coupon.value)}`
                                        : `-${formatCurrency(coupon.value)}`}
                                    </td>
                                  </tr>
                                </>
                              )}
                              <tr>
                                <td color="#848788" className="css-13izjcd">
                                  Thành tiền
                                </td>
                                <td className="att-final-price css-aafp0n">
                                  {formatCurrency(cartTotal)}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="teko-card-footer css-0">
                        <div
                          data-content-region-name="bottomCheckOut"
                          data-track-content="true"
                          data-content-name="checkout"
                          className="css-0"
                        >
                          <button
                            className="att-checkout-button css-v463h2"
                            onClick={handleCheckout}
                          >
                            <div className="css-1lqe6yk">THANH TOÁN</div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="checkoutInlineRight"></div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
