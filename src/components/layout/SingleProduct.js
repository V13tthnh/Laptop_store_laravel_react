import React from "react";
import Compare from "../common/Compare";
import StarAndReview from "../common/StarAndReview";
import CardProductName from "../common/CardProductName";
import CardProductPrice from "../common/CardProducPrice";
import CardProductImage from "../common/CardProductImage";

import DiscountPercentage from "../product/SingleProduct/DiscountPercentage";

import { useDispatch, useSelector } from "react-redux";

export default function SingleProduct(props) {
  const productCompare = useSelector((state) => state.compare.items);

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
            url={
              props.data?.first_image
                ? props.data?.first_image?.url
                : props.data?.images[0]?.url
            }
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
              <CardProductPrice
                sale_price={props.data?.sale_price}
                unit_price={props.data?.unit_price}
              />
            </div>
            <Compare data={props.data} />
          </div>
        </div>
      </div>
    </>
  );
}
