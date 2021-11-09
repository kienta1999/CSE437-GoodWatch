import { useState, useEffect, useContext, useRef } from "react";
import { getAllReviews } from "../../data/review";

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
};
export default AllReview;
