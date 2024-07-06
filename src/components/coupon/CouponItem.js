import { useDispatch, useSelector } from "react-redux";
import { applyCoupon, clearCoupon } from "../../redux/slices/CouponSlice";
import { toast, ToastContainer } from "react-toastify";
import { Button } from "@mui/material";

export default function CouponItem({ data }) {
  const dispatch = useDispatch();
  const coupon = useSelector((state) => state.coupon.items);

  const handleApplyClick = () => {
    dispatch(
      applyCoupon({
        code: data.code,
        value: data.value,
        description: data.description,
        minimum_spend: data.minimum_spend,
        end_date: data.end_date,
        type: data.type,
      })
    );
  };

  const clearCouponClick = () => {
    dispatch(clearCoupon());
  };

  return (
    <>
      <ToastContainer />
      <div width="100%" className="css-aw1phq" d>
        <div className="teko-row teko-row-no-wrap teko-row-space-between css-1qrgscw">
          <div className="teko-col css-1kuu3ui">
            <div className="css-1vwnyiz">
              <div width="100%" className="css-1ddnbai">
                <img
                  src="/assets/images/discount/discount.png"
                  loading="lazy"
                  alt=""
                  decoding="async"
                  style={{ width: "100%", height: "auto" }}
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
                    {data.code}
                  </div>
                </span>
                {data.description}
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
                  HSD: {data.end_date}
                </div>
              </div>

              <div
                type="body"
                className="button-text css-1c7714w"
                color="link500"
                style={{ marginLeft: "270px" }}
              >
                <Button variant="outlined" onClick={handleApplyClick}>
                  Áp dụng
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
