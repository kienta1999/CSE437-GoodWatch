import { useState, useEffect, useContext, useRef } from "react";
import { getMovieRecommendation } from "../data/movie";
import { Container } from "react-bootstrap";

import MovieList from "../components/MovieList.jsx";

const MovieRecommendation = (props) => {
  const [moviesRecommended, setMoviesRecommended] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        let res = await getMovieRecommendation();
        setMoviesRecommended(res);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return moviesRecommended.length > 0 ? (
    <Container>
      {moviesRecommended && (
        <div>
          <h4>
            Recommendations from your followers
            <hr></hr>
          </h4>
          <MovieList
            movies={moviesRecommended}
            row={moviesRecommended.length >= 5 ? 5 : moviesRecommended.length}
          ></MovieList>
        </div>
      )}
    </Container>
  ) : (
    <Container>
      <h4>
        Recommendations from your followers
        <hr></hr>
      </h4>
      Either your follower does not rate any movies with score greater or equal
      than 4 or you haven't follow anyone!
    </Container>
  );
};

export default MovieRecommendation;
