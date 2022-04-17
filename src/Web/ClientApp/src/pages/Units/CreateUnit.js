import React, { useRef, useState, useContext } from "react";
import { Link } from "react-router-dom";

// components
import Modal from "../../components/modal/Modal";
import SpecialInput from "../../components/inputs/specialInputs/SpecialInput";

// Elements
import Parish from "../../Elements/svgs/Parish";
import BlueTick from "../../Elements/svgs/BlueTick";
import House from "../../Elements/svgs/House";
import GreenChat from "../../Elements/svgs/GreenChat";
import Layout from "../../components/Layout";
import { ErrorContext } from "../../context/ErrorContext";
import axios from "axios";

function CreateUnit(props) {
  const modalRef = useRef();
  const { showError } = useContext(ErrorContext);

  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [group, setGroup] = useState();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!groupName.length)
      return showError("Please Group Name Cannot be blank");
    if (!groupDescription.length)
      return showError("Please Group Description Cannot be blank");

    const data = {
      name: groupName,
      description: groupDescription,
    };

    // call api here
    try {
      const request = await axios.post("/api/parishgroup/create", data);

      if (request.status === 200 || request.status === 201) {
        modalRef.current.classList.toggle("modal__hidden");
        console.log(request.data);
        setGroup(request.data);
      }
    } catch (error) {}
  }

  return (
    <Layout type={2}>
      <main>
        <header className="d-flex align-items-end justify-content-between">
          <div>
            <h4>Create a New Group</h4>
            <p className="m-0 text-muted">
              List of registered and approved parishes
            </p>
          </div>
          <Link to="/groups">&lt; Back to Parish Groups</Link>
        </header>

        <form
          class="bg-white shadow-sm border-muted mt-5 rounded-1"
          onSubmit={handleSubmit}
        >
          <p class="text-muted py-3 px-4 border-bottom me-5">
            The information can be edited from your profile page
          </p>

          <div
            class="inputs d-flex flex-column px-4 pb-4"
            style={{
              gap: "2rem",
            }}
          >
            <SpecialInput
              type="text"
              containerClass="input-container__lg d-flex"
              name={"Group Name"}
              placeholder={"Group name"}
              icon={<Parish className="input-icon" />}
              value={groupName}
              setValue={setGroupName}
            />

            <SpecialInput
              type="text"
              containerClass="input-container__lg d-flex"
              name={"description"}
              placeholder={"Group Description"}
              icon={<House className="input-icon" />}
              isTextArea
              value={groupDescription}
              setValue={setGroupDescription}
            />

            <div class="submits d-flex justify-content-between">
              <Link to={"/groups"}>
                <button type="button" class="btn btn-outline-primary px-5 py-2">
                  Cancel
                </button>
              </Link>
              <input
                type="submit"
                value="Create"
                class="btn btn-primary px-5 py-2"
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
            <h5>Group successfully created</h5>
            <BlueTick />
            <p className="m-0">{groupName} has been successfully created</p>
            <Link to={`/groups/add-member/${group?.id}`}>
              <button className="btn btn-primary px-4 py-2">Add Member</button>
            </Link>
            <Link to="/groups" className="d-flex align-items-center mt-3">
              <GreenChat />
              <span className="ms-3 ps-3 border-start border-1 border-primary">
                Back to Parish Groups
              </span>
            </Link>
          </div>
        </Modal>
      </main>
    </Layout>
  );
}

export default CreateUnit;
