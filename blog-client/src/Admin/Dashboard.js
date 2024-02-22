
function Dashboard() {
	return(
		<main className="content-wrapper dashboard">
			<div className="row">
				<div className="title">
					<h1>Dashboard component</h1>
				</div>
				<div className="content">
					<div class="row">
						<div className="basic-stats">
							<div className="row">
								<div className="col">
									<div className="stat">
										<div className="stat-title">
											<span>Total Users:</span>
										</div>
										<div class="stat-number">
											<span>45</span>
										</div>
									</div>
								</div>
								<div className="col">
									<div className="stat">
										<div className="stat-title">
											<span>Total Blogs:</span>
										</div>
										<div class="stat-number">
											<span>200</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	)
}

export default Dashboard;