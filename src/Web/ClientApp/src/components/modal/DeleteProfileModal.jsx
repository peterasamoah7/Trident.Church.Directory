import React from "react";
import SvgGreenChat from "../../Elements/svgs/GreenChat";
import Modal from "./Modal";

const DeleteProfileModal = ({ modalRef, handleDeleteFunc }) => {
  const handleDelete = async (e) => {
    await handleDeleteFunc();
  };

  const closeModal = () => {
    modalRef.current.classList.toggle("modal__hidden");
  };

  return (
    <Modal refer={modalRef}>
      <div
        style={{
          gap: "1rem",
        }}
        className="py-3 text-center d-flex flex-column justify-content-center align-items-center"
      >
        <h5>Delete Profile</h5>

        <p
          className="m-0"
          style={{
            color: " var(--bs-gray1)",
          }}
        >
          Are you sure you want to delete this profile
        </p>
        <button
          className="btn btn-danger"
          style={{ backgroundColor: "#eb5758", borderColor: "#eb5758" }}
          onClick={handleDelete}
        >
          Delete Profile
        </button>
        <span
          onClick={closeModal}
          style={{ pointer: "cursor" }}
          className="d-flex align-items-center mt-3"
        >
          <SvgGreenChat />
          <span className="ms-3 ps-3 border-start border-1 border-primary">
            Back to profile overview
          </span>
        </span>
      </div>
    </Modal>
  );
};

export default DeleteProfileModal;
