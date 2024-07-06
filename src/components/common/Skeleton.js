import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

export default function Skeleton() {
  return (
    <>
      <div className="col-lg-12">
        <div className="single-product-wrap">
          <div
            className="product-image __img skeleton"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "hsl(200, 20%, 95%)",
              height: "250px",
              borderRadius: "5px",
            }}
          >
            <FontAwesomeIcon icon={faImage} size="lg" />
          </div>
          <div className="product_desc">
            <div className="product_desc_info">
              <div class="skeleton skeleton-text"></div>
              <div class="skeleton skeleton-text"></div>
              <div class="skeleton skeleton-text"></div>
              <div class="skeleton skeleton-text"></div>
              <div className="skeleton skeleton-text skeleton-text__body"></div>
              <div className="skeleton skeleton-text skeleton-text__body"></div>
            </div>
            <div className="product-actions">
              <div className="skeleton skeleton-text skeleton-text__body"></div>
              <div className="skeleton skeleton-text skeleton-text__body"></div>
              <div className="skeleton skeleton-text skeleton-text__body"></div>
              <div className="skeleton skeleton-text skeleton-text__body"></div>
              <div className="skeleton skeleton-text skeleton-text__body"></div>
              <div class="skeleton skeleton-text"></div>
              <div class="skeleton skeleton-text"></div>
              <div className="card__footer" id="card-footer">
                <div className="skeleton skeleton-text skeleton-footer"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
