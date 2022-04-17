import React, { useEffect, useRef, useState } from "react";
import "./progress.css";

function ProgressBar(props) {
  const [type, setType] = useState(1);
  const barRef = useRef();

  useEffect(() => {
    if (type === 1) {
      barRef.current.style.removeProperty("--level", "78%");
    } else if (type === 2) {
      barRef.current.style.setProperty("--level", "78%");
    }
  }, [type]);

  useEffect(() => {
    if (props.stage === 2) {
      setType(() => 2);
    } else {
      setType(() => 1);
    }
  }, [props.stage]);

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
