import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";

import { getBlogs } from "../Services/BlogService";

function Home() {

	const [blogs, setBlogs] = useState(Array);

	useEffect(() => {
		
		(async () => {
			const request = await getBlogs();
			setBlogs(request.data)
		})();

	}, []);

	return(
		<main className="content-wrapper">
			<div className="row">
				<div className="card-wrapper">
					{
						blogs.map(blog => (
							<div className="card" key={ blog._id }>
								<Link to={`/blog/${ blog._id }`}>
									<div className="picture">
										<img src={ blog.picture } alt="Blog picture" />
									</div>
									<div className="content">
										<h4>{ blog.title }</h4>
										<p>{ blog.shortDescription }</p>
										<div className="extra-content">
											<div className="buttons-wrapper">
												<Link className="btn btn-primary small" to={`/blog/${ blog._id }`}>Read blog</Link>
												<Link to="#" className="btn btn-default small read-later">
													Read later
													<FontAwesomeIcon icon={ faFolderOpen } />
												</Link>
											</div>
											<div className="created">
												<span>Published: </span>
												<span>{ blog.created }</span>
											</div>	
										</div>
									</div>
								</Link>
							</div>
						))
					}
				</div>
			</div>
		</main>
	);
}

export default Home;