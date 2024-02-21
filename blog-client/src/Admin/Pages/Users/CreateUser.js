import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faXmark } from "@fortawesome/free-solid-svg-icons";

// SERVIVES
import { createUser } from "../../Services/UserServices";

function CreateUser() {

	const navigate = useNavigate();

	const [ userFirstName, setUserFirstName ] = useState(String);
	const [ userLastName, setUserLastName ] = useState(String);
	const [ userEmail, setUserEmail ] = useState(String);
	const [ userPassword, setUserPassword ] = useState(String);
	const [ userRole, setUserRole ] = useState(String);
	const [ userIsActive, setUserIsActive ] = useState(true);
	const [ showPassword, setShowPassword ] = useState(false);
	const [ messageType, setMessageType ] = useState(String);
	const [ messageContents, setMessageContents ] = useState(String);
	const [ showMessage, setShowMessage ] = useState(false);

	const handleMessage = (status, data, className) => {
		setMessageType(className)
		setMessageContents(data.message);
		setShowMessage(status);
	}

	const handleSubmit = async (event) => {
		
		event.preventDefault();

		const requestBody = {
			"firstName": userFirstName,
			"lastName": userLastName,
			"email": userEmail,
			"password": userPassword,
			"role": userRole,
			"active": userIsActive
		}

		const response = await createUser(requestBody);

		response.data.message === "success" && handleMessage(true, { message: "User has successfully been create" }, "success-message");
		response.data.message !== "success" && handleMessage(true, { message: response.data.message }, "error-message");

		setUserFirstName("");
		setUserLastName("");
		setUserEmail("");
		setUserPassword("");
		setUserRole("");
		setUserIsActive("");

	}

	return(
		<main className="content-wrapper dashboard create-user">
			<div className="row">

				{ showMessage &&
					<p className={ messageType }>
						<span>{ messageContents }</span>
						<span className="close" onClick={(event) => { setShowMessage(false) }}>
							<FontAwesomeIcon icon={ faXmark } />
						</span>
					</p>
				}

				<div className="title">
					<h1>Create New User</h1>
					<button type="button" className="btn btn-dash-back" onClick={() => {navigate(-1)}}>Back</button>
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
						<label htmlFor="password">Password:</label>
						<input
							type={ showPassword ? "text" : "password"}
							name="password"
							value={ userPassword }
							onChange={(event) => { setUserPassword(event.target.value) }}
						/>
						<button className="btn view-password" type="button" onClick={() => { setShowPassword(!showPassword) }}>
							{ !showPassword ? <FontAwesomeIcon icon={ faEye } /> : <FontAwesomeIcon icon={ faEyeSlash } />}
						</button>
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
						<button className="btn btn-dash-primary" type="submit">Save</button>
					</div>
				</form>

			</div>

		</main>
	);
}

export default CreateUser;