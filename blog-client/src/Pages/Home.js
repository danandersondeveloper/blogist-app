import { useState, useEffect } from "react"

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
				<h1>Home</h1>
				<div className="card-wrapper">
					{
						blogs.map(blog => (
							
								<div className="card" key={blog._id}>
									<p>{blog.title}</p>
								</div>
						)) 
					}
				</div>
			</div>
		</main>
	);
}

export default Home;