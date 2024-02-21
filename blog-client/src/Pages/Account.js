
import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { UserContext } from "../Contexts/UserContext";
import { Link } from "react-router-dom";

function Account() {

	const [ AUTH, setAuth] = useContext(AuthContext);
	const [ USER, setUser ] = useContext(UserContext);

	const [ firstName, setFirstName ] = useState(String);
	const [ lastName, setLastName ] = useState(String);
	const [ email, setEmail ] = useState(String);

	useEffect(() => {
		if (AUTH & USER.id != null & USER.id != undefined) {
			axios.get(`http://localhost:9000/user/${USER.id}`, { params: { id: USER.id } })
			.then(response => {
				setFirstName(response.data.firstName);
				setLastName(response.data.lastName);
				setEmail(response.data.email);
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