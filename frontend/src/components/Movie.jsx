import { useState, useEffect, useContext, useRef } from "react";
import StarRating from "./StarRating.jsx";
import HoverList from "./HoverList.jsx";
import { getIMDB_ID } from "../data/movie.js";

import UserContext from "../context/UserContext.js";

const Movie = ({ movie, setUpdateMsg, morePage }) => {
  const [style, setButtonStyle] = useState({ display: "none" });
  const [show, setShowIcon] = useState(false);

  const { currUser, setUser } = useContext(UserContext);
  const [movie2, setMovie] = useState(movie);

  const url = `/movie/${movie2.imdbID}`;

  useEffect(() => {
    (async () => {
      var newMovie = {}
      if(movie && morePage) {
        let id = await getIMDB_ID(movie.id);
        newMovie.imdbID = id
        newMovie.Title = movie.title
        newMovie.Year = movie.release_date.slice(0, 4)
        newMovie.Poster = (`https://image.tmdb.org/t/p/w500${movie.poster_path}`)
        setMovie(newMovie)
      }
    })();
  }, [morePage]);

  return (
    <div
      onMouseEnter={(e) => {
        setButtonStyle({ display: "block" });
      }}
      onMouseLeave={(e) => {
        if (!show) {
          setButtonStyle({ display: "none" });
        }
      }}
    >
      <a href={url}>
        <img
          src={movie2.Poster}
          alt={movie2.Title}
          width="150px"
          height="200px"
        />
      </a>
      {currUser && (
        <HoverList
          movieid={movie2.imdbID}
          style={style}
          setShow2={setShowIcon}
          setUpdateMsg={setUpdateMsg}
        />
      )}
      <div className="maxHeight">
        <a href={url}>
          <p className="smallFont">
            {movie2.Title}, {movie2.Year}
          </p>
        </a>
      </div>

      {movie2.averageFollowingRating && (
        <div>
          Followers' Average Rating: {movie2.averageFollowingRating.toFixed(2)}
          <StarRating
            numberOfStars="5"
            currentRating={Math.round(movie2.averageFollowingRating)}
            fontSize="1.5rem"
            mutable={false}
          />
        </div>
      )}
    </div>
  );
};

export default Movie;
