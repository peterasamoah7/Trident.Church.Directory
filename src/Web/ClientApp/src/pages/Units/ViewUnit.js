import React from "react";
import { Link } from "react-router-dom";

//  Styles
import "../../styles/dist/table.css";

// components
import EllipseNModal from "../../components/modal/EllipseNModal";
import SearchInput from "../../components/inputs/specialInputs/SearchInput";
import DateSelect from "../../components/inputs/datePickers/DateSelect";

// Elements
import SvgHashTag from "../../Elements/svgs/HashTag";
import Person from "../../Elements/svgs/Person";
import GreenPlus from "../../Elements/svgs/GreenPlus";
import EyesEmoji from "../../Elements/svgs/EyesEmoji";
import SelectionIllustration from "../../Elements/svgs/SelectionIllustration";

// data
import data from "./unitMembers.json";
import Layout from "../../components/Layout";

function ViewUnit({ onLayoutType }) {
	return (
		<Layout>
			<main>
				<header className="d-flex align-items-start justify-content-between mb-3">
					<div className="d-flex align-items-start" style={{ gap: "1rem" }}>
						<SvgHashTag style={{ color: "var(--bs-hash3)" }} />
						<div>
							<h5 className="mb-1">Sanctuary Keepers</h5>
							<p className="text-muted m-0">Fountain of Life & Truth</p>
						</div>
					</div>
					<Link to="/units" className="text-decoration-none">
						&lt; Back to Unit Overview
					</Link>
				</header>

				<p class="m-0 text-muted">
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Necessitatibus molestias, enim consequuntur aliquam repellendus
					quisquam accusantium ducimus distinctio eum facere vero eos maxime vel
					laboriosam cumque, dolorum veniam.
				</p>

				<div class="d-flex align-items-center my-4 border-bottom border-white border-2">
					<figure class="d-flex align-items-center">
						<Person
							width="1em"
							height="1em"
							className="text-primary"
							opacity={1}
						/>
						<figcaption class="ms-2">
							<span>3456 members</span>
						</figcaption>
					</figure>
					<Link to="/units/add-member" className=" ms-5">
						<figure class="d-flex align-items-center">
							<GreenPlus />
							<figcaption class="ms-3">
								<span class="ps-3 border-start border-primary">
									Add a new member
								</span>
							</figcaption>
						</figure>
					</Link>
				</div>

				<section className="my-4 d-flex align-items-center justify-content-between">
					<div className="col-4">
						<SearchInput />
					</div>

					<div
						className="d-flex align-items-center"
						style={{
							gap: "5px",
						}}
					>
						<DateSelect placeholder="Date" />
						<select
							name="parish"
							id="parish"
							className="form-select"
							style={{
								width: "max-content",
							}}
						>
							<option value="">Location</option>
						</select>
						<select
							name="parish"
							id="parish"
							className="form-select sort-select"
							style={{
								width: "6rem",
							}}
						>
							<option value="">Sort</option>
						</select>
					</div>
				</section>

				<div
					class="d-flex justify-content-between data-tables p-0 m-0 mt-4"
					style={{ gap: "3rem" }}
				>
					<table class="bg-white col-8 mb-0">
						<thead>
							<tr>
								<th></th>
								<th>First Name</th>
								<th>Role</th>
								<th>Gender</th>
								<th>Age</th>
								<th>Phone No.</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{data.map((item, index) => {
								let { name, role, gender, age, phone } = item;
								return (
									<>
										<tr>
											<td class="num text-center">{index + 1}.</td>
											<td>{name}</td>
											<td>{role}</td>
											<td>{gender}</td>
											<td>{age}</td>
											<td>{phone}</td>
											<td>
												<EllipseNModal />
											</td>
										</tr>
									</>
								);
							})}
						</tbody>
					</table>
					<div
						class="data-details bg-white col d-flex justify-content-start align-items-center flex-column p-0"
						style={{
							maxHeight: "30rem",
						}}
					>
						<div class="py-5 border-bottom d-flex justify-content-center align-items-center col-12">
							<EyesEmoji />
						</div>

						<figure class="d-flex flex-column justify-content-center align-items-center mt-5">
							<SelectionIllustration />
							<figcaption>
								<p class="text-muted">Select a member to view the bio data</p>
							</figcaption>
						</figure>
					</div>
				</div>
			</main>
		</Layout>
	);
}

export default ViewUnit;
