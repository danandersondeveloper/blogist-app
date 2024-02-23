import { Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";


// Import Services

import { auth } from "../Services/AuthServices";

// Import Components

import Header from "../Admin/Components/Header";
import Footer from "../Admin/Components/Footer";

function Private() {

	const navigate = useNavigate();

	const [ autherised, setAutherised ] = useState();

	useEffect(() => {
		(async () => {
			try {
				const response = await auth();
				(!response.auth || response.user.role !== "admin" || response.user.role === "user" || response.user.role === "guest") && navigate("/login")
				setAutherised(true)
			} catch (error) {
				setAutherised(false)
				navigate("/login")
			}
		})();
	},[]);

	return (
		<>
			{ autherised &&
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