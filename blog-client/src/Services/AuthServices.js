import axios from "axios";

//
const login = async (requestBody) =>  {
	try {
		const response =  await axios.post("http://localhost:9000/auth/login", requestBody, {withCredentials: true})
		return response.data;
	} catch(error) {
		return error.response.data;
	}
}

export { login }



