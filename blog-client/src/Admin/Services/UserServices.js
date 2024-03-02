import axios from "axios";

const BASE_URI = process.env.REACT_APP_API;

const exportUsers = async () => {
	try {
		return axios.get(`${BASE_URI}/admin/user/export`)	
	} catch (error) {
		return error
	}
}

const deleteUser = async ( requestBody ) => {
	try {
		return await axios.delete( `${BASE_URI}/admin/user/delete/`, { data: { requestBody } } )
	} catch (error) {
		return error;
	}
}

const updateUser = async ( userId, requestBody ) => {
	try {
		return await axios.patch( `${BASE_URI}/admin/user/update/${ userId }`, requestBody );
	} catch(error) {
		return error;
	}
}

const createUser = async ( requestBody ) => {
	try {
		return await axios.post( `${BASE_URI}/admin/user/register`, requestBody );
	} catch(error) {
		return error;
	}
}

const searchUsers = async ( searchString ) => {
	try {
		return await axios.get(`${BASE_URI}/admin/user/search`, { params: { "search": searchString } })
	} catch(error) {
		return error
	}
}

const getUsers = async () => {
	try {
		return await axios.get( `${BASE_URI}/admin/user/` );
	} catch(error) {
		return error;
	}
}

export { exportUsers, deleteUser, updateUser, createUser, searchUsers, getUsers }