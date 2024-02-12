
import { useEffect, useState } from "react";
import axios from "axios";

function UpdateUser() {

	const [ userID, setUserID ] = useState(String);
	const [ userFirstName, setUserFirstName ] = useState(String);
	const [ userLastName, setUserLastName ] = useState(String);
	const [ userEmail, setUserEmail ] = useState(String);
	const [ userRole, setUserRole ] = useState(String);
	const [ userIsActive, setUserIsActive ] = useState(Boolean);
	const [ successMessage, setSuccessMessage ] = useState("");

	const handleSubmit = (event) => {
		event.preventDefault();

		const requestData = {
			"_id": userID,
			"firstName": userFirstName,
			"lastName": userLastName,
			"email": userEmail,
			"role": userRole,
			"active": userIsActive
		}

		axios.patch(`http://localhost:9000/user/edit/${userID}`, requestData)
		.then(response => {
			if (response === "success") setSuccessMessage("User has been updates successfully!");
		})
		.catch(error => {
			console.log(error);
		});
	}

	useEffect(() => {

		const id = window.location.href.replace("http://localhost:3000/dashboard/users/update/", "")

		const requestData = {
			userId: id
		}

		axios.get(`http://localhost:9000/user/${id}`, { params: requestData })
			.then(response => {
				setUserFirstName(response.data.firstName);
				setUserLastName(response.data.lastName);
				setUserEmail(response.data.email);
				setUserRole(response.data.role);
				setUserIsActive(response.data.active);
			})
			.catch(error => { 
				console.log(error);
			});

		setUserID(id);

	}, []);

	return(
		<main className="content-wrapper dashboard user-edit">
			<div className="row">
				<div className="title">
					<h1>{`Edit: ${userFirstName} ${userLastName}`}</h1>
				</div>

				{( successMessage.length > 0) ? <p>{successMessage}</p> : "" }

				<form onSubmit={(event) => { handleSubmit(event) }}>
					<div className="row">
						<label htmlFor="first-name">First Name:</label>
						<input name="first-name" value={ userFirstName } onChange={(event) => { setUserFirstName(event.target.value)} } />
					</div>
					<div className="row">
						<label htmlFor="last-name">Last Name:</label>
						<input name="last-name" value={ userLastName } onChange={(event) => { setUserLastName(event.target.value) }} />
					</div>
					<div className="row">
						<label htmlFor="email">Email Address:</label>
						<input name="email" value={ userEmail } onChange={(event) => { setUserEmail(event.target.value) }} />
					</div>
					<div className="row">
						<label htmlFor="user-role">User Role:</label>
						<input name="user-role" value={ userRole } onChange={(event) => { setUserRole(event.target.value) }} />
					</div>
					<div className="row">
						<label htmlFor="active">Active:</label>
						<input name="active" type="checkbox" checked={ userIsActive ? "checked" : "" } onChange={ (event) => { setUserIsActive(!userIsActive) } } />
					</div>
					<div className="row">
						<button className="btn btn-dash-primary" type="submit">Save user</button>
					</div>
				</form>

			</div>
		</main>
	);
}

export default UpdateUser;