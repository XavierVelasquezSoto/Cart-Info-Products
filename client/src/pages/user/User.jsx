import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const User = () => {
	const [user, setUser] = useState();
	const { id } = useParams();

	useEffect(() => {
		getUserById(id, setUser);
	}, []);

	return (
		<>
			<h1>USER</h1>
			{user && (
				<>
					<div>
						<h2>{user.name}</h2>
						<p>{user.email}</p>
					</div>

					<form onSubmit={event => updateUser(event, id, user, setUser)}>
						<div>
							<label htmlFor='name'>Name</label>
							<input
								type='text'
								id='name'
								name='name'
								defaultValue={user.name}
							/>
						</div>
						<div>
							<label htmlFor='email'>Email</label>
							<input
								type='text'
								id='email'
								name='email'
								defaultValue={user.email}
							/>
						</div>
						<input type='submit' value='Update User' />
					</form>
				</>
			)}
			<Link to='/'>
				<button>Back to users</button>
			</Link>
		</>
	);
};

const getUserById = async (id, setUser) => {
	const response = await fetch(`http://localhost:3000/${id}`);
	const user = await response.json();
	setUser(user);
};

const updateUser = async (event, id, user, setUser) => {
	event.preventDefault();
	const newUserInfo = {
		name: event.target.name.value || user.name,
		email: event.target.email.value || user.email
	};
	const response = await fetch(`http://localhost:3000/${id}`, {
		method: 'PATCH',
		body: JSON.stringify(newUserInfo),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	const userUpdated = await response.json();
	setUser(userUpdated);
};

export default User;
