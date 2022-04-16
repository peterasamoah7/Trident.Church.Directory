import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";

//  Styles
import "../../styles/dist/table.css";

// components
import EllipseNModal from "../../components/modal/EllipseNModal";
import SearchInput from "../../components/inputs/specialInputs/SearchInput";

// Elements
import SvgHashTag from "../../Elements/svgs/HashTag";
import Layout from "../../components/Layout";

import axios from "axios";

function ViewSacrament({ onLayoutType }) {
  const [group, setGroup] = useState(null);
  const [members, setMembers] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const deleteModalRef = useRef();

  const showDeleteModal = () => {
    deleteModalRef.current.classList.toggle("modal__hidden");
  };

  let params = useParams();
  let id = params.id;

  useEffect(() => {
    axios.get(`/api/parishgroup/get/${id}`).then((response) => {
      if (response.status === 200) {
        setGroup(response.data);
        setMembers(response.data.parishioners);
        setNextPage(response.data.parishioners.nextPage);
        setPrevPage(response.data.parishioners.previousPage);
      } else {
        //show error
      }
    });
  }, []);

  const searchMember = (query) => {
    axios.get(`/api/parishgroup/getall/query=${query}`).then((response) => {
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

  const deletemember = (memberId) => {
    axios
      .post(`api/parishgroup/deleteparishioner/${id}/parishioner/${memberId}`)
      .then((response) => {
        if (response.status === 200) {
          getMembers();
        } else {
          //show errors
        }
      });
  };

  const next = () => {
    getMembers(nextPage);
  };

  const prev = () => {
    getMembers(prevPage);
  };

  const getMembers = (path) => {
    axios
      .get(`/api/parishgroup/getparishioners/${id}/${path}`)
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
            &lt; Back to Sacraments Overview
          </Link>
        </header>

        <p className="m-0 text-muted">{group?.description}</p>

        <div className="d-flex align-items-center justify-content-between">
          {/* <div className="d-flex align-items-center my-4 border-bottom border-white border-2">
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
          </div> */}

          {/* <div>
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
              handleDeleteFunc={() => console.log("Group Deleted")}
            />
          </div> */}
        </div>

        <section className="my-4 d-flex align-items-center justify-content-between">
          <div className="col-4">
            <SearchInput />
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
                members.data.map((item, index) => {
                  return (
                    <>
                      <tr>
                        <td className="num text-center">{index + 1}.</td>
                        <td>
                          {item.firstName} {item.lastName}
                        </td>
                        <td>{item.type}</td>
                        <td>{item.location}</td>
                        <td>{item.phoneNumber}</td>
                        <td>{item.occupation}</td>
                        <td>
                          <EllipseNModal />
                        </td>
                      </tr>
                    </>
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

export default ViewSacrament;
