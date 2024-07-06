import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { clearCoupon } from "../../redux/slices/CouponSlice";

export default function CartDiscount() {
  const dispatch = useDispatch();
  const coupon = useSelector((state) => state.coupon.items);

  const handleRemoveClick = () => {
    dispatch(clearCoupon(coupon.code));
  };
  console.log(coupon);
  return (
    <>
      {coupon && (
        <>
          <div className="teko-row teko-row-start css-1k740n1">
            <div type="subtitle" color="textSecondary" className="css-1y5a3it">
              KHUYẾN MÃI ĐÃ ÁP DỤNG
            </div>
            <div style={{ width: "100%" }} className="css-1p7ma5o">
              <div className="teko-row teko-row-no-wrap teko-row-space-between css-1qrgscw">
                <div className="teko-col css-1kuu3ui">
                  <div className="css-1ca50y">
                    <div width="100%" className="css-1ddnbai">
                      <img
                        src="https://shopfront-cdn.tekoapis.com/cart/discount.png"
                        loading="lazy"
                        decoding="async"
                        style={{ width: "100%", height: "auto" }}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div
                  width="100%"
                  className="teko-col css-oi0lj1"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <div
                      type="body"
                      className="css-i5q8p4"
                      style={{ whiteSpace: "pre-line" }}
                    >
                      <span className="css-ammihu">
                        <div
                          type="caption"
                          color="primary600"
                          className="css-1fktfn4"
                        >
                          {coupon.code}
                        </div>
                      </span>
                      {coupon.description}
                    </div>
                    <div
                      type="caption"
                      color="textSecondary"
                      className="css-q3pfns"
                    ></div>
                  </div>
                  <div className="teko-row teko-row-space-between teko-row-bottom css-1cxmf7d">
                    <div className="teko-col css-17ajfcv">
                      <div
                        type="caption"
                        color="textSecondary"
                        className="css-1f5a6jh"
                      >
                        HSD: {coupon.end_date}
                      </div>
                    </div>
                    <div
                      type="body"
                      className="button-text css-1c7714w"
                      color="link500"
                      style={{ marginLeft: "170px" }}
                    >
                      <Button variant="outlined" onClick={handleRemoveClick}>
                        Bỏ chọn
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="teko-row css-14tmlxd">
              <div
                className="teko-col css-17ajfcv"
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  flex: "0 0 8%",
                }}
              >
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  size="13"
                  className="css-10cdkss"
                  color="warning"
                  height="13"
                  width="13"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <mask id="icon-99gp0dcgq" fill="white">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12.25 3.75C7.55558 3.75 3.75 7.55558 3.75 12.25C3.75 16.9444 7.55558 20.75 12.25 20.75C16.9444 20.75 20.75 16.9444 20.75 12.25C20.75 7.55558 16.9444 3.75 12.25 3.75ZM2.25 12.25C2.25 6.72715 6.72715 2.25 12.25 2.25C17.7728 2.25 22.25 6.72715 22.25 12.25C22.25 17.7728 17.7728 22.25 12.25 22.25C6.72715 22.25 2.25 17.7728 2.25 12.25ZM12.25 6.95459C12.6642 6.95459 13 7.29038 13 7.70459V13.1591C13 13.5733 12.6642 13.9091 12.25 13.9091C11.8358 13.9091 11.5 13.5733 11.5 13.1591V7.70459C11.5 7.29038 11.8358 6.95459 12.25 6.95459ZM13.25 16.7954C13.25 17.3477 12.8023 17.7954 12.25 17.7954C11.6977 17.7954 11.25 17.3477 11.25 16.7954C11.25 16.2431 11.6977 15.7954 12.25 15.7954C12.8023 15.7954 13.25 16.2431 13.25 16.7954Z"
                    ></path>
                  </mask>
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12.25 3.75C7.55558 3.75 3.75 7.55558 3.75 12.25C3.75 16.9444 7.55558 20.75 12.25 20.75C16.9444 20.75 20.75 16.9444 20.75 12.25C20.75 7.55558 16.9444 3.75 12.25 3.75ZM2.25 12.25C2.25 6.72715 6.72715 2.25 12.25 2.25C17.7728 2.25 22.25 6.72715 22.25 12.25C22.25 17.7728 17.7728 22.25 12.25 22.25C6.72715 22.25 2.25 17.7728 2.25 12.25ZM12.25 6.95459C12.6642 6.95459 13 7.29038 13 7.70459V13.1591C13 13.5733 12.6642 13.9091 12.25 13.9091C11.8358 13.9091 11.5 13.5733 11.5 13.1591V7.70459C11.5 7.29038 11.8358 6.95459 12.25 6.95459ZM13.25 16.7954C13.25 17.3477 12.8023 17.7954 12.25 17.7954C11.6977 17.7954 11.25 17.3477 11.25 16.7954C11.25 16.2431 11.6977 15.7954 12.25 15.7954C12.8023 15.7954 13.25 16.2431 13.25 16.7954Z"
                    fill="#82869E"
                  ></path>
                  <path
                    d="M4.75 12.25C4.75 8.10786 8.10786 4.75 12.25 4.75V2.75C7.00329 2.75 2.75 7.00329 2.75 12.25H4.75ZM12.25 19.75C8.10786 19.75 4.75 16.3921 4.75 12.25H2.75C2.75 17.4967 7.00329 21.75 12.25 21.75V19.75ZM19.75 12.25C19.75 16.3921 16.3921 19.75 12.25 19.75V21.75C17.4967 21.75 21.75 17.4967 21.75 12.25H19.75ZM12.25 4.75C16.3921 4.75 19.75 8.10786 19.75 12.25H21.75C21.75 7.00329 17.4967 2.75 12.25 2.75V4.75ZM12.25 1.25C6.17487 1.25 1.25 6.17487 1.25 12.25H3.25C3.25 7.27944 7.27944 3.25 12.25 3.25V1.25ZM23.25 12.25C23.25 6.17487 18.3251 1.25 12.25 1.25V3.25C17.2206 3.25 21.25 7.27944 21.25 12.25H23.25ZM12.25 23.25C18.3251 23.25 23.25 18.3251 23.25 12.25H21.25C21.25 17.2206 17.2206 21.25 12.25 21.25V23.25ZM1.25 12.25C1.25 18.3251 6.17487 23.25 12.25 23.25V21.25C7.27944 21.25 3.25 17.2206 3.25 12.25H1.25ZM14 7.70459C14 6.73809 13.2165 5.95459 12.25 5.95459V7.95459C12.1119 7.95459 12 7.84266 12 7.70459H14ZM14 13.1591V7.70459H12V13.1591H14ZM12.25 14.9091C13.2165 14.9091 14 14.1256 14 13.1591H12C12 13.0211 12.1119 12.9091 12.25 12.9091V14.9091ZM10.5 13.1591C10.5 14.1256 11.2835 14.9091 12.25 14.9091V12.9091C12.3881 12.9091 12.5 13.0211 12.5 13.1591H10.5ZM10.5 7.70459V13.1591H12.5V7.70459H10.5ZM12.25 5.95459C11.2835 5.95459 10.5 6.73809 10.5 7.70459H12.5C12.5 7.84266 12.3881 7.95459 12.25 7.95459V5.95459ZM12.25 18.7954C13.3546 18.7954 14.25 17.9 14.25 16.7954H12.25V18.7954ZM10.25 16.7954C10.25 17.9 11.1454 18.7954 12.25 18.7954V16.7954H10.25ZM12.25 14.7954C11.1454 14.7954 10.25 15.6908 10.25 16.7954H12.25V14.7954ZM14.25 16.7954C14.25 15.6908 13.3546 14.7954 12.25 14.7954V16.7954H14.25Z"
                    fill="#82869E"
                    mask="url(#icon-99gp0dcgq)"
                  ></path>
                </svg>
              </div>
              <div className="teko-col css-17ajfcv" style={{ flex: "0 0 92%" }}>
                <div type="caption" color="warning" className="css-1ly96sc">
                  Mã giảm giá/Phiếu mua hàng sẽ không thể khôi phục sau khi đặt
                  hàng
                </div>
              </div>
            </div>
            <div className="css-apomyl"></div>
          </div>
        </>
      )}
    </>
  );
}