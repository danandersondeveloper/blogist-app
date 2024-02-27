import axios from 'axios';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';


function PopupModel(props) {

	console.log(props)

	const navigate = useNavigate();

	const [ deleteInput, setDeleteInput ] = useState(String);
	const [ deleteUserErrorMessage, setDeleteUserErrorMessage ] = useState(String);

	const handleDelete = (event) => {

		event.preventDefault();

		const requestData = {
			"_id": props.data.userId,
			"deleteString": deleteInput
		}
		
		axios.delete(`http://localhost:9000/user/delete/`, {data: {requestData}})
		.then(response => {
			response.data.message === "success" && navigate(-1);
		})
		.catch(error => {
			setDeleteUserErrorMessage(error.response.data.message);
		})
	}

	return(
		<>
			{ (props.config.type === "delete") &&
				<>
					<div className="overlay"></div>
					<div className="popup-model delete">
						<div className="row">
							<div className="title">
								<h3>{`Delete: ${props.config.data.userFirstName} ${props.config.data.userLastName}`}</h3>
								<span className="close" onClick={() => { props.setState(!props.state) }}>
									{/* FONT AWSEOM ICON HERE!! */}
									x
									{/* FONT AWSEOM ICON HERE!! */}
								</span>
							</div>
							<div className="content">
								<p>Copy what you see in the input field below:</p>
								<div className="inputs-wrapper">
									<form>
										<input type="text" value={ deleteInput } placeholder="DELETE" onChange={ ( event ) => { setDeleteInput(event.target.value) } } />
										<button className="btn btn-dash-delete" type="submit" onClick={ ( event ) => { handleDelete(event) } }>Delete</button>
									</form>
								</div>
								{ ( deleteUserErrorMessage.length > 0 ) &&
									<p className="error-message">{ deleteUserErrorMessage }</p>
								}
							</div>
						</div>
					</div>
				</>
			}
		</>

	)
}

export default PopupModel;