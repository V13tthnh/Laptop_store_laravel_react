import React, { useState } from "react";

const QuantitySelector = ({ quantity, onIncrease, onDecrease, onChange }) => {
  return (
    <div className="quantity">
      <label>Số lượng</label>
      <div className="cart-plus-minus">
        <input
          className="cart-plus-minus-box"
          value={quantity}
          onChange={onChange}
          type="number"
          min="1"
          readOnly
        />
        <div  className="dec qtybutton" onClick={onDecrease}>
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
