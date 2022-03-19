import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// components
import SearchInput from "../../components/inputs/specialInputs/SearchInput";
import Layout from "../../components/Layout";

// Elements
import People from "../../Elements/svgs/People";
import GreenFolder from "../../Elements/svgs/GreenFolder";
import HashTag from "../../Elements/svgs/HashTag";

import axios from 'axios';

function Units(props) {

	const[units, setUnits] = useState(null);

	useEffect(() => {
		axios.get("api/parishgroup/getall").then((response) => {
			if (response.status === 200) {
				setUnits(response.data);
			} else {
				//show error message
			}
		});
	}, []);


	return (
		<Layout>
			<main>
				<header className="mt-3">
					<h3>Parish Groups Overview</h3>
					<p className="text-muted m-0">
						List of registered and approved parish groups
					</p>
				</header>
				<section className="my-4 d-flex align-items-center justify-content-between">
					<div className="col-4">
						<SearchInput 
							text="Enter a parish group name"
						/>
					</div>
				</section>

				<section
					className="units mt-4"
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(3, 1fr)",
						gap: "3rem",
					}}
				>
					{units && units.data.map((item, index) => {
						return <UnitCard key={item.id} item={item} index={index} />;
					})}
				</section>
			</main>
		</Layout>
	);
}

export default Units;

function UnitCard(props) {
	return (
		<section className="unit-card bg-white p-4 pb-2 rounded-3">
			<header className="d-flex">
				<HashTag
					style={{
						color: `var(--bs-hash${props.index + 1})`,
					}}
				/>
				<div className="ms-3">
					<h5 className="mb-0">{props.item.name}</h5>
					<p className="text-muted mb-0">{props.item.parish.name}</p>
				</div>
			</header>
			<p className="my-3 text-muted">{props.item.description}</p>
			<div className="d-flex justify-content-between mt-2">
				<figure className="d-flex align-items-center">
					<People className="text-primary" />
					<figcaption className="ms-2">
						<span className="member-count">{props.item.memberCount}</span>
					</figcaption>
				</figure>
				<Link to={`view-unit/${props.item.id}`} className="d-flex align-items-center">
					<GreenFolder />
					<span className="ms-3 ps-3 border-start border-primary border-1">
						View Unit
					</span>
				</Link>
			</div>
		</section>
	);
}
