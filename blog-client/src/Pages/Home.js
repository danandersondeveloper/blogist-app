import { useState, useEffect } from "react"

// Services
import { getBlogs } from "../Services/BlogService";

// Components
import Card from "../Components/Card";

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

							<Card
								key={blog._id}
								config={{
									blogId: blog._id,
									blogPicture: blog.picture,
									blogTitle: blog.title,
									blogShortDescription: blog.shortDescription,
									blogCreated: blog.created,
									blogCategory: blog.category
								}} 
							/>

						))
					}
				</div>
			</div>
		</main>
	);
}

export default Home;