import { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { Container, Col } from "react-bootstrap";
import ReactPaginate from "react-paginate";

import UserContext from "../../context/UserContext.js";
import NavigationBar from "../NavigationBar.jsx";
import MovieList from "../MovieList.jsx";

import getMoviesFromQuery from "../../data/movie.js";


const SearchResults = (props) => {
    const { query } = useParams();

    const [queryState, setQueryState] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [movies, setMovies] = useState(null);

    useEffect(() => {
        (async () => {
            console.log(query)
            setQueryState(query);
            setPage(1);
            let res = await getMoviesFromQuery(query, page);
            console.log(res);
            if (res.error) {
              
            }
            setTotalPage(Math.ceil(+res.totalResults / 10.0));
            setMovies(res.Search);
        })();
      }, [query]);

    useEffect(() => {
    (async () => {
        if (queryState !== null) {
        let res = await getMoviesFromQuery(queryState, page);
        setMovies(res.Search);
        }
    })();
    }, [page, query]);

  return (
    <div>
      <NavigationBar history={props.history} />
      {movies ? (
          <>
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
          </>
      )
      : (
        <Container>
          <Col>
            <div>No Results Found</div>
          </Col>
        </Container>
      )}
    </div>
  );
};

export default SearchResults;