import axios from "axios";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";

// Contexts

import { AuthContext } from "../Contexts/AuthContext";

function Account() {

	const [ AUTH, setAUTH] = useContext(AuthContext);

	const [ picture, setPicture] = useState(String);
	const [ firstName, setFirstName ] = useState(String);
	const [ lastName, setLastName] = useState(String);
	const [ email, setEmail] = useState(String);
	const [ created, setCreated ] = useState(String);

	const handleMultiSelect = (event) => {
		alert(event.target.value)
	}

	useEffect(() => {

		console.log(AUTH)

		if (AUTH.auth) {
			axios.get(`http://localhost:9000/user/info`, { withCredentials: true })
			.then(response => {
				console.log(response.data)
				setFirstName(response.data.user.firstName);
				setLastName(response.data.user.lastName)
				setEmail(response.data.user.email);
				setCreated(response.data.user.created);
			})
			.catch(error => {
				console.log(error);
			});
		}

	}, [AUTH])

	return(
		<main className="content-wrapper account">
			<div className="row">

				{ !AUTH.auth ?
					<>
						<div className="title">
							<h1>Account</h1>
						</div>
						<div className="content">
							<p>Does not look like you are logged in. You can either <Link className="btn-link" to="/login">Login</Link> or <Link className="btn-link" to="/register">Register</Link></p>
						</div>
					</>

					:

					<div className="user-information">
						<div className="row">
							<div className="col">
								<div className="picture">
									{
										picture ?

										<div className="picture">
											
										</div>

										:

										<div className="picture-unset">
											<div className="default-image">
												<img src="https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg" alt="default-user-icon" />
											</div>
											<div className="upload-image">
												<button className="btn small" type="button">Upload</button>
											</div>
										</div>

									}
								</div>
								<div className="basic-information">
									<h3>{`Welcome, ${ firstName } ${ lastName }`}</h3>
									<small>{`Member Since: ${ created }`}</small>
								</div>
							</div>
							<div className="col">
								<form>
									<div className="section-title first-title">
										<h3>General Information:</h3>
									</div>
									<div className="row">
										<label>First Name:</label>
										<input
											type="text"
											value={ firstName }
											onChange={ (event) => { setFirstName(event.target.value ) } }
										/>
									</div>
									<div className="row">
										<label>Last Name:</label>
										<input
											type="text"
											value={ lastName }
											onChange={ (event) => { setLastName(event.target.value ) } }
										/>
									</div>
									<div className="row">
										<label>Email:</label>
										<input
											type="email"
											value={ email }
											onChange={ (event) => { setEmail(event.target.value) } }
										/>
									</div>
									<div className="section-title">
										<h3>Optional Information:</h3>
									</div>
									<div className="row">
										<label>Date of Birth:</label>
										<input
											type="date"
										/>
									</div>
									<div className="row">
										<label>Gender</label>
										<select>
											<option value="male">Male</option>
											<option value="female">Female</option>
										</select>
									</div>
									<div className="section-title">
										<h3>Blog Categories:</h3>
									</div>
									<div className="row multi">
										<label>Categories:</label>
										<div className="multi-select-input">
											
										</div>
										<select className="multi-select-categories" onChange={(event) => {alert(event.target.value)}}>
											<option value="business">Business</option>
											<option value="fashion">Fashion</option>
											<option value="health">Health</option>
											<option value="food">Food</option>
											<option value="music">Music</option>
										</select>
									</div>
									<div className="row">
										<button className="btn btn-delete" type="button">Delete Account</button>
										<button className="btn btn-primary" type="submit">Save</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				}



			</div>
		</main>
	);
}

export default Account;