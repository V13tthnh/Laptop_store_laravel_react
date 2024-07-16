import { Button, Pagination, Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/CartSlice";
import { addToWishList } from "../../redux/slices/WishListSlice";
import useAuthContext from "../../context/AuthContext";
import { NavLink } from "react-router-dom";
import { showSuccessAlert } from "../../utils/toastify";

const BASE_URL = "http://127.0.0.1:8000/";

const formatCurrency = (value) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
};

export default function FilterItem({ data }) {
  const dispatch = useDispatch();
  const { token } = useAuthContext();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: data.id,
        name: data.name,
        slug: data.slug,
        image: `http://localhost:8000/${data.first_image?.url}`,
        quantity: 1,
        unit_price: data.unit_price,
        sale_price: data.sale_price,
        availableQuantity: data.quantity,
      })
    );
    showSuccessAlert("Đã thêm sản phẩm vào giỏ hàng.");
  };

  const handleAddToWishlist = (data) => {
    dispatch(
      addToWishList({
        id: data.id,
        name: data.name,
        slug: data.slug,
        image: `http://localhost:8000/${data.first_image?.url}`,
        quantity: 1,
        product_specification_detail:
          data.productDetail?.product_specification_details,
        unit_price: data.unit_price,
        sale_price: data.sale_price,
        availableQuantity: data.quantity,
      })
    );
    showSuccessAlert("Đã thêm vào danh sách yêu thích.");
  };

  return (
    <>
      <div className="proloop" id="viewed-loop-1">
        <div className="proloop-block">
          <div className="proloop-img">
            <NavLink
              className="aspect-ratio fade-box"
              to={`/laptop/${data.slug}`}
              title="Laptop ASUS Vivobook 16 M1605YA MB303W"
              aria-label="Laptop ASUS Vivobook 16 M1605YA MB303W"
            >
              <picture className="has-hover">
                <source
                  srcset={`${BASE_URL}${data.first_image?.url}`}
                  data-srcset={`${BASE_URL}${data.first_image?.url}`}
                  media="(max-width: 767px)"
                />
                <img
                  className="img-default ls-is-cached lazyloaded"
                  src={`${BASE_URL}${data.first_image?.url}`}
                  data-src={`${BASE_URL}${data.first_image?.url}`}
                  alt=" Laptop ASUS Vivobook 16 M1605YA MB303W "
                />
              </picture>
            </NavLink>
          </div>
          <div className="proloop-detail">
            <h3 className="proloop-name">
              <NavLink
                to={`/laptop/${data.slug}`}
                title="Laptop ASUS Vivobook 16 M1605YA MB303W"
              >
                {data.name}
              </NavLink>
            </h3>
            <div className="proloop-price">
              {data.sale_price ? (
                <>
                  <div className="proloop-price--compare">
                    <del>{formatCurrency(data.unit_price)}</del>
                  </div>
                  <div className="proloop-price--default">
                    <span className="proloop-price--highlight">
                      {formatCurrency(data.sale_price)}
                    </span>
                    <span className="proloop-label--on-sale">-24%</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="proloop-price--default">
                    <span className="proloop-price--highlight">
                      {data.unit_price}
                    </span>
                  </div>
                </>
              )}
            </div>
            <Stack direction="row">
              <Button
                variant="contained"
                color="error"
                onClick={handleAddToCart}
              >
                Thêm vào giỏ
              </Button>
              <li className="hm-wishlist">
                <a onClick={() => handleAddToWishlist(data)}>
                  <span className="cart-item-count wishlist-item-count"></span>
                  <i className="fa fa-heart-o"></i>
                </a>
              </li>
            </Stack>
          </div>
        </div>
      </div>
    </>
  );
}
