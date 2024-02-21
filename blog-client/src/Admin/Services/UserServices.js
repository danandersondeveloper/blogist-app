import axios from "axios";

const createUser = async (requestBody) => {
	try {
		const response = await axios.post(`http://localhost:9000/user/register`, requestBody);
		return response;
	} catch(error) {
		return error;
	}
}

const getUsers = async () => {
	try {
		const response = await axios.get("http://localhost:9000/user/");
		return response;
	} catch(error) {
		return error;
	}
}

export {
	createUser,
	getUsers,
}