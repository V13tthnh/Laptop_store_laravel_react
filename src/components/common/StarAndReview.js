import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function StarAndReview(props) {
  return (
    <>
      <div className="rating-box">
        <span style={{ fontWeight: "500", color: "#FDD835"}}>{props.overrate}</span>
        <FontAwesomeIcon icon={faStar} color="#FDD835" />
        <span>
          <small style={{ color: "#6D6E72" }}>(0 đánh giá)</small>
        </span>
      </div>
    </>
  );
}
