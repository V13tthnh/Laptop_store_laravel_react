import React from "react";
import Compare from "../common/Compare";
import StarAndReview from "../common/StarAndReview";
import CardProductName from "../common/CardProductName";
import CardProductPrice from "../common/CardProducPrice";
import CardProductImage from "../common/CardProductImage";
import Technical from "../product/Technical";
import DiscountPercentage from "../product/SingleProduct/DiscountPercentage";
import { Button, Stack } from "@mui/material";

export default function SingleProduct(props) {
  //const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    // dispatch(
    //   addToCart({
    //     id: product.id,
    //     name: product.name,
    //     slug: product.slug,
    //     image: `http://localhost:8000/${product.image}`,
    //     quantity: 1,
    //     unit_price: product.unit_price,
    //     sale_price: product.sale_price,
    //     availableQuantity: product.quantity,
    //   })
    // );
  };
  return (
    <>
      <div className="col-lg-12">
        <div className="single-product-wrap">
          <CardProductImage
            slug={props.data?.slug}
            url={props.data?.images[0]?.url}
          />
          <div className="product_desc">
            <div className="product_desc_info">
              <div className="product-review">
                <DiscountPercentage />
                <StarAndReview overrate={props.data?.overrate} />
              </div>
              <CardProductName
                name={props.data?.name}
                slug={props.data?.slug}
              />
              <Technical
                technical={props.data?.product_specification_details}
              />
              <CardProductPrice
                sale_price={props.data?.sale_price}
                unit_price={props.data?.unit_price}
              />
            </div>
            <Compare />
          </div>
        </div>
      </div>
    </>
  );
}
