import axios from "axios";
import keys from "../keys.js";
const getMoviesFromQuery = async (query, page) => {
  const url = `${keys.omdbHost}&s=${query}&page=${page}`;
  const res = await axios.get(url);
  if (res.status === 200) {
    return res.data;
  }
  return null;
};

const getMovieData = async (movieid) => {
  const url = `${keys.omdbHost}&i=${movieid}`;
  const res = await axios.get(url);
  if (res.status === 200) {
    return res.data;
  }
  return null;
};

export default getMoviesFromQuery;
export { getMovieData };
