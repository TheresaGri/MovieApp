import { useState, useEffect } from "react";
import "./CommentSection.css";
import AddNewComment from "./AddNewComment.jsx";
import fetchComments from "../../api/fetchComments";

export default function CommentSection(props) {
  const [comments, setComments] = useState([]);
  let movie_id = props.movieID;

  useEffect(() => {
    async function loadComments(movieId) {
      let data = await fetchComments(movieId);
      setComments(data);
    }
    loadComments(movie_id);
  }, [movie_id]);

  console.log(comments);

  const handleNewComment = async (e) => {
    //Post req

    let movieId = movie_id;
    const { name, email, text, date } = e;
    let dataToPost = {
      name: name,
      email: email,
      movie_id: movieId,
      text: text,
      date: date,
    };
    // console.log('*******');
    // console.log(dataToPost);
    // console.log('*******');

    try {
      const response = await fetch("http://localhost:3001/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToPost),
      });
      const data = await response.json();
      console.log(data);
      async function loadComments(movieId) {
        let data = await fetchComments(movieId);
        setComments(data);
      }
      loadComments(movie_id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="comments_container">
      <AddNewComment onSubmit={handleNewComment}></AddNewComment>
      <div>
        {comments.map((comment) => (
          <div key={comment._id} className="comments">
            <h1>{comment.name}</h1>
            <p className="dateOfComment">{comment.date}</p>
            <p className="mailOfComment">{comment.email}</p>
            <p className="textOfComment">{comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
