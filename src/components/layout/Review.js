import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import AddReviewModal from "../review/AddReviewModal";
import {
  getTotalReviewOfProduct,
  fetchReviewOfProduct,
} from "../../api/review";
import AVGStarRating from "../review/AVGStarRating";
import StarRatingProcess from "../review/StarRatingProcess";

export default function Review({ data }) {
  const [totalReview, setTotalReview] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [ratingCount, setRatingCount] = useState([]);

  useEffect(() => {
    getTotalReview();
    fetchReview();
  }, []);

  // console.log(reviews);

  const getTotalReview = async () => {
    try {
      const response = await getTotalReviewOfProduct({ product_id: data.id });
      setTotalReview(response.data);
    } catch (e) {
      console.log("Có lỗi xảy ra: ", e);
    }
  };

  const fetchReview = async () => {
    try {
      const response = await fetchReviewOfProduct({ product_id: data.id });
      setReviews(response.data);
      setRatingCount(response.rating_counter);
    } catch (e) {
      console.log("Có lỗi xảy ra: ", e);
    }
  };

  const renderStars = (value) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          style={{
            color: i <= value ? "gold" : "grey",
            cursor: "pointer",
            height: "30px",
          }}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <>
      <div className="container mt-40 mb-40">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="product-inner" id="customers-rating">
            <div className="product-block product-ratings">
              <div className="product-heading">
                <h2>Đánh giá &amp; Nhận xét {data.name}</h2>
              </div>
              <div className="product-wrap">
                <div className="product-rating--wrapper">
                  <div className="product-reviews--header">
                    <div className="product-reviews--left">
                      <div className="product-reviews--number">
                        <span>{data.overrate}/5</span>
                      </div>
                      <div className="product-reviews--star">
                        <div className="star-rate">
                         <AVGStarRating rating={data.overrate} />
                        </div>
                        <div
                          className="star-rate star-fill"
                          data-rate=""
                          style={{ width: "0%" }}
                        >
                          <span className="ic-star-fill">
                            <FontAwesomeIcon
                              icon={faStar}
                              size="lg"
                              color="#FDD835"
                            />
                          </span>
                          <span className="ic-star-fill">
                            <FontAwesomeIcon
                              icon={faStar}
                              size="lg"
                              color="#FDD835"
                            />
                          </span>
                          <span className="ic-star-fill">
                            <FontAwesomeIcon
                              icon={faStar}
                              size="lg"
                              color="#FDD835"
                            />
                          </span>
                          <span className="ic-star-fill">
                            <FontAwesomeIcon
                              icon={faStar}
                              size="lg"
                              color="#FDD835"
                            />
                          </span>
                          <span className="ic-star-fill">
                            <FontAwesomeIcon
                              icon={faStar}
                              size="lg"
                              color="#FDD835"
                            />
                          </span>
                        </div>
                      </div>
                      <div className="product-reviews--total">
                        <span>
                          <strong>{totalReview}</strong> đánh giá &amp; nhận xét
                        </span>
                      </div>
                    </div>
                    <div className="product-reviews--right">
                      <div className="product-reviews--process">
                       <StarRatingProcess ratings={ratingCount}/>
                      </div>
                    </div>
                  </div>
                  <div className="product-reviews--body">
                    <div className="product-reviews--status d-none"></div>
                    <div className="product-reviews--render">
                      {reviews &&
                        reviews.map((item) => {
                          return (
                            <>
                              <div className="items-comment">
                                <div className="items-comment-top">
                                  <div className="items-comment-name">
                                    {item.user?.full_name}
                                  </div>
                                  <div className="items-comment-date">
                                    {item.created_at}
                                  </div>
                                </div>
                                <div className="items-comment-bottom">
                                  <div className="items-comment-left">
                                    <div className="items-comment-star">
                                      {renderStars(item.rating)}
                                    </div>
                                  </div>
                                  <div className="items-comment-right">
                                    <div className="items-comment-content">
                                      {item.comment}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          );
                        })}
                    </div>
                    <div className="product-reviews--pagi"></div>
                  </div>
                  <div className="product-reviews--footer">
                    <AddReviewModal url={data?.images[0]?.url} id={data.id} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
