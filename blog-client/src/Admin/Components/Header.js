
import { Link } from "react-router-dom";

function Header() {

	return(
		<header className="header dashboard">
			<div className="row">
				<div className="col">
					<div className="logo">
						<Link to="/dashboard"><span className="logo-text">Dashboard</span></Link>
					</div>
				</div>
			</div>
		</header>
	);
	
}

export default Header;