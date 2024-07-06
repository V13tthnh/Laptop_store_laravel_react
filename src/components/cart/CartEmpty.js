import { NavLink } from "react-router-dom";
import Header from "../layout/Header/Header";
import Footer from "../layout/Footer";

export default function CartEmpty() {
  return (
    <>
    <Header/>
      <div className="css-1bqbden">
        <div className="card-body css-0">
          <div direction="column" className="css-18zym6u">
            <div style={{ width: "100%", marginLeft:'380%' }} className="css-11f6yue">
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
            <div className="css-1qoenic" style={{ width: "100%", marginLeft:'410%' }}>Giỏ hàng chưa có sản phẩm nào</div>
            <NavLink to="/"
              height="2.5rem"
              color="white"
              className="buy-now css-fhio94"
              type="button"
              style={{ width: "100%", marginLeft:'380%' }}
            >
              <div type="body" className="button-text css-2h64mz" color="white" >
                Mua sắm ngay
              </div>
              <span style={{ marginLeft: "0px" }}>
                <div className="css-157jl91"></div>
              </span>
            </NavLink>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}
