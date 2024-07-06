import { NavLink } from "react-router-dom";

export default function CheckoutProductInfo(props) {
  return (
    <>
      <div className="css-14xqo9c">
        <div className="card-header-checkout css-0">
          <div className="css-1euuut5">
            <h5>Thông tin đơn hàng</h5>
            <NavLink to="/cart" className="css-kfv2zc">
              Chỉnh sửa
            </NavLink>
          </div>
        </div>
        <div className="card-body css-0">
          <div className="css-9op68y">
            {props.products.map((item) => (
              <div className="css-ov1ktg" style={{ marginTop: "10px" }}>
                <div>
                  <div height="80" width="80" className="css-17nqxzh">
                    <picture>
                      <source srcset={item.image} type="image/webp" />
                      <source srcset={item.image} type="image/png" />
                      <img
                        className="lazyload css-jdz5ak"
                        alt="product"
                        src={item.image}
                        loading="lazy"
                        decoding="async"
                      />
                    </picture>
                  </div>
                </div>
                <div className="css-f0vs3e">
                  <a
                    target="_blank"
                    href="/products/230903490"
                    aria-label="Image"
                    className="css-587jha"
                  >
                    <div
                      type="body"
                      color="textPrimary"
                      className="css-1h5tj4c"
                    >
                      {item.name}
                    </div>
                  </a>
                  <div
                    type="caption"
                    color="textSecondary"
                    className="css-1f5a6jh"
                  >
                    Số lượng {item.quantity}
                  </div>
                  <span className="css-7ofbab">{item.unit_price}</span>
                  {item.sale_price !== 0 ? (
                    <div className="css-1vptl7o">
                      <div className="css-10zxjrh">{item.sale_price}</div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ))}

            {/* <div className="css-ov1ktg">
              <div className="css-1xjc5z">
                <div className="css-1fmlnyw">
                  <div className="css-1axx38a">
                    <div height="16" width="16" className="css-xe0n85">
                      <img
                        className="lazyload css-jdz5ak"
                        alt=""
                        src="https://shopfront-cdn.tekoapis.com/cart/gift-filled.png"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>
                  <div className="css-5j9p1n">
                    1x Miếng lót chuột Phong Vũ Predator (L) 30 x 75
                  </div>
                </div>
                <div className="css-1fmlnyw">
                  <div className="css-1axx38a">
                    <div height="16" width="16" className="css-xe0n85">
                      <img
                        className="lazyload css-jdz5ak"
                        alt=""
                        src="https://shopfront-cdn.tekoapis.com/cart/gift-filled.png"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>
                  <div className="css-5j9p1n">1x Ba lô Predator</div>
                </div>
                <div className="css-1fmlnyw">
                  <div className="css-1axx38a">
                    <div height="16" width="16" className="css-xe0n85">
                      <img
                        className="lazyload css-jdz5ak"
                        alt=""
                        src="https://shopfront-cdn.tekoapis.com/cart/gift-filled.png"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>
                  <div className="css-5j9p1n">
                    Giảm 2.000.000₫ (áp dụng vào giá sản phẩm)
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
