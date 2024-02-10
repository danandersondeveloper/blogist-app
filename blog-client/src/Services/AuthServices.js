import axios from "axios";

//
const login = async (requestBody) =>  {
	try {
		const response =  await axios.post("http://localhost:9000/auth/login", requestBody, {withCredentials: true})
		return response.data.message;
	} catch(error) {
		return error.response.data.message;
	}
}

export { login }



