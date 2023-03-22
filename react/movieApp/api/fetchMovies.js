const fetchMovies = async () => {
    let url = "http://localhost:3001/api/movies"
    const res = await fetch(url);
    let data = await res.json();
    return data
  }

  export default fetchMovies
  