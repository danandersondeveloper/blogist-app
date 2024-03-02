import { useNavigate } from "react-router-dom";


function Settings() {

	const navigate = useNavigate();

	const handleSubmit = (event) => {
		event.preventDefault()
		alert("Save system data!");
	}

	return(
		<main className="content-wrapper dashboard settings">
			<div className="row">
				<div className="title">
					<h1>System Settings</h1>
					<button type="button" className="btn btn-dash-back" onClick={() => {navigate(-1)}}>Back</button>
				</div>

				<form onSubmit={ (event) => handleSubmit(event) }>
					<div className="row">
						<label htmlFor="system-name">System name:</label>
						<input name="system-name" type="text" />
					</div>
					<div className="row">
						<label htmlFor="system-status">System status:</label>
						<select name="system-status" defaultValue="open">
							<option value="open">Open</option>
							<option value="closed">Closed</option>
						</select>
					</div>
					<div className="row">
						<button className="btn btn-dash-default" type="button" onClick={() => { navigate(-1) }}>Cancel</button>
						<button className="btn btn-dash-primary" type="submit">Save</button>
					</div>
				</form>
			</div>
		</main>
	)
}

export default Settings;