
export default function CommentSection(props) {
  let comments = props.commentsArray;

  return (<div>
    {comments.map((comment) => (
      <div key = {comment._id}>
        <p>{comment.name}</p>
        <p>{comment.email}</p>
        <p>{comment.text}</p>
        <p>{comment.date}</p>
      </div>
    ))}
  </div>);
}
