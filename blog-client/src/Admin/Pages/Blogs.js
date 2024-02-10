import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//Import services
import { getBlogs } from "../Services/BlogServices";


function Blogs() {

	const [ blogs, setBlogs ] = useState();

	useEffect(() => {
		const requestBlogData = async () => {
			const blogs = await getBlogs();
			setBlogs(blogs.data);
		};
		requestBlogData();
	}, []);

	return(
		<main className="content-wrapper dashboard">
			<div className="row">
				<div className="title">
					<h1>Blogs</h1>
					<div class="button-wrapper">
						<Link to="#">Create blog</Link>
					</div>
				</div>
			</div>
		</main>
	)
}

export default Blogs;