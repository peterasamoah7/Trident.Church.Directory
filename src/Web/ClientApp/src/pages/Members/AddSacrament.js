import React, { useRef, useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Modal from "../../components/modal/Modal";
import DateSelect2 from "../../components/inputs/datePickers/DateSelect2";

// elements
import BlueTick from "../../Elements/svgs/BlueTick";
import GreenChat from "../../Elements/svgs/GreenChat";
import Layout from "../../components/Layout";
import ProgressBar from "../../components/ProgressBar";
import Input from "../../components/inputs/Input";
import InfiniteScroll from "react-infinite-scroll-component";
import MemoEmojiMail from "../../Elements/svgs/EmojiMail";
import axios from "axios";
import { ErrorContext } from "../../context/ErrorContext";

function AddSacrament({ onLayoutType }) {
  const modalRef = useRef();

  const { showError } = useContext(ErrorContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // sacrament form data
  const [sacramentType, setSacramentType] = useState("");
  const [date, setDate] = useState(null);
  const [sacramentPriest, setSacramentPriest] = useState(null);
  const [godParent, setGodParent] = useState(null);

  // handling selecting sacrament priest
  const [listSacramentPriest, setListSacramentPriest] = useState([]);
  const [hasMoreSacramentPriest, setHasMoreSacramentPriest] = useState(false);
  const [searchSacramentPriest, setSearchSacramentPriest] = useState("");
  const [showSacramentPriest, setShowSacramentPriest] = useState(false);
  const [sacramentPriestPage, setSacramentPriestPage] = useState(1);

  // handling selecting of godParent
  const [listGodParent, setListGodParent] = useState([]);
  const [hasMoreGodParent, setHasMoreGodParent] = useState(false);
  const [searchGodParent, setSearchGodParent] = useState("");
  const [showGodParent, setShowGodParent] = useState(false);
  const [GodParentPage, setGodParentPage] = useState(1);

  // generic fetch for getting sacrament priest and godfather
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
    if (request.status == 200) {
      const { data: result } = request;
      setState((oldState) =>
        firstTime ? [...result.data] : [...oldState, ...result.data]
      );
      setHasMore(() => (result.data?.length <= 0 ? false : true));
    }
  };

  const [stage, setStage] = useState(1);
  const handleCancel = () => {
    navigate(`/members/view-member/${id}`);
  };

  async function handleCreate(e) {
    e.preventDefault();

    if (!sacramentPriest) {
      showError("Please select a Sacrament Priest");
      return;
    }

    if (!godParent) {
      showError("Please select a God Parent");
      return;
    }
    setLoading(() => true);

    const data = {
      type: sacramentType,
      priest: sacramentPriest.id,
      godParent: godParent.id,
      createdOn: date,
    };

    // call endpoint to add sacrament here
    try {
      const request = await axios.post(`/api/sacrament/create/${id}`, data);

      if (request.status == 200 || request.status == 201) {
        modalRef.current.classList.toggle("modal__hidden");
      }
    } catch (error) {
      showError("An unexpected error occured");
    }

    setLoading(() => false);
  }

  const { id } = useParams();

  const [SACRAMENT_TYPE, setSACRAMENT_TYPE] = useState([]);

  const fetchSacramentType = async () => {
    const request = await axios.get("/api/sacrament/getdefault");

    if (request.status == 200) {
      const data = request.data;

      setSACRAMENT_TYPE(data);
    }
  };

  useEffect(() => {
    fetchSacramentType();
  }, []);

  const moveToNextPage = (e) => {
    e.preventDefault();
    if (!sacramentType.length) {
      showError("Please select a sacrament type");
      return;
    }

    if (!date) {
      showError("Please provide date of sacrament");
      return;
    }

    setStage(() => 2);
  };

  // onchange for searching of sacrament priest
  const handleOnChangeSacramentPriest = (e) => {
    setSearchSacramentPriest(e.target.value);
  };

  // useEffect for running search beginning
  useEffect(() => {
    setListSacramentPriest(() => []);
    if (searchSacramentPriest?.length) {
      setShowSacramentPriest(() => true);
      setSacramentPriestPage(() => 1);
      fetchParisher(
        searchSacramentPriest,
        setHasMoreSacramentPriest,
        setListSacramentPriest,
        1,
        true
      );
    }
  }, [searchSacramentPriest]);

  const handleNextSacramentPriests = async () => {
    setSacramentPriestPage((page) => page + 1);
  };

  useEffect(() => {
    if (sacramentPriestPage > 1) {
      fetchParisher(
        searchSacramentPriest,
        setHasMoreSacramentPriest,
        setListSacramentPriest,
        sacramentPriestPage,
        false
      );
    }
  }, [sacramentPriestPage]);

  // selecting a sacrament priest
  const selectPriest = (priest) => {
    setShowSacramentPriest(() => false);
    setSearchSacramentPriest(() => "");
    setSacramentPriest(() => priest);
  };

  // removes selected sacrament priest
  const handleRemoveSacramentPriest = () => {
    setSacramentPriest(() => null);
  };

  // --------- GodParent section-------------

  // useEffect for running search beginning
  useEffect(() => {
    setListGodParent(() => []);
    if (searchGodParent?.length) {
      setShowGodParent(() => true);
      setGodParentPage(() => 1);
      fetchParisher(
        searchGodParent,
        setHasMoreGodParent,
        setListGodParent,
        1,
        true
      );
    }
  }, [searchGodParent]);

  // onchange for searching of god parent
  const handleOnChangeGodParent = (e) => {
    setSearchGodParent(e.target.value);
  };

  useEffect(() => {
    if (GodParentPage > 1) {
      fetchParisher(
        searchGodParent,
        setHasMoreGodParent,
        setListGodParent,
        GodParentPage,
        false
      );
    }
  }, [GodParentPage]);

  const handleNextGodParent = async () => {
    setGodParentPage((page) => page + 1);
  };

  const selectGodParent = (priest) => {
    setShowGodParent(() => false);
    setSearchGodParent(() => "");
    setGodParent(() => priest);
  };

  // removes selected god parent
  const handleRemoveGodParent = () => {
    setGodParent(() => null);
  };

  return (
    <Layout type={2}>
      {<ProgressBar stage1="Part 1" stage2="Part 2" stage={stage} />}

      <form
        onSubmit={handleCreate}
        className="bg-white shadow-sm border-light rounded rounded-3 border py-3 pb-4 mt-4 d-flex flex-column"
      >
        <header className="d-flex align-items-center justify-content-between px-4">
          <div>
            <h5>Add Sacrament</h5>
            <p className="m-0 text-muted">
              List of registered and approved sacraments
            </p>
          </div>
          <Link
            to={`/members/view-member/${id}`}
            className="text-decoration-none"
          >
            &lt; Back to parish overview
          </Link>
        </header>

        {stage == 1 ? (
          <>
            <div className="px-4 py-4 pt-2">
              <select
                name="sacrament-type"
                id="sacrament-type"
                className="form-select "
                style={{
                  borderColor: "var(--bs-border2)",
                  paddingBlock: "0.8rem",
                }}
                value={sacramentType}
                onChange={(e) => setSacramentType(e.target.value)}
              >
                <option value="">Choose A Sacrament Type</option>
                {SACRAMENT_TYPE.map((sacrament_type, index) => (
                  <option value={sacrament_type.replace(" ", "")} key={index}>
                    {" "}
                    {sacrament_type}{" "}
                  </option>
                ))}
              </select>

              <div
                className="my-4 "
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(1, 1fr)",
                  gap: "2rem",
                }}
              >
                <DateSelect2
                  date={date}
                  setDate={setDate}
                  label={"Date of Sacrament"}
                  inputContainerClass="input-container__lg"
                />
              </div>

              {/* <div className="mt-4 d-flex align-items-center justify-content-between">
                <button className="px-5 rounded-1 btn btn-outline-primary">
                  Back
                </button>
                <input
                  type="button"
                  value="Add Sacrament"
                  className="btn btn-primary rounded-1"
                  onClick={handleCreate}
                  disabled={loading}
                />
              </div> */}
            </div>
            <div className="d-flex align-items-center justify-content-between mx-4 mb-3">
              <button
                className="btn btn-outline-primary px-5 py-2"
                onClick={handleCancel}
                type="button"
              >
                Cancel
              </button>
              <button
                type="button"
                // value=""
                className="btn btn-primary px-5 py-2"
                onClick={moveToNextPage}
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <>
            <div
              className="p-4"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "2rem",
              }}
            >
              <div style={{ gridColumn: "1/-1" }}>
                {!sacramentPriest && (
                  <>
                    <Input
                      iconOne={<MemoEmojiMail className="icon-one" />}
                      label="Add Sacrament Priest"
                      type="text"
                      large
                      value={searchSacramentPriest}
                      onChange={handleOnChangeSacramentPriest}
                    />

                    <div
                      className=""
                      style={{
                        border: "solid #eee 1px",
                        marginTop: "10px",
                        borderRadius: "5px",
                        maxHeight: "150px",
                        overflow: "scroll",
                        display: showSacramentPriest ? "block" : "none",
                      }}
                    >
                      <InfiniteScroll
                        dataLength={listSacramentPriest?.length}
                        next={handleNextSacramentPriests}
                        hasMore={hasMoreSacramentPriest}
                        loader={<p className="text-center">loading more</p>}
                      >
                        {listSacramentPriest?.map((priest, index) => (
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
                              id={priest.id}
                              value={`${priest.firstName} ${priest.lastName}`}
                              onClick={(e) => selectPriest(priest)}
                            />
                            <label
                              className=""
                              htmlFor="flexRadioDefault1"
                              style={{
                                marginLeft: "10px",
                                placeItems: "start",
                              }}
                            >
                              {`${priest.firstName} ${priest.lastName}`}
                            </label>
                          </div>
                        ))}
                      </InfiniteScroll>
                    </div>
                  </>
                )}
                {sacramentPriest && (
                  <p className="d-flex flex-row align-items-center">
                    <span className="me-3">Selected Sacrament Priest:</span>{" "}
                    <span className="badge rounded-pill btn-lg bg-primary py-2 px-4">
                      {`${sacramentPriest.firstName} ${sacramentPriest.lastName}`}{" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-x-lg"
                        viewBox="0 0 16 16"
                        onClick={handleRemoveSacramentPriest}
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
              </div>
              {!godParent && (
                <>
                  <div style={{ gridColumn: "1/-1" }}>
                    <Input
                      iconOne={<MemoEmojiMail className="icon-one" />}
                      label="Add God Parent"
                      type="text"
                      large
                      value={searchGodParent}
                      onChange={handleOnChangeGodParent}
                    />

                    <div
                      className=""
                      style={{
                        border: "solid #eee 1px",
                        marginTop: "10px",
                        borderRadius: "5px",
                        maxHeight: "150px",
                        overflow: "scroll",
                        display: showGodParent ? "block" : "none",
                      }}
                    >
                      <InfiniteScroll
                        dataLength={listGodParent?.length}
                        next={handleNextGodParent}
                        hasMore={hasMoreGodParent}
                        loader={<p>loading</p>}
                      >
                        {listGodParent?.map((parent, index) => (
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
                              id={parent.id}
                              value={`${parent.firstName} ${parent.lastName}`}
                              onClick={(e) => selectGodParent(parent)}
                            />
                            <label
                              className=""
                              htmlFor="flexRadioDefault1"
                              style={{
                                marginLeft: "10px",
                                placeItems: "start",
                              }}
                            >
                              {`${parent.firstName} ${parent.lastName}`}
                            </label>
                          </div>
                        ))}
                      </InfiniteScroll>
                    </div>
                  </div>
                </>
              )}

              {godParent && (
                <div style={{ gridColumn: "1/-1" }}>
                  <p className="d-flex flex-row align-items-center">
                    <span className="me-3">Selected God Parent:</span>{" "}
                    <span className="badge rounded-pill btn-lg bg-primary py-2 px-4">
                      {`${godParent.firstName} ${godParent.lastName}`}{" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-x-lg"
                        viewBox="0 0 16 16"
                        onClick={handleRemoveGodParent}
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
                </div>
              )}
            </div>
            <div className="mt-4 px-4 d-flex align-items-center justify-content-between">
              <button
                className="btn btn-outline-primary px-5"
                onClick={() => setStage(() => 1)}
                type="button"
              >
                Back
              </button>
              <button
                className="btn btn-primary"
                // onClick={() => console.log("first")}
                type="submit"
                disabled={loading}
              >
                Add Sacrament
              </button>
            </div>
          </>
        )}
      </form>

      <Modal refer={modalRef}>
        <div
          style={{
            gap: "1rem",
          }}
          className="py-3 text-center d-flex flex-column justify-content-center align-items-center"
        >
          <h5>Sacrament Successfully Added</h5>
          <BlueTick />
          <p className="m-0 text-muted">
            A new sacrament has successfully been added to Profile
          </p>
          <Link
            to={`/members/view-member/${id}`}
            className="d-flex align-items-center mt-3"
          >
            <GreenChat />
            <span className="ms-3 ps-3 border-start border-1 border-primary">
              Back to Profile
            </span>
          </Link>
        </div>
      </Modal>
    </Layout>
  );
}

export default AddSacrament;
