import axios from "axios";
const root = "http://www.omdbapi.com/?apikey=27d0bda1";
const getMoviesFromQuery = async (query, page) => {
  const url = `${root}&s=${query}&page=${page}`;
  const res = await axios.get(url);
  if (res.status === 200) {
    return res.data;
  }
  return null;
};

const getMovieData = async (movieid) => {
  const url = `${root}&i=${movieid}`;
  const res = await axios.get(url);
  if (res.status === 200) {
    return res.data;
  }
  return null;
};

export default getMoviesFromQuery;
export { getMovieData };
