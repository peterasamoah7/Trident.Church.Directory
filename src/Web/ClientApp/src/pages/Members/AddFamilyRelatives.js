import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

// components
import Input from "../../components/inputs/Input";
import Layout from "../../components/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Elements
import CircledPlus from "../../Elements/svgs/CircledPlus";
import SvgGreenPlus from "../../Elements/svgs/GreenPlus";
import { ErrorContext } from "../../context/ErrorContext";

function AddFamilyRelatives() {
  const [member, setMember] = useState();
  const { showError } = useContext(ErrorContext);

  const [relative, setRelative] = useState();
  const [relativeType, setRelativeType] = useState();

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    axios.get(`/api/parishioner/get/${id}`).then((response) => {
      if (response.status === 200) {
        setMember(response.data);
        console.log(response.data);
      } else {
        //show errors
      }
    });
  }, []);

  useEffect(() => {
    if (
      !(
        member?.father == undefined ||
        member?.mother == undefined ||
        member?.partner == undefined
      )
    ) {
      navigate(`/members/view-member/${id}`);
    }
  }, [member]);

  const [listRelatives, setListRelatives] = useState([]);
  const [hasMoreRelatives, setHasMoreRelatives] = useState(false);
  const [searchRelatives, setSearchRelatives] = useState("");
  const [showRelatives, setShowRelatives] = useState(false);
  const [relativesPage, setRelativesPage] = useState(1);

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

  // onchange for searching of sacrament priest
  const handleOnChangeRelatives = (e) => {
    setSearchRelatives(e.target.value);
  };

  // useEffect for running search beginning
  useEffect(() => {
    setListRelatives(() => []);
    if (searchRelatives?.length) {
      setShowRelatives(() => true);
      setRelativesPage(() => 1);
      fetchParisher(
        searchRelatives,
        setHasMoreRelatives,
        setListRelatives,
        1,
        true
      );
    }
  }, [searchRelatives]);

  const handleNextRelatives = async () => {
    setRelativesPage((page) => page + 1);
  };

  useEffect(() => {
    if (relativesPage > 1) {
      fetchParisher(
        searchRelatives,
        setHasMoreRelatives,
        setListRelatives,
        relativesPage,
        false
      );
    }
  }, [relativesPage]);

  // selecting a member priest
  const selectRelatives = (member) => {
    setShowRelatives(() => false);
    setSearchRelatives(() => "");
    setRelative(() => member);
  };

  // removes selected sacrament priest
  const handleRemoveRelatives = () => {
    setRelative(() => null);
  };

  const handleSubmit = async () => {
    if (!relativeType) {
      showError("Please provide a role for this relative");
      return;
    }
    if (!relative) {
      showError("Please search and select the realive");
      return;
    }

    const data = {
      relativeType,
      relativeId: relative.id,
    };

    try {
      const request = await axios.put(
        `/api/parishioner/addrelative/${id}`,
        data
      );
      if (request.status == 200 || request.status == 201) {
        navigate(`/members/view-member/${id}`);
        showError("Successfully added relative", "success");
      }
    } catch (error) {
      showError("Could not add relative, Please try again");
    }
  };

  return (
    <Layout type={2}>
      <header className="d-flex align-items-end justify-content-between mb-4">
        <div>
          <h5>Add relatives</h5>
          <p className="m-0 tex-muted">
            List of registered and approved parishes
          </p>
        </div>
        <Link
          to={`/members/view-member/${id}`}
          className="text-decoration-none"
        >
          &lt; Back to parish overview
        </Link>
      </header>

      <form className="bg-white shadow-sm rounded-2 border border-muted">
        <p className="text-muted border-bottom border-muted m-0 py-4 px-3">
          The information can be edited from your profile page
        </p>
        <div className="px-3 py-4">
          <select
            name="role"
            id="role"
            className="form-select mb-4"
            style={{
              paddingBlock: "0.8em",
              borderColor: "var(--bs-border2)",
            }}
            onChange={(e) => {
              e.persist();
              setRelativeType(() => e.target.value);
            }}
          >
            <option value="">Choose a role</option>
            {member?.mother == undefined && (
              <option value="mother">Mother</option>
            )}
            {member?.father == undefined && (
              <option value="father">Father</option>
            )}
            {member?.partner == undefined && (
              <option value="partner">Partner</option>
            )}
          </select>
          <div
            // className=" mb-4  d-flex align-items-center"
            style={{
              gap: "1.3rem",
            }}
          >
            {!relative ? (
              <div>
                <Input
                  containerClass="input-container__lg"
                  inputClass="form-select"
                  label="Add relative"
                  onChange={handleOnChangeRelatives}
                  value={searchRelatives}
                />

                <div
                  className=""
                  style={{
                    border: "solid #eee 1px",
                    marginTop: "10px",
                    borderRadius: "5px",
                    maxHeight: "150px",
                    overflow: "scroll",
                    display: showRelatives ? "block" : "none",
                  }}
                >
                  <InfiniteScroll
                    dataLength={listRelatives?.length}
                    next={handleNextRelatives}
                    hasMore={hasMoreRelatives}
                    loader={<p>loading</p>}
                  >
                    {listRelatives?.map((relative, index) => (
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
                          id={relative.id}
                          value={`${relative.firstName} ${relative.lastName}`}
                          onClick={() => selectRelatives(relative)}
                        />
                        <label
                          className=""
                          htmlFor="flexRadioDefault1"
                          style={{ marginLeft: "10px", placeItems: "start" }}
                        >
                          {`${relative.firstName} ${relative.lastName}`}
                        </label>
                      </div>
                    ))}
                  </InfiniteScroll>
                </div>
              </div>
            ) : (
              <p className="d-flex flex-row align-items-center">
                <span className="me-3">Selected Relative:</span>{" "}
                <span className="badge rounded-pill btn-lg bg-primary py-2 px-4">
                  {`${relative?.firstName} ${relative?.lastName}`}{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-x-lg"
                    viewBox="0 0 16 16"
                    onClick={handleRemoveRelatives}
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
            {/* <CircledPlus className="text-primary" /> */}
          </div>

          {/* <Link to="" className="my-4 mb-5 d-flex align-items-center">
            <SvgGreenPlus />
            <span className="ms-2 ps-2 border-start border-1 border-primary">
              Add a new relative
            </span>
          </Link> */}

          <div className=" mt-4 d-flex align-items-center justify-content-between">
            <button className="btn btn-outline-primary rounded-1 px-4">
              Cancel
            </button>
            <input
              type="button"
              value="Add Relative"
              onClick={handleSubmit}
              className="btn btn-primary rounded-1 px-4"
            />
          </div>
        </div>
      </form>
    </Layout>
  );
}

export default AddFamilyRelatives;
