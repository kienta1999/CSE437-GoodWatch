import NavigationBar from "../NavigationBar.jsx";
import { useRef, useState, useEffect } from "react";
import getMoviesFromQuery from "../../data/movie.js";
import getMoviePoster from "../../data/image.js";
import MovieList from "../MovieList.jsx";
import ReactPaginate from "react-paginate";
import MyList from "../MyList.jsx";
import keys from "../../keys.js";
import jwtDecode from 'jwt-decode'

import { Container, Col, Row, Carousel } from "react-bootstrap";

const Home = (props) => {
  const query = useRef(null);
  const [queryState, setQueryState] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [movies, setMovies] = useState(null);
  const [currUser, setUser] = useState(props.userInfo);

  useEffect(() => {
    var token = localStorage.getItem('token')
    var user = {}
    if (token) {
      user = jwtDecode(token)
    }
    var newState = {
      authToken: token,
      user: user
    }
    setUser(newState);
    console.log("Home getting token", token)
    console.log("Home getting user", user)
    console.log("new State", currUser)
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

  

  const [popularImage, setPopularImage] = useState([]);
  const [popularID, setPopularID] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await fetch("https://imdb-api.com/en/API/MostPopularMovies/k_ky621lt9");
      const data = await res.json();
      let pops = data.items.slice(0,9);

      let popi = pops.map((pop) => (
        pop.image
      ))
      setPopularImage(popi);

      let popd = pops.map((pop) => (
        pop.id
      ))
      setPopularID(popd) ;
    })();
   } , []); 
  

   const [favoriteImage, setFavoriteImage] = useState([]);
   const [favoriteID, setFavoriteID] = useState([]);

   useEffect(() => {
     (async () => {
       const res = await fetch("https://imdb-api.com/en/API/Top250Movies/k_ky621lt9");
       const data = await res.json();
       let favs = data.items.slice(0,5)

       let favi = favs.map((fav) => (
         fav.image
       ))
       setFavoriteImage(favi) ;

       let favd = favs.map((fav) => (
        fav.id
      ))
      setFavoriteID(favd) ;

     })();
    } , []); 

    
    const [latestImage, setLatestImage] = useState([]);
    const [latestTitle, setLatestTitle] = useState([]);
    const [latestPlot, setLatestPlot] = useState([]);
    const [latestID, setLatestID] = useState([]);

   useEffect(() => {
     (async () => {
       const res = await fetch("https://imdb-api.com/en/API/InTheaters/k_ky621lt9");
       const data = await res.json();
       let lats = data.items.slice(0,3)
       console.log(lats)

      let lati = []
      for (let lat of lats) {
        let res = await getMoviePoster(lat.id)
        lati.push(res)
      }
      setLatestImage(lati) ;

      let latt = lats.map((lat) => (
        lat.title
      ))
      setLatestTitle(latt) ;

      let latp = lats.map((lat) => (
        lat.plot
      ))
      setLatestPlot(latp) ;

      let latd = lats.map((lat) => (
        lat.id
      ))
      setLatestID(latd) ;

     })();
    } , []); 

  return (
    <div>
      <NavigationBar history={props.history} userInfo={currUser} handleSubmit={handleSubmit} query={query} />
      <br/>
      {!movies && (
        <Container>
          <Row>
            <strong>Welcome to GoodWatch!</strong> 
            <p>Search for your favorite and soon-to-be favorite movies and TV shows and add them to custom lists. Browse new shows and add them to your "Want to Watch" 
              list or updated your "Watched" list by adding a movie you recently saw! Never forget the movies and shows you've watched ever again--if a friend asks for movie recommendations, you'll know where to go!</p>
          </Row>
          <Row>
            <Col xs={8}>
              <Carousel>
                <Carousel.Item>
                    <a href={`/movie/${latestID[0]}`}>
                      <img src={latestImage[0]} alt="lat0" width="720" height="480" />
                    </a>
                    <Carousel.Caption>
                    <h3>{latestTitle[0]}</h3>
                    <p>{latestPlot[0]}</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <a href={`/movie/${latestID[1]}`}>
                      <img src={latestImage[1]} alt="lat1" width="720" height="480" />
                    </a>
                    <Carousel.Caption>
                    <h3>{latestTitle[1]}</h3>
                    <p>{latestPlot[1]}</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <a href={`/movie/${latestID[2]}`}>
                      <img src={latestImage[2]} alt="lat2" width="720" height="480" />
                    </a>
                    <Carousel.Caption>
                    <h3>{latestTitle[2]}</h3>
                    <p>{latestPlot[2]}</p>
                    </Carousel.Caption>
                </Carousel.Item>
              </Carousel>
            </Col>
            <Col>
                <h4>POPULAR
                    <hr></hr>
                </h4>
              <Row>
                <Col>
                  <a href={`/movie/${popularID[0]}`}>
                    <img src={popularImage[0]} width="90" length="100" alt="pop0"/>
                  </a>
                  <a href={`/movie/${popularID[1]}`}>
                    <img src={popularImage[1]} width="90" length="100" alt="pop1"/>
                  </a>
                  <a href={`/movie/${popularID[2]}`}>
                    <img src={popularImage[2]} width="90" length="100" alt="pop2"/>
                  </a>
                </Col>
                <Col>
                  <a href={`/movie/${popularID[3]}`}>
                    <img src={popularImage[3]} width="90" length="100" alt="pop0"/>
                  </a>
                  <a href={`/movie/${popularID[4]}`}>
                    <img src={popularImage[4]} width="90" length="100" alt="pop0"/>
                  </a>
                  <a href={`/movie/${popularID[5]}`}>
                    <img src={popularImage[5]} width="90" length="100" alt="pop0"/>
                  </a>
                </Col>
                <Col>
                  <a href={`/movie/${popularID[6]}`}>
                    <img src={popularImage[6]} width="90" length="100" alt="pop0"/>
                  </a>
                  <a href={`/movie/${popularID[7]}`}>
                    <img src={popularImage[7]} width="90" length="100" alt="pop0"/>
                  </a>
                  <a href={`/movie/${popularID[8]}`}>
                    <img src={popularImage[8]} width="90" length="100" alt="pop0"/>
                  </a>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col xs={8}>
              <Container>
                    <br/>
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
            
            <Col>
              <br/>
              <MyList/>
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

export default Home;
