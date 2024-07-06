import { NavLink } from "react-router-dom";

export default function CardProductImage({slug, url}) {
  return (
    <>
      <div className="product-image">
        <NavLink to={`/laptop/${slug}`}>
          <img
            src={`http://localhost:8000/${url}`}
            alt=""
            style={{ height: "210px", width: "100%" }}
            loading="lazy"
          />
        </NavLink>
        {/* <span className="sticker">Mới</span> */}
      </div>
    </>
  );
}
