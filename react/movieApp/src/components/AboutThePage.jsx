import './AboutThePage.css';

export default function AboutThePage({ className }) {
	return (
		<div className={className}>
			<h1>ABOUT US</h1>
			<br />
			<br />
			<div className='container-about'>
				<p id='text-about'>
					We are REACTFLIX, a team of four developers who LOVE React, Express
					and MongoDB. Our hobbies include pirating movies, drinking cocktails
					and travelling to the USA. In our free time, we also enjoy
					down-to-earth activities like curing cancer.Thanks for using our
					service!
				</p>
				<img
					width='450px'
					height='350px'
					src='https://images.pexels.com/photos/879109/pexels-photo-879109.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
				></img>
			</div>
			<br />
			<br />
			<br />
			<br />
			<hr
				style={{
					background: 'white',
					color: 'grey',
					borderColor: 'white',
					height: '1px',
				}}
			/>
			<p>Reactflix © 2022</p>
		</div>
	);
}
