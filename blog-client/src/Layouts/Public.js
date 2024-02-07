import { Outlet } from "react-router-dom";

// Components imports
import Header from "../Components/Header";
import Footer from "../Components/Footer";

function Public() {
	return(
		<>
			<Header />
			<Outlet />
			<Footer/>
		</>
	)
}

export default Public;