import axios from "axios";
import keys from "../keys.js";
import axiosConfig from "./axiosConfig";

export const submitReview = async (userid, movieid, rating, comment) => {
  console.log(`Submitting review star ${rating} & comment ${comment}`);

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

export const getAllReviews = async (movieid) => {
  try {
    const url = `${keys.apiHost}/movie/${movieid}/reviews`;
    return await axios.get(url, axiosConfig);
  } catch (err) {
    throw err;
  }
};
