import { useNavigate } from "react-router-dom";

function CreateBlog() {

	const navigate = useNavigate();

	return(
		<main className="content-wrapper dashboard create-blog">
			<div className="row">
				<div className="title">
					<h1>Create Blog</h1>
					<button type="button" className="btn btn-dash-back" onClick={() => {navigate(-1)}}>Back</button>
				</div>
			</div>
		</main>
	);
}

export default CreateBlog;