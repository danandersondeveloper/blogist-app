import axios from "axios";

const getBlogs = async (filter) => {
	try {
		const response = await axios.get("http://localhost:9000/blog", { params: filter } );
		return response;
	} catch (err) {
		return err;
	}

}

export { getBlogs }