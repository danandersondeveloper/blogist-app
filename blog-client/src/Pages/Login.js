import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../Contexts/AuthContext";


function Login() {

	const navigate = useNavigate();

	const [ auth, setAuth ] = useContext(AuthContext);
	const [ invalidSubmit, setInvalidSubmit ] = useState(false)
	const [invalidSubmitMessage, setInvalidSubmitMessage ] = useState('Invalid email or password!')
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');


	const handleLogin = (event) => {
		event.preventDefault();

		if (email.length <= 0 || password.length <= 0) return setInvalidSubmit(true);

		const requestBody = {
			"email": email,
			"password": password
		}

		axios.post("http://localhost:9000/user/login", requestBody, {withCredentials: true})
		.then(resposne => {
			resposne.data.message === "Success" && setAuth(true);
			navigate("/")
		})
		.catch(err => {
			setInvalidSubmitMessage(err.response.data.message);
			setInvalidSubmit(true)
		});

		//setAuth(true);
	}

	return(
		<main className="content-wrapper login">
			<div className="row">
				<h1>Login</h1>

				{invalidSubmit && <p className="error-message">{invalidSubmitMessage}</p>}

				<form onSubmit={(e) => {handleLogin(e)}}>
					<div className="row">
						<label htmlFor="email">Email</label>
						<input type="text" name="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
					</div>
					<div className="row">
						<label htmlFor="password">Password</label>
						<input type="password" name="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
					</div>
					<div className="row">
						<button className="btn btn-primary" type="submit">Login</button>
					</div>
				</form>
			</div>
		</main>
	);
}

export default Login;