import { useState, useEffect } from "react"
import { Link } from "react-router-dom";

import { getBlogs } from "../Services/BlogService";

function Home() {

	const [blogs, setBlogs] = useState(Array);

	useEffect(() => {
		
		(async () => {
			const request = await getBlogs();
			console.log(request.data)
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
										<div className="buttons-wrapper">
											<Link to={`/blog/${ blog._id }`}>Read Blog</Link>
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