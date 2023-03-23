import './MovieDetails.css';
import './AddNewComment.jsx';
import AddNewComment from './AddNewComment.jsx';

export default function MovieDetails(props) {
	let movie = props.movie;

	const handleNewComment = (e) => {
		console.log('********');
		console.log(e);
	};

	return (
		<div className={`movie-details ${props.className}`}>
			<h2>{movie.name}</h2>
			<p>{movie.plot}</p>
			<div>
				{' '}
				Genres:
				{movie.genres.map((genre) => (
					<p>{genre}</p>
				))}
			</div>
			<div> Year: {movie.year}</div>
			<div> imdb Rating: {movie.imdbRating}</div>
			<div>duration: {movie.duration} min</div>
			<AddNewComment onSubmit={handleNewComment}></AddNewComment>
		</div>
	);
}
