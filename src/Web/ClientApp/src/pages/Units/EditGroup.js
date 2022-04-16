import React, { useRef, useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

// components
import Modal from "../../components/modal/Modal";
import SpecialInput from "../../components/inputs/specialInputs/SpecialInput";

// Elements
import EmojiMail from "../../Elements/svgs/EmojiMail";
import Parish from "../../Elements/svgs/Parish";
import BlueTick from "../../Elements/svgs/BlueTick";
import House from "../../Elements/svgs/House";
import GreenChat from "../../Elements/svgs/GreenChat";
import Layout from "../../components/Layout";
import axios from "axios";
import { ErrorContext } from "../../context/ErrorContext";

function EditUnit(props) {
  const modalRef = useRef();
  const { id } = useParams();
  const { showError } = useContext(ErrorContext);

  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchGroup = async () => {
    try {
      const request = await axios.get(`/api/parishgroup/get/${id}`);
      if (request.status == 200) {
        const data = request.data;
        setGroupName(() => data.name);
        setGroupDescription(() => data.description);
      }
    } catch (error) {
      showError("An unexpected error occured");
      navigate("/groups");
    }
  };

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!groupName.length)
      return showError("Please Group Name Cannot be blank");
    if (!groupDescription.length)
      return showError("Please Group Description Cannot be blank");

    const data = {
      name: groupName,
      description: groupDescription,
      id,
    };

    // call api here
    try {
      setLoading(() => true);
      const request = await axios.put("/api/parishgroup/update", data);

      if (request.status == 200 || request.status == 201) {
        modalRef.current.classList.toggle("modal__hidden");
        console.log(request.data);
        setGroup(request.data);
      }

      setLoading(() => false);
    } catch (error) {
      showError("An unexpected error occurred");
    }
  }

  useEffect(() => {
    //   call end to fetch detail of a grup with the id and populate state
    fetchGroup();
    // if not found redirect to groups overview by uncommenting next line
  }, []);

  return (
    <Layout type={2}>
      <main>
        <header className="d-flex align-items-center justify-content-between">
          <div>
            <h4>Edit Group</h4>
          </div>
          <Link to="/groups">&lt; Back to Parish Groups</Link>
        </header>

        <form
          class="bg-white shadow-sm border-muted mt-5 rounded-1"
          onSubmit={handleSubmit}
        >
          <p class="text-muted py-3 px-4 border-bottom me-5">
            Edit the detail for a Group
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
              <Link to={`/groups/view-group/${id}`}>
                <button class="btn btn-outline-primary px-5 py-2">
                  Cancel
                </button>
              </Link>
              <input
                type="submit"
                value="Create"
                class="btn btn-primary px-5 py-2"
                disabled={loading}
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
            <h5>Unit successfully updated</h5>
            <BlueTick />
            <p className="m-0">{groupName} has been successfully updated</p>
            {/* <button className="btn btn-primary px-4 py-2">Add Member</button> */}
            <Link
              to={`/groups/view-group/${id}`}
              className="d-flex align-items-center mt-3"
            >
              <GreenChat />
              <span className="ms-3 ps-3 border-start border-1 border-primary">
                Back to {groupName} Group
              </span>
            </Link>
          </div>
        </Modal>
      </main>
    </Layout>
  );
}

export default EditUnit;
