import axios from "axios";

const getBlogs = async () => {
	try {
		const response = await axios.get("http://localhost:9000/blog");
		return response;
	} catch (err) {
		return err;
	}

}

export { getBlogs }