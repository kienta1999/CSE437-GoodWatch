import NavigationBar from "../NavigationBar.jsx";
import { useRef, useState, useEffect } from "react";
import getMoviesFromQuery from "../../data/movie.js";
import getMoviePoster from "../../data/image.js";
import MovieList from "../MovieList.jsx";
import ReactPaginate from "react-paginate";
import MyList from "../MyList.jsx";
import keys from "../../keys.js";
import jwtDecode from "jwt-decode";

import { Container, Col, Row, Carousel } from "react-bootstrap";
import { getPopularMovieData, getFanFavMovieData, getLatestMovieData, getImage, getIMDB_ID } from "../../data/movie.js";

const Home = (props) => {
  const query = useRef(null);
  const [queryState, setQueryState] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [movies, setMovies] = useState(null);

  const [popularImage, setPopularImage] = useState([]);
  const [popularID, setPopularID] = useState([]);

  const [favoriteImage, setFavoriteImage] = useState([]);
  const [favoriteID, setFavoriteID] = useState([]);

  const [latestImage, setLatestImage] = useState([]);
  const [latestTitle, setLatestTitle] = useState([]);
  const [latestPlot, setLatestPlot] = useState([]);
  const [latestID, setLatestID] = useState([]);


  // IMPORTANT: user info is passed down from App.js in props.userInfo

  useEffect(() => {
  var token = localStorage.getItem('token')
  var user = {}
  if (token) {
    user = jwtDecode(token)
  }
  console.log("Home getting user", user)
  }, []);

  useEffect(() => {
    (async () => {
      if (queryState !== null) {
        let res = await getMoviesFromQuery(queryState, page);
        setMovies(res.Search);
      }
    })();
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

  
  useEffect(() => {
    (async () => {
      const res = await getPopularMovieData();
      if (res) {
        let popi = res.map((pop) => (`https://image.tmdb.org/t/p/w500${pop.poster_path}`));
        setPopularImage(popi);
        var popd = []
        for (const pop of res) {
            let id = await getIMDB_ID(pop.id);
            if (id) {
              popd.push(id);
            }
        }
        setPopularID(popd);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const res = await getFanFavMovieData();
      if (res) {
        let favi = res.map((fav) => (`https://image.tmdb.org/t/p/w500${fav.poster_path}`));
        setFavoriteImage(favi);
        var favd = []
        for (const fav of res) {
            let id = await getIMDB_ID(fav.id);
            if (id) {
              favd.push(id);
            }
        }
        setFavoriteID(favd);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const res = await getLatestMovieData();
      if (res) {
        let latt = res.map((lat) => lat.title);
        setLatestTitle(latt);
        let latp = res.map((lat) => lat.overview);
        setLatestPlot(latp);

        var lati = []
        var latd = []
        for (const lat of res) {
          let image = await getImage(lat.id);
          if (image) {
            lati.push(`https://image.tmdb.org/t/p/w500${image}`)
          }
          let id = await getIMDB_ID(lat.id);
          if (id) {
            latd.push(id);
          }
        }
        setLatestImage(lati);
        setLatestID(latd);
      }
    })();
  }, []);


  return (
    <div>
      <NavigationBar
        history={props.history}
        handleSubmit={handleSubmit}
        query={query}
      />
      <br />
      {!movies && (
        <Container>
          <Row>
            <strong>Welcome to GoodWatch!</strong>
            <p>
              Search for your favorite and soon-to-be favorite movies and TV
              shows and add them to custom lists. Browse new shows and add them
              to your "Want to Watch" list or updated your "Watched" list by
              adding a movie you recently saw! Never forget the movies and shows
              you've watched ever again--if a friend asks for movie
              recommendations, you'll know where to go!
            </p>
          </Row>
          <Row>
            <Col xs={8}>
              <Carousel>
                <Carousel.Item>
                  <a href={`/movie/${latestID[0]}`}>
                    <img
                      src={latestImage[0]}
                      alt="lat0"
                      width="720"
                      height="480"
                    />
                  </a>
                  <Carousel.Caption>
                    <h3>{latestTitle[0]}</h3>
                    <p>{latestPlot[0]}</p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <a href={`/movie/${latestID[1]}`}>
                    <img
                      src={latestImage[1]}
                      alt="lat1"
                      width="720"
                      height="480"
                    />
                  </a>
                  <Carousel.Caption>
                    <h3>{latestTitle[1]}</h3>
                    <p>{latestPlot[1]}</p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <a href={`/movie/${latestID[2]}`}>
                    <img
                      src={latestImage[2]}
                      alt="lat2"
                      width="720"
                      height="480"
                    />
                  </a>
                  <Carousel.Caption>
                    <h3>{latestTitle[2]}</h3>
                    <p>{latestPlot[2]}</p>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>
            </Col>
            <Col>
              <h4>
                POPULAR
                <hr></hr>
              </h4>
              <Row>
                <Col>
                  <a href={`/movie/${popularID[0]}`}>
                    <img
                      src={popularImage[0]}
                      width="90"
                      length="100"
                      alt="pop0"
                    />
                  </a>
                  <a href={`/movie/${popularID[1]}`}>
                    <img
                      src={popularImage[1]}
                      width="90"
                      length="100"
                      alt="pop1"
                    />
                  </a>
                  <a href={`/movie/${popularID[2]}`}>
                    <img
                      src={popularImage[2]}
                      width="90"
                      length="100"
                      alt="pop2"
                    />
                  </a>
                </Col>
                <Col>
                  <a href={`/movie/${popularID[3]}`}>
                    <img
                      src={popularImage[3]}
                      width="90"
                      length="100"
                      alt="pop0"
                    />
                  </a>
                  <a href={`/movie/${popularID[4]}`}>
                    <img
                      src={popularImage[4]}
                      width="90"
                      length="100"
                      alt="pop0"
                    />
                  </a>
                  <a href={`/movie/${popularID[5]}`}>
                    <img
                      src={popularImage[5]}
                      width="90"
                      length="100"
                      alt="pop0"
                    />
                  </a>
                </Col>
                <Col>
                  <a href={`/movie/${popularID[6]}`}>
                    <img
                      src={popularImage[6]}
                      width="90"
                      length="100"
                      alt="pop0"
                    />
                  </a>
                  <a href={`/movie/${popularID[7]}`}>
                    <img
                      src={popularImage[7]}
                      width="90"
                      length="100"
                      alt="pop0"
                    />
                  </a>
                  <a href={`/movie/${popularID[8]}`}>
                    <img
                      src={popularImage[8]}
                      width="90"
                      length="100"
                      alt="pop0"
                    />
                  </a>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col xs={8}>
              <Container>
                <br />
                <h4>
                  FAN FAVORITES
                  <hr></hr>
                </h4>
                <Row>
                  <Col>
                    <a href={`/movie/${favoriteID[0]}`}>
                      <img src={favoriteImage[0]} alt="fan0" width="90" />
                    </a>
                  </Col>
                  <Col>
                    <a href={`/movie/${favoriteID[1]}`}>
                      <img src={favoriteImage[1]} alt="fan1" width="90" />
                    </a>
                  </Col>
                  <Col>
                    <a href={`/movie/${favoriteID[2]}`}>
                      <img src={favoriteImage[2]} alt="fan0" width="90" />
                    </a>
                  </Col>
                  <Col>
                    <a href={`/movie/${favoriteID[3]}`}>
                      <img src={favoriteImage[3]} alt="fan0" width="90" />
                    </a>
                  </Col>
                  <Col>
                    <a href={`/movie/${favoriteID[4]}`}>
                      <img src={favoriteImage[4]} alt="fan0" width="90" />
                    </a>
                  </Col>
                </Row>
              </Container>
            </Col>

            {/* <Col>
              <br/>
              <MyList/>
            </Col> */}
          </Row>
        </Container>
      )}

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
