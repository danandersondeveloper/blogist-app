import axios from "axios";

const deleteUser = async ( requestBody ) => {
	try {
		return await axios.delete( `http://localhost:9000/user/delete/`, { data: { requestBody } } )
	} catch (error) {
		return error;
	}
}

const updateUser = async ( userId, requestBody ) => {
	try {
		return await axios.patch( `http://localhost:9000/user/edit/${ userId }`, requestBody );
	} catch(error) {
		return error;
	}
}

const createUser = async ( requestBody ) => {
	try {
		return await axios.post( `http://localhost:9000/user/register`, requestBody );
	} catch(error) {
		return error;
	}
}

const getUsers = async () => {
	try {
		return await axios.get( `http://localhost:9000/user/` );
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