import React from 'react';

const RatingStar = ({ htmlString }) => {
  return (
    <div className="star-rating-container" dangerouslySetInnerHTML={{ __html: htmlString }} />
  );
};

export default RatingStar;