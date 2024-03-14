import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

//Services
import { deleteUser } from '../Services/UserServices';
import { deleteBlog } from '../Services/BlogServices';


function PopupModel(props) {

	const navigate = useNavigate();

	const [ deleteInput, setDeleteInput ] = useState(String);
	const [ deleteErrorMessage, setDeleteErrorMessage ] = useState(String);

	const handleDelete = async (event) => {

		event.preventDefault();

		let response

		const requestBody = {
			"_id": props.config.data.id,
			"deleteString": deleteInput
		}

		props.config.for === 'user' ? response = await deleteUser(requestBody) : response = await deleteBlog(requestBody);
			
		if (response.data.message === "success" ) return navigate(-1);

		setDeleteErrorMessage(response.response.data.message);
	}

	return(
		<>
			{ (props.config.type === "delete") &&
				<>
					<div className="overlay"></div>
					<div className="popup-model delete">
						<div className="row">
							<div className="title">
								<h3>{`Delete: ${props.config.data.title}`}</h3>
								<span className="close" onClick={() => { props.setState(!props.state) }}>
									<FontAwesomeIcon icon={ faXmark } />
								</span>
							</div>
							<div className="content">
								<p>Copy what you see in the input field below:</p>
								<div className="inputs-wrapper">
									<form>
										<input
											type="text"
											value={ deleteInput }
											placeholder="DELETE"
											onChange={ ( event ) => { setDeleteInput(event.target.value) } }
										/>
										<button className="btn btn-dash-delete" type="submit" onClick={ ( event ) => { handleDelete(event) } }>Delete</button>
									</form>
								</div>
								{ ( deleteErrorMessage.length > 0 ) &&
									<p className="error-message">{ deleteErrorMessage }</p>
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