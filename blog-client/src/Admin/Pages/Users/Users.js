import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//Import services
import { getUsers } from "../../Services/UserServices";

function Users() {

	const [ users, setUsers ] = useState([]);
	const [ searchInputString, setSearchInputString ] = useState(String);
	const [ searchIsActive, setSearchIsActive ] = useState(false);

	const handleClearSearch = () => {
		requestUserData();
		setSearchInputString("");
		setSearchIsActive(false);
	}

	const handleSearch = (event) => {

		event.preventDefault();

		if (searchInputString.length <= 4) return alert("Search input too short")
		
		axios.get(`http://localhost:9000/user/search`, { params: { "search": searchInputString } })
		.then(response => {
			setUsers(response.data);
			setSearchIsActive(true);
		})
		.catch(error => { console.log(error) });
	}

	const requestUserData = async () => {
		const users = await getUsers();
		setUsers(users.data)
	} 

	useEffect(() => {
		requestUserData();
	}, [])

	return(
		<main className="content-wrapper dashboard">
			<div className="row">
				<div className="title">
					<h1>Users</h1>
					<div className="buttons-wrapper">
						<Link to="/dashboard/users/create">Create</Link>
					</div>
				</div>

				<div className="search">
					<div className="row">
						<form onSubmit={ (event) => { handleSearch(event) } }>
							<input className="search-input" type="text" placeholder="Search users..." value={ searchInputString } onChange={ (event) => { setSearchInputString(event.target.value) } }/>
							<button className="btn search-button" type="submit">Search</button>
							{ searchIsActive && <button className="btn clear-search-button" type="button" onClick={ handleClearSearch }>Clear</button> }
						</form>
					</div>
				</div>

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
								<strong>User role:</strong>
							</div>
							<div className="cell">
								<strong>Is active</strong>
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
									<span>{user.active ? "Active" : "Not Active"}</span>
								</div>
								<div className="cell">
									<Link className="btn btn-dash-primary" to={`/dashboard/users/update/${user._id}`}>Edit</Link>
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