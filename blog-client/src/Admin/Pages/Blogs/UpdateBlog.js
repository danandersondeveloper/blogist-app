import { useNavigate } from "react-router-dom";


function UpdateBlog() {

	const navigate = useNavigate();

	return(
		<main className="content-wrapper dashboard">
			<div className="row">
				<div className="title">
					<h1>Update Blog Screen</h1>
					<button type="button" className="btn btn-dash-back" onClick={() => {navigate(-1)}}>Back</button>
				</div>
			</div>
		</main>
	)
}	

export default UpdateBlog;