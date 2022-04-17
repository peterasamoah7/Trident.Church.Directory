import React, { useEffect, useRef, useState } from "react";
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
import InfiniteScroll from "react-infinite-scroll-component";
import { useContext } from "react";
import { ErrorContext } from "../../context/ErrorContext";

function AddMembers(props) {
  let params = useParams();
  let id = params.id;

  const navigate = useNavigate();
  const { showError } = useContext(ErrorContext);

  const modalRef = useRef();

  // search for parishioners
  const [member, setMember] = useState();
  const [listParishioner, setListParishioner] = useState([]);
  const [hasMoreParishioner, setHasMoreParishioner] = useState(false);
  const [searchParishioner, setSearchParishioner] = useState("");
  const [showParishioner, setShowParishioner] = useState(false);
  const [parishionerPage, setParishionerPage] = useState(1);

  const fetchParisher = async (
    searchValue = "",
    setHasMore,
    setState,
    page = 1,
    firstTime = false
  ) => {
    firstTime = firstTime ? firstTime : !firstTime && page <= 1 ? true : false;
    const request = await axios.get(
      `/api/parishioner/getall?pageNumber=${page}&pageSize=10&query=${searchValue}`
    );
    if (request.status === 200) {
      const { data: result } = request;
      setState((oldState) =>
        firstTime ? [...result.data] : [...oldState, ...result.data]
      );
      setHasMore(() => (result.data?.length <= 0 ? false : true));
    }
  };

  // onchange for searching of sacrament priest
  const handleOnChangeParishioner = (e) => {
    setSearchParishioner(e.target.value);
  };

  // useEffect for running search beginning
  useEffect(() => {
    setListParishioner(() => []);
    if (searchParishioner?.length) {
      setShowParishioner(() => true);
      setParishionerPage(() => 1);
      fetchParisher(
        searchParishioner,
        setHasMoreParishioner,
        setListParishioner,
        1,
        true
      );
    }
  }, [searchParishioner]);

  const handleNextParishioner = async () => {
    setParishionerPage((page) => page + 1);
  };

  useEffect(() => {
    if (parishionerPage > 1) {
      fetchParisher(
        searchParishioner,
        setHasMoreParishioner,
        setListParishioner,
        parishionerPage,
        false
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parishionerPage]);

  // selecting a member priest
  const selectParishioner = (member) => {
    setShowParishioner(() => false);
    setSearchParishioner(() => "");
    setMember(() => member);
  };

  // removes selected sacrament priest
  const handleRemoveParishioner = () => {
    setMember(() => null);
  };

  const addmember = async (memberId) => {
    try {
      const request = await axios.post(
        `api/parishgroup/addparishioner/${id}/parishioner/${memberId}`
      );

      if (request.status === 200 || request.status === 201) {
        modalRef.current.classList.toggle("modal__hidden");
      }
    } catch (error) {
      showError("Sorry, An Unexpected Error Occurred");
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (!member) {
      showError("Please select a member add to the group");
      return;
    }
    addmember(member.id);
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
            {!member && (
              <>
                <Input
                  iconOne={<EmojiMail className="icon-one" />}
                  label="Search by name"
                  type="text"
                  large
                  value={searchParishioner}
                  onChange={handleOnChangeParishioner}
                />

                <div
                  className=""
                  style={{
                    border: "solid #eee 1px",
                    marginTop: "10px",
                    borderRadius: "5px",
                    maxHeight: "150px",
                    overflow: "scroll",
                    display: showParishioner ? "block" : "none",
                  }}
                >
                  <InfiniteScroll
                    dataLength={listParishioner?.length}
                    next={handleNextParishioner}
                    hasMore={hasMoreParishioner}
                    loader={<p>loading</p>}
                  >
                    {listParishioner?.map((parishioner, index) => (
                      <div
                        key={index}
                        className=""
                        style={{
                          display: "flex",
                          width: "100%",
                          padding: "10px 15px",
                          borderBottom: "solid #eee 1px",
                        }}
                      >
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id={parishioner.id}
                          value={`${parishioner.firstName} ${parishioner.lastName}`}
                          onClick={() => selectParishioner(parishioner)}
                        />
                        <label
                          className=""
                          htmlFor="flexRadioDefault1"
                          style={{ marginLeft: "10px", placeItems: "start" }}
                        >
                          {`${parishioner.firstName} ${parishioner.lastName}`}
                        </label>
                      </div>
                    ))}
                  </InfiniteScroll>
                </div>
              </>
            )}

            {member && (
              <p className="d-flex flex-row align-items-center">
                <span className="me-3">Selected Member:</span>{" "}
                <span className="badge rounded-pill btn-lg bg-primary py-2 px-4">
                  {`${member.firstName} ${member.lastName}`}{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-x-lg"
                    viewBox="0 0 16 16"
                    onClick={handleRemoveParishioner}
                  >
                    <path
                      fillRule="evenodd"
                      d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"
                    />
                    <path
                      fillRule="evenodd"
                      d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"
                    />
                  </svg>
                </span>
              </p>
            )}

            <div className="d-flex justify-content-between align-items-center mt-5 mb-3">
              <button
                className="btn btn-outline-primary px-5"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <input
                type="button"
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
            <h5>Group Member Successfully Added</h5>
            <BlueTick />
            <p
              className="m-0"
              style={{
                color: " var(--bs-gray1)",
              }}
            >
              {`${member?.firstName} ${member?.lastName}`} has been successfully
              added to <br /> the Group
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

        {/* usuage of sacrament added modal  */}
        {/* <AddSacramentSuccessModal modalRef={modalRef} profileId={"111"} profileName={"oliver"} /> */}
      </main>
    </Layout>
  );
}

export default AddMembers;
