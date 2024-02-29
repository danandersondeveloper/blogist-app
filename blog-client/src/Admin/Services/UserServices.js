import axios from "axios";

const deleteUser = async ( requestBody ) => {
	try {
		const response = await axios.delete( `http://localhost:9000/user/delete/`, { data: { requestBody } } )
		return response;
	} catch (error) {
		return error;
	}
}

const updateUser = async ( userId, requestBody ) => {
	try {
		const response = await axios.patch( `http://localhost:9000/user/edit/${ userId }`, requestBody );
		return response
	} catch(error) {
		return error;
	}
}

const createUser = async ( requestBody ) => {
	try {
		const response = await axios.post( `http://localhost:9000/user/register`, requestBody );
		return response;
	} catch(error) {
		return error;
	}
}

const getUsers = async () => {
	try {
		const response = await axios.get( `http://localhost:9000/user/` );
		return response;
	} catch(error) {
		return error;
	}
}

export {
	deleteUser,
	updateUser,
	createUser,
	getUsers,
}