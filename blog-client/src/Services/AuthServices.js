import axios from "axios";

//
const userLogin = async (requestBody) =>  {
	try {
		const response =  await axios.post("http://localhost:9000/auth/login", requestBody, {withCredentials: true})
		return response.data.message;
	} catch {
		return "error"
	}
}

export { userLogin }



