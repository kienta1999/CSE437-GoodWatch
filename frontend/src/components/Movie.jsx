import StarRating from "./StarRating.jsx";

const Movie = ({ movie }) => {
  console.log(movie);
  const url = `/movie/${movie.imdbID}`;
  return (
    <div>
      <a href={url}>
        <img src={movie.Poster} alt={movie.Title} width="150px" />
        <div width="10%" height="10%">
          {movie.Title}, {movie.Year}
        </div>
      </a>
      {movie.averageFollowingRating && (
        <div>
          Followers' average rating: {movie.averageFollowingRating}
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
