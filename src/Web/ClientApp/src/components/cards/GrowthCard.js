import React from "react";
import Arrow from "../../Elements/svgs/Arrow";
import CircledPlus from "../../Elements/svgs/CircledPlus";

function GrowthCard({ ...props }) {
  let { title, summary, metric, style } = props;
  let arrowStyle = {
    good: { color: "var(--bs-success)" },
    bad: {
      color: "var(--bs-danger)",
      transform: "rotate(180deg)",
    },
  };
  return (
    <section className="growth-card bg-white p-3 rounded-3 border-1 border-muted border">
      <div className="d-flex align-items-start justify-content-between">
        <div>
          <h6>{title}</h6>
          <p className="text-muted summary small">
            {summary}
          </p>
        </div>

        <CircledPlus style={{ color: "var(--bs-primary)" }} />
      </div>

      <div className="d-flex align-items-center">
        <Arrow
          style={
            style === "good"
              ? arrowStyle.good
              : style === "bad"
              ? arrowStyle.bad
              : {}
          }
        />
        <span className="gowth-card__metric m-0 ms-1 fs-2 h6">
          {metric}
        </span>
      </div>
    </section>
  );
}

export default GrowthCard;
