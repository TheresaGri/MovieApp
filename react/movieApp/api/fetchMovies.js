const fetchMovies = async (title,genre) => {
    let url = `http://localhost:3001/api/movies?title=${title}&genre=${genre}`;
    const res = await fetch(url);
    let data = await res.json();
    return data
  }

  export default fetchMovies;
  