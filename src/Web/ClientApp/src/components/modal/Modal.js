import React, { useRef } from "react";
import "./modal.css";

function Modal(props) {
  const modalClose = useRef();

  function closeModal(e) {
    if (e.target === props.refer.current || e.target === modalClose.current) {
      props.refer.current.classList.add("modal__hidden");
    }
  }

  return (
    <div
      ref={props.refer}
      className="modal-container modal__hidden px-0"
      onClick={closeModal}
    >
      <section className="modal-content bg-white rounded-3">
        {props.noClose ? (
          <></>
        ) : (
          <span
            ref={modalClose}
            className="btn modal-close fs-4 text-muted"
            onClick={closeModal}
          >
            &times;
          </span>
        )}
        {props.children}
      </section>
    </div>
  );
}

export default Modal;
