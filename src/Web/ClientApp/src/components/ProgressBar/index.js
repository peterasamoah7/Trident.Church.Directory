import React, { useEffect, useRef, useState } from "react";
import "./progress.css";

function ProgressBar(props) {
  const [type] = useState(() => {
    if (props.stage) {
      return props.stage;
    } else return 1;
  });
  const barRef = useRef();

  useEffect(() => {
    if (type === 1) {
    } else if (type === 2) {
      barRef.current.style.setProperty("--level", "78%");
    }
  }, [type]);

  return (
    <section className="progressBar">
      <div className="stageNames d-flex align-items-center justify-content-between container-fluid mt-4 mb-3 py-2">
        <span className={type === 1 ? "current-stage" : ""}>
          {props.stage1 || "Basic Information"}
        </span>
        <span className={type === 2 ? "current-stage" : ""}>
          {props.stage2 || "Associated Priest"}
        </span>
      </div>
      <div className="bar" ref={barRef}></div>
    </section>
  );
}

export default ProgressBar;
