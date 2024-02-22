import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";

function CreateBlog() {

	const TINYMCE_KEY = process.env.REACT_APP_TINYMCE;

	const navigate = useNavigate();

	const [ blogTitle, setBlogTitle ] = useState(String);
	const [ blogPictureUrl, setBlogPictureUrl ] = useState(String);
	const [ blogShortDescription, setBlogShortDescription ] = useState(String);
	const [value, setValue] = useState("");
	const [text, setText] = useState("");

	const onEditorInputChange = (newValue, editor) => {
		setValue(newValue);
	   setText(editor.getContent({ format: "text" }));
   	}

	const handleSubmit = () => {
		alert("Handle form submit")
	}

	return(
		<main className="content-wrapper dashboard create-blog">
			<div className="row">
				<div className="title">
					<h1>Create Blog</h1>
					<button type="button" className="btn btn-dash-back" onClick={() => {navigate(-1)}}>Back</button>
				</div>

				<form onSubmit={ handleSubmit }>
					<div className="row">
						<label htmlFor="blog-title">Blog title:</label>
						<input
							name="blog-title"
							type="text"
							value={ blogTitle }
							onChange={( event ) => { setBlogTitle( event.target.value ) }} />
					</div>
					<div className="row">
						<label htmlFor="blog-picture-url">Blog Image URL:</label>
						<input 
							name="blog-picture-url"
							type="text"
							value={ blogPictureUrl }
							onchange={ ( event ) => { setBlogPictureUrl( event.target.value ) } }
						/>
					</div>
					<div className="row">
						<label htmlFor="short-description">Blog Short Description:</label>
						<input 
							name="blog-short-description"
							type="text"
							value={ blogShortDescription }
							onchange={ ( event ) => { setBlogShortDescription( event.target.value ) } }
						/>
					</div>
					<div className="row">
						<label htmlFor="">Blog Content:</label>

						{ /* TinyMCE */ }

						<div className="tiny-mce-container">
							<Editor
								apiKey={TINYMCE_KEY}
								onEditorChange={(newValue, editor) => onEditorInputChange(newValue, editor)}
								onInit={(evt, editor) => setText(editor.getContent({ format: "text" }))}
								value={value}
								initialValue=""
								init={{
									plugins: [
										'advlist',
										'autolink',
										'lists',
										'link',
										'image',
										'charmap',
										'preview',
										'anchor',
										'searchreplace',
										'visualblocks',
										'code',
										'insertdatetime',
										'media',
										'table',
										'code'
									],
									toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat'
								}}
							/>
						</div>

					</div>
					<div className="row">
						<button type="submit">Save</button>
					</div>
				</form>

			</div>
		</main>
	);
}

export default CreateBlog;