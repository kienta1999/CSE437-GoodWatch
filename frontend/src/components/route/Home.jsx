import NavigationBar from "../NavigationBar.jsx";
import { useRef, useState, useEffect, useContext } from "react";
import getMoviesFromQuery from "../../data/movie.js";
import getMoviePoster from "../../data/image.js";
import MovieList from "../MovieList.jsx";
import HoverList from "../HoverList.jsx";
import ReactPaginate from "react-paginate";
import MyList from "../MyList.jsx";
import UserContext from "../../context/UserContext";
import keys from "../../keys.js";
import jwtDecode from "jwt-decode";

import { Container, Col, Row, Carousel } from "react-bootstrap";
import { getPopularMovieData, getFanFavMovieData, getLatestMovieData, getImage, getIMDB_ID } from "../../data/movie.js";

const Home = (props) => {
  const query = useRef(null);

  const { currUser, setUser } = useContext(UserContext);

  
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
      {!movies && (
        <Container>
          <Row>
            <Col>
              <strong>Welcome to GoodWatch!</strong>
              <p>
                Search for your favorite and soon-to-be favorite movies and TV
                shows and add them to custom lists. Browse new shows and add them
                to your "Want to Watch" list or updated your "Watched" list by
                adding a movie you recently saw! Never forget the movies and shows
                you've watched ever again--if a friend asks for movie
                recommendations, you'll know where to go!
              </p>
            </Col>
          </Row>
          <Row>
            <Col xs={8}>
              <Carousel fade>
                <Carousel.Item>
                  <a href={`/movie/${latestID[0]}`}>
                    <img
                      className="carouselImg"
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
                      className="carouselImg"
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
                      className="carouselImg"
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
                Popular
                <hr></hr>
              </h4>
              <Row>
                <GeneratePopular popularID={popularID} popularImage={popularImage}/>
                {/* <Col>
                  <div className="relativeDiv">
                    <a href={`/movie/${popularID[0]}`}>
                      <img
                        src={popularImage[0]}
                        width="90"
                        length="100"
                        alt="pop0"
                      />
                    </a>
                    {currUser && (
                      <HoverList movieid={popularID[0]} onHomePage={true}/>
                    )}
                  </div>
                  <div className="relativeDiv">
                    <a href={`/movie/${popularID[1]}`}>
                      <img
                        src={popularImage[1]}
                        width="90"
                        length="100"
                        alt="pop1"
                      />
                    </a>
                    <HoverList movieid={popularID[1]} onHomePage={true}/>
                  </div>
                  <div className="relativeDiv">
                    <a href={`/movie/${popularID[2]}`}>
                      <img
                        src={popularImage[2]}
                        width="90"
                        length="100"
                        alt="pop2"
                      />
                    </a>
                    <HoverList movieid={popularID[2]} onHomePage={true}/>
                  </div>
                </Col>
                <Col>
                  <div className="relativeDiv">
                    <a href={`/movie/${popularID[3]}`}>
                      <img
                        src={popularImage[3]}
                        width="90"
                        length="100"
                        alt="pop0"
                      />
                    </a>
                    <HoverList movieid={popularID[3]} onHomePage={true}/>
                  </div>
                  <div className="relativeDiv">
                    <a href={`/movie/${popularID[4]}`}>
                      <img
                        src={popularImage[4]}
                        width="90"
                        length="100"
                        alt="pop0"
                      />
                    </a>
                    <HoverList movieid={popularID[4]} onHomePage={true}/>
                  </div>
                  <div className="relativeDiv">
                    <a href={`/movie/${popularID[5]}`}>
                      <img
                        src={popularImage[5]}
                        width="90"
                        length="100"
                        alt="pop0"
                      />
                    </a>
                    <HoverList movieid={popularID[5]} onHomePage={true}/>
                  </div>
                </Col>
                <Col>
                  <div className="relativeDiv">
                    <a href={`/movie/${popularID[6]}`}>
                      <img
                        src={popularImage[6]}
                        width="90"
                        length="100"
                        alt="pop0"
                      />
                    </a>
                    <HoverList movieid={popularID[6]} onHomePage={true}/>
                  </div>
                  <div className="relativeDiv">
                    <a href={`/movie/${popularID[7]}`}>
                      <img
                        src={popularImage[7]}
                        width="90"
                        length="100"
                        alt="pop0"
                      />
                    </a>
                    <HoverList movieid={popularID[7]} onHomePage={true}/>
                  </div>
                  <div className="relativeDiv">
                    <a href={`/movie/${popularID[8]}`}>
                      <img
                        src={popularImage[8]}
                        width="90"
                        length="100"
                        alt="pop0"
                      />
                    </a>
                    <HoverList movieid={popularID[8]} onHomePage={true}/>
                  </div>
                </Col> */}
              </Row>
            </Col>
          </Row>
          <Row>
            <Col xs={8}>
                <br />
                <h4>
                  Fan Favorites
                  <hr></hr>
                </h4>
                <GenerateFanPicks favoriteID={favoriteID} favoriteImage={favoriteImage}/>
                {/* <Row>
                  <Col className="mb-3">
                    <div className="relativeDiv">
                      <a href={`/movie/${favoriteID[0]}`}>
                        <img src={favoriteImage[0]} alt="fan0" width="90" length="100"/>
                      </a>
                      <HoverList movieid={favoriteID[0]} onHomePage={true}/>
                    </div>
                  </Col>
                  <Col>
                    <div className="relativeDiv">
                      <a href={`/movie/${favoriteID[1]}`}>
                        <img src={favoriteImage[1]} alt="fan1" width="90" length="100"/>
                      </a>
                      <HoverList movieid={favoriteID[1]} onHomePage={true}/>
                    </div>
                  </Col>
                  <Col>
                    <div className="relativeDiv">
                      <a href={`/movie/${favoriteID[2]}`}>
                        <img src={favoriteImage[2]} alt="fan0" width="90" length="100"/>
                      </a>
                      <HoverList movieid={favoriteID[2]} onHomePage={true}/>
                    </div>
                  </Col>
                  <Col>
                    <div className="relativeDiv">
                      <a href={`/movie/${favoriteID[3]}`}>
                        <img src={favoriteImage[3]} alt="fan0" width="90" />
                      </a>
                      <HoverList movieid={favoriteID[3]} onHomePage={true}/>
                    </div>
                  </Col>
                  <Col>
                    <div className="relativeDiv">
                      <a href={`/movie/${favoriteID[4]}`}>
                        <img src={favoriteImage[4]} alt="fan0" width="90" />
                      </a>
                      <HoverList movieid={favoriteID[4]} onHomePage={true}/>
                    </div>
                  </Col>
                  <Col>
                    <div className="relativeDiv">
                      <a href={`/movie/${favoriteID[5]}`}>
                        <img src={favoriteImage[5]} alt="fan0" width="90" length="100"/>
                      </a>
                      <HoverList movieid={favoriteID[5]} onHomePage={true}/>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className="relativeDiv">
                      <a href={`/movie/${favoriteID[6]}`}>
                        <img src={favoriteImage[6]} alt="fan1" width="90" length="100"/>
                      </a>
                      <HoverList movieid={favoriteID[6]} onHomePage={true}/>
                    </div>
                  </Col>
                  <Col>
                    <div className="relativeDiv">
                      <a href={`/movie/${favoriteID[7]}`}>
                        <img src={favoriteImage[7]} alt="fan0" width="90" length="100"/>
                      </a>
                      <HoverList movieid={favoriteID[7]} onHomePage={true}/>
                    </div>
                  </Col>
                  <Col>
                    <div className="relativeDiv">
                      <a href={`/movie/${favoriteID[8]}`}>
                        <img src={favoriteImage[8]} alt="fan0" width="90" />
                      </a>
                      <HoverList movieid={favoriteID[8]} onHomePage={true}/>
                    </div>
                  </Col>
                  <Col>
                    <div className="relativeDiv">
                      <a href={`/movie/${favoriteID[9]}`}>
                        <img src={favoriteImage[9]} alt="fan0" width="90" />
                      </a>
                      <HoverList movieid={favoriteID[9]} onHomePage={true}/>
                    </div>
                  </Col>
                  <Col>
                    <div className="relativeDiv">
                      <a href={`/movie/${favoriteID[10]}`}>
                        <img src={favoriteImage[10]} alt="fan0" width="90" />
                      </a>
                      <HoverList movieid={favoriteID[10]} onHomePage={true}/>
                    </div>
                  </Col>
                  <Col>
                    <div className="relativeDiv">
                      <a href={`/movie/${favoriteID[11]}`}>
                        <img src={favoriteImage[11]} alt="fan0" width="90" />
                      </a>
                      <HoverList movieid={favoriteID[11]} onHomePage={true}/>
                    </div>
                  </Col>
                </Row> */}
            </Col>

            <Col>
              {currUser && (
                <>
                  <br />
                    <h4>
                      My Lists
                      <hr></hr>
                    </h4>
                  <Row>
                    
                      <MyList/>
                  </Row>
                </>
              )}
            </Col>
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

const GeneratePopular = ({popularID, popularImage}) => {

  const { currUser, setUser } = useContext(UserContext);
    
  var indices = [0,1,2,3,4,5,6,7,8]
  const movies = indices.map((i) => {
    var id = popularID[i]
    var img = popularImage[i]
    return (
      <div className="relativeDiv">
        <a href={`/movie/${id}`}>
          <img
            src={img}
            width="90"
            length="100"
            alt="pop2"
          />
        </a>
        {currUser && (
          <HoverList movieid={id} onHomePage={true}/>
        )}
      </div>
    );
  });
  var firstCol = movies.slice(0, 3);
  var secondCol = movies.slice(3, 6);
  var thirdCol = movies.slice(6, 9);

  var cols = [firstCol, secondCol, thirdCol]

  let allMoviesComponent = [];
  for (let i = 0; i < cols.length; i++) {
    allMoviesComponent.push(
      <Col>
        {cols[i]}
      </Col>
    );
  }

  return allMoviesComponent;
}

const GenerateFanPicks = ({favoriteID, favoriteImage}) => {

  const { currUser, setUser } = useContext(UserContext);
    
  var indices = [0,1,2,3,4,5,6,7,8,9,10,11]
  const movies = indices.map((i) => {
    var id = favoriteID[i]
    var img = favoriteImage[i]
    return (
      <Col>
        <div className="relativeDiv">
          <a href={`/movie/${id}`}>
            <img src={img} alt="fan0" width="90" length="100"/>
          </a>
          {currUser && (
            <HoverList movieid={id} onHomePage={true}/>
          )}
        </div>
      </Col>
    );
  });

  var firstRow = movies.slice(0, 6);
  var secondRow = movies.slice(6, 12);

  var rows = [firstRow, secondRow]

  let allMoviesComponent = [];
  for (let i = 0; i < rows.length; i++) {
    allMoviesComponent.push(
      <Row>
        {rows[i]}
      </Row>
    );
  }

  return allMoviesComponent;
}

export default Home;
export { GeneratePopular, GenerateFanPicks };