import axios from 'axios';
import { useContext } from "react";
import { Link } from "react-router-dom";


// Import contexts
import { AuthContext } from "../../Contexts/AuthContext";

function Header() {

	const [ auth, setAuth ] = useContext(AuthContext);

	const handleLogout = () => {
		axios.get('http://localhost:9000/logout', {withCredentials: true})
		.then(response => {
			sessionStorage.removeItem("auth");
			if (response.data.message === 'success') setAuth(false);
		});

		window.location.reload();
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
							<li className="nav-border">
								<Link to="/">Public site</Link>
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