
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";

function CreateBlog() {

	const TINYMCE_KEY = process.env.REACT_APP_TINYMCE;

	const navigate = useNavigate();

	const [ blogTitle, setBlogTitle ] = useState(String);
	const [ blogPictureUrl, setBlogPictureUrl ] = useState(String);
	const [ blogShortDescription, setBlogShortDescription ] = useState(String);
	const [ value, setValue ] = useState(String);
	const [ blogContent, setBlogContent ] = useState(String);
	const [ blogCategory, setBlogCategory ] = useState(String);
	const [ blogStatus, setBlogStatus ] = useState(false);

	const onEditorInputChange = (newValue, editor) => {
		setValue(newValue);
	   	setBlogContent(editor.getContent());
   	}

	const handleSubmit = (event) => {

		event.preventDefault();
	
		const requestBody = {
			title: blogTitle,
			picture: blogPictureUrl,
			shortDescription: blogShortDescription,
			content: blogContent,
			category: blogCategory,
			status: blogStatus
		}

		axios.post("http://localhost:9000/admin/blog/create", requestBody)
		.then(response => {
			if (response.data.message === "success") {
				setBlogTitle("");
				setBlogPictureUrl("");
				setBlogShortDescription("");
				setValue("");
				setBlogCategory("")
				setBlogStatus(false);
			}
		})
		.catch(error => {
			alert(error);
		})

	}

	return(
		<main className="content-wrapper dashboard create-blog">
			<div className="row">
				<div className="title">
					<h1>Create Blog</h1>
					<button type="button" className="btn btn-dash-back" onClick={() => {navigate(-1)}}>Back</button>
				</div>

				<form onSubmit={ (event) => { handleSubmit(event) } }>
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
							onChange={ ( event ) => { setBlogPictureUrl( event.target.value ) } }
						/>
					</div>
					<div className="row">
						<label htmlFor="short-description">Blog Short Description:</label>
						<input 
							name="blog-short-description"
							type="text"
							value={ blogShortDescription }
							onChange={ ( event ) => { setBlogShortDescription( event.target.value ) } }
						/>
					</div>
					<div className="row">
						<label htmlFor="">Blog Content:</label>

						{ /* TinyMCE */ }

						<div className="tiny-mce-container">
							<Editor
								apiKey={ TINYMCE_KEY }
								onEditorChange={ (newValue, editor) => onEditorInputChange(newValue, editor) }
								onInit={ (evt, editor) => setBlogContent( editor.getContent({format: 'html'}) ) }
								value={value}
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
										'insertdatetime',
										'code'
									],
									toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat'
								}}
							/>
						</div>

					</div>
					<div className="row">
						<label>Category:</label>
						<input
							type="text"
							value={ blogCategory }
							onChange={ (event) => { setBlogCategory(event.target.value) } }
						/>
					</div>
					<div className="row">
						<button className="btn btn-dash-default" type="button" onClick={ () => { navigate(-1) }}>Cancel</button>
						<button className="btn btn-dash-primary" type="submit" onClick={ () => { setBlogStatus(true) } }>Save and Publish</button>
						<button className="btn btn-dash-primary" type="submit" onClick={ () => { setBlogStatus(false) } }>Save as Draft</button>
					</div>
				</form>

			</div>
		</main>
	);
}

export default CreateBlog;