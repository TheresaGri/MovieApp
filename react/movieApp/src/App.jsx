import { useState, useEffect } from "react";
import fetchMovies from "../api/fetchMovies";
import "./App.css";
import Homepage from "./components/Homepage";
import Header from "./components/Header";
import AboutThePage from "./components/AboutThePage";
import MovieDetails from "./components/MovieDetails";

function App() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState("");
  const [classOfMovieList, setClassOfMovieList] = useState(
    "searchField_and_MovieList"
  );
  const [classOfAboutPage, setClassOfAboutPage] = useState(
    "aboutPage_container_hidden"
  );
  const [clickedMovie, setClickedMovie] = useState({
    plot: "Hello",
    name: "Hello",
    genres: [],
    duration: 157,
    year: 2023,
    imdbRating: 8.4,
    poster: "asdasd",
  });
  const [classOfMovieDetail, setClassOfMovieDetail] = useState(
    "movieDetail_container_hidden"
  );

  useEffect(() => {
    async function loadMovies(title) {
      setMovies(await fetchMovies(title));
    }
    loadMovies(title);
  }, [title]);

  console.log(movies);

  function changeMovies(event) {
    setTitle(event.target.value);
  }

  function passMovie(movie) {
    setClickedMovie(movie);
    setClassOfMovieList("searchField_and_MovieList_hidden");
    setClassOfAboutPage("aboutPage_container_hidden");
    setClassOfMovieDetail("movieDetail_container");
    setTitle("");
  }

  console.log(clickedMovie);

  return (
    <div className="App">
      <Header
        aboutButtonClick={() => {
          setClassOfMovieList("searchField_and_MovieList_hidden");
          setClassOfAboutPage("aboutPage_container");
          setClassOfMovieDetail("movieDetail_container_hidden");
        }}
        homeButtonClick={() => {
          setClassOfMovieList("searchField_and_MovieList");
          setClassOfAboutPage("aboutPage_container_hidden");
          setClassOfMovieDetail("movieDetail_container_hidden");
        }}
      ></Header>
      <h1>Movie App</h1>
      <AboutThePage className={classOfAboutPage}></AboutThePage>
      <MovieDetails
        movie={clickedMovie}
        className={classOfMovieDetail}
      ></MovieDetails>
      <div className={classOfMovieList}>
        <input
          type="text"
          placeholder="Search for movies"
          className="searchField"
          value={title}
          onChange={changeMovies}
        ></input>
        <Homepage movies={movies} showInfo={passMovie} />
      </div>
    </div>
  );
}

export default App;
