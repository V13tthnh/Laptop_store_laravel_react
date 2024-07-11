import React from "react";
import { NavLink } from "react-router-dom";

const ProductDropdown = ({ products, show }) => {
  if (!show) {
    return null;
  }

  return (
    <ul className="product-dropdown">
      {products.map((product, index) => (
        <li key={index}>
          <NavLink to={`/laptop/${product.slug}`}>
            <img
              src={`http://localhost:8000/${product.first_image?.url}`}
              alt={product.name}
              style={{ width: "50px", height: "50px" }}
            />
            {product.name}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default ProductDropdown;
