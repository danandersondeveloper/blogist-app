import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";
import { login } from "../Services/AuthServices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function Login() {

	const navigate = useNavigate();

	const [ ,setAUTH ] = useContext(AuthContext);

	const [ invalidSubmit, setInvalidSubmit ] = useState(false)
	const [ invalidSubmitMessage, setInvalidSubmitMessage ] = useState('Invalid email or password!')
	const [ email, setEmail ] = useState(String);
	const [ password, setPassword ] = useState(String);
	const [ showPassword, setShowPassword ] = useState(false);


	const handleLogin = async (event) => {
		event.preventDefault();

		setInvalidSubmit(false);

		if (email.length <= 0 || password.length <= 0) return setInvalidSubmit(true);

		const requestBody = {
			"email": email,
			"password": password
		}

		const response = await login(requestBody);

		if (response.message !== 'success') {
			setInvalidSubmitMessage(response);
			setInvalidSubmit(true);
			return;
		}

		setAUTH(response.setAUTH);
		navigate("/");
	}

	return(
		<main className="content-wrapper login">
			<div className="row">
				<div className="form-wrapper">

					<h1>Welcome Back.</h1>

					{invalidSubmit && <p className="error-message">{invalidSubmitMessage}</p>}

					<form onSubmit={(e) => {handleLogin(e)}}>
						<div className="row">
							<label htmlFor="email">Email:</label>
							<input
								type="text"
								name="email"
								value={ email }
								autoComplete="username"
								onChange={(e) => { setEmail(e.target.value) }}
							/>
						</div>
						<div className="row">
							<label htmlFor="password">Password:</label>
							<input 
								type={!showPassword ? "password" : "text"}
								name="password"
								value={ password }
								onChange={(e) => { setPassword(e.target.value) }}
								autoComplete="current-password"
							/>
							<button className="btn view-password" type="button" onClick={() => { setShowPassword(!showPassword) }}>
								{ !showPassword ? <FontAwesomeIcon icon={ faEye } /> : <FontAwesomeIcon icon={ faEyeSlash } />}
							</button>
						</div>
						<div className="row">
							<button className="btn btn-primary" type="submit">Login</button>
						</div>
					</form>

					<div className="not-registered">
						<p>Not register? <Link className="btn-link" to="/register">Register</Link></p>
					</div>
				</div>
			</div>
		</main>
	);
}

export default Login;