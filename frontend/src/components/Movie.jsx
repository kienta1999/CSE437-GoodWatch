const Movie = ({ movie }) => {
  console.log(movie);
  const url = `/movie/${movie.imdbID}`;
  return (
    <a href={url}>
      <img src={movie.Poster} alt={movie.Title} width="70%" height="70%" />
      <p
        width="10%"
        height="10%"
        style={{ display: "flex", justifyContent: "center" }}
      >
        {movie.Title}, {movie.Year}
      </p>
    </a>
  );
};

export default Movie;
