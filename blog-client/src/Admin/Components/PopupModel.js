import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

//Services
import { deleteUser } from '../Services/UserServices';


function PopupModel(props) {

	const navigate = useNavigate();

	const [ deleteInput, setDeleteInput ] = useState(String);
	const [ deleteUserErrorMessage, setDeleteUserErrorMessage ] = useState(String);

	const handleDelete = async (event) => {

		event.preventDefault();

		const requestBody = {
			"_id": props.config.data.userId,
			"deleteString": deleteInput
		}

		const response = await deleteUser(requestBody);

		if (response.status === 200 && response.data.message === "success") {
			return navigate(-1);
		}

		setDeleteUserErrorMessage(response.response.data.message);
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
									<FontAwesomeIcon icon={ faXmark } />
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