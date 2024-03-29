import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faCheck, faXmark, faPenToSquare, faPlus, faDownload } from "@fortawesome/free-solid-svg-icons";
import download from 'js-file-download';

//Import services
import { getUsers, searchUsers, exportUsers } from "../../Services/UserServices";

function Users() {

	const [ users, setUsers ] = useState([]);
	const [ search, setSearch ] = useState(false);
	const [ searchInputString, setSearchInputString ] = useState(String);

	const handleExport = async () => {

		const response = await exportUsers();

		if (response.status === 200 & response.data.length > 0) {
			download(JSON.stringify(response.data), "user-export.json");
		} else {
			console.log(response);
		}
	}

	const handleClearSearch = () => {
		requestUserData();
		setSearchInputString("");
		setSearch(false);
	}

	const handleSearch = async (event) => {

		event.preventDefault();

		if (searchInputString.length <= 4) return alert("Search input too short")

		const response = await searchUsers(searchInputString);

		setUsers(response.data);
		setSearch(true);
		
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
					<Link className="btn btn-create" to="/dashboard/blogs/create">
							<span className="icon">
								<FontAwesomeIcon icon={ faPlus } />
							</span>
							<span>Create Blog</span>
						</Link>
						<Link className="btn btn-export" to="X">
							<span className="icon">
								<FontAwesomeIcon icon={ faDownload } />
							</span>
							<span>Export JSON</span>
						</Link>
					</div>
				</div>

				<div className="search">
					<div className="row">
						<form onSubmit={ (event) => { handleSearch(event) } }>
							<input className="search-input" type="text" placeholder="Search users..." value={ searchInputString } onChange={ (event) => { setSearchInputString(event.target.value) } }/>
							<button className="btn search-button" type="submit">
								<span className="icon">
									<FontAwesomeIcon icon={ faMagnifyingGlass } />
								</span>
								<span>Search</span>
							</button>
							{ search && <button className="btn clear-search-button" type="button" onClick={ handleClearSearch }>Clear</button> }
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