import React from 'react';


// icons
import { GreenChat2 } from "../../Elements/svgs/GreenChat";
import RoundFlag from "../../Elements/svgs/RoundFlag";
import RoundPen from "../../Elements/svgs/RoundPen";

// 
function Activity(props) {
	let { details, date, icon, iconColor,type } = props;

	function getIconColor() {
		switch (iconColor) {
			case "yellow":
				return "var(--bs-yellow1)";
			case "lightBlue":
				return "var(--bs-info)";
			case "violet":
				return "var(--bs-hash3)";
			case "purple":
				return "var(--bs-hash3)";

			default:
				return "var(--bs-primary)";
		}
	}
	function getIcon() {
		switch (icon) {
			case "greenChat":
				return (
					<GreenChat2
						style={{
							width: "28px",
							height: "28px",
						}}
					/>
				);
			case "roundPen":
				return (
					<RoundPen
						style={{
							color: `${getIconColor()}`,
						}}
					/>
				);
			case "roundFlag":
				return (
					<RoundFlag
						style={{
							color: `${getIconColor()}`,
						}}
					/>
				);
			default:
				return (
					<GreenChat2
						style={{
							width: "28px",
							height: "28px",
						}}
					/>
				);
		}
	}
 
  // 
	return (
		<div
			className="recent-activity align-items-center justify-content-between small "
			style={
        type === "full" ? {
          color: "var(--bs-gray1)",
					display: "grid",
					gridTemplateColumns: "2rem 1fr auto",
					gap: "0.5rem",
					height: "100%",
          alignItems: "center", 
          paddingBlock: "1.5em",

          paddingInline: "1.5rem",
          borderBottom: "2px solid var(--bs-bg-body)"
        } :
				{
					color: "var(--bs-gray1)",
					display: "grid",
					gridTemplateColumns: "2rem 1fr auto",
					gap: "0.5rem",
					height: "100%",
          paddingBlock: "1.5em"
				} 
			}
		>
			<div className="icon">{getIcon()}</div>
			<p className="recent-activity__summary m-0">
				{details}
			</p>
			<p className="date text-muted m-0">{date}</p>
		</div>
	);
}

export default Activity;
