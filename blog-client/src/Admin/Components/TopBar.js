import { useContext } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faLock } from "@fortawesome/free-solid-svg-icons";

// Import services
import { logout } from "../../Services/AuthServices";

// Import contexts
import { AuthContext } from "../../Contexts/AuthContext";

function TopBar() {

	const [ ...setAUTH ] = useContext(AuthContext);

	const handleLogout = async () => {
		
		const response = await logout();

		if (response.message === 'success') {
			setAUTH(response.setAuth);
		}

		window.location.reload();
	}

	return(
		<div className="top-bar">
			<div className="row">
				<nav className="secondary-navigation">
					<ul className="user-links">
						<li className="nav-border">
							<Link to="/">
								<span>
									<FontAwesomeIcon icon={ faGlobe } />
								</span>
								<span>Public site</span>
							</Link>
						</li>
						<li>
							<Link onClick={ handleLogout }>
								<span>
									<FontAwesomeIcon icon={ faLock } />
								</span>
								<span>Sign out</span>
							</Link>
						</li>
					</ul>
				</nav>
			</div>
		</div> 
	)
}

export default TopBar;