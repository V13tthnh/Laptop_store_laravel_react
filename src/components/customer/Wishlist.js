import { useEffect, useRef, useState } from "react";
import LeftSidebar from "./LeftSidebar";
import { NavLink, useNavigate } from "react-router-dom";
import useAuthContext from "../../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import Technical from "../product/Technical";
import { Button, Stack } from "@mui/material";
import { addToCart } from "../../redux/slices/CartSlice";
import { removeFromWishList } from "../../redux/slices/WishListSlice";
import { toast, ToastContainer } from "react-toastify";

export default function Wishlist() {
  const dispatch = useDispatch();
  const { token, user } = useAuthContext();
  const navigate = useNavigate();
  const wishlistProducts = useSelector((state) => state.wishlist.items);

  useEffect(() => {
    if (!token && !user) {
      navigate("/login");
      toast.error("Đã hết phiên đăng nhập, vui lòng đăng nhập lại.");
      return;
    }
  }, [token]);

  //Thêm vào giỏ hàng
  const handleAddToCart = (product) => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        slug: product.slug,
        image: `http://localhost:8000/${product.image}`,
        product_specification_detail: product.product_specification_details,
        quantity: 1,
        unit_price: product.unit_price,
        sale_price: product.sale_price,
        availableQuantity: product.quantity,
      })
    );

    successNotify(`Đã thêm sản phẩm vào giỏ hàng.`);
  };

  const handleRemoveFromWishlist = (id) => {
    dispatch(removeFromWishList({ id }));
    successNotify(`Đã xóa khỏi danh sách yêu thích`);
  };

  const successNotify = (message) => {
    toast.success(message);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="page-section mb-60">
        <div className="container">
          <section className="wrapper">
            <LeftSidebar />
            <div className="right">
              <div className="profile">
                <div className="profile-area">
                  <div
                    className="right-main-box tab-content customers-viewed current"
                    id="viewed"
                  >
                    <div className="box-heading">
                      <div className="line-title">
                        <h2>SẢN PHẨM YÊU THÍCH</h2>
                      </div>
                    </div>
                    <div className="viewedlist-account">
                      {wishlistProducts.length > 0 ? (
                        wishlistProducts.map((item) => {
                          return (
                            <>
                              <div className="proloop" id="viewed-loop-1">
                                <div className="proloop-block">
                                  <div className="proloop-img">
                                    <NavLink
                                      className="aspect-ratio fade-box"
                                      to={`/laptop/${item.slug}`}
                                      title="Laptop ASUS Vivobook 16 M1605YA MB303W"
                                      aria-label="Laptop ASUS Vivobook 16 M1605YA MB303W"
                                    >
                                      <picture className="has-hover">
                                        <source
                                          srcset={item.image}
                                          data-srcset={item.image}
                                          media="(max-width: 767px)"
                                        />
                                        <img
                                          className="img-default ls-is-cached lazyloaded"
                                          src={item.image}
                                          data-src={item.image}
                                          alt=" Laptop ASUS Vivobook 16 M1605YA MB303W "
                                        />
                                      </picture>
                                    </NavLink>
                                    <div
                                      className="proloop-button"
                                      data-view=""
                                    >
                                      <button
                                        aria-label="Thêm vào giỏ"
                                        className="proloop-action add-to-cart "
                                        data-id="1050784949"
                                        data-variantid="1114123868"
                                        onClick={() => handleAddToCart(item)}
                                      >
                                        Thêm vào giỏ
                                      </button>
                                    </div>
                                  </div>
                                  <div className="proloop-detail">
                                    <h3 className="proloop-name">
                                      <NavLink
                                        to={`/laptop/${item.slug}`}
                                        title="Laptop ASUS Vivobook 16 M1605YA MB303W"
                                      >
                                        {item.name}
                                      </NavLink>
                                    </h3>
                                    <div className="proloop-price">
                                      {item.sale_price ? (
                                        <>
                                          <div className="proloop-price--compare">
                                            <del>{item.unit_price}</del>
                                          </div>
                                          <div className="proloop-price--default">
                                            <span className="proloop-price--highlight">
                                              {item.sale_price}
                                            </span>
                                            <span className="proloop-label--on-sale">
                                              -24%
                                            </span>
                                          </div>
                                        </>
                                      ) : (
                                        <>
                                          <div className="proloop-price--default">
                                            <span className="proloop-price--highlight">
                                              {item.unit_price}
                                            </span>
                                          </div>
                                        </>
                                      )}
                                    </div>
                                    <Stack spacing={2} direction="row">
                                      <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => handleAddToCart(item)}
                                      >
                                        Thêm vào giỏ
                                      </Button>
                                      <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() =>
                                          handleRemoveFromWishlist(item.id)
                                        }
                                      >
                                        Xóa
                                      </Button>
                                    </Stack>
                                  </div>
                                </div>
                              </div>
                            </>
                          );
                        })
                      ) : (
                        <>
                          <div className="css-1bqbden">
                            <div className="card-body css-0">
                              <div direction="column" className="css-18zym6u">
                                <div
                                  style={{ width: "100%", marginLeft: "100%" }}
                                  className="css-11f6yue"
                                >
                                  <img
                                    src="https://shopfront-cdn.tekoapis.com/static/empty_cart.png"
                                    loading="lazy"
                                    hover=""
                                    decoding="async"
                                    alt=""
                                    fetchpriority="low"
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "inherit",
                                      position: "absolute",
                                      top: "0px",
                                      left: "0px",
                                    }}
                                  />
                                </div>
                                <div
                                  className="css-1qoenic"
                                  style={{ width: "100%", marginLeft: "110%" }}
                                >
                                  Danh sách yêu thích chưa có sản phẩm nào
                                </div>
                                <NavLink
                                  to="/"
                                  height="2.5rem"
                                  color="white"
                                  className="buy-now css-fhio94"
                                  type="button"
                                  style={{ width: "100%", marginLeft: "100%" }}
                                >
                                  <div
                                    type="body"
                                    className="button-text css-2h64mz"
                                    color="white"
                                  >
                                    Mua sắm ngay
                                  </div>
                                  <span style={{ marginLeft: "0px" }}>
                                    <div className="css-157jl91"></div>
                                  </span>
                                </NavLink>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
