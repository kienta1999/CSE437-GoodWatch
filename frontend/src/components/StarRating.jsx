import React from "react";
import { useState, useRef } from "react";
import "./StarRating.css";

// The idea for star component comes from
// https://scotch.io/tutorials/build-a-star-rating-component-for-react

const StarRating = ({
  numberOfStars,
  onClick,
  currentRating,
  mutable,
  fontSize,
}) => {
  const [ratingState, setRatingState] = useState(+currentRating || 0);
  const ratingRef = useRef(null);

  const hoverHandler = (event) => {
    const stars = event.target.parentElement.getElementsByClassName("star");
    const hoverValue = event.target.dataset.value;
    [...stars].forEach((star) => {
      star.style.color = hoverValue >= star.dataset.value ? "yellow" : "gray";
    });
  };

  const mouseOutRating = (event) => {
    const stars = ratingRef.current.getElementsByClassName("star");
    [...stars].forEach((star) => {
      star.style.color = ratingState >= star.dataset.value ? "yellow" : "gray";
    });
  };

  const starClickHandler = (event) => {
    let rating = event.target.dataset.value;
    setRatingState(rating); // set state so the rating stays highlighted
    if (onClick) {
      onClick(rating); // emit the event up to the parent
    }
  };
  const doNothing = () => {};
  const getStyle = (n) => {
    const color = n < ratingState ? "yellow" : "gray";
    return { color, fontSize };
  };

  return (
    <div
      className="rating"
      ref={ratingRef}
      data-rating={ratingState}
      onMouseOut={mutable ? mouseOutRating : doNothing}
    >
      {Array(+numberOfStars)
        .fill(0)
        .map((_, n) => {
          return (
            <span
              className="star"
              key={n + 1}
              data-value={n + 1}
              onMouseOver={mutable ? hoverHandler : doNothing}
              onClick={mutable ? starClickHandler : doNothing}
              style={getStyle(n)}
            >
              &#9733;
            </span>
          );
        })}
    </div>
  );
};

export default StarRating;
