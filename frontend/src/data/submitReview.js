import axios from "axios";
import keys from "../keys.js";

const submitReview = async (userid, movieid, rating, comment) => {
  console.log(`Submitting review star ${rating} & comment ${comment}`);
  
  var authtoken = localStorage.getItem('authtoken')

    let axiosConfig = {
        withCredentials: true,
        headers: {"Content-Type":"application/json", "authtoken":authtoken}
    }

  try {
    const url = `${keys.apiHost}/user/${userid}/movie/${movieid}/review`;
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
