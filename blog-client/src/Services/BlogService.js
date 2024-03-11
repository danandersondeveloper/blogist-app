import axios from "axios";

const BASE_URI = process.env.REACT_APP_API;

const getBlog = async () => {
	try {
		
	} catch(error) {
		return error
	}
}

const getBlogs = async () => {
	try {
		return await axios.get( `${BASE_URI}/blog`, { params: { status: true } } );
	} catch (error) {
		return error;
	}
}

export { getBlogs }