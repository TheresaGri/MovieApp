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
import fetchMoviesByGenre from "../api/fetchMoviesByGenre";

function App() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("")
  const [classOfMovieList, setClassOfMovieList] = useState(true);
  const [classOfAboutPage, setClassOfAboutPage] = useState(false);
  const [movieId, setMovieId] = useState("573a1391f29313caabcd9600");
  const [comments, setComments] = useState([]);

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

  useEffect(() => {
    async function loadMovies(title) {
      setMovies(await fetchMovies(title));
    }
    loadMovies(title);
  }, [title]);

  useEffect(() => {
    async function loadMoviesByGenre(genre) {
      setMovies(await fetchMoviesByGenre(genre));
    }
    loadMoviesByGenre(genre);
  }, [genre]);

  function changeMovies(event) {
    setTitle(event.target.value);
  }

  function filterByGenre(event) {
    setGenre(event.target.value)
  }

  function passMovie(movie) {
    setClickedMovie(movie);
    setClassOfMovieList(false);
    setClassOfAboutPage(false);
    setMovieInfoComment(true);
    setTitle("");
    setMovieId(movie._id);
  }

  useEffect(() => {
    async function loadComments(movieId) {
      let data = await fetchComments(movieId);
      setComments(data);
    }
    loadComments(movieId);
  }, [movieId]);

  console.log(comments);
  let genresArray = []
  function getAllMovieGenres() {
    for(let x of movies) {
      for(let i = 0; i < x.genres.length; i++) {
        if(!genresArray.includes(x.genres[i])) {
          genresArray.push(x.genres[i])
        }
      }
    }
    console.log(genresArray)
  }

  getAllMovieGenres()

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
          <CommentSection commentsArray={comments}></CommentSection>
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
          <GenreFilter
        genres={genresArray}
        onChange={filterByGenre}/>
        <Homepage movies={movies} onShowInfo={passMovie} />
        </div>
      )}
    </div>
  );
}

export default App;
