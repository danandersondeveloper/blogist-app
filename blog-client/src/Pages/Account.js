
import axios from "axios";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";

// Contexts

import { AuthContext } from "../Contexts/AuthContext";

function Account() {

	const [ AUTH, setAUTH] = useContext(AuthContext);

	useEffect(() => {

		if (AUTH.auth) {
			axios.get(`http://localhost:9000/user/info`, { withCredentials: true })
			.then(response => {
				console.log(response.data)
			})
			.catch(error => {
				console.log(error);
			});
		}

	}, [])

	return(
		<main className="content-wrapper account">
			<div className="row">
				<div className="title">
					<h1>Account</h1>
				</div>

				{ !AUTH.user ?
					<div className="content">
						<p>Does not look like you are logged in. You can either <Link className="btn-link" to="/login">Login</Link> or <Link className="btn-link" to="/register">Register</Link></p>
					</div>

					:

					<div className="user-information">
						<div className="row">

						</div>
					</div>
				}



			</div>
		</main>
	);
}

export default Account;