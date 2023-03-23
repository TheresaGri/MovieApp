import "./MovieDetails.css";

export default function MovieDetails(props) {
  let movie = props.movie;

  return (
    <div>
    <div className={`movie-details ${props.className}`}>
      <h2>{movie.name}</h2>
      <img src={movie.poster}  />
      <p>{movie.plot}</p>
      <div>
        {" "}
        Genres:
        {movie.genres.map((genre) => (
          <p>{genre}</p>
        ))}
      </div>
      <div> Year: {movie.year}</div>
      <div> imdb Rating: {movie.imdbRating}</div>
      <div>duration: {movie.duration} min</div>
    </div>
    
    
    </div>
  );
}
