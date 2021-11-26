import Movie from "./Movie.jsx";
import UpdateLists from "./UpdateLists.jsx";
import { Row, Col, Container } from "react-bootstrap";

const MovieList = ({ movies, row, multiselectBelow, children }) => {
  const generateMovieRow = (index) => {
    const someMovies = movies.slice(index, index + row);

    const someMoviesComponent = someMovies.map((movie) => {
      return (
        <Col width="200px" className="img-grid">
          <Movie movie={movie} key={movie.imdbID} />
          <div className={movie['imdbID']}>{children}</div>
          {/* {multiselectBelow && (
            <UpdateLists movieid={movie.imdbID}/>
          )} */}
        </Col>
      );
    });

    return <Row>{someMoviesComponent}</Row>;
  };

  let allMoviesComponent = [];
  for (let index = 0; index < movies.length; index += row) {
    console.log(index)
    allMoviesComponent.push(generateMovieRow(index));
  }
  return <Container>{allMoviesComponent}</Container>;
};

export default MovieList;
