import { NavLink } from "react-router-dom";

export default function CardProductName({ name, slug }) {
  return (
    <>
      <NavLink className="product_name" to={`/laptop/${slug}`}>
        {name}
      </NavLink>
    </>
  );
}
