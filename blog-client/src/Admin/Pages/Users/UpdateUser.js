import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function UpdateUser() {

	const navigate = useNavigate();

	const [ userId, setUserID ] = useState(String);
	const [ userFirstName, setUserFirstName ] = useState(String);
	const [ userLastName, setUserLastName ] = useState(String);
	const [ userEmail, setUserEmail ] = useState(String);
	const [ userRole, setUserRole ] = useState(String);
	const [ userIsActive, setUserIsActive ] = useState(Boolean);
	const [ successMessage, setSuccessMessage ] = useState(String);
	const [ displayDeleteModel, setDisplayDeleteModel ] = useState(false);

	const handleDelete = (event) => {

		event.preventDefault();

		const requestData = {
			"_id": userId
		}
		
		axios.delete(`http://localhost:9000/user/delete/`, { params: { requestData } })
		.then(response => {
			
		})
		.catch(error => {
			alert("An error occured - It has been logged to the console");
			console.log(error);
		})
	}

	const handleSubmit = (event) => {

		event.preventDefault();

		const requestData = {
			"_id": userId,
			"firstName": userFirstName,
			"lastName": userLastName,
			"email": userEmail,
			"role": userRole,
			"active": userIsActive
		}

		axios.patch(`http://localhost:9000/user/edit/${userId}`, requestData)
		.then(response => {
			if (response.data.message === "success") setSuccessMessage("User has been updates successfully!");
		})
		.catch(error => {
			alert("An error occured - It has been logged to the console");
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
				alert("An error occured - It has been logged to the console"); 
				console.log(error);
			});

		setUserID(id);

	}, []);

	return(
		<main className="content-wrapper dashboard user-edit">
			<div className="row">
				<div className="title">
					<h1>{`Edit: ${userFirstName} ${userLastName}`}</h1>
					<button type="button" className="btn btn-dash-back" onClick={() => {navigate(-1)}}>Back</button>
				</div>

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
						<button className="btn btn-dash-primary" type="submit">Save</button>
						<button className="btn btn-dash-delete" type="button" onClick={(e) => { setDisplayDeleteModel(true) }}>Delete</button>
					</div>

				</form>

				{(successMessage.length > 0) &&
					<p className="success-message">
						<span>{successMessage}</span>
						<span className="close" onClick={(event) => {setSuccessMessage("")}}>x</span>
					</p>
				}

				{ displayDeleteModel && 
				<>
					<div className="overlay"></div>
					<div className="popup-model delete">
						<div class="row">
							<div className="title">
								<h3>{`Delete: ${userFirstName} ${userLastName}`}</h3>
								<span className="close" onClick={() => { setDisplayDeleteModel(!setDisplayDeleteModel) }}>x</span>
							</div>
							<div className="content">
								<p>Copy what you see in the input field below:</p>
								<div className="inputs-wrapper">
									<form>
										<input type="text" placeholder="DELETE"/>
										<button className="btn btn-dash-delete" type="submit" onClick={ (event) => { handleDelete(event) }}>Delete</button>
									</form>
								</div>
							</div>
						</div>
					</div>
				</>
				}

			</div>
		</main>
	);
}

export default UpdateUser;