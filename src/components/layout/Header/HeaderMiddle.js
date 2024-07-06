import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Searchbar from "../SearchBar";

export default function HeaderMiddle() {
  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  return (
    <>
      <div className="header-middle pl-sm-0 pr-sm-0 pl-xs-0 pr-xs-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="logo pb-sm-30 pb-xs-30">
                <NavLink to="/">
                  <img src="../../assets/images/menu/logo/1.jpg" alt="" />
                </NavLink>
              </div>
            </div>

            <div className="col-lg-9 pl-0 ml-sm-15 ml-xs-15">
              <Searchbar />

              <div className="header-middle-right">
                <ul className="hm-menu">
                  <li className="hm-wishlist">
                    <NavLink to="/account/wishlist">
                      <span className="cart-item-count wishlist-item-count">
                        {wishlistItems.length}
                      </span>
                      <i className="fa fa-heart-o"></i>
                    </NavLink>
                  </li>
                  <li className="hm-minicart">
                    <NavLink to="/cart">
                      <div className="hm-minicart-trigger">
                        <span className="item-icon"></span>
                        <span className="item-text">
                          Giỏ hàng
                          <span className="cart-item-count">
                            {cartItems.length}
                          </span>
                        </span>
                      </div>
                    </NavLink>
                    <span></span>
                    <div className="minicart">
                      <ul className="minicart-product-list">
                        <li>
                          <NavLink
                            to="/cart"
                            className="minicart-product-image"
                          >
                            <img
                              src="../../assets/images/product/small-size/5.jpg"
                              alt="cart products"
                            />
                          </NavLink>
                          <div className="minicart-product-details" active>
                            <h6>
                              <a href="single-product.html">
                                Aenean eu tristique
                              </a>
                            </h6>
                            <span>£40 x 1</span>
                          </div>
                          <button className="close" title="Remove">
                            <i className="fa fa-close"></i>
                          </button>
                        </li>
                        <li>
                          <a
                            href="single-product.html"
                            className="minicart-product-image"
                          >
                            <img
                              src="../../assets/images/product/small-size/6.jpg"
                              alt="cart products"
                            />
                          </a>
                          <div className="minicart-product-details">
                            <h6>
                              <a href="single-product.html">
                                Aenean eu tristique
                              </a>
                            </h6>
                            <span>£40 x 1</span>
                          </div>
                          <button className="close" title="Remove">
                            <i className="fa fa-close"></i>
                          </button>
                        </li>
                      </ul>
                      <p className="minicart-total">
                        SUBTOTAL: <span>£80.00</span>
                      </p>
                      <div className="minicart-button">
                        <a
                          href="shopping-cart.html"
                          className="li-button li-button-fullwidth li-button-dark"
                        >
                          <span>Xem giỏ hàng</span>
                        </a>
                        <a
                          href="checkout.html"
                          className="li-button li-button-fullwidth"
                        >
                          <span>Thanh toán</span>
                        </a>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
