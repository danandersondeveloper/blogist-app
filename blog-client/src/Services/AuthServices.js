import axios from "axios";

const BASE_URI = process.env.REACT_APP_API;

// Authenticate a user

const auth = async () => {
	try {

		const response = await axios.get(`${BASE_URI}/auth`, { withCredentials: true })
		return response.data;

	} catch(error) {
		return error.data.message
	}
}


// reguest user login

const login = async (requestBody) =>  {
	try {

		const response =  await axios.post(`${BASE_URI}/auth/login`, requestBody, {withCredentials: true})
		return response.data;

	} catch(error) {

		return error.response.data.message;

	}
}


// Request user logout

const logout = async () => {
	try {

		const response = await axios.get(`${BASE_URI}/logout`, { withCredentials: true })
		return response.data.message;

	} catch(error) {

		return error.response.message

	}
}

export { 
	auth,
	login,
	logout
}



