import React from "react";

// icons
import { GreenChat2 } from "../../Elements/svgs/GreenChat";
import RoundFlag from "../../Elements/svgs/RoundFlag";
import RoundPen from "../../Elements/svgs/RoundPen";

//
function Activity(props) {
  let { details, date, type } = props;

  function getIcon() {
    switch (type) {
      case "Updated":
        return (
          <GreenChat2
            style={{
              width: "28px",
              height: "28px",
              color: `var(--bs-info)`
            }}
          />
        );
      case "Created":
        return (
          <RoundPen
            style={{
              color: `var(--bs-yellow1)`,
            }}
          />
        );
      case "Deleted":
        return (
          <RoundFlag
            style={{
              color: `var(--bs-hash3)`,
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
        type === "full"
          ? {
              color: "var(--bs-gray1)",
              display: "grid",
              gridTemplateColumns: "2rem 1fr auto",
              gap: "0.5rem",
              height: "100%",
              alignItems: "center",
              paddingBlock: "1em",

              paddingInline: "1.5rem",
              borderBottom: "2px solid var(--bs-bg-body)",
            }
          : {
              color: "var(--bs-gray1)",
              display: "grid",
              gridTemplateColumns: "2rem 1fr auto",
              gap: "0.5rem",
              height: "100%",
              paddingBlock: "1em",
            }
      }
    >
      <div className="icon">{getIcon()}</div>
      <p className="recent-activity__summary m-0">{details}</p>
      <p className="date text-muted m-0">{date}</p>
    </div>
  );
}

export default Activity;
