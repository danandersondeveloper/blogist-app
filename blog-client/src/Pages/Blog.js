import axios from "axios";
import parse from 'html-react-parser';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";

function Blog() {

	const navigate = useNavigate();

	const [ blogPicture, setBlogPicture ] = useState(String);
	const [ blogTitle, setBlogTitle ] = useState(String);
	const [ blogCreated, setBlogCreated ] = useState(String);
	const [ blogContent, setBlogContent ] = useState(String);

	useEffect(() => {

		const id = window.location.href.replace("http://localhost:3000/blog/", "")

		const requestData = {
			blogId: id
		}

		axios.get(`http://localhost:9000/blog/${id}`, { params: requestData })
		.then(response => { 
			setBlogPicture(response.data.picture);
			setBlogTitle(response.data.title);
			setBlogCreated(response.data.created);
			setBlogContent(response.data.content);
		})
		.catch(error => {
			alert(error)
		})

	}, []);

	return(
		<main className="content-wrapper">
			<div className="row">
				<div className="blog">
					<div className="banner">
						<img src={ blogPicture } alt="Blog banner" />
					</div>
					<div className="title">
						<h1>{ blogTitle }</h1>
						<small>Created: { blogCreated }</small>
					</div>
					<div className="content">
						{parse( blogContent )}
					</div>
					<div className="buttons-wrapper">
						<button className="btn btn-default small read-later">
							<FontAwesomeIcon icon={ faFolderOpen } />
						</button>
						<button className="btn btn-primary small" type="button" onClick={ () => { navigate(-1) } }>Finished</button>
					</div>
				</div>
			</div>
		</main>
	)
}

export default Blog;