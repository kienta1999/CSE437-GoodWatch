import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieData } from "../../data/movie.js";
import NavigationBar from "../NavigationBar.jsx";
import { Container } from "react-bootstrap";

const MoviePage = () => {
  const { movieid } = useParams();
  const [data, setData] = useState(null);
  useEffect(() => {
    (async () => {
      const result = await getMovieData(movieid);
      if (result) setData(result);
    })();
  }, [movieid]);
  const body = data ? (
    <Container>
      <img src={data.Poster} alt={data.Title} />
      <p>
        {data.Title}, {data.Year}
      </p>
      <p>
        <strong>Actors:</strong> {data.Actors}
      </p>
      <p>
        <strong>Gerne:</strong> {data.Genre}
      </p>
      <p>
        <strong>Ratings:</strong> {data.imdbRating}
      </p>
      <p>
        <strong>Votes:</strong> {data.imdbVotes}
      </p>
      <p>
        <strong>Plot: </strong>
        {data.Plot}
      </p>
    </Container>
  ) : (
    <div>Loading...</div>
  );
  return (
    <div>
      <NavigationBar />
      {body}
    </div>
  );
};

export default MoviePage;
