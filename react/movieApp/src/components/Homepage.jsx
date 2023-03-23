import React from "react";
import "./Homepage.css";

export default function Homepage(props) {
  return (
    <div className="movies_container">
      <div className="movieList">
        {props.movies.map((movie) => {
          return (
            <div>
              <img src={movie.poster} className="moviePosters" onClick={() => props.showInfo(movie)}/>
              <div>
                {movie.name}({movie.year})
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
