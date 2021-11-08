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

const getPopularMovieData = async () => {
  const url = "https://api.themoviedb.org/3/movie/popular?api_key=ba49528b9403e15b24208bdec23df4b8";
  const res = await axios.get(url);
  if (res.status === 200) {
    return res.data.results.slice(3,12);
  }
  return null;
};

const getFanFavMovieData = async () => {
  const url = "https://api.themoviedb.org/3/movie/top_rated?api_key=ba49528b9403e15b24208bdec23df4b8";
  const res = await axios.get(url);
  if (res.status === 200) {
    return res.data.results.slice(0,5);
  }
  return null;
};

const getLatestMovieData = async () => {
  const url = "https://api.themoviedb.org/3/movie/upcoming?api_key=ba49528b9403e15b24208bdec23df4b8";
  const res = await axios.get(url);
  if (res.status === 200) {
    return res.data.results.slice(0,3);
  }
  return null;
};

const getImage = async (id) => {
  const url = `https://api.themoviedb.org/3/movie/${id}/images?api_key=ba49528b9403e15b24208bdec23df4b8`;
  const res = await axios.get(url);
  if (res.status === 200) {
    return res.data.backdrops[0].file_path;
  }
  return null;
};

const getIMDB_ID = async (id) => {
  const url = `https://api.themoviedb.org/3/movie/${id}/external_ids?api_key=ba49528b9403e15b24208bdec23df4b8`;
  const res = await axios.get(url);
  if (res.status === 200) {
    return res.data.imdb_id;
  }
  return null;
};


export default getMoviesFromQuery;
export { getMovieData, getPopularMovieData, getFanFavMovieData, getLatestMovieData, getImage, getIMDB_ID };
