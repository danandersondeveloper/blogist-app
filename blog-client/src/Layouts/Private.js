import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";

// Import comtexts
import { AuthContext } from "../Contexts/AuthContext";

// Import components
import Header from "../Admin/Components/Header";
import Footer from "../Admin/Components/Footer";

function Private() {

	const [ auth, setAuth ] = useContext(AuthContext);

	return (
		<>
			{!auth ?
				<Navigate to="/login" replace />
			:
				<>
					<Header />
					<Outlet />
					<Footer />
				</>				
			}
		</>
	);
}

export default Private;