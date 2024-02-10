import axios from "axios";

const getUsers = async () => {
	try {
		const response = await axios.get("http://localhost:9000/user/")
		return response;
	} catch(err) {
		return err;
	}
}

export { getUsers }