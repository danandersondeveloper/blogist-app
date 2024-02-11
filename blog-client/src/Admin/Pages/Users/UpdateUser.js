import { useEffect, useState } from "react";

function UpdateUser() {

	const [userId, setUserId] = useState("")

	useEffect(() => {
		const userId = window.location.href.replace("http://localhost:3000/dashboard/users/update/", "");
		setUserId(userId);

		// Need to make a request to server to get the relevant information.
		// On save, need to make a patch request to server to save data.

	}, []);

	return(
		<main className="content-wrapper dashboard">
			<div class="row">
				<div className="title">
					<h1>Edit: {userId}</h1>
				</div>
			</div>
		</main>
	);
}

export default UpdateUser;