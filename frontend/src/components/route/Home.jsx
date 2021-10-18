import NavigationBar from "../NavigationBar.jsx";
import { useRef, useState, useEffect } from "react";
import getMoviesFromQuery from "../../data/movie.js";
import MovieList from "../MovieList.jsx";
import ReactPaginate from "react-paginate";
import MovieCarousel from "../MovieCarousel.jsx";
import FanFavorites from "../FanFavorites.jsx";
import Popular from "../Popular.jsx";
import MyList from "../MyList.jsx";

import { Container, Col, Row, Carousel } from "react-bootstrap";

const Home = () => {
  const query = useRef(null);
  const [queryState, setQueryState] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [movies, setMovies] = useState(null);
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

  

  const [popular, setPopular] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await fetch("https://imdb-api.com/en/API/MostPopularMovies/k_2gogegdy");
      const data = await res.json();
      let pops = data.items.slice(0,9)
      console.log(pops)
      let popList = pops.map((pop) => (
        pop.image
      ))
      setPopular(popList) ;
    })();
   } , []); 
  

   const [favorite, setFavorite] = useState([]);

   useEffect(() => {
     (async () => {
       const res = await fetch("https://imdb-api.com/en/API/Top250Movies/k_2gogegdy");
       const data = await res.json();
       let favs = data.items.slice(0,5)
       console.log(favs)
       let favList = favs.map((fav) => (
         fav.image
       ))
       setFavorite(favList) ;
     })();
    } , []); 

    
    const [latest, setLatest] = useState([[]]);

   useEffect(() => {
     (async () => {
       const res = await fetch("https://imdb-api.com/en/API/InTheaters/k_2gogegdy");
       const data = await res.json();
       let lats = data.items.slice(0,3)
       console.log(lats)

       function Name(movie) {
        const res = fetch(`https://imdb-api.com/en/API/Posters/k_2gogegdy/${movie}`);
        const data = res.json();
        return data.title;
      }

       function Poster(movie) {
         const res = fetch(`https://imdb-api.com/en/API/Posters/k_2gogegdy/${movie}`);
         const data = res.json();
         return data.posters[-1].link;
       }

       let latList = lats.map((lat) => {
         return (
            [ Name(lat), Poster(lat) ]
         )
       })

       setLatest(latList) ;
     })();
    } , []); 


    console.log(latest)


  return (
    <div>
      <NavigationBar handleSubmit={handleSubmit} query={query} />
      <br/>
      {!movies && (
        <Container>
          <Row>
            <Col xs={8}>
              <Carousel>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={latest[0][1]}
                    alt="First slide"
                    />
                    
                    <Carousel.Caption>
                    <h3>{latest[0][0]}</h3>
                    {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    src={latest[1][1]}
                    alt="Second slide"
                    />

                    <Carousel.Caption>
                    <h3>{latest[1][0]}</h3>
                    {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={latest[2][1]}
                    alt="Third slide"
                    />

                    <Carousel.Caption>
                    <h3>{latest[2][0]}</h3>
                    {/* <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p> */}
                    </Carousel.Caption>
                </Carousel.Item>
              </Carousel>
            </Col>
            <Col>
              <Popular/>
              <Row>
                <Col>
                  <img src={popular[0]} width="90" length="100" alt="pop0"/>
                  <img src={popular[1]} width="90" length="100" alt="pop1"/>
                  <img src={popular[2]} width="90" length="100" alt="pop2"/>
                </Col>
                <Col>
                  <img src={popular[3]} width="90" length="100" alt="pop3"/>
                  <img src={popular[4]} width="90" length="100" alt="pop4"/>
                  <img src={popular[5]} width="90" length="100" alt="pop5"/>
                </Col>
                <Col>
                  <img src={popular[6]} width="90" length="100" alt="pop6"/>
                  <img src={popular[7]} width="90" length="100" alt="pop7"/>
                  <img src={popular[8]} width="90" length="100" alt="pop8"/>
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
                          <img
                              src={favorite[0]}
                              alt="fan0"
                              width="90" 
                          />
                      </Col>
                      <Col>
                          <img
                              src={favorite[1]}
                              alt="fan1"
                              width="90" 
                          />
                      </Col>
                      <Col>
                          <img
                              src={favorite[2]}
                              alt="fan2"
                              width="90" 
                          />
                      </Col>
                      <Col>
                          <img
                              src={favorite[3]}
                              alt="fan3"
                              width="90" 
                          />
                      </Col>
                      <Col>
                          <img
                              src={favorite[4]}
                              alt="fan4"
                              width="90" 
                          />
                      </Col>
                  </Row>

              </Container>

            </Col>
            <Col>
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
