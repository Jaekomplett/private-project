import React from "react";

export const ReviewCard = ({ card }) => {
  return (
    <div className="review-box">
      <h3>{card.title}</h3>
      <p>{card.comment}</p>
      <div className="review-stars">{card.score}</div>
    </div>
  );
};
