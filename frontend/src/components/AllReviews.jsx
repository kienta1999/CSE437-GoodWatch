import { useState, useEffect, useContext, useRef } from "react";
import { getAllReviews } from "../data/review";
import StarRating from "./StarRating.jsx";
const AllReview = ({ movieid }) => {
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
  return (
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
          <h3>Others' review</h3>
          <h5>
            {fullName}
            <StarRating
              numberOfStars="5"
              currentRating={rating}
              fontSize="1.5rem"
              mutable={false}
            />
          </h5>

          <p>{comment}</p>
        </div>
      );
    })
  );
};
export default AllReview;
