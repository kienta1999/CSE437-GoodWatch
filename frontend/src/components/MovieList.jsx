import Movie from "./Movie.jsx";
import { Row, Col, Container } from "react-bootstrap";

const MovieList = ({ movies, row, children }) => {
  const generateMovieRow = (index) => {
    const someMovies = movies.slice(index, index + row);
    console.log(movies)
    console.log(someMovies)
    const someMoviesComponent = someMovies.map((movie) => {
      return (
        <Col>
          <Movie movie={movie} key={movie.imdbID} />
          <div className={movie['imdbID']}>{children}</div>
        </Col>
      );
    });
    return <Row>{someMoviesComponent}</Row>;
  };
  let allMoviesComponent = [];
  for (let index = 0; index < movies.length; index += row) {
    allMoviesComponent.push(generateMovieRow(index));
  }
  console.log(allMoviesComponent)
  return <Container>{allMoviesComponent}</Container>;
};

export default MovieList;
