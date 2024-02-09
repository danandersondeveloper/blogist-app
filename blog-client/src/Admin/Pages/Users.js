import { useState, useEffect } from "react";
import axios from "axios";

function Users() {

	const [ users, setUsers ] = useState([]);

	useEffect(() => {
		axios.get("http://localhost:9000/user/")
		.then(resposne => {
			setUsers(resposne.data);
		})
		.catch( err => { console.log(err)});
	}, [])

	return(
		<main className="content-wrapper dashboard">
			<div className="row">
				<h1>Users</h1>
				{ users.lenth <= 0 ? 

					<div className="no-data-found">
						<div className="row">
							<p>No user information found!</p>
						</div>
					</div>

					:

					<div className="users">
						<div className="row headers">
							<div className="cell">
								<strong>First Name:</strong>
							</div>
							<div className="cell">
								<strong>Last name:</strong>
							</div>
							<div className="cell">
								<strong>Email:</strong>
							</div>
							<div className="cell">
								<strong>Role:</strong>
							</div>
							<div className="cell">
								<strong className="hide-font">Edit</strong>
							</div>
						</div>
						{users.map(user => (
							<div className="row" key={user._id}>
								<div className="cell">
									<span>{user.firstName}</span>
								</div>
								<div className="cell">
									<span>{user.lastName}</span>
								</div>
								<div className="cell">
									<span>{user.email}</span>
								</div>
								<div className="cell">
									<span>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</span>
								</div>
								<div className="cell">
									<button className="btn btn-dash-primary">Edit</button>
								</div>
							</div>
						))}
					</div>
				}
			</div>
		</main>
	)
}

export default Users;