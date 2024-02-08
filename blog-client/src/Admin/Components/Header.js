import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import Cookies from "js-cookie";

// Import contexts
import { AuthContext } from "../../Contexts/AuthContext";

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
		<header className="header dashboard">
			<div className="row">
				<div className="col">
					<div className="logo">
						<Link to="/dashboard"><span className="logo-text">Dashboard</span></Link>
					</div>
				</div>
				<div className="col">
					<nav className="navigation">
						<ul>
							<li>
								<Link to="/dashboard/blogs">Blogs</Link>
							</li>
							<li>
								<Link to="/dashboard/users">Users</Link>
							</li>
							<li>
								<Link to="/">Public store</Link>
							</li>
							<li>
								<Link onClick={ handleLogout }>Logout</Link>
							</li>
						</ul>
					</nav>
				</div> 
			</div>
		</header>
	);
}

export default Header;