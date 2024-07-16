import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Searchbar from "../SearchBar";
import useAuthContext from "../../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCodeCompare } from "@fortawesome/free-solid-svg-icons";

export default function HeaderMiddle() {
  const { token, user } = useAuthContext();
  const cartItems = useSelector((state) => state.cart.items);
  const CompareItems = useSelector((state) => state.compare.items);

  return (
    <>
      <div className="header-middle pl-sm-0 pr-sm-0 pl-xs-0 pr-xs-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="logo pb-sm-30 pb-xs-30">
                <NavLink to="/" style={{textAlign: 'center'}}>
                  {/* <img src="/assets/images/logo3.png" alt="" style={{height:'100px', width: '100%'}}/> */}
                  <b style={{fontSize: '20px'}}>LAPTOP THÀNH NGHĨA</b>
                </NavLink>
              </div>
            </div>

            <div className="col-lg-9 pl-0 ml-sm-15 ml-xs-15">
              <Searchbar />

              <div className="header-middle-right">
                <ul className="hm-menu">
                  <li className="hm-wishlist">
                    <NavLink
                      to={token && user ? "/laptops/compare" : "/login"}
                    >
                      <span className="cart-item-count wishlist-item-count">
                        {CompareItems.length}
                      </span>
                      <FontAwesomeIcon icon={faCodeCompare} />
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
