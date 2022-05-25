import React from "react";

function Home() {
	const link = "https://henok.us";
	const target = "_blank";

	return (
		<div className="container">
			<h1>MERN Stack CRUD Progressive Web Application (PWA)</h1>
			<p>
				<b>Front-end</b>: React.js v17+, RRDv6+, npx create-react-app my-app
				--template cra-template-pwa
			</p>
			<p>
				<b>Back-end</b>: Node.js, Express.js
			</p>
			<p>
				<b>Database</b>: MongoDB Atlas with Mongoose ODM
			</p>
			<p>
				<b>Developed By</b>: Henok R. Bedassa
				<a href={link} target={target}>
					henok.us
				</a>
			</p>
		</div>
	);
}

export default Home;
