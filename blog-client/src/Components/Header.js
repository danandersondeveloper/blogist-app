import axios from "axios";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";


// Import contexts
import { AuthContext } from "../Contexts/AuthContext";
import { UserContext } from "../Contexts/UserContext";

function Header() {

	const [ AUTH, setAuth ] = useContext(AuthContext);
	const [ USER, setUser ] = useContext(UserContext);

	const handleLogout = () => {
		axios.get('http://localhost:9000/logout', {withCredentials: true})
		.then(response => {
			if (response.data.message === 'success') {
				setUser({ id: null, name: null, role: null });
				setAuth(false);
			}
		});

		window.location.reload();
	}

	return(
		<header className="header">
			<div className="row">
				<div className="col">
					<div className="logo">
						<Link to="/"><span className="logo-text">Blogist</span></Link>
					</div>
				</div>
				<div className="col">
					<nav className="navigation">
						<ul>
							<li>
								<Link to="/">Home</Link>
							</li>
							{!AUTH ?
								<>
									<li>
										<Link to="/login">Login</Link>
									</li>
									<li>
										<Link to="/register">Register</Link>
									</li>
								</>
								:
								<>
									{USER &&
										<li>
											<Link>Welcome, {USER.name}</Link>
											<ul className="dropdown">
												<li>
													<Link to="/account">My Account</Link>
												</li>
												{ USER?.role === "admin" &&
													<li>
														<Link to="/dashboard">Dashboard</Link>							
													</li>
												}
												<li>
													<Link onClick={ handleLogout }>Logout</Link>
												</li>
											</ul>
										</li>
									}
								</>
							}
						</ul>
					</nav>
				</div>
			</div>
		</header>
	);
}

export default Header;