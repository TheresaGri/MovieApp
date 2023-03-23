import { useState, useEffect } from "react";
import fetchMovies from "../api/fetchMovies";
import "./App.css";
import Homepage from "./components/Homepage";
import Header from "./components/Header";
import AboutThePage from "./components/AboutThePage";
import MovieDetails from "./components/MovieDetails";

function App() {
  const [movies, setMovies] = useState([]);
  const [classOfMovieList, setClassOfMovieList] = useState(
    "searchField_and_MovieList"
  );
  const [classOfAboutPage, setClassOfAboutPage] = useState(
    "aboutPage_container_hidden"
  );
  const [clickedMovie, setClickedMovie] = useState({});
  const [classOfMovieDetail, setClassOfMovieDetail] = useState(
    "movieDetail_container_hidden"
  );

  useEffect(() => {
    async function loadMovies() {
      setMovies(await fetchMovies());
    }
    loadMovies();
  }, []);

  function changeMovies(event) {
    const value = event.target.value.toLowerCase();
    if (value !== "") {
      const filteredMovies = movies.filter((movie) =>
        movie.name.toLowerCase().includes(value)
      );
      setMovies(filteredMovies);
    } else {
      async function loadMovies() {
        setMovies(await fetchMovies());
      }
      loadMovies();
    }
  }

  function passMovie(movie) {
    setClickedMovie({ ...clickedMovie, movie });
    setClassOfMovieList("searchField_and_MovieList_hidden");
    setClassOfAboutPage("aboutPage_container_hidden");
    setClassOfMovieDetail("movieDetail_container");
  }

  console.log(clickedMovie.movie);

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
        movie={clickedMovie.movie}
        className={classOfMovieDetail}
      ></MovieDetails>
      <div className={classOfMovieList}>
        <input
          type="text"
          placeholder="Search for movies"
          className="searchField"
          onChange={changeMovies}
        ></input>
        <Homepage movies={movies} showInfo={passMovie} />
      </div>
    </div>
  );
}

export default App;
