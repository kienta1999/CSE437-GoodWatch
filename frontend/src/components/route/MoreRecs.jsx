import { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { Container, Col } from "react-bootstrap";
import ReactPaginate from "react-paginate";

import UserContext from "../../context/UserContext.js";
import NavigationBar from "../NavigationBar.jsx";
import MovieList from "../MovieList.jsx";
import Movie from "../Movie.jsx";

import {
  getListContent,
  removeFromList,
  changeList,
  getLists,
} from "../../data/lists";
import { getAllPopularMovieData, getAllFanFavMovieData, getLatestMovieData, getImage, getIMDB_ID } from "../../data/movie.js";

const MoreRecs = (props) => {
  const { type } = useParams();
  const [listName, setListName] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [movies, setMovies] = useState(null);

  const { currUser, setUser } = useContext(UserContext);

  useEffect(() => {
    (async () => {
        if (type == "popular") {
            setListName("Popular Movies")
            setPage(1);
            let res = await getAllPopularMovieData(page);
            console.log(res);
            if (res.error) {
                
            }
            setTotalPage(5);
            setMovies(res);
        } else {
            setListName("Fan Favorite Movies")
            setPage(1);
            let res = await getAllFanFavMovieData(page);
            console.log(res);
            if (res.error) {
                
            }
            setTotalPage(5);
            setMovies(res);
        }
    })();
  }, [type]);

  useEffect(() => {
    (async () => {
      if (type == "popular") {
        let res = await getAllPopularMovieData(page);
        setMovies(res);
      }
      else {
        let res = await getAllFanFavMovieData(page);
        setMovies(res);
      }  
    })();
    }, [page, type]);

  return (
    <div>
        <NavigationBar history={props.history} />
        <Container>
          <Container className="mb-4">
            {listName && (
                <div>
                  <sub>
                    <a href="/">Back to Home</a><br/>
                  </sub>
                  <h3>{listName}</h3>
                </div>
            )}
          </Container>
          {movies ? (
            <>
            {movies && <MovieList movies={movies} row={5} morePage={true}/>}
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
              <div>No Results Found</div>
          </Container>
        )}
       </Container>
    </div>
  );
};

export default MoreRecs;