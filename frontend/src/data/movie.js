import axios from "axios";
const root = "http://www.omdbapi.com/?apikey=27d0bda1";
const getMoviesFromQuery = async (query, page) => {
  const url = `${root}&s=${query}&type=movie&page=${page}`;
  const res = await axios.get(url);
  if (res.status === 200) {
    return res.data.Search;
  }
  return null;
};

export default getMoviesFromQuery;
