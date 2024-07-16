import CouponModal from "../coupon/CouponModal";

export default function CheckoutDiscount() {
  return (
    <>
      <div className="css-1jwz5v4">
        <div className="card-header-checkout css-0">
          <div direction="row" className="css-qonqnt">
            <h6>Khuyến mãi đơn hàng</h6>
            <CouponModal />
          </div>
        </div>
        <div className="card-body css-0">
          <div className="css-56znz1">
            <div className="css-1sg2lsz">
              <div width="100%" className="css-1vzm45g">
                <img
                  src="https://shopfront-cdn.tekoapis.com/cart/discount.png"
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
              <div type="body" className="css-19zgkns">
                Giảm 5% tối đa 270.000₫
              </div>
            </div>
          </div>
          <div className="css-56znz1">
            <div type="body" className="css-jof2mx">
              Đơn tối thiểu 1₫
            </div>
            <div className="css-1sg2lsz">
              <div width="100%" className="css-1vzm45g">
                <img
                  src="https://shopfront-cdn.tekoapis.com/cart/gift-filled.png"
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
              <div type="body" className="css-19zgkns">
                1x Thẻ Giftcode game FC Online 2024 (Quà tặng)
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
