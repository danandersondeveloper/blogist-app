import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

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
							<div className="cell narrow center">
								<span>Status</span>
							</div>
							<div className="cell narrow">
								<span>Created</span>
							</div>
							<div className="cell narrow">
								<span className="hide-font">edit</span>
							</div>
						</div>
						{blogs.map(blog => (
							<div className="row" key={blog._id}>
								<div className="cell">
									<span>{blog.title}</span>
								</div>
								<div className="cell narrow center">
									<span>
										{blog.status ?

											<FontAwesomeIcon icon={ faCheck } />
											:
											<FontAwesomeIcon icon={ faXmark } />

										}
									</span>
								</div>
								<div className="cell narrow">
									<span>{blog.created}</span>
								</div>
								<div className="cell narrow">
									<Link className="btn btn-dash-primary" to={`/dashboard/blogs/update/${blog._id}`}>
										<span><FontAwesomeIcon icon={ faPenToSquare } /></span>
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