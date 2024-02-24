import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//Import services
import { getBlogs } from "../../Services/BlogServices";


function Blogs() {

	const [ blogs, setBlogs ] = useState([]);

	const requestBlogData = async () => {
		const blogs = await getBlogs();
		setBlogs(blogs.data)
	};

	useEffect(() => {
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

				{blogs.length <= 0 ?

					<div className="no-data-found">
						<div className="row">
							<p>No user information found!</p>
						</div>
					</div>

					:

					<div className="table blogs">
						<div className="row headers">
							<div className="cell">
								<span>Title</span>
							</div>
							<div className="cell">
								<span>State</span>
							</div>
							<div className="cell">
								<span>Created</span>
							</div>
							<div className="cell">
								<span className="hide-font">edit</span>
							</div>
						</div>
						{blogs.map(blog => (
							<div className="row" key={blog._id}>
								<div className="cell">
									<span>{blog.title}</span>
								</div>
								<div className="cell">
									<span>{blog.state}</span>
								</div>
								<div className="cell">
									<span>{blog.created}</span>
								</div>
								<div className="cell">
									<Link className="btn btn-dash-primary" to={`/dashboard/blog/update/${blog._id}`}>
										<span>Edit</span>
									</Link>
								</div>
							</div>
						))}
					</div>

				}

			</div>
		</main>
	)
}

export default Blogs;