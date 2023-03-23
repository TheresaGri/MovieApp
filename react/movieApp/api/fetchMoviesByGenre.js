const fetchMoviesByGenre = async (genre) => {
    let url = `http://localhost:3001/api/movies?genre=${genre}`;
    const res = await fetch(url);
    let data = await res.json();
    return data
  }

  export default fetchMoviesByGenre;
  