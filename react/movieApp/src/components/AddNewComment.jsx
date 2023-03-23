import React, { useState } from 'react';
import './AddNewComment.css';

export default function AddNewComment(props) {
	const [isOpenPopup, setIsOpenPopup] = useState(false);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [comment, setComment] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const [errorMessage2, setErrorMessage2] = useState('');

	const isEmail = (email) =>
		/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

	const handleSubmit = (e) => {
		e.preventDefault();
		let date = new Date(Date.now()).toISOString();

		let userInput = {
			name: name,
			email: email,
			text: comment,
			date: date,
		};
		console.log(userInput);

		setName('');
		setEmail('');
		setComment('');
		setIsOpenPopup(false);

		props.onSubmit(userInput);
	};

	return (
		<div>
			<button onClick={() => setIsOpenPopup(true)}>Add new comment</button>

			{isOpenPopup ? (
				<div className='popup'>
					<form onSubmit={handleSubmit}>
						<input
							className='field'
							type='text'
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder='Type name'
						></input>

						<input
							className='field'
							type='text'
							value={email}
							onChange={(e) => {
								setEmail(e.target.value);
								if (!isEmail(e.target.value)) {
									setErrorMessage('Not a valid e-mail adress!');
								} else {
									setErrorMessage('');
								}
							}}
							placeholder='Type E-Mail'
						></input>

						<input
							className='field'
							type='text'
							value={comment}
							onChange={(e) => {
								setComment(e.target.value);
								if (e.target.value.length < 10) {
									setErrorMessage2('Please enter some text');
								} else {
									setErrorMessage2('');
								}
							}}
							placeholder='Type comment'
						></input>
						{errorMessage && <div className='error'>{errorMessage}</div>}
						<br />
						{errorMessage2 && <div className='error'>{errorMessage2}</div>}

						{isEmail(email) && errorMessage2 === '' ? (
							<div>
								<button type='submit'>Submit</button>
							</div>
						) : null}
					</form>
				</div>
			) : null}
		</div>
	);
}
