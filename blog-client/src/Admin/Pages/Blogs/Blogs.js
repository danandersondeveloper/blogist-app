import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//Import services
import { getBlogs } from "../../Services/BlogServices";


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
					<div className="buttons-wrapper">
						<Link className="btn btn-create" to="/dashboard/blogs/create">Create Blog</Link>
						<Link className="btn btn-export" to="X">Export JSON</Link>
					</div>
				</div>
			</div>
		</main>
	)
}

export default Blogs;