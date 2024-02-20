import axios from "axios";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";


// Import contexts
import { AuthContext } from "../Contexts/AuthContext";

function Header() {

	const [ auth, setAuth ] = useContext(AuthContext);

	const handleLogout = () => {
		axios.get('http://localhost:9000/logout', {withCredentials: true})
		.then(response => {
			sessionStorage.removeItem("auth");
			sessionStorage.removeItem("role");
			if (response.data.message === 'success') setAuth(false);
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
										{ sessionStorage.getItem("role") == 'admin' &&
											<Link to="/dashboard">Dashboard</Link>
										}
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