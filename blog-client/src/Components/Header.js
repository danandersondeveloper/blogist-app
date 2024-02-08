import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import Cookies from "js-cookie";

// Import contexts
import { AuthContext } from "../Contexts/AuthContext";

function Header() {

	const navigate = useNavigate();
	const [ auth, setAuth ] = useContext(AuthContext);

	const handleLogout = () => {
		Cookies.remove("auth");
		Cookies.remove("user");
		Cookies.remove("role");
		setAuth(!auth);
		navigate("/");
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
							{!auth ?
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
									<li>
										<Link to="/dashboard">Dashboard</Link>
									</li>
									<li>
										<Link onClick={ handleLogout }>Logout</Link>
									</li>
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