import React, { useRef } from "react";

import { Link } from "react-router-dom";
import Modal from "../../../components/modal/Modal";

//Elements
import GreenFolder from "../../../Elements/svgs/GreenFolder";
import RoundPerson from "../../../Elements/svgs/RoundPerson";
import BlueParish from "../../../Elements/svgs/BlueParish";

function Sacrament({ day, month, sacramentTitle, parish, role }) {
	const modalRef = useRef();

	function handleCreate(e) {
		e.preventDefault();
		modalRef.current.classList.toggle("modal__hidden");
		// 	console.log(modalRef.current);
	}

	return (
		<>
			<div class="sacrament py-1 d-flex border-bottom">
				<p class="date d-flex flex-column align-items-center justify-content-center col-2 border-end border-1 my-2">
					<span class="fs-5">{day}</span>
					<span class="text-muted text-uppercase">{month}</span>
				</p>
				<div class="d-flex align-items-center px-4 py-3 justify-content-between flex-fill">
					<section>
						<h6 class="m-0">{sacramentTitle}</h6>
						<p class="m-0 text-muted">{role}</p>
					</section>
					<section>
						<p class="text-muted m-0">{parish}</p>
						<p class="m-0 p-0 d-flex align-items-center flex-fill justify-content-end">
							<GreenFolder />
							<span
								class="border-start border-1 border-primary ps-2 ms-2 m-0 p-0 text-primary text-decoration-underline"
								onClick={handleCreate}
								style={{
									cursor: "pointer",
								}}
							>
								View Event
							</span>
						</p>
					</section>
				</div>
			</div>

			<Modal refer={modalRef}>
				<div
					className="modalGrid"
					style={{
						display: "grid",
						gridTemplateColumns: "0.2fr 1fr",
						gap: "0rem 1.3rem",
						alignItems: "flex-start",
					}}
				>
					<div className="d-flex flex-column border-end py-3 px-4 justify-content-center align-items-center">
						<h5>{day}</h5>
						<p className="h5 lead text-muted text-uppercase">{month}</p>
					</div>
					<div className=" py-3  ">
						<h5>{sacramentTitle}</h5>
						<p className="text-muted fs-5 fw-lighter">{role}</p>
					</div>
					<div className=" py-3 px-4  d-flex flex-column justify-content-center align-items-center">
						<RoundPerson />
					</div>
					<div className=" py-3  ">
						<h5>Peter Asamoah</h5>
						<p className="text-muted fw-lighter fs-5">Kingsley Adegoke</p>
					</div>
					<div className=" py-3  px-4 d-flex flex-column justify-content-center align-items-center">
						<BlueParish />
					</div>
					<div className=" py-3  ">
						<h5>Bishop Jane James</h5>
						<p className="text-muted fw-lighter fs-5 ">{parish}</p>
					</div>
				</div>
			</Modal>
		</>
	);
}

export default Sacrament;
