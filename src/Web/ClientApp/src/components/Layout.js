import React from "react";
import Navbar from "./navBar";

function Layout(props) {
	let type = props.type;
	let layout = {
		one: "",
		two: "col-7 mx-auto",
	};
	return (
		<div className="container-xl py-3">
			<Navbar />
			<div
				className={`px-4 mt-4 ${type === 2 ? layout.two : layout.one} ${
					props.className
				}`}
				style={{
					height: "max-content",
				}}
			>
				{props.children}
			</div>
		</div>
	);
}

export default Layout;
