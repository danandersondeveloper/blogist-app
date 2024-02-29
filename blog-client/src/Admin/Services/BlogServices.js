import axios from "axios";

const getBlogs = async () => {
	try {
		return await axios.get("http://localhost:9000/blog" );
	} catch (err) {
		return err;
	}

}

export { getBlogs }