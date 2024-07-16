import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { removeProductFromCompare } from "../../redux/slices/ProductCompareSlice";
import AddToCompareModal from "./AddToCompareModal";
export default function ListProductCompare({
  data,
  showDifferencesOnChange,
  showDifferencesCheck,
}) {
  const dispatch = useDispatch();
  const renderAddToCompareModal = data.length;

  const handleRemoveProduct = (id) => {
    dispatch(removeProductFromCompare({ id }));
  };

  return (
    <>
      <ul className="listproduct pro-compare pro-compare_main">
        <li>
          <p className="title-cp">So sánh sản phẩm</p>
          <div className="product-cp">
            {data &&
              data.map((product, index) => {
                return (
                  <React.Fragment key={product.id}>
                    <p className="productname-cp" data-id={product.id}>
                      {product.name}
                    </p>
                  </React.Fragment>
                );
              })}
          </div>

          <div className="box-detailcp checkdiff">
            <div className="stick-df">
              <FormControlLabel
                disabled={data.length <= 1 ? true : false}
                label={
                  <Typography variant="body2" color="textSecondary">
                    Chỉ xem điểm khác biệt
                  </Typography>
                }
                checked={showDifferencesCheck}
                onChange={showDifferencesOnChange}
                value="1.16 inch"
                name="screen"
                control={
                  <Checkbox
                    size="small"
                    disabled={data.length <= 1 ? true : false}
                  />
                }
                sx={{ "& .MuiSvgIcon-root": { fontSize: 21 } }}
                size="small"
              />
            </div>
          </div>
        </li>
        {data &&
          data.map((product, index) => {
            return (
              <>
                <li>
                  <NavLink to={`/laptop/${product.slug}`}>
                    <div className="item-img item-img_44">
                      <img
                        className="thumb ls-is-cached lazyloaded"
                        data-src={
                          product.images
                            ? `http://localhost:8000/${product.images[0]?.url}`
                            : product.first_image
                            ? `http://localhost:8000/${product.first_image?.url}`
                            : product.image
                        }
                        alt="Asus TUF Gaming A15 FA506NF R5 7535HS (HN012W)"
                        src={
                          product.images
                            ? `http://localhost:8000/${product.images[0]?.url}`
                            : product.first_image
                            ? `http://localhost:8000/${product.first_image?.url}`
                            : product.image
                        }
                      />
                    </div>

                    <h3>{product.name}</h3>

                    <strong className="price">{product.unit_price}</strong>
                  </NavLink>
                  <a
                    href="#"
                    className="deleteProduct"
                    onClick={() => handleRemoveProduct(product.id)}
                  >
                    <FontAwesomeIcon icon={faCircleXmark} />
                  </a>
                </li>
              </>
            );
          })}
        {renderAddToCompareModal === 0 ? (
          <>
            <AddToCompareModal />
            <AddToCompareModal />
            <AddToCompareModal />
          </>
        ) : renderAddToCompareModal === 1 ? (
          <>
            <AddToCompareModal />
            <AddToCompareModal />
          </>
        ) : renderAddToCompareModal === 2 ? (
          <AddToCompareModal />
        ) : (
          <></>
        )}
      </ul>
    </>
  );
}
