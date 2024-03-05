
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faGauge, faLock } from "@fortawesome/free-solid-svg-icons";


// Import services
import { logout } from "../Services/AuthServices";

// Import contexts
import { AuthContext } from "../Contexts/AuthContext";

function Header() {

	const navigate = useNavigate();

	const [ AUTH, setAUTH ] = useContext(AuthContext);

	const handleLogout = async () => {

		const response = await logout();

		if (response === 'success') {
			setAUTH(response.setAUTH);
		}

		navigate("/");
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
							{!AUTH.auth ?
								<>
									<li>
										<Link to="/login">Sign in</Link>
									</li>
									<li>
										<Link to="/register" className="get-started">Get started</Link>
									</li>
								</>
								:
								<>
									{AUTH.user &&
										<li>
											<Link>Welcome, { AUTH.user.name }</Link>
											<div className="dropdown-wrapper">
												<ul className="dropdown">
													<li>
														<Link to="/account">
															<span className="icon"><FontAwesomeIcon icon={ faUser } /></span>
															<span>My Account</span>
														</Link>
													</li>
													{ AUTH?.user.role === "admin" &&
														<li>
															<Link to="/dashboard">
																<span className="icon"><FontAwesomeIcon icon={ faGauge } /></span>
																<span>Dashboard</span>
															</Link>							
														</li>
													}
													<li>
														<Link onClick={ handleLogout }>
															<span className="icon"><FontAwesomeIcon icon={ faLock } /></span>
															<span>Sign out</span>
														</Link>
													</li>
												</ul>
											</div>
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