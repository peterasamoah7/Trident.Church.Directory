import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

//  Styles
import "../../styles/dist/table.css";

// components
import EllipseNModal from "../../components/modal/EllipseNModal";
import SearchInput from "../../components/inputs/specialInputs/SearchInput";

// Elements
import SvgHashTag from "../../Elements/svgs/HashTag";
import Person from "../../Elements/svgs/Person";
import GreenPlus from "../../Elements/svgs/GreenPlus";
import Layout from "../../components/Layout";

import axios from "axios";
import DeleteGroupModal from "../../components/modal/DeleteGroupModal";
import SvgRoundPen from "../../Elements/svgs/RoundPen";
import { useContext } from "react";
import { ErrorContext } from "../../context/ErrorContext";

function ViewUnit({ onLayoutType }) {
  const [group, setGroup] = useState(null);
  const [members, setMembers] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const deleteModalRef = useRef();
  const { showError } = useContext(ErrorContext);
  const navigate = useNavigate();

  const showDeleteModal = () => {
    deleteModalRef.current.classList.toggle("modal__hidden");
  };

  let params = useParams();
  let id = params.id;

  const controller = new AbortController();

  // useEffect(() => {
  //   return controller.abort();
  // });

  const fetchGroup = async () => {
    try {
      const request = await axios.get(`/api/parishgroup/get/${id}`, {
        signal: controller.signal,
      });
      if (request.status === 200) {
        setGroup(request.data);
        setMembers(request.data.parishioners);
        setNextPage(request.data.parishioners.nextPage);
        setPrevPage(request.data.parishioners.previousPage);
      }
    } catch (error) {
      showError("An Unexpected error occured");
    }
  };

  useEffect(() => {
    fetchGroup();

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const searchMember = async (query) => {
    try {
      const request = await axios.get(
        `/api/parishgroup/getall/query=${query}`,
        { signal: controller.signal }
      );
      if (request.status === 200) {
        setMembers(request.data);
        setNextPage(request.data.nextPage);
        setPrevPage(request.data.previousPage);
      }
    } catch (error) {
      showError("An Unexpected error occured");
    }
  };

  const deletemember = async (memberId) => {
    try {
      const request = await axios.delete(
        `/api/parishgroup/deleteparishioner/${id}/parishioner/${memberId}`,
        { signal: controller.signal }
      );
      if (request.status === 200) {
        getMembers();
        showError("Successfully deleted", "success");
      }
    } catch (error) {
      showError("An Unexpected error occured");
    }
  };

  const deleteGroup = async () => {
    try {
      const request = await axios.delete(`/api/parishgroup/delete/${id}`, {
        signal: controller.signal,
      });

      if (request.status === 204 || request.status === 200) {
        showError("Successfull Delete Group", "success");
        navigate("/groups");
      }
    } catch (error) {
      showError("Sorry could not perform delete operation");
    }
  };

  const next = () => {
    getMembers(nextPage);
  };

  const prev = () => {
    getMembers(prevPage);
  };

  const getMembers = (path = "") => {
    axios
      .get(`/api/parishgroup/getparishioners/${id}/${path}`, {
        signal: controller.signal,
      })
      .then((response) => {
        if (response.status === 200) {
          setMembers(null);
          setMembers(response.data);
          setNextPage(response.data.nextPage);
          setPrevPage(response.data.previousPage);
        } else {
          //show errors
        }
      });
  };

  return (
    <Layout>
      <main>
        <header className="d-flex align-items-start justify-content-between mb-3">
          <div className="d-flex align-items-start" style={{ gap: "1rem" }}>
            <SvgHashTag style={{ color: "var(--bs-hash3)" }} />
            <div>
              <h5 className="mb-1">{group?.name}</h5>
            </div>
          </div>
          <Link to="/groups" className="text-decoration-none">
            &lt; Back to Groups Overview
          </Link>
        </header>

        <p className="m-0 text-muted">{group?.description}</p>

        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center my-4 border-bottom border-white border-2">
            <figure className="d-flex align-items-center">
              <Person
                width="1em"
                height="1em"
                className="text-primary"
                opacity={1}
              />
              <figcaption className="ms-2">
                <span>{group?.memberCount}</span> members
              </figcaption>
            </figure>
            <Link to={`/groups/add-member/${group?.id}`} className=" ms-5">
              <figure className="d-flex align-items-center">
                <GreenPlus />
                <figcaption className="ms-3">
                  <span className="ps-3 border-start border-primary">
                    Add a new member
                  </span>
                </figcaption>
              </figure>
            </Link>
            <Link to={`/groups/edit-group/${group?.id}`} className=" ms-5">
              <figure className="d-flex align-items-center">
                <SvgRoundPen />
                <figcaption className="ms-3">
                  <span className="ps-3 border-start border-primary">
                    Edit Group
                  </span>
                </figcaption>
              </figure>
            </Link>
          </div>

          <div style={{ cursor: "pointer" }}>
            <figure
              className="d-flex align-items-center deleteGroup"
              onClick={showDeleteModal}
            >
              <GreenPlus fill={"var(--bs-danger)"} />
              <figcaption className="ms-3">
                <span className="ps-3 border-start border-primary deleteGroup">
                  Delete Group
                </span>
              </figcaption>
            </figure>
            <DeleteGroupModal
              modalRef={deleteModalRef}
              groupName={group?.name}
              groupId={group?.id}
              handleDeleteFunc={deleteGroup}
            />
          </div>
        </div>

        <section className="my-4 d-flex align-items-center justify-content-between">
          <div className="col-4">
            <SearchInput handleSearch={searchMember} />
          </div>
        </section>

        <div
          className="d-flex justify-content-between data-tables p-0 m-0 mt-4"
          style={{ gap: "3rem" }}
        >
          <table className="bg-white">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Role</th>
                <th>Location</th>
                <th>Phone No.</th>
                <th>Occupation</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {members &&
                members.data.map((member, index) => {
                  return (
                    <React.Fragment key={index}>
                      <tr>
                        <td className="num text-center">{index + 1}.</td>
                        <td>
                          {member.firstName} {member.lastName}
                        </td>
                        <td>{member.type}</td>
                        <td>{member.location}</td>
                        <td>{member.phoneNumber}</td>
                        <td>{member.occupation}</td>
                        <td>
                          <EllipseNModal
                            onView={() =>
                              navigate(`/members/view-member/${member.id}`)
                            }
                            deletable
                            onDelete={() => deletemember(member.id)}
                          />
                        </td>
                      </tr>
                    </React.Fragment>
                  );
                })}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="7" className="small p-1">
                  <div className="d-flex align-items-center justify-content-end me-4">
                    <span className="col-5">Rows per page: </span>
                    <select
                      name="rowsPerPage"
                      id="rowsPerPage"
                      className="ms-5"
                    >
                      <option value="10" className="">
                        {members && members.data.length}
                      </option>
                    </select>
                    <div className="tableNav ms-4">
                      {prevPage && (
                        <button onClick={prev} className="btn border-none p-2">
                          &lt;
                        </button>
                      )}
                      {nextPage && (
                        <button onClick={next} className="btn border-none p-2">
                          &gt;
                        </button>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </main>
    </Layout>
  );
}

export default ViewUnit;
