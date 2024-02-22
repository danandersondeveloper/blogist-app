
import { useContext } from "react";
import { Link } from "react-router-dom";


// Import services
import { logout } from "../../Services/AuthServices";

// Import contexts
import { AuthContext } from "../../Contexts/AuthContext";
import { UserContext } from "../../Contexts/UserContext";

function Header() {

	const [ AUTH, setAuth ] = useContext(AuthContext);
	const [ USER, setUser ] = useContext(UserContext);

	const handleLogout = async () => {
		
		const response = await logout();

		if (response === 'success') {
			setUser({ id: null, name: null, role: null });
			setAuth(false);
		}

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
						<ul className="admin-links">
							<li>
								<Link to="/dashboard/blogs">Blogs</Link>
							</li>
							<li>
								<Link to="/dashboard/users">Users</Link>
							</li>
						</ul>
						<ul className="user-links">
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