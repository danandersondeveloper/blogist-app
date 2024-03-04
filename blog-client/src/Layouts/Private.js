import { Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";


// Import Services

import { auth } from "../Services/AuthServices";

// Import Components

import Header from "../Admin/Components/Header";
import TopBar from "../Admin/Components/TopBar";
import Navigation from "../Admin/Components/Navigation";
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
					<div className="dashboard-wrapper">
						<div className="col main-navigation">
							<Header />
							<Navigation />
						</div>
						<div className="col main-content">
							<TopBar />
							<Outlet />
							<Footer />
						</div>
					</div>
				</>
			}
		</>
	);
}

export default Private;