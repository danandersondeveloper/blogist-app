import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

//Components
import PopupModel from "../../Components/PopupModel";

//Services
import { updateUser } from "../../Services/UserServices";

function UpdateUser() {

	const navigate = useNavigate();

	const [ userId, setUserId ] = useState(String);
	const [ userFirstName, setUserFirstName ] = useState(String);
	const [ userLastName, setUserLastName ] = useState(String);
	const [ userEmail, setUserEmail ] = useState(String);
	const [ userRole, setUserRole ] = useState(String);
	const [ userIsActive, setUserIsActive ] = useState(Boolean);
	const [ successMessage, setSuccessMessage ] = useState(String);

	const [ displayPopupModel, setDisplayPopupModel ] = useState(false);

	const handleSubmit = async (event) => {

		event.preventDefault();

		const requestData = {
			"_id": userId,
			"firstName": userFirstName,
			"lastName": userLastName,
			"email": userEmail,
			"role": userRole,
			"active": userIsActive
		}

		const response = await updateUser(userId, requestData);
		
		response.data.message === 'success' && setSuccessMessage("User has been updated successfully!");

	}

	useEffect(() => {

		const id = window.location.href.replace("http://localhost:3000/dashboard/users/update/", "")

		const requestData = {
			userId: id
		}

		axios.get(`http://localhost:9000/admin/user/${id}`, { params: requestData })
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

		setUserId(id);

	}, []);

	return(
		<main className="content-wrapper dashboard user-edit">
			<div className="row">

				{(successMessage.length > 0) &&
					<p className="success-message">
						<span>{successMessage}</span>
						<span className="close" onClick={(event) => {setSuccessMessage("")}}>x</span>
					</p>
				}

				<div className="title">
					<h1>{`Edit: ${userFirstName} ${userLastName}`}</h1>
					<button type="button" className="btn btn-dash-back" onClick={() => {navigate(-1)}}>Back</button>
				</div>

				<form onSubmit={(event) => { handleSubmit(event) }}>
					<div className="row">
						<label htmlFor="first-name">First Name:</label>
						<input
							type="text"
							name="first-name"
							value={ userFirstName }
							onChange={ (event) => { setUserFirstName(event.target.value)} } 
						/>
					</div>
					<div className="row">
						<label htmlFor="last-name">Last Name:</label>
						<input
							type="text"
							name="last-name"
							value={ userLastName }
							onChange={ (event) => { setUserLastName(event.target.value) } }
						/>
					</div>
					<div className="row">
						<label htmlFor="email">Email Address:</label>
						<input
							type="email"
							name="email"
							value={ userEmail }
							onChange={ (event) => { setUserEmail(event.target.value) } }
						/>
					</div>
					<div className="row">
						<label htmlFor="user-role">User Role:</label>
						{/* <input
							name="user-role"
							value={ userRole }
							onChange={ (event) => { setUserRole(event.target.value) } }
						/> */}
						<select value={ userRole } onChange={(event) => { setUserRole(event.target.value) }}>
							<option value="user">User</option>
							<option value="admin">Administrator</option>
						</select>
					</div>
					<div className="row">
						<label htmlFor="active">Active:</label>
						<input
							name="active"
							type="checkbox"
							checked={ userIsActive ? "checked" : "" }
							onChange={ () => { setUserIsActive(!userIsActive) } }
						/>
					</div>
					<div className="row">
						<button className="btn btn-dash-default" type="button" onClick={() => { navigate(-1) }}>Cancel</button>
						<button className="btn btn-dash-primary" type="submit">Save</button>
						<button className="btn btn-dash-delete" type="button" onClick={ () => { setDisplayPopupModel(true) } }>Delete</button>
					</div>

				</form>

				{ displayPopupModel && 

					<PopupModel
						config={{
							type: "delete",
							for: "user",
							data: {
								id: userId,
								title: `${userFirstName} ${userLastName}`
							}
						}}
						state={ displayPopupModel }
						setState={ setDisplayPopupModel }
					/>

				}

			</div>
		</main>
	);
}

export default UpdateUser;