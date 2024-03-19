import axios from "axios";

const BASE_URI = process.env.REACT_APP_API;


const deleteBlog = async ( requestBody ) => {
	try {
		return await axios.delete( `${BASE_URI}/admin/blog/delete/`, { data: { requestBody } } )
	} catch (error) {
		return error;
	}
}

const updateBlog = async ( blogId, requestBody ) => {
	try {
		return await axios.patch( `${BASE_URI}/admin/blog/update/${ blogId }`, requestBody );
	} catch (error) {
		return error;
	}
}


const getBlogs = async () => {
	try {
		return await axios.get( `${BASE_URI}/admin/blog` );
	} catch (error) {
		return error;
	}

}

export {
	deleteBlog,
	updateBlog,
	getBlogs
}