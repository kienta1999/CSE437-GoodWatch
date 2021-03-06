import Movie from "./Movie.jsx";
import { Row, Col, Container } from "react-bootstrap";

const MovieList = ({ movies, row, setUpdateMsg, children, morePage }) => {
  const generateMovieRow = (index) => {
    const someMovies = movies.slice(index, index + row);

    const someMoviesComponent = someMovies.map((movie) => {
      if (!morePage) {
        return (
          <Col width="200px" className="img-grid" key={movie.imdbID}>
            <Movie movie={movie} key={movie.imdbID} setUpdateMsg={setUpdateMsg}/>
            <div className={movie['imdbID']}>{children}</div>
          </Col>
        );
      }
      else {
        return (
          <Col width="200px" className="img-grid" key={movie.id}>
            <Movie movie={movie} key={movie.id} setUpdateMsg={setUpdateMsg} morePage={morePage}/>
            <div className={movie['id']}>{children}</div>
          </Col>
        );     
      }
    });

    return <Row key={index}>{someMoviesComponent}</Row>;
  };

  let allMoviesComponent = [];
  for (let index = 0; index < movies.length; index += row) {
    console.log(index)
    allMoviesComponent.push(generateMovieRow(index));
  }
  return <Container>{allMoviesComponent}</Container>;
};

export default MovieList;
