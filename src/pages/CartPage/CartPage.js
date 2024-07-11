import React, { useEffect } from "react";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header/Header";
import "../CartPage/CartPage.css";
import { useDispatch, useSelector } from "react-redux";
import CartRow from "../../components/cart/CartRow";
import CartEmpty from "../../components/cart/CartEmpty";
import { clearCart } from "../../redux/slices/CartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink, useNavigate } from "react-router-dom";
import { setTotal } from "../../redux/slices/CartSlice";
import CouponModal from "../../components/coupon/CouponModal";
import useAuthContext from "../../context/AuthContext";
import CartDiscount from "../../components/cart/CartDiscount";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

export default function CartPage() {
  const { token, user } = useAuthContext();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const cartTotal = useSelector((state) => state.cart.total);
  const coupon = useSelector((state) => state.coupon.items);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      setTimeout(() => {
        toast.error("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại");
      }, 1000);
      return;
    }
  }, [token]);

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.success(`Đã xóa giỏ hàng.`);
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
    return NaN;
  };

  const calculateTotal = (cart) => {
    return cart.reduce((total, product) => {
      return total + parseToNumber(product.unit_price) * product.quantity;
    }, 0);
  };

  const getTotal = () => {
    var total = calculateTotal(cartItems);
    if (coupon) {
      switch (coupon.type) {
        case 1: // Giảm giá theo %
          total = total * ((100 - coupon.value) / 100);
          break;
        case 2: //Giảm theo giá tiền
          total -= coupon.value;
          break;
        case 3: // Giảm giá giao hàng
          total -= coupon.value;
          break;
        default:
          break;
      }
    }
    return total;
  };

  const handleSetTotal = () => {
    checkIsLogin();
    var total = calculateTotal(cartItems);
    if (coupon) {
      switch (coupon.type) {
        case 1: // Giảm giá theo %
          total = total * ((100 - coupon.value) / 100);
          break;
        case 2: // Giảm giá theo giá tiền
          total -= coupon.value;
          break;
        case 3: // Giảm giá giao hàng
          total -= coupon.value;
          break;
        default:
          break;
      }
    }
    dispatch(setTotal(total));
  };

  const formatCurrency = (total) => {
    if (total === undefined) {
      return "Dữ liệu không xác định";
    }
    return total.toLocaleString("vi-VN") + " vnđ";
  };

  const checkIsLogin = () => {
    if (!token || !user) {
      toast.error("Bạn cần đăng nhập để thực hiện chức năng này.");
      navigate("/login");
      return;
    }
  };

  if (cartItems.length === 0) {
    return <CartEmpty />;
  }

  return (
    <>
      <ToastContainer />
      <Header />
      <div>
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
                  <NavLink to={`/laptop`}>Giỏ hàng</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="css-cssveg">
          <div className=" css-27abj6">
            <div className="css-163sceo">
              <div className="css-1sqnsff">
                <img
                  src="https://shopfront-cdn.tekoapis.com/static/phongvu/logo.svg"
                  alt="logo"
                />
              </div>

              <div className="teko-row teko-row-no-wrap teko-row-space-between css-15z799l">
                <div
                  className="teko-col css-17ajfcv"
                  style={{ flex: "1 1 auto" }}
                >
                  <div
                    className="teko-row teko-row-no-wrap teko-row-start css-1qrgscw"
                    style={{ marginLeft: "-8px", marginRight: "-8px" }}
                  >
                    <div
                      className="teko-col css-17ajfcv"
                      style={{
                        paddingLeft: "8px",
                        paddingRight: "8px",
                        flex: "0 0 auto",
                      }}
                    >
                      <div width="4.875rem" className="css-olmswc">
                        <img
                          src="https://lh3.googleusercontent.com/Udsu7RCltbZS3OuaXg0fFPvI3oPaAOci7LzXkFcDpHAEtGJq7GewXg5L7JSLKu6MSCnroSMadJfA1-UEPckZ2oMfQYYdIgmK=rw"
                          loading="lazy"
                          decoding="async"
                          alt=""
                          style={{ width: "100%", height: "auto" }}
                        />
                      </div>
                    </div>
                    <div
                      className="teko-col css-17ajfcv"
                      style={{
                        paddingLeft: "8px",
                        paddingRight: "8px",
                        flex: "0 1 35rem",
                      }}
                    >
                      Máy tính xách tay/ Laptop Dell Inspiron 14 5440 - 71034770
                      (Core 7-150U) (Xanh)
                    </div>
                    <div
                      className="teko-col css-17ajfcv"
                      style={{ paddingLeft: "8px", paddingRight: "8px" }}
                    >
                      x 1
                    </div>
                  </div>
                </div>
                <div
                  className="teko-col css-17ajfcv"
                  style={{ flex: "0 0 auto" }}
                >
                  <div className="teko-row teko-row-end css-1qrgscw">
                    <span color="primary500" className="css-1yqf0rb">
                      28.090.000đ
                    </span>
                  </div>
                  <div className="teko-row teko-row-end css-1qrgscw">
                    <span className="css-10zxjrh">29.990.000₫</span>
                  </div>
                </div>
              </div>
              <div
                className="teko-row teko-row-no-wrap teko-row-start css-taqq0j"
                style={{ marginLeft: "-8px", marginRight: "-8px" }}
              >
                <div
                  className="teko-col css-17ajfcv"
                  style={{
                    paddingLeft: "8px",
                    paddingRight: "8px",
                    flex: "0 0 auto",
                  }}
                >
                  <div
                    className="teko-row teko-row-end css-1qrgscw"
                    style={{ width: "4.875rem" }}
                  >
                    <div style={{ width: "1.5rem" }} className="css-1bpl8h5">
                      <img
                        src="https://shopfront-cdn.tekoapis.com/cart/gift-filled.png"
                        loading="lazy"
                        decoding="async"
                        alt=""
                        style={{ width: "100%", height: "auto" }}
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="teko-col css-17ajfcv"
                  style={{
                    paddingLeft: "8px",
                    paddingRight: "8px",
                    flex: "0 1 auto",
                  }}
                >
                  1x Túi đeo lưng/ Balo laptop Targus 15.6 TSB883 Black (Safire)
                  (Quà tặng - logo Phong Vũ)
                </div>
              </div>
              <div className="css-1v1xspx">
                <div className="att-checkout-summary css-l1po7j">
                  <div className="teko-row teko-row-space-between teko-row-top css-33wqqr">
                    <div className="teko-col css-17ajfcv">
                      <div type="subtitle" className="css-1lg3tx0">
                        Tổng tạm tính
                      </div>
                    </div>
                    <div
                      className="teko-col css-17ajfcv"
                      style={{ textAlign: "right" }}
                    >
                      <div type="subtitle" color="" className="css-nbdyuc">
                        0₫
                      </div>
                    </div>
                  </div>
                  <div className="teko-row teko-row-space-between teko-row-top css-33wqqr">
                    <div className="teko-col css-17ajfcv">
                      <div type="subtitle" className="css-1lg3tx0">
                        Thành tiền:
                      </div>
                    </div>
                    <div
                      className="teko-col css-17ajfcv"
                      style={{ textAlign: "right" }}
                    >
                      <div type="subtitle" color="" className="css-nbdyuc">
                        <span
                          color="primary500"
                          className="att-final-price css-1yqf0rb"
                        >
                          0đ
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="css-bvrx60">
            
              <div className="css-117j3zt">
                <div className="css-8x68m">
                  <div className="css-1knbux5">
                    <div type="title" className="att-gio-hang css-1cp1h79">
                      Giỏ hàng
                    </div>
                    <button
                      className="att-delete-all-btn css-tj2ae3"
                      onClick={handleClearCart}
                    >
                      Xóa tất cả
                    </button>
                  </div>
                </div>
              </div>
              <div className="css-4cffwv">
                <div className="css-8x68m">
                  <div className="css-1yvxdyp">
                    <div className="card-body css-0">
                      <div className="teko-row teko-row-space-between teko-row-middle css-8m0ae5">
                        <div
                          className="teko-col css-17ajfcv"
                          style={{ flex: "0 0 4%" }}
                        ></div>
                        <div
                          className="teko-col css-17ajfcv"
                          style={{ flex: "0 0 96%" }}
                        >
                          <div className="teko-row teko-row-space-between teko-row-middle css-1qrgscw">
                            <div className="teko-col teko-col-6 css-17ajfcv">
                              <div className="css-1j4ksfn">
                                <div>
                                  <div type="subtitle" className="css-4eq9p2">
                                    Sản phẩm
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="teko-col teko-col-2 css-14k6732">
                              <div type="body" className="css-1dqxh16">
                                Đơn giá
                              </div>
                            </div>
                            <div className="teko-col teko-col-2 css-12rwhn9">
                              <div type="body" className="css-1dqxh16">
                                Số lượng
                              </div>
                            </div>
                            <div className="teko-col teko-col-2 css-16l9z17">
                              <div type="body" className="css-1dqxh16">
                                Thành tiền
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {cartItems.map((item) => (
                        <CartRow carts={item} />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="css-8xcfft">
                  <div className="css-127zbo8">
                    <div className="card-header-cart css-0">
                      <div className="css-1knbux5">
                        <h6>Khuyến mãi</h6>
                        <CouponModal total={getTotal()} />
                      </div>
                    </div>
                    <div className="card-body css-0">
                      {!coupon ? (
                        <>
                          <div className="css-twos5s">
                            Đơn hàng chưa có khuyến mãi nào, vui lòng chọn nhập
                            hoặc chọn khuyến mãi để nhận thêm nhiều ưu đãi từ
                            chúng tôi.
                          </div>
                        </>
                      ) : (
                        <>
                          <CartDiscount data={coupon} />
                        </>
                      )}
                    </div>
                  </div>

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
                                      <td
                                        color="#848788"
                                        className="css-13izjcd"
                                      >
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
                                    {formatCurrency(getTotal())}
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
                            <NavLink
                              to={token && user ? "/cart/checkout" : "/login"}
                              className="att-checkout-button css-v463h2"
                              onClick={handleSetTotal}
                            >
                              <div className="css-1lqe6yk">TIẾP TỤC</div>
                            </NavLink>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="cartInlineBox"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
