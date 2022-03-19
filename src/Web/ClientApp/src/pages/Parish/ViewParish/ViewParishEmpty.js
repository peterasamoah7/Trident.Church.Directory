import React from "react";
import { Link } from "react-router-dom";

// Elements
import SelectionIllustration from "../../../Elements/svgs/SelectionIllustration";
import GreenPlus from "../../../Elements/svgs/GreenPlus";

function ViewParish() {
	return (
		<table className="bg-white container-fluid">
			<tr className="">
				<td
					className="illustration py-5 d-flex flex-column align-items-center justify-content-center"
					colspan="7"
				>
					<SelectionIllustration />
					<p className="text-muted">
						There are no members in this parish yet <br />
						Click the button below to add a member
					</p>
					<Link
						to=""
						className="d-flex align-items-center justify-content-center"
					>
						<GreenPlus />
						<span className=" ms-3 ps-3 border-start border-2 border-primary">
							Add a new member
						</span>
					</Link>
				</td>
			</tr>
		</table>
	);
}

export default ViewParish;
