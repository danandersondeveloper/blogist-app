import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function Register() {

	const navigate = useNavigate();

	const [ firstName, setFirstName ] = useState('');
	const [ lastName, setLastName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ formSubmitted, setFormSubmitted ] = useState(false);
	const [ invalidSubmit, setInalidSubmit ] = useState(true);
	const [ errorMessage, setErrorMessage ] = useState('');
	const [ showPassword, setShowPassword ] = useState(false);

	const handleSubmit = (event) => {

		event.preventDefault();

		const requestBody = {
			"firstName": firstName,
			"lastName": lastName,
			"email": email,
			"password": password
		}

		axios.post(`http://localhost:9000/user/register`, requestBody)
		.then(response => {
			if (response.data.message === "success") {
				setFormSubmitted(true);
				setInalidSubmit(true);
			};
			if (response.data.message != "success") {
				setErrorMessage(response.data.message);
				setInalidSubmit(false)
			};
		})
		.catch(err => console.log(err));

	}

	return(
		<main className="content-wrapper register">
			<div className="row">
				<h1>Register</h1>

				{ !invalidSubmit && <p className="error-message">{ errorMessage }</p> }

				{ !formSubmitted ? 

					<>

					<form onSubmit={(e) => {handleSubmit(e)}}>
						<div className="row">
							<label htmlFor="first-name">First Name:</label>
							<input
								type="text"
								name="first-name"
								value={ firstName }
								onChange={ (e) => { setFirstName(e.target.value)} }
							/>
						</div>
						<div className="row">
							<label htmlFor="last-name">Last Name:</label>
							<input
								type="text"
								name="last-name"
								value={ lastName }
								onChange={ (e) => { setLastName(e.target.value) } }
							/>
						</div>
						<div className="row">
							<label htmlFor="email">Email:</label>
							<input
								type="text"
								name="email"
								value={email}
								onChange={ (e) => { setEmail(e.target.value) } }
							/>
						</div>
						<div className="row">
							<label htmlFor="password">Password:</label>
							<input
								type={ showPassword ? "text" : "password"}
								name="password"
								value={password}
								onChange={ (e) => {setPassword(e.target.value) } }
							/>
							<button className="btn view-password" type="button" onClick={ () => { setShowPassword( !showPassword) } }>
								<FontAwesomeIcon icon={ showPassword? faEye : faEyeSlash } />
							</button>
							<span className="small">Password needs to be more than 5 characters</span>
						</div>
						<div className="row">
							<button className="btn btn-primary" type="submit">Register</button>
						</div>
					</form> 

					<div className="already-registered">
						<p>Already registered? <Link to="/login">Login</Link></p>
					</div>

					</>

					:

					<>
						<div className="registration-complete">
							<p>Thank you for regestering. Your account has been created!</p>
							<Link className="btn" to="/login">login</Link>
						</div>
					</>

				}
			</div>
		</main>
	);
}

export default Register;



