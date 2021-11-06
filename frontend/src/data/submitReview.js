import axios from "axios";
import keys from "../keys.js";

const submitReview = async (userid, movieid, rating, comment) => {
  console.log(`Submitting review star ${rating} & comment ${comment}`);
  let axiosConfig = {
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  };

  try {
    const url = `${keys.apiHost}/user/${userid}/movie/${movieid}/rating`;
    await axios.post(
      url,
      {
        rating,
        comment,
      },
      axiosConfig
    );
  } catch (err) {
    throw err;
  }
};

export default submitReview;
