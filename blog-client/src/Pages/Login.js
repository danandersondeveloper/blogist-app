import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";


function Login() {

	const navigate = useNavigate();

	const [ auth, setAuth ] = useContext(AuthContext);
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');


	const handleLogin = () => {
		alert(`Email: ${email} - Password: ${password}`);
		setAuth(true);
		navigate('/');
	}

	return(
		<main className="content-wrapper register">
			<div class="row">
				<h1>Login</h1>
				<form onSubmit={handleLogin}>
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