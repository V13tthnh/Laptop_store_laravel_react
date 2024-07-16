import React, { useState } from "react";

const QuantitySelector = ({
  quantity,
  onIncrease,
  onDecrease,
  onChange,
  validQuantity,
}) => {
  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value <= validQuantity && value >= 1) {
      onChange(e);
    } else if (value > validQuantity) {
      onChange({ target: { value: validQuantity } });
    } else if (value < 1) {
      onChange({ target: { value: 1 } });
    }
  };

  const handleIncrease = () => {
    if (quantity < validQuantity) {
      onIncrease();
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      onDecrease();
    }
  };

  return (
    <div className="quantity">
      <label>Số lượng</label>
      <div className="cart-plus-minus">
        <input
          className="cart-plus-minus-box"
          value={quantity}
          onChange={handleInputChange}
          type="number"
          min="1"
          max={validQuantity}
          style={{
            WebkitAppearance: "none", 
            MozAppearance: "textfield", 
          }}
        />
        <div className="dec qtybutton" onClick={onDecrease}>
          <i className="fa fa-angle-down"></i>
        </div>
        <div className="inc qtybutton" onClick={onIncrease}>
          <i className="fa fa-angle-up"></i>
        </div>
      </div>
    </div>
  );
};

export default QuantitySelector;
