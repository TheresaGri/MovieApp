const fetchComments = async (movieId) => {
  let url = `http://localhost:3001/api/comments?movieId=${movieId}`;
  const res = await fetch(url);
  let data = await res.json();
  return data
}

export default fetchComments;