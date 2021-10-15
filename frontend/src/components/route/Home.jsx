import NavigationBar from "../NavigationBar.jsx";
import { useRef, useState, useEffect } from "react";
import getMoviesFromQuery from "../../data/movie.js";
import MovieList from "../MovieList.jsx";
import ReactPaginate from "react-paginate";
const Home = () => {
  const query = useRef(null);
  const [queryState, setQueryState] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [movies, setMovies] = useState(null);
  useEffect(async () => {
    if (queryState !== null) {
      let res = await getMoviesFromQuery(queryState, page);
      setMovies(res.Search);
    }
  }, [page]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setQueryState(query.current.value);
    setPage(1);
    let res = await getMoviesFromQuery(query.current.value, page);
    console.log(res);
    setTotalPage(Math.ceil(+res.totalResults / 10.0));
    setMovies(res.Search);
  };

  return (
    <div>
      <NavigationBar handleSubmit={handleSubmit} query={query} />
      {movies && <MovieList movies={movies} row={5} />}
      {movies && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ReactPaginate
            pageCount={totalPage}
            pageRangeDisplayed={1}
            marginPagesDisplayed={5}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            containerClassName={"pagination"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            activeClassName={"active"}
            onPageChange={(page) => {
              setPage(page.selected + 1);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
