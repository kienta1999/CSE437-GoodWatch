import StarRating from "./StarRating.jsx";

const Movie = ({ movie }) => {
  console.log(movie);
  const url = `/movie/${movie.imdbID}`;
  return (
    <div>
      <a href={url}>
        <img src={movie.Poster} alt={movie.Title} width="150px" height="200px"/>
        <div className="maxHeight">
          <p className="smallFont">{movie.Title}, {movie.Year}</p>
        </div>
      </a>
      {movie.averageFollowingRating && (
        <div>
          Followers' Average Rating: {movie.averageFollowingRating}
          <StarRating
            numberOfStars="5"
            currentRating={Math.round(movie.averageFollowingRating)}
            fontSize="1.5rem"
            mutable={false}
          />
        </div>
      )}
    </div>
  );
};

export default Movie;
