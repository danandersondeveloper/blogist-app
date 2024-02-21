import axios from "axios";


// Authenticate a user

const auth = async () => {
	try {

		const response = await axios.get('http://localhost:9000/auth', { withCredentials: true })
		return response.data;

	} catch(error) {
		return error.data.message
	}
}


// reguest user login

const login = async (requestBody) =>  {
	try {

		const response =  await axios.post("http://localhost:9000/auth/login", requestBody, {withCredentials: true})
		return response.data;

	} catch(error) {

		return error.response.data.message;

	}
}


// Request user logout

const logout = async () => {
	try {

		const response = await axios.get('http://localhost:9000/logout', { withCredentials: true })
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



