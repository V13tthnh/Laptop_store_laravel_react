import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { updateQuantity, removeFromCart } from "../../redux/slices/CartSlice";
import { useState } from "react";

export default function CartRow(props) {
  const [quantity, setQuantity] = useState(props.carts.quantity);
  const dispatch = useDispatch();

  const parseToNumber = (num) => {
    const numberStr = num.replace(/\./g, "").replace(" vnđ", "");
    const number = parseFloat(numberStr);
    return number;
  };
  
  const formatCurrency = (total) => {
    return total.toLocaleString('vi-VN') + ' vnđ';
  };

  const lineItemTotals = parseInt(quantity) * parseToNumber(props.carts.unit_price);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= props.carts.availableQuantity) {
      setQuantity(newQuantity);
      dispatch(
        updateQuantity({
          id: props.carts.id,
          quantity: newQuantity,
          availableQuantity: props.carts.availableQuantity,
        })
      );
    }
  };

  const handleRemoveItem = () => {
    dispatch(removeFromCart({ id: props.carts.id }));
  };

  return (
    <>
      <div className="css-ehdnal">
        <div className="teko-row teko-row-space-between teko-row-middle css-1qrgscw">
          <div
            className="teko-col css-17ajfcv"
            sstyle={{ flex: "0 0 4%" }}
          ></div>
          <div className="teko-col css-17ajfcv" style={{ flex: "0 0 96%" }}>
            <div className="teko-row teko-row-space-between css-1qrgscw">
              <div className="teko-col teko-col-6 css-17ajfcv">
                <div className="css-vhnop0">
                  <a
                    target="_self"
                    className="css-cbrxda"
                    href="/may-tinh-xach-tay-laptop-dell-inspiron-14-5440-71034770-core-7-150u-xanh--s240404263?sku=240404263"
                  >
                    <div
                      style={{ height: "80", width: "80" }}
                      className="css-6zppmi"
                    >
                      <img
                        src={props.carts.image}
                        loading="lazy"
                        decoding="async"
                        alt="product"
                        style={{
                          width: "100%",
                          height: "50px",
                        }}
                      />
                    </div>
                  </a>
                  <div className="css-yp9swi">
                    <NavLink
                      target="_self"
                      className="css-cbrxda"
                      to={`/laptop/${props.carts.slug}`}
                    >
                      <div
                        type="body"
                        color="textPrimary"
                        className="css-1h5tj4c"
                      >
                        {props.carts.name}
                      </div>
                    </NavLink>
                  </div>
                </div>
              </div>
              <div className="teko-col teko-col-2 css-1g0wtwt">
                <div className="teko-col css-17ajfcv">
                  <div className="teko-row teko-row-end teko-row-middle css-1qrgscw">
                    <span
                      className="product-price__price css-rmdhxt"
                      style={{ fontSize: "12px" }}
                    >
                      {props.carts.unit_price}
                    </span>
                  </div>
                  <div className="teko-row teko-row-end teko-row-middle css-1qrgscw">
                    <span className="product-price__listed-price att-strike-through-display-price css-10zxjrh">
                      29.990.000₫
                    </span>
                  </div>
                </div>
              </div>
              <div className="teko-col teko-col-2 css-17ajfcv">
                <div className="css-1oskuwq">
                  <div className="css-1qgaj65">
                    <button
                      disabled=""
                      className="css-1kcvffe"
                      onClick={() => handleQuantityChange(quantity - 1)}
                    >
                      <span className="css-1orfikq">
                        <svg
                          fill="none"
                          viewBox="0 0 24 24"
                          size="16"
                          className="css-cpb1o"
                          color="disable"
                          height="16"
                          width="16"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M3.25 12C3.25 11.5858 3.58579 11.25 4 11.25H20C20.4142 11.25 20.75 11.5858 20.75 12C20.75 12.4142 20.4142 12.75 20 12.75H4C3.58579 12.75 3.25 12.4142 3.25 12Z"
                            fill="#82869E"
                          ></path>
                        </svg>
                      </span>
                    </button>
                    <div className="css-ktgpr2">
                      <div
                        height="40"
                        className="wrap-input-number css-1edkzvw"
                      >
                        <div className="rc-input-number">
                          <div className="rc-input-number-input-wrap">
                            <input
                              autocomplete="off"
                              role="spinbutton"
                              aria-valuemin="1"
                              aria-valuemax="999"
                              aria-valuenow="1"
                              step="1"
                              className="rc-input-number-input"
                              value={props.carts.quantity}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      className="css-1i77det"
                      onClick={() => handleQuantityChange(quantity + 1)}
                    >
                      <span className="css-1orfikq">
                        <svg
                          fill="none"
                          viewBox="0 0 24 24"
                          size="16"
                          className="css-g427p8"
                          color="textPrimary"
                          height="16"
                          width="16"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M12.75 4C12.75 3.58579 12.4142 3.25 12 3.25C11.5858 3.25 11.25 3.58579 11.25 4V11.25H4C3.58579 11.25 3.25 11.5858 3.25 12C3.25 12.4142 3.58579 12.75 4 12.75H11.25V20C11.25 20.4142 11.5858 20.75 12 20.75C12.4142 20.75 12.75 20.4142 12.75 20V12.75H20C20.4142 12.75 20.75 12.4142 20.75 12C20.75 11.5858 20.4142 11.25 20 11.25H12.75V4Z"
                            fill="#82869E"
                          ></path>
                        </svg>
                      </span>
                    </button>
                  </div>
                  <div
                    type="body"
                    className=" css-3c7poi"
                    onClick={handleRemoveItem}
                  >
                    Xóa
                  </div>
                </div>
              </div>
              <div className="teko-col teko-col-2 css-17ajfcv">
                <div className="teko-col css-17ajfcv">
                  <div className="teko-row teko-row-end teko-row-middle css-1qrgscw">
                    <span
                      className="product-price__price css-rmdhxt"
                      style={{ fontSize: "13px", marginLeft: '10px' }}
                    >
                      {formatCurrency(lineItemTotals)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
