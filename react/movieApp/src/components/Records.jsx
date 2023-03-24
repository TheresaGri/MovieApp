import React from 'react';

const Records = ({ comments }) => {
	return (
		<div>
			{comments.map((comment) => (
				<div key={comment._id} className='comments'>
					<h1>{comment.name}</h1>
					<p className='dateOfComment'>{comment.date}</p>
					<p className='mailOfComment'>{comment.email}</p>
					<p className='textOfComment'>{comment.text}</p>
				</div>
			))}
		</div>
	);
};

export default Records;
