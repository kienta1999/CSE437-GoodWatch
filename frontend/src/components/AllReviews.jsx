import { useState, useEffect, useContext, useRef } from "react";
import { getAllReviews } from "../data/review";
import StarRating from "./StarRating.jsx";
const AllReview = ({ movieid, getGoodWatchAverageRating }) => {
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const reviewsData = (await getAllReviews(movieid)).data;
        setReviews(reviewsData);
      } catch (error) {
        // fail silently
      }
    })();
  }, [movieid]);
  const reducer = (previousValue, currentValue) =>
    previousValue + parseInt(currentValue.rating);
  const averageScore = reviews && reviews.reduce(reducer, 0) / reviews.length;
  getGoodWatchAverageRating(averageScore);
  const reviewList =
    reviews &&
    reviews.map((review) => {
      const {
        first_name: firstName,
        last_name: lastName,
        rating,
        comment,
      } = review;
      const fullName = `${firstName} ${lastName}`;
      return (
        <div className="all-reviews">
          <h5>
              <div className="row">
                <div className="col">{fullName}</div>
                <div className="col">
                    <StarRating
                        numberOfStars="5"
                        currentRating={rating}
                        fontSize="1.5rem"
                        mutable={false}
                    />
                </div>
              </div>
          </h5>
          <p>{comment}</p>
          <hr />
        </div>
      );
    });
  return reviewList;
};
export default AllReview;
