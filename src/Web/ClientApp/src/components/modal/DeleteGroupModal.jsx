import React from "react";
import { Link } from "react-router-dom";
import SvgGreenChat from "../../Elements/svgs/GreenChat";
import Modal from "./Modal";

const DeleteGroupModal = ({
  modalRef,
  groupName,
  groupId,
  handleDeleteFunc,
}) => {
  const handleDelete = async (e) => {
    await handleDeleteFunc();
    modalRef.current.classList.toggle("modal__hidden");
  };
  return (
    <Modal refer={modalRef}>
      <div
        style={{
          gap: "1rem",
        }}
        className="py-3 text-center d-flex flex-column justify-content-center align-items-center"
        // onClick={e=> e.stopPropagation()}
      >
        <h5>Delete Group</h5>

        <p
          className="m-0"
          style={{
            color: " var(--bs-gray1)",
          }}
        >
          Are you sure you want to delete {groupName} group
        </p>
        <button
          className="btn btn-danger"
          style={{ backgroundColor: "#eb5758", borderColor: "#eb5758" }}
          onClick={handleDelete}
        >
          Delete Group
        </button>
        <Link
          to={`/groups/view-group/${groupId}`}
          className="d-flex align-items-center mt-3"
        >
          <SvgGreenChat />
          <span className="ms-3 ps-3 border-start border-1 border-primary">
            Back to group overview
          </span>
        </Link>
      </div>
    </Modal>
  );
};

export default DeleteGroupModal;
