import './MovieDetails.css';
import './AddNewComment.jsx';
import AddNewComment from './AddNewComment.jsx';

export default function MovieDetails(props) {
	let movie = props.movie;

	const handleNewComment = async (e) => {
		//Post req

		let movieId = movie._id;
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
			const response = await fetch('http://localhost:3001/api/comments', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(dataToPost),
			});
			const data = await response.json();
			console.log(data);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div>
			<div className={`movie-details ${props.className}`}>
				<h2>{movie.name}</h2>
				<img src={movie.poster} />
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
		</div>
	);
}
