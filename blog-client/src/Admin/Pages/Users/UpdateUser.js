
import { useEffect, useState } from "react";
import axios from "axios";

function UpdateUser() {

	const [ userFirstName, setUserFirstName ] = useState(String);
	const [ userLastName, setUserLastName ] = useState(String);
	const [ userEmail, setUserEmail ] = useState(String);
	const [ userRole, setUserRole ] = useState(String);
	const [ userIsActive, setUserIsActive ] = useState(Boolean);

	useEffect(() => {
		const userId = window.location.href.replace("http://localhost:3000/dashboard/users/update/", "");

		const requestData = {
			"userId": userId
		}

		axios.get(`http://localhost:9000/user/${userId}`, { params: requestData })
			.then(response => {
				setUserFirstName(response.data.firstName);
				setUserLastName(response.data.lastName);
				setUserEmail(response.data.email);
				setUserRole(response.data.role);
				setUserIsActive(response.data.active);
			})
			.catch(error => { 
				console.log(error)
			});

	}, []);

	return(
		<main className="content-wrapper dashboard">
			<div className="row">
				<div className="title">
					<h1>Edit:</h1>
				</div>

				<form>
					<div className="row">
						<label>First Name:</label>
						<input value={ userFirstName } onChange={(event) => { setUserFirstName(event.target.value)} } />
					</div>
					<div className="row">
						<label>Last Name:</label>
						<input value={ userLastName } onchange={(event) => { setUserLastName(event.target.value) }} />
					</div>
					<div className="row">
						<label>Email Address:</label>
						<input value={ userEmail } />
					</div>
					<div className="row">
						<label>User Role:</label>
						<input value={ userRole } />
					</div>
					<div className="">
						<lable>Active</lable>
						<input type="checkbox" />
					</div>
				</form>

			</div>
		</main>
	);
}

export default UpdateUser;