import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const StarRatingProcess = ({ ratings }) => {
  const totalReviews = Object.values(ratings).reduce((sum, count) => sum + count, 0);

  return (
    <div>
      {Object.entries(ratings).map(([star, count]) => {
        const widthPercentage = totalReviews ? (count / totalReviews) * 100 : 0;
        return (
          <div key={star} data-star={star} className="items-process">
            <span className="isNumber">{star}</span>
            <FontAwesomeIcon icon={faStar} size="sm" color="#FDD835" />
            <span className="isProcess">
              <span className="isLoad" style={{ width: `${widthPercentage}%`, backgroundColor: '#4caf50' }}></span>
              <span className="isBG"></span>
            </span>
            <span className="isCount">{count} đánh giá</span>
          </div>
        );
      })}
    </div>
  );
};

export default StarRatingProcess;