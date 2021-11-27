import { useState, useEffect, useContext, useRef } from "react";
import StarRating from "./StarRating.jsx";
import HoverList from "./HoverList.jsx";

const Movie = ({ movie }) => {
  const [style, setButtonStyle] = useState({display: 'none'});

  const url = `/movie/${movie.imdbID}`;
  return (
    <div onMouseEnter={e => {
          setButtonStyle({display: 'block'});
        }}
        onMouseLeave={e => {
          setButtonStyle({display: 'none'})
        }}>
      <a href={url}>
        <img src={movie.Poster} alt={movie.Title} width="150px" height="200px"/>
      </a>
      <HoverList movieid={movie.imdbID} style={style}/>
      <div className="maxHeight">
        <a href={url}><p className="smallFont">{movie.Title}, {movie.Year}</p></a>
      </div>

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
