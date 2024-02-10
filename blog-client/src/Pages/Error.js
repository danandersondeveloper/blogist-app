import { Link } from "react-router-dom"; 


function Error() {
	return(
		<main className="content-wrapper">
			<div class="row">
				<h1>Error 404</h1>
				<p>Not all those who wander are lost. However, this page does not exist. <Link to="/">Take me home!</Link></p>
			</div>
		</main>
	);
}

export default Error;