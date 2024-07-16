import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Box, TextField } from "@mui/material";
import CheckoutProductInfo from "./CheckoutProductInfo";
import { useEffect, useState } from "react";
import AddAddressModal from "./AddAddressModal";
import AddressRow from "./AddressRow";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faHome } from "@fortawesome/free-solid-svg-icons";
import {
  getAllAddresses,
  getDefaultAddress,
  getProvinceType,
} from "../../api/address";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../redux/slices/CartSlice";
import useAuthContext from "../../context/AuthContext";
import { clearCoupon } from "../../redux/slices/CouponSlice";
import { Skeleton } from "@mui/material";
import { ColorRing } from "react-loader-spinner";
import { showFailedAlert, showSuccessAlert } from "../../utils/toastify";

export default function Checkout(props) {
  const dispatch = useDispatch();
  const coupon = useSelector((state) => state.coupon.items);
  const [loading, setLoading] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [selectPayment, setSelectPayment] = useState(null);
  const [selectAddress, setSelectAddress] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [provinceType, setProvinceType] = useState([]);
  const { user, token } = useAuthContext();
  const cartItems = useSelector((state) => state.cart.items);
  const cartTotal = useSelector((state) => state.cart.total);
  const [defaultAddress, setDefaultAddress] = useState();
  const [note, setNote] = useState(null);
  const [vndToDollar, setVndToDollar] = useState(null);
  const [shippingFee, setShippingFee] = useState(null);
  const params = useLocation();
  const navigate = useNavigate();

  const search = new URLSearchParams(params.search);
  const vnp_ResponseCode = search.get("vnp_ResponseCode");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      setTimeout(() => {
        showFailedAlert("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại");
      }, 1200);
      return;
    }

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
            setLoading(true);
            dispatch(clearCart());
            dispatch(clearCoupon());
            showSuccessAlert("Thanh toán thành công, cảm ơn bạn đã mua hàng.");
            setTimeout(() => {
              navigate(`/bill/order/${res.data.order_id}`);
            }, 1200);
            setLoading(false);
          } else {
            setLoading(false);
            navigate("/checkout");
            showFailedAlert(res.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  }, [token, vnp_ResponseCode]);

  const loadAddresses = async (id) => {
    try {
      setLoading(true);
      const data = await getAllAddresses(id);
      setAddresses(data.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to load addresses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAddresses(user?.id);
    handleGetDefaultAddress(user?.id);
    handleGetProvinceType(user?.id);
    let addressObj = {
      pick_province: defaultAddress?.provinces,
      pick_district: defaultAddress?.district,
      province: defaultAddress?.provinces,
      district: defaultAddress?.district,
    };
    shippingFeeCalculator(addressObj);
  }, [user?.id, defaultAddress?.provinces, defaultAddress?.district]);

  const handleGetDefaultAddress = async (id) => {
    try {
      const data = await getDefaultAddress(id);
      setDefaultAddress(data.data);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        console.log(error.response.data.errors);
      } else {
        console.log({ submit: "Failed to load default address" });
      }
    }
  };

  const shippingFeeCalculator = async (addressObj) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/calculate-shipping-fee",
        addressObj,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShippingFee(response.data.data.fee.fee);
    } catch (error) {
      console.log("Failed to calculate shipping fee");
      setShippingFee(null);
    }
  };

  const handleGetProvinceType = async (id) => {
    try {
      const data = await getProvinceType(id);
      setProvinceType(data.data);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        console.log(error.response.data.errors);
      } else {
        console.log({ submit: "Failed to load province type address" });
      }
    }
  };

  const handleReload = () => {
    handleGetProvinceType(user?.id);
    loadAddresses(user.id);
    handleGetDefaultAddress(user?.id);
    let addressObj = {
      pick_province: defaultAddress?.provinces,
      pick_district: defaultAddress?.district,
      province: defaultAddress?.provinces,
      district: defaultAddress?.district,
    };
    shippingFeeCalculator(addressObj);
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
    if (total === null || total === undefined) {
      return "0 vnđ";
    }
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

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (selectPayment === null) {
      showFailedAlert("Bạn chưa chọn hình thức thanh toán.");
      return;
    }

    const jsonOrders = {
      user_id: user?.id,
      name: user?.full_name,
      phone: user?.phone,
      subtotal: calculateTotal(cartItems),
      discount: coupon ? checkDiscount(coupon.type) : 0,
      coupon_code: coupon?.code,
      total: cartTotal + shippingFee,
      formality: selectPayment,
      note: note,
      product_id: [],
      product_quantity: [],
      product_price: [],
      product_total: [],
    };

    console.log(jsonOrders);

    for (let i = 0; i < cartItems.length; i++) {
      jsonOrders.product_id[i] = cartItems[i].id;
      jsonOrders.product_quantity[i] = cartItems[i].quantity;
      jsonOrders.product_price[i] = parseToNumber(cartItems[i].unit_price);
      jsonOrders.product_total[i] =
        parseToNumber(cartItems[i].unit_price) * cartItems[i].quantity;
    }
   
    if (selectPayment === 2) {
      setCheckoutLoading(true);
      axios
        .post("http://127.0.0.1:8000/api/checkout", jsonOrders, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setCheckoutLoading(false);
          if (response.data.status) {
            dispatch(clearCart());
            dispatch(clearCoupon());
            showSuccessAlert("Thanh toán thành công, cảm ơn bạn đã mua hàng.");
            setTimeout(() => {
              navigate(`/bill/order/${response.data.order_id}`);
            }, 3000);
          }
        })
        .catch((error) => {
          setCheckoutLoading(false);
          if (
            error.response &&
            error.response.data &&
            error.response.data.errors
          ) {
            showFailedAlert(error.response.data.errors);
          } else {
            showFailedAlert(error.response.data.message);
          }
        });
    } else {
      setCheckoutLoading(true);
      axios
        .post(`http://127.0.0.1:8000/api/checkout-online`, jsonOrders, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.data.success) {
            window.location.href = response.data.data;
            setCheckoutLoading(false);
          }
        })
        .catch((error) => {
          setCheckoutLoading(false);
          if (
            error.response &&
            error.response.data &&
            error.response.data.errors
          ) {
            showFailedAlert(error.response.data.errors);
          } else {
            showFailedAlert(error.response.data.message);
          }
        });
    }
  };

  const CODPaymentCheckout = async (jsonOrders) => {
    for (let i = 0; i < cartItems.length; i++) {
      jsonOrders.product_id[i] = cartItems[i].id;
      jsonOrders.product_quantity[i] = cartItems[i].quantity;
      jsonOrders.product_price[i] = parseToNumber(cartItems[i].unit_price);
      jsonOrders.product_total[i] =
        parseToNumber(cartItems[i].unit_price) * cartItems[i].quantity;
    }

    setCheckoutLoading(true);
    axios
      .post("http://127.0.0.1:8000/api/checkout", jsonOrders, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCheckoutLoading(false);
        if (response.data.status) {
          dispatch(clearCart());
          dispatch(clearCoupon());
          showSuccessAlert("Thanh toán thành công, cảm ơn bạn đã mua hàng.");
          setTimeout(() => {
            navigate("/account/orders");
          }, 1000);
        }
      })
      .catch((error) => {
        setCheckoutLoading(false);
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          showFailedAlert(error.response.data.errors);
        } else {
          showFailedAlert(error.response.data.message);
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
    setCheckoutLoading(true);
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
          setCheckoutLoading(false);
        }
      })
      .catch((error) => {
        setCheckoutLoading(false);
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          showFailedAlert(error.response.data.errors);
        } else {
          showFailedAlert(error.response.data.message);
        }
      });
  };

  const MoMoPaymentCheckout = async (jsonOrders) => {
    // for (let i = 0; i < cartItems.length; i++) {
    //   jsonOrders.product_id[i] = cartItems[i].id;
    //   jsonOrders.product_quantity[i] = cartItems[i].quantity;
    //   jsonOrders.product_price[i] = parseToNumber(cartItems[i].unit_price);
    //   jsonOrders.product_total[i] =
    //     parseToNumber(cartItems[i].unit_price) * cartItems[i].quantity;
    // }
    //setCheckoutLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:8000/momo/checkout");
      const { payUrl } = response.data;
      window.location.href = payUrl;
    } catch (error) {
      console.error("Error during MoMo checkout:", error);
    }
  };

  return (
    <>
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
                      <NavLink to={`/checkout`}>Thanh toán</NavLink>
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
                            className="teko-col teko-col-6 css-17ajfcv"
                            style={{ paddingLeft: "8px", paddingRight: "8px" }}
                          >
                            <AddAddressModal onAddSuccess={handleReload} />
                          </div>
                        </div>

                        {loading ? (
                          <>
                            <Skeleton
                              variant="rectangular"
                              width="100%"
                              style={{
                                borderRadius: "4px",
                                display: "inline-block",
                                padding: "0.5rem 1.25rem",
                                position: "relative",
                                overflow: "hidden",
                                cursor: "pointer",
                                width: "100%",
                              }}
                              height={100}
                            />
                            <Skeleton
                              variant="rectangular"
                              width="100%"
                              style={{
                                borderRadius: "4px",
                                display: "inline-block",
                                padding: "0.5rem 1.25rem",
                                position: "relative",
                                overflow: "hidden",
                                cursor: "pointer",
                                width: "100%",
                              }}
                              height={100}
                            />
                            <Skeleton
                              variant="rectangular"
                              width="100%"
                              style={{
                                borderRadius: "4px",
                                display: "inline-block",
                                padding: "0.5rem 1.25rem",
                                position: "relative",
                                overflow: "hidden",
                                cursor: "pointer",
                                width: "100%",
                              }}
                              height={100}
                            />
                          </>
                        ) : (
                          // Hiển thị danh sách địa chỉ sau khi đã tải thành công
                          addresses.map((item) => (
                            <AddressRow
                              key={item.id}
                              id={item.id}
                              data={item}
                              reLoad={handleReload}
                            />
                          ))
                        )}
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
                      {/* VNPAY */}
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
                      {/* COD */}
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

                      {/* MOMO */}
                      <div id="paypal-button"></div>
                      <input
                        id="vnd_to_dollar"
                        value={parseFloat((cartTotal / 25410).toFixed(2))}
                        hidden
                      />
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
                                    Tạm tính &nbsp;
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
                                  </div>
                                </td>
                                <td
                                  data-att-label="Phí vận chuyển"
                                  className="css-fsu5pb"
                                >
                                  {formatCurrency(shippingFee)}
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
                                  {provinceType[0] === "thanh-pho"
                                    ? formatCurrency(cartTotal)
                                    : formatCurrency(cartTotal + shippingFee)}
                                  {}
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
                            disabled={shippingFee === null || addresses.length === 0}
                          >
                            <div className="css-1lqe6yk">
                              {checkoutLoading ? (
                                <ColorRing
                                  visible={true}
                                  height="25"
                                  width="35"
                                  ariaLabel="color-ring-loading"
                                  wrapperStyle={{}}
                                  wrapperClass="color-ring-wrapper"
                                  colors={[
                                    "#fff",
                                    "#fff",
                                    "#fff",
                                    "#fff",
                                    "#fff",
                                  ]}
                                />
                              ) : (
                                "THANH TOÁN"
                              )}
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
