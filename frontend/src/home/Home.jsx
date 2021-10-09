import NavigationBar from "./NavigationBar.jsx";
import { useRef, useState } from "react";
import getMoviesFromQuery from "../data/movie.js";
import MovieList from "../components/MovieList.jsx";
const Home = () => {
  const query = useRef(null);
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState({});
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(query.current.value);
    let res = await getMoviesFromQuery(query.current.value, page);
    setMovies(res);
  };

  return (
    <div>
      <NavigationBar handleSubmit={handleSubmit} query={query} />
      <MovieList movies={movies} row={5} />
    </div>
  );
};

export default Home;
