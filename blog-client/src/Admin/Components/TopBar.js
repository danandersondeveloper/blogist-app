import { useContext } from "react";
import { Link } from "react-router-dom";

// Import services
import { logout } from "../../Services/AuthServices";

// Import contexts
import { AuthContext } from "../../Contexts/AuthContext";
import { UserContext } from "../../Contexts/UserContext";

function TopBar() {

	const [ ...setAuth ] = useContext(AuthContext);
	const [ ...setUser ] = useContext(UserContext);

	const handleLogout = async () => {
		
		const response = await logout();

		if (response === 'success') {
			setUser({ id: null, name: null, role: null });
			setAuth(false);
		}

		window.location.reload();
	}

	return(
		<div className="top-bar">
			<div className="row">
				<nav className="secondary-navigation">
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
	)
}

export default TopBar;