
import axios from "axios";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { UserContext } from "../Contexts/UserContext";

function Account() {

	const [ AUTH, setAuth] = useContext(AuthContext);
	const [ USER, setUser ] = useContext(UserContext);

	const [ firstName, setFirstName ] = useState(String);
	const [ lastName, setLastName ] = useState(String);
	const [ email, setEmail ] = useState(String);

	useEffect(() => {
		if (AUTH & USER.id != null & USER.id != undefined) {
			axios.get(`http://localhost:9000/user/info`, { withCredentials: true })
			.then(response => {
				console.log(response.data)
			})
			.catch(error => {
				console.log(error);
			});
		}
	}, [AUTH])

	return(
		<main className="content-wrapper account">
			<div className="row">
				<div className="title">
					<h1>Account</h1>
				</div>

				{ !AUTH ?
					<div className="content">
						<p>Does not look like you are logged in. You can either <Link className="btn-link" to="/login">Login</Link> or <Link className="btn-link" to="/register">Register</Link></p>
					</div>

					:

					<div className="user-information">
						<div className="row">
							<div className="cell">
								<span>{firstName}</span>
							</div>
							<div className="cell">
								<span>{lastName}</span>
							</div>
							<div className="cell">
								<span>{email}</span>
							</div>
						</div>
					</div>
				}



			</div>
		</main>
	);
}

export default Account;