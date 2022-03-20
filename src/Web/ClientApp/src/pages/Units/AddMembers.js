import React, { useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

// components
import Modal from "../../components/modal/Modal";
import Input from "../../components/inputs/Input";

// Elements
import EmojiMail from "../../Elements/svgs/EmojiMail";
import BlueTick from "../../Elements/svgs/BlueTick";
import GreenChat from "../../Elements/svgs/GreenChat";
import Layout from "../../components/Layout";
import axios from "axios";

function AddMembers(props) {
  let params = useParams();
  let id = params.id;

  const navigate = useNavigate();

  const modalRef = useRef();

  const addmember = (memberId) => {
    axios
      .post(`api/parishgroup/addparishioner/${id}/parishioner/${memberId}`)
      .then((response) => {
        if (response.status === 200) {
          modalRef.current.classList.toggle("modal__hidden");
        } else {
          //show errors
        }
      });
  };

  function handleSubmit(e) {
    e.preventDefault();
    addmember("9a90d801-ed7f-4315-af1f-a98286fdc87b");
  }

  function handleCancel(e) {
    e.preventDefault();

    navigate(-1);
  }

  return (
    <Layout type={2}>
      <main>
        <header className="d-flex align-items-end justify-content-between">
          <div>
            <h5>Add new Member</h5>
            <p className="m-0 text-muted">
              List of registered and approved parishes
            </p>
          </div>
          <Link to="/groups" className="text-decoration-none">
            &lt; Back to Groups Overview
          </Link>
        </header>

        <form className="bg-white mt-5 shadow-sm border border-muted rounded-2 pb-1">
          <div className="px-4 py-3 border-bottom border-muted  me-5 mb-">
            <p className="m-0">
              The information can be edited from your profile page
            </p>
          </div>
          <div className="px-4 mt-4">
            <Input
              iconOne={<EmojiMail className="icon-one" />}
              label="Search by name"
              type="text"
              large
            />
            <div className="d-flex justify-content-between align-items-center mt-5 mb-3">
              <button
                className="btn btn-outline-primary px-5"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <input
                type="submit"
                value="Add"
                onClick={handleSubmit}
                className="btn btn-primary px-5"
              />
            </div>
          </div>
        </form>

        <Modal refer={modalRef}>
          <div
            style={{
              gap: "1rem",
            }}
            className="py-3 text-center d-flex flex-column justify-content-center align-items-center"
          >
            <h5>Unit Member Successfully Added</h5>
            <BlueTick />
            <p
              className="m-0"
              style={{
                color: " var(--bs-gray1)",
              }}
            >
              Peter Asamoah has been successfully added to <br /> the Sanctuary
              Keepers unit
            </p>
            <Link
              to={`/groups/view-group/${id}`}
              className="d-flex align-items-center mt-3"
            >
              <GreenChat />
              <span className="ms-3 ps-3 border-start border-1 border-primary">
                Back to group overview
              </span>
            </Link>
          </div>
        </Modal>
      </main>
    </Layout>
  );
}

export default AddMembers;
