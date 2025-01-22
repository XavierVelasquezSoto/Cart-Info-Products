import { Link } from 'react-router-dom';

const User = () => {
	return (
		<>
			<h1>USER</h1>
			<Link to='/'>
				<button>Back to users</button>
			</Link>
		</>
	);
};

export default User;
