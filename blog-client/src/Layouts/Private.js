import { Outlet, Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";

// Import comtexts
import { AuthContext } from "../Contexts/AuthContext";
import { UserContext } from "../Contexts/UserContext";

// Import components
import Header from "../Admin/Components/Header";
import Footer from "../Admin/Components/Footer";

function Private() {

	const [ AUTH, setAuth ] = useContext(AuthContext);
	const [ USER, setUser ] = useContext(UserContext);

	return (
		<>
			{ ( AUTH  && USER.role === 'admin') ?
				<>
					<Header />
					<Outlet />
					<Footer />
				</>	
				
			:	
				<Navigate to="/login" replace />		
			}
		</>
	);
}

export default Private;