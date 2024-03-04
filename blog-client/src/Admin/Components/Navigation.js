import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faUser, faPencil } from "@fortawesome/free-solid-svg-icons";

function Navigation() {
	return(
		<nav className="navigation">
			<ul className="admin-links">
				<li>
					<Link to="/dashboard/settings"><span><FontAwesomeIcon icon={ faGear } /></span>Settings</Link>
				</li>
				<li>
					<Link to="/dashboard/users"><span><FontAwesomeIcon icon={ faUser } /></span>Users</Link>
				</li>
				<li>
					<Link to="/dashboard/blogs"><span><FontAwesomeIcon icon={ faPencil } /></span>Blogs</Link>
				</li>
			</ul>
		</nav>
	);
}

export default Navigation;