import React from "react";

import { Link } from "react-router-dom";
import Sacrament from "./Sacrament";
import sacraments from "./sacraments.json";
import Layout from "../../../components/Layout";

//Elements
import Info from "../../../Elements/svgs/Info";
import ContactCard from "../../../Elements/svgs/ContactCard";
import BluePhone from "../../../Elements/svgs/BluePhone";
import BlueMail from "../../../Elements/svgs/BlueMail";
import GreenPlus from "../../../Elements/svgs/GreenPlus";
import GreenPen from "../../../Elements/svgs/RoundPen";
import GreenFolder from "../../../Elements/svgs/GreenFolder";

//
function FilledState(props) {
	const { name, parish, role, phone } = props;

	return (
		<Layout type={1}>
			<div className=" my-3 mt-4 d-flex">
				<div className="col-4 d-flex flex-column justify-content-start align-items-start p-0 m-0">
					<section className="member-summary py-4 pb-0 px-4 m-0 bg-white d-flex flex-column justify-content-start align-items-center container-fluid">
						<div className="d-flex align-items-center justify-content-start col-12">
							<h5 className="member-name m-0 col-6">
								{name || "Peter Asamoah"}
							</h5>
							<a href={`tel:${phone}`} className="p-0 btn col-1 me-2">
								<BluePhone />
							</a>
							<a href="mailto:email@example.com" className="p-0 btn col-1 me-2">
								<BlueMail />
							</a>
						</div>
						<div className="summary-info col-12 mt-3 text-muted d-flex flex-column align-items-start gx-3">
							<div>
								<span className="is-member me-2">{role || "Member"}</span>
								<span className="fs-5 me-1">&bull;</span>
								<span className="parish-name">
									{parish || "Fountain of life and Truth"}
								</span>
							</div>
							<p className="mt-2">Member since May, 2016</p>
						</div>
					</section>
					<section className="member-details-2 text-muted mt-0 pt-0 p-4 bg-white flex-fill container-fluid">
						<div className="basic-information row row-cols-2 g-3 align-items-start mt-0 pt-0">
							<header className="d-flex justify-content-start align-items-center py-2 border-bottom border-2 col-12">
								<Info />
								<h6 className="text-muted m-0 ms-3">Basic Information</h6>
							</header>
							<section className="detail detail__date-of-birth d-flex flex-column align-items-start justify-content-center">
								<h6 className="detail-title text-muted">Date of birth</h6>
								<p className="detail info">02, January 1978</p>
							</section>
							<section className="detail detail__place-of-birth d-flex flex-column align-items-start justify-content-center">
								<h6 className="detail-title text-muted">Place of birth</h6>
								<p className="detail info">Osu, Accra</p>
							</section>
							<section className="detail detail__postal-code d-flex flex-column align-items-start justify-content-center">
								<h6 className="detail-title text-muted">Postal Code</h6>
								<p className="detail info">GA184</p>
							</section>
							<section className="detail detail__occupation d-flex flex-column align-items-start justify-content-center">
								<h6 className="detail-title text-muted">Occupation</h6>
								<p className="detail info">Banker</p>
							</section>
						</div>
						<header className="d-flex justify-content-start my-3 align-items-center py-2 border-bottom border-2 col-12">
							<ContactCard />
							<h6 className="text-muted m-0 ms-3">Contact Information</h6>
						</header>
						<section className="detail detail__home-address d-flex flex-column align-items-start justify-content-center">
							<h6 className="detail-title text-muted">Home Address</h6>
							<p className="detail info">
								No.F37/4, Anahor St. Nyaniba. Osu, Accra
							</p>
						</section>
						<div class="row align-items-start mt-3">
							<section class="detail detail__father d-flex flex-column align-items-start justify-content-center col-4">
								<h6 class="detail-title text-muted">Father</h6>
								<p class="detail info">Kingsley A.</p>
							</section>
							<section class="detail detail__mother d-flex flex-column align-items-start justify-content-center col-4">
								<h6 class="detail-title text-muted">Mother</h6>
								<p class="detail info">Esther A.</p>
							</section>
							<section class="detail detail__spouse d-flex flex-column align-items-start justify-content-center col-4">
								<h6 class="detail-title text-muted">Spouse</h6>
								<p class="detail info">Priscilla A.</p>
							</section>
						</div>
					</section>
				</div>

				<section class="units-and-sacrament py-1s d-flex flex-column ms-4 flex-fill align-items-start">
					<div className="d-flex align-items-center justify-content-between col-12">
						<p>
							<Link to="" className="m-0 p-0 d-flex align-items-center">
								<GreenPen
									size="1.7em"
									className="text-success"
									style={{
										fontSize: "0.7rem",
									}}
								/>
								<span className="border-start border-1 border-primary ps-2 ms-2 m-0 p-0">
									Edit Profile
								</span>
							</Link>
						</p>
						<Link to="/members" className="text-decoration-none">
							&lt; Back to Members Overview
						</Link>
					</div>

					<section class="units col-12">
						<div class="bg-white p-4 py-3 mt-3">
							<h6 class="m-0">Units</h6>
						</div>
						<div
							class="unit-summary-cards py-3"
							style={{
								display: "flex",
								gap: "1rem",
							}}
						>
							<section class="unit bg-white rounded-3 py-3 col">
								<div class="border-bottom p-3 pt-2 px-3 mb-3">
									<h6 class="unit-title">Sanctuary Keepers</h6>
									<p class="text-muted small m-0">Since May 2021</p>
								</div>
								<div class="d-flex align-items-center justify-content-start px-3">
									<GreenFolder />
									<Link
										to=""
										class="border-start border-1 ps-2 ms-2 border-primary"
									>
										View Unit
									</Link>
								</div>
							</section>
							<section class="unit bg-white rounded-3 py-3 col">
								<div class="border-bottom p-3 pt-2 px-3 mb-3">
									<h6 class="unit-title">Men of Valor</h6>
									<p class="text-muted small m-0">Since Feb 2021</p>
								</div>

								<div class="d-flex align-items-center justify-content-start px-3">
									<GreenFolder />
									<Link
										to=""
										class="border-start border-1 ps-2 ms-2 border-primary"
									>
										View Unit
									</Link>
								</div>
							</section>
							<section class="unit bg-white rounded-3 py-3 col">
								<div class="border-bottom p-3 pt-2 px-3 mb-3">
									<h6 class="unit-title">Hospitality</h6>
									<p class="text-muted small m-0">Since Dec 2020</p>
								</div>

								<div class="d-flex align-items-center justify-content-start px-3">
									<GreenFolder />
									<Link
										to=""
										class="border-start border-1 ps-2 ms-2 border-primary"
									>
										View Unit
									</Link>
								</div>
							</section>
							<section class="unit bg-white rounded-3 py-3 col">
								<div class="border-bottom p-3 pt-2 px-3 mb-3">
									<h6 class="unit-title">Sanctuary Keepers</h6>
									<p class="text-muted small m-0">Since May 2020</p>
								</div>

								<div class="d-flex align-items-center justify-content-start px-3">
									<GreenFolder />
									<Link
										to=""
										class="border-start border-1 ps-2 ms-2 border-primary"
									>
										View Unit
									</Link>
								</div>
							</section>
						</div>
					</section>

					<section class="sacrament py-1s flex-fill bg-white container-fluid px-0">
						<div class="border-bottom py-2 m-0 px-4 d-flex justify-content-between align-items-center">
							<h6 class="m-0">Sacraments</h6>
							<p class="m-0 p-0 d-flex align-items-center flex-fill justify-content-end">
								<GreenPlus />
								<Link
									to=""
									class="border-start border-1 border-primary ps-2 ms-2 m-0 p-0"
								>
									Add a new Sacrament
								</Link>
							</p>
						</div>

						<section class="sacrment-view">
							{sacraments.map((item) => {
								return <Sacrament {...item} />;
							})}
						</section>
					</section>
				</section>
			</div>
			<footer class="d-flex align-items-center justify-content-center small">
				<small>
					&copy;2021
					<Link to="" class="text-decoration-none ms-3">
						&bull; Privacy Policy
					</Link>
					<Link to="" class="text-decoration-none ms-3">
						&bull; Terms &amp; Conditions
					</Link>
				</small>
			</footer>
		</Layout>
	);
}

export default FilledState;
