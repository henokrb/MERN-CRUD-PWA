import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function CrudListView() {
	const [cruds, setCruds] = useState([]);
	const [connection, setConnection] = useState("Online");

	useEffect(function () {
		async function getCruds() {
			try {
				const response = await axios.get(
					"https://mern-pwa.herokuapp.com/api/cruds"
				);
				setCruds(response.data);
				localStorage.setItem("ListView", JSON.stringify(response.data));
			} catch (error) {
				setConnection("Offline");
				let collection = localStorage.getItem("ListView");
				setCruds(JSON.parse(collection));
			}
		}
		getCruds();
	}, []);

	return (
		<div className="container">
			<div>
				{connection === "Offline" ? (
					<div className="alert alert-warning" role="alert">
						You are in Offline mode or some issue with internet connection
					</div>
				) : null}
			</div>
			<h2>
				CRUD - List View
				<p>
					<Link to="/cruds/new" className="btn btn-primary">
						Create CRUD
					</Link>
				</p>
			</h2>
			<hr />

			{cruds.map((crud) => {
				return (
					<div
						className="card mb-3"
						style={{ maxWidth: "800px" }}
						key={crud._id}
					>
						<div className="row g-0">
							<div className="col-md-4 pl-5 ">
								{/* <img src="..." className="img-fluid rounded-start" alt="..."> */}
								<h5>Logo</h5>
							</div>
							<div className="col-md-8">
								<div className="card-header">
									<h5 className="card-title">
										<Link to={`/cruds/${crud._id}`} className="link-line">
											{crud.companyName}
										</Link>
									</h5>
								</div>
								<div className="card-body ">
									<h6 className="d-flex align-items-center">
										<i className="bi bi-telephone-fill text-success"></i>
										<a
											className="card-subtitle m-2"
											href={`tel:+${crud.phone}`}
										>
											{crud.phone}
										</a>
									</h6>
									<p className="card-text limit-char">{crud.description}</p>
									<p className="card-text  d-flex align-items-center">
										<i className="bi bi-geo-alt-fill text-warning"></i>
										<small className="text-muted one-liner">
											{crud.location}
										</small>
									</p>

									<div className="card-footer">
										<Link
											to={`/cruds/${crud._id}/edit`}
											className="btn btn-primary"
										>
											Edit
										</Link>
										<span>
											<small>
												<Link to={`/cruds/${crud._id}`} className="link-line">
													Read More...
												</Link>
											</small>
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default CrudListView;
