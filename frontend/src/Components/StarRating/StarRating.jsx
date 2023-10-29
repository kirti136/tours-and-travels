import React from "react";
import "./startRating.css"

function StarRating({ totalStars, initialRating }) {
  const stars = [];
  for (let i = 1; i <= totalStars; i++) {
    const className = i <= initialRating ? "star filled" : "star";
    stars.push(
      <span key={i} className={className}>
        ★
      </span>
    );
  }

  return <div className="star-rating">{stars}</div>;
}

export default StarRating;
