const fetchMovies = async (title) => {
    let url = `http://localhost:3001/api/movies?title=${title}`;
    const res = await fetch(url);
    let data = await res.json();
    return data
  }

  export default fetchMovies;
  