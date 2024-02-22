
// Components
import Statistics from "./Components/Statistics";

function Dashboard() {
	return(
		<main className="content-wrapper dashboard">
			<div className="row">
				<div className="title">
					<h1>Basic System Statistics</h1>
				</div>
				<div className="content">
					<div class="row">
						<Statistics />
					</div>
				</div>
			</div>
		</main>
	)
}

export default Dashboard;