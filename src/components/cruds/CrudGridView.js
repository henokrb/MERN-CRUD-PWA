import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function CrudGridView() {
	const [cruds, setCruds] = useState([]);
	const [connection, setConnection] = useState("Online");

	useEffect(function () {
		async function getCruds() {
			try {
				const response = await axios.get(
					"https://mern-pwa.herokuapp.com/api/cruds"
				);
				setCruds(response.data);
				localStorage.setItem("GridView", JSON.stringify(response.data));
			} catch (error) {
				setConnection("Offline");
				let collection = localStorage.getItem("GridView");
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
				CRUD - Grid View
				<p>
					<Link to="/cruds/new" className="btn btn-primary float-right">
						Create CRUD
					</Link>
				</p>
			</h2>
			<hr />
			<div>
				<div className="d-flex flex-wrap">
					{cruds.map((crud) => {
						return (
							<div
								className="card"
								style={{ width: 250, margin: 30 }}
								key={crud._id}
							>
								<div className="card-header">
									<h5 className="card-title">
										<Link to={`/cruds/${crud._id}`} className="link-line">
											{crud.companyName}
										</Link>
									</h5>
								</div>
								<div className="card-body">
									<h5 className="d-flex align-items-center">
										<i className="bi bi-telephone-fill text-success"></i>
										<a className="card-subtitle" href={`tel:+${crud.phone}`}>
											{crud.phone}
										</a>
									</h5>
									{/* <h6 className="card-subtitle mb-2 text-muted">
										{crud.phone}
									</h6> */}
									<p className="card-text limit-char">{crud.description}</p>
									<p className="card-text d-flex align-items-center">
										<i className="bi bi-geo-alt-fill text-warning"></i>
										<small className="text-muted one-liner">
											{crud.location}
										</small>
									</p>
								</div>
								<div className="card-footer d-flex align-items-center">
									<Link
										to={`/cruds/${cruds._id}/edit`}
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
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default CrudGridView;
