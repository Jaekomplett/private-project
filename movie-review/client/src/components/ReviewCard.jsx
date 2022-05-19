import React from "react";
export const ReviewCard = ({ title, comment, score }) => {
  // 별점만큼 배열에 숫자를 할당
  const filterdScore = Array.from({ length: score }, (e, i) => i);

  return (
    <div className="review-box">
      <h3>{title}</h3>
      <p>{comment}</p>
      <div className="score-box">
        {filterdScore.map((el, i) => (
          <span key={el} className="review-score"></span>
        ))}
      </div>
    </div>
  );
};
