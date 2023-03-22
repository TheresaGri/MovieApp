import { useState, useEffect } from 'react'
import fetchMovies from '../api/fetchMovies'
import './App.css'
import Homepage from './components/homepage';

function App() {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    async function loadMovies() {
      setMovies(await fetchMovies(movies));
    }
    loadMovies();
  }, []);

  console.log(movies)

  return (
    <div className="App">
      <h1>Movie App</h1>
      <Homepage
      movies={movies}/>
    </div>
  )
}

export default App
