import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faCheck, faXmark, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import download from 'js-file-download';

//Import services
import { getUsers } from "../../Services/UserServices";

function Users() {

	const [ users, setUsers ] = useState([]);
	const [ searchInputString, setSearchInputString ] = useState(String);
	const [ searchIsActive, setSearchIsActive ] = useState(false);

	const handleExport = () => {
		axios.get(`http://localhost:9000/user/export`)
		.then(response => {
			download(response.data, "user-export.json")
		})
		.catch(error => {
			console.log(error);
		});
	}

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
						<Link className="btn create" to="/dashboard/users/create">Create User</Link>
						<Link className="btn export" onClick={ handleExport }>Export JSON</Link>
					</div>
				</div>

				<div className="search">
					<div className="row">
						<form onSubmit={ (event) => { handleSearch(event) } }>
							<input className="search-input" type="text" placeholder="Search users..." value={ searchInputString } onChange={ (event) => { setSearchInputString(event.target.value) } }/>
							<button className="btn search-button" type="submit">
								<span className="icon"><FontAwesomeIcon icon={ faMagnifyingGlass } /></span>
								<span>Search</span>
							</button>
							{ searchIsActive && <button className="btn clear-search-button" type="button" onClick={ handleClearSearch }>Clear</button> }
						</form>
					</div>
				</div>

				{ users.length <= 0 ? 

					<div className="no-data-found">
						<div className="row">
							<p>No user information found!</p>
						</div>
					</div>

					:

					<div className="table users">
						<div className="row headers">
							<div className="cell">
								<span>Email:</span>
							</div>
							<div className="cell narrow">
								<span>First Name:</span>
							</div>
							<div className="cell narrow">
								<span>Last name:</span>
							</div>
							<div className="cell narrow">
								<span>User role:</span>
							</div>
							<div className="cell narrow center">
								<span>Is active:</span>
							</div>
							<div className="cell narrow">
								<span>Member Since:</span>
							</div>
							<div className="cell narrow">
								<span className="hide-font">Edit</span>
							</div>
						</div>
						{users.map(user => (
							<div className="row" key={user._id}>
								<div className="cell">
									<span>{user.email}</span>
								</div>
								<div className="cell narrow">
									<span>{user.firstName}</span>
								</div>
								<div className="cell narrow">
									<span>{user.lastName}</span>
								</div>
								<div className="cell narrow">
									<span>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</span>
								</div>
								<div className="cell narrow center">
									<span>
										{user.active ?
											
											<FontAwesomeIcon icon={ faCheck } />
											:
											<FontAwesomeIcon icon={ faXmark } />
										
										}
									</span>
								</div>
								<div className="cell narrow">
									<span>{user.created}</span>
								</div>
								<div className="cell narrow">
									<Link className="btn btn-dash-primary" to={`/dashboard/users/update/${user._id}`}>
										<span><FontAwesomeIcon icon={ faPenToSquare } /></span>
										<span>Edit</span>
									</Link>
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