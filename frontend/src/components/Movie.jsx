const Movie = ({ movie }) => {
  console.log(movie);
  const url = `/movie/${movie.imdbID}`;
  return (
    <a href={url}>
      <img src={movie.Poster} alt={movie.Title} width="150px" />
      <div
        width="10%"
        height="10%"
      >
        {movie.Title}, {movie.Year}
      </div>
    </a>
  );
};

export default Movie;
