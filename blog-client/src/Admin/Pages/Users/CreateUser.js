import { useState } from "react";
import { useNavigate } from "react-router-dom";


function CreateUser() {

	const navigate = useNavigate();

	const [ userFirstName, setUserFirstName ] = useState(String);
	const [ userLastName, setUserLastName ] = useState(String);
	const [ userEmail, setUserEmail ] = useState(String);
	const [ userPassword, setUserPassword ] = useState(String);
	const [ userRole, setUserRole ] = useState(String);
	const [ userIsActive, setUserIsActive ] = useState(Boolean);

	const handleSubmit = (event) => {
		
		event.preventDefault();

		//axios.post()

	}

	return(
		<main className="content-wrapper dashboard create-user">
			<div className="row">
				<div className="title">
					<h1>Create New User</h1>
					<button type="button" className="btn btn-dash-back" onClick={() => {navigate(-1)}}>Back</button>
				</div>
			</div>

			<form onSubmit={ (event) => { handleSubmit(event) } }>
				<div className="row">
					<label htmlFor="first-name">First Name:</label>
					<input
						type="text"
						name="first-name"
						value={ userFirstName }
						onChange={(event) => { setUserFirstName(event.target.value)} } 
					/>
				</div>
				<div className="row">
					<label htmlFor="last-name">Last Name:</label>
					<input
						type="text"
						name="last-name"
						value={ userLastName }
						onChange={(event) => { setUserLastName(event.target.value) }} 
					/>
				</div>
				<div className="row">
					<label htmlFor="email">Email Address:</label>
					<input
						type="email"
						name="email"
						value={ userEmail }
						onChange={(event) => { setUserEmail(event.target.value) }}
					/>
				</div>
				<div className="row">
					<label htmlFor="password">Password</label>
					<input
						type="password"
						name="password"
						value={ userPassword }
						onChange={(event) => { setUserPassword(event.target.value) }}
					/>
				</div>
				<div className="row">
					<label htmlFor="user-role">User Role:</label>
					<input
						type="text"
						name="user-role"
						value={ userRole }
						onChange={(event) => { setUserRole(event.target.value) }}
					/>
				</div>
				<div className="row">
					<label htmlFor="active">Active:</label>
					<input
						name="active"
						type="checkbox"
						checked={ userIsActive ? "checked" : "" }
						onChange={ (event) => { setUserIsActive(!userIsActive) } }
					/>
				</div>
				<div className="row">
					<button type="submit">Save</button>
				</div>
			</form>

		</main>
	);
}

export default CreateUser;