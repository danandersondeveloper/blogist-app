import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";


function Card(props) {
	return(
		<div className="card" key={ props.config.blogId }>
			<Link to={`/blog/${ props.config.blogId }`}>
				<div className="picture">
					<img src={ props.config.blogPicture } alt="Blog picture" />
				</div>
				<div className="content">
					<h4>{ props.config.blogTitle }</h4>
					<p>{ props.config.blogShortDescription }</p>
					<div className="extra-content">
						<div className="buttons-wrapper">
							<Link className="btn btn-primary small" to={`/blog/${ props.config.blogId }`}>Read blog</Link>
							<Link to="#" className="btn btn-default small read-later">
								Read later
								<FontAwesomeIcon icon={ faFolderOpen } />
							</Link>
						</div>
						<div className="created">
							<span>Published: </span>
							<span>{ props.config.blogCreated }</span>
						</div>	
					</div>
				</div>
			</Link>
		</div>
	)
}

export default Card;