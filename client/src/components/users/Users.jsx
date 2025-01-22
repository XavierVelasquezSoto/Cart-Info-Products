import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 } from 'uuid';

const Users = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		getAllUsers(setUsers);
	}, []);

	return (
		<>
			<h1>USERS</h1>
			{users.length === 0 && <h2>No Users</h2>}
			<form onSubmit={event => createUser(event, setUsers)}>
				<div>
					<label htmlFor='name'>Name</label>
					<input type='text' id='name' name='name' />
				</div>
				<div>
					<label htmlFor='email'>Email</label>
					<input type='text' id='email' name='email' />
				</div>
				<input type='submit' value='Create User' />
			</form>
			{users.length > 0 &&
				users.map(user => (
					<div key={user.userId}>
						<h2>{user.name}</h2>
						<p>{user.email}</p>
						<Link to={`/user/${user.userId}`}>
							<button>View User Info</button>
						</Link>
						<button onClick={() => deleteUser(user.userId, setUsers)}>
							Delete User
						</button>
					</div>
				))}
		</>
	);
};

const getAllUsers = async setUsers => {
	const response = await fetch('http://localhost:3000');
	const users = await response.json();
	setUsers(users);
};

const createUser = async (event, setUsers) => {
	event.preventDefault();
	const newUser = {
		userId: v4(),
		name: event.target.name.value,
		email: event.target.email.value
	};
	const response = await fetch('http://localhost:3000', {
		method: 'POST',
		body: JSON.stringify(newUser),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	const users = await response.json();
	setUsers(users);
};

const deleteUser = async (id, setUsers) => {
	const response = await fetch(`http://localhost:3000/${id}`, {
		method: 'DELETE'
	});
	const users = await response.json();
	setUsers(users);
};

// ASINCRONISMO

export default Users;
