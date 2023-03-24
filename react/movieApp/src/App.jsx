import { useState, useEffect } from "react";
import fetchComments from "../api/fetchComments";
import fetchMovies from "../api/fetchMovies";
import "./App.css";
import Homepage from "./components/Homepage";
import Header from "./components/Header";
import AboutThePage from "./components/AboutThePage";
import MovieDetails from "./components/MovieDetails";
import CommentSection from "./components/CommentSection";
import GenreFilter from "./components/GenreFilter";

function App() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [classOfMovieList, setClassOfMovieList] = useState(true);
  const [classOfAboutPage, setClassOfAboutPage] = useState(false);
  const [movieId, setMovieId] = useState("573a1391f29313caabcd9600");
  const [movieInfoComments, setMovieInfoComment] = useState(false);
  const [clickedMovie, setClickedMovie] = useState({
    plot: "Hello",
    name: "Hello",
    genres: [],
    duration: 157,
    year: 2023,
    imdbRating: 8.4,
    poster: "asdasd",
  });
  let genresArray = [
    "Comedy",
    "Drama",
    "Romance",
    "Film-Noir",
    "Family",
    "Fantasy",
    "War",
    "Animation",
    "Mystery",
    "Thriller",
    "Crime",
    "Documentary",
    "Short",
    "History",
    "Horror",
    "Action",
    "Western",
    "Sci-Fi",
    "Adventure",
    "Musical",
    "Music",
    "Biography",
    "Sport",
    "News",
  ];

  useEffect(() => {
    async function loadMovies(title, genre) {
      setMovies(await fetchMovies(title, genre));
    }
    loadMovies(title, genre);
  }, [title, genre]);

  function changeMovies(event) {
    setTitle(event.target.value);
  }

  function filterByGenre(event) {
    setGenre(event.target.value);
  }

  function passMovie(movie) {
    setClickedMovie(movie);
    setClassOfMovieList(false);
    setClassOfAboutPage(false);
    setMovieInfoComment(true);
    setTitle("");
    setMovieId(movie._id);
  }

  return (
    <div className="App">
      <Header
        aboutButtonClick={() => {
          setClassOfMovieList(false);
          setClassOfAboutPage(true);
          setMovieInfoComment(false);
        }}
        homeButtonClick={() => {
          setClassOfMovieList(true);
          setClassOfAboutPage(false);
          setMovieInfoComment(false);
        }}
      ></Header>
      <h1>Movie App</h1>
      {classOfAboutPage && <AboutThePage></AboutThePage>}

      {movieInfoComments && (
        <div>
          <MovieDetails movie={clickedMovie}></MovieDetails>
          <CommentSection movieID={movieId}></CommentSection>
        </div>
      )}
      {classOfMovieList && (
        <div>
          <input
            type="text"
            placeholder="Search for movies"
            className="searchField"
            value={title}
            onChange={changeMovies}
          ></input>
          <GenreFilter genres={genresArray} onChange={filterByGenre} />
          <Homepage movies={movies} onShowInfo={passMovie} />
        </div>
      )}
    </div>
  );
}

export default App;
