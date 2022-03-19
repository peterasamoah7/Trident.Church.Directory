import React, { useState, useRef } from "react";

// components
import Modal from "./Modal";

// Elements
import Ellipses from "../../Elements/svgs/Ellipses";
import CircledCancel from "../../Elements/svgs/circledCancel";

function EllipseNModal(props) {
	//
	const [clicked, setClicked] = useState(false);
	const popupRef = useRef();
	const ellipseRef = useRef();
	const modalRef = useRef();

	//
	return (
		<>
			<div
				ref={ellipseRef}
				style={{
					position: "relative",
				}}
			>
				<Ellipses
					className="fs-2 btn p-0"
					onClick={() => {
						setClicked(!clicked);
					}}
				/>
				<div
					ref={popupRef}
					className={
						clicked
							? "popup bg-white p-2 py-2 pe-5 shadow border-border1 border rounded"
							: "d-none"
					}
					style={{
						position: "absolute",
						zIndex: "10",
					}}
				>
					<p
						className="btn py-2 m-0"
						style={{
							cursor: "pointer",
						}}
						onClick={() => {
							setClicked(false);
							props.onEdit();
						}}
					>
						Edit
					</p>
					<p
						className="btn py-2 m-0"
						style={{
							cursor: "pointer",
						}}
						onClick={() => {
							modalRef.current.classList.remove("modal__hidden");
							setClicked(false);
							// props.onDelete();
						}}
					>
						Delete
					</p>
					<p
						className="btn py-2 m-0"
						style={{
							cursor: "pointer",
						}}
						onClick={() => {
							setClicked(false);
							props.onView();
						}}
					>
						View
					</p>
				</div>
			</div>

			<Modal refer={modalRef} noClose>
				<div
					className="bg-white d-flex align-items-center flex-column justify-content-center py-3 "
					style={{
						textAlign: "center",
						gap: "0.3rem",
					}}
				>
					<CircledCancel
						className="mb-3"
						style={{
							fontSize: "3.2rem",
						}}
					/>

					<h6>Are you sure?</h6>
					<p className="text-gray2">
						Do you really want to delete these <br /> users? This process cannot
						be undone
					</p>
					<div className="d-flex align-items-center justify-content-between container-fluid px-3">
						<button
							className="px-4 btn btn-outline-primary rounded-0"
							onClick={() => {
								modalRef.current.classList.add("modal__hidden");
							}}
						>
							Cancel
						</button>
						<button className="px-4 btn btn-primary rounded-0">Delete</button>
					</div>
				</div>
			</Modal>
		</>
	);
}

export default EllipseNModal;
