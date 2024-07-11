import { NavLink } from "react-router-dom";
import Compare from "../common/Compare";

export default function SearchProductList({ products, show }) {
  if (!show) {
    return null;
  }
  return (
    <>
      <ul
        className="pro-compare pro-compare_search"
        style={show ? { display: "block" }: { display: "hidden" }}
      >
        {products &&
          products.map((product) => {
            return (
              <>
                <li className="productitem-cp productid-282827 cate-44">
                  <NavLink to={`/laptop/${product.slug}`}>
                    <div className="item-img">
                      <img
                        src={`http://localhost:8000/${product.first_image?.url}`}
                        alt={product.name}
                      />
                    </div>
                    <div className="item-info">
                      <h3>{product.name}</h3>

                      <strong className="price">{product.unit_price}</strong>
                    </div>
                  </NavLink>

                  <Compare data={product} />
                </li>
              </>
            );
          })}
      </ul>
    </>
  );
}
