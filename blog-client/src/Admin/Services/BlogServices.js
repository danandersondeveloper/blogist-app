import axios from "axios";

const BASE_URI = process.env.REACT_APP_API;

const getBlogs = async () => {
	try {
		return await axios.get( `${BASE_URI}/admin/blog` );
	} catch (err) {
		return err;
	}

}

export { getBlogs }