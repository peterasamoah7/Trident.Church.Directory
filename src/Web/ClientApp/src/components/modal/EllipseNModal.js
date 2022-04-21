import React, { useState, useRef, useEffect } from "react";

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

  const { editable, deletable } = props;

  useEffect(() => {
    const eventTarget = window.addEventListener("click", (e) => {
      if (!Array.of(...e.target.classList).includes("ellpise")) {
        setClicked(() => false);
      }
    });

    return function () {
      // setClicked(null);
      window.removeEventListener("click", eventTarget, true);
    };
  }, []);

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
          className="fs-2 btn p-0 ellpise"
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
              display: editable ? "initial" : "none",
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
              display: deletable && props.onDelete ? "initial" : "none",
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
          <p className="text-gray2">Confirm delete</p>
          <div className="d-flex align-items-center justify-content-between container-fluid px-3">
            <button
              className="px-4 btn btn-outline-primary rounded-0"
              onClick={async () => {
                modalRef.current.classList.add("modal__hidden");
              }}
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                await props.onDelete();

                modalRef.current.classList.add("modal__hidden");
              }}
              className="px-4 btn btn-primary rounded-0 ms-3"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default EllipseNModal;
