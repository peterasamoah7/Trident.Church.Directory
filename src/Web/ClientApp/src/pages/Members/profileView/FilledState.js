import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Link } from "react-router-dom";
import Sacrament from "./Sacrament";
import Layout from "../../../components/Layout";

//Elements
import Info from "../../../Elements/svgs/Info";
import ContactCard from "../../../Elements/svgs/ContactCard";
import BluePhone from "../../../Elements/svgs/BluePhone";
import BlueMail from "../../../Elements/svgs/BlueMail";
import GreenPlus from "../../../Elements/svgs/GreenPlus";
import GreenPen from "../../../Elements/svgs/RoundPen";
import GreenFolder from "../../../Elements/svgs/GreenFolder";
import axios from "axios";
import { useContext } from "react";
import { ErrorContext } from "../../../context/ErrorContext";
import DeleteProfileModal from "../../../components/modal/DeleteProfileModal";

//
function FilledState(props) {
  const params = useParams();

  const [member, setMember] = useState(null);
  const navigate = useNavigate();
  const deleteModalRef = useRef();

  const { showError } = useContext(ErrorContext);

  const showDeleteModal = () => {
    deleteModalRef.current.classList.toggle("modal__hidden");
  };

  const controller = new AbortController();

  //useEffect(() => {
  //   return controller.abort();
  //  });

  useEffect(() => {
    axios
      .get(`/api/parishioner/get/${params.id}`, { signal: controller.signal })
      .then((response) => {
        if (response.status === 200) {
          setMember(response.data);
        } else {
          //show errors
        }

        if (response.status === 204) {
          showError("User does not exist");
          navigate("/");
        }
      });

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteGroup = async () => {
    try {
      const request = await axios.delete(
        `/api/parishioner/delete/${params.id}`,
        { signal: controller.signal }
      );

      if (request.status === 204 || request.status === 200) {
        showError("Successfull Delete Profile", "success");
        navigate("/members");
      }
    } catch (error) {
      showError("Sorry could not perform delete operation");
    }
  };

  return (
    <Layout type={1}>
      <div className=" my-3 mt-4 d-flex">
        <div className="col-4 d-flex flex-column justify-content-start align-items-start p-0 m-0">
          <section className="member-summary py-4 pb-0 px-4 m-0 bg-white d-flex flex-column justify-content-start align-items-center container-fluid">
            <div className="d-flex align-items-center justify-content-start col-12">
              <h5 className="member-name m-0 col-6">
                {member?.firstName} {member?.lastName}
              </h5>
              <a
                href={`tel:${member?.phoneNumber}`}
                className="p-0 btn col-1 me-2"
              >
                <BluePhone />
              </a>
              <a href="mailto:email@example.com" className="p-0 btn col-1 me-2">
                <BlueMail />
              </a>
            </div>
            <div className="summary-info col-12 mt-3  d-flex flex-column align-items-start gx-3">
              <div>
                <span className="is-member me-2">
                  {member?.type || "Member"}
                </span>
                <span className="fs-5 me-1">&bull;</span>
                <span className="parish-name">
                  {/* Fountain of life and Truth */}
                </span>
              </div>
              <p className="mt-2">
                Member since{" "}
                {new Date(member?.createdOn).toLocaleString("default", {
                  month: "long",
                })}{" "}
                {new Date(member?.createdOn).getFullYear()}
              </p>
            </div>
          </section>
          <section className="member-details-2  mt-0 pt-0 p-4 bg-white flex-fill container-fluid">
            <div className="basic-information row row-cols-2 g-3 align-items-start mt-0 pt-0">
              <header className="d-flex justify-content-start align-items-center py-2 border-bottom border-2 col-12">
                <Info />
                <h6 className="text-muted m-0 ms-3">Basic Information</h6>
              </header>
              <section className="detail detail__date-of-birth d-flex flex-column align-items-start justify-content-center">
                <h6 className="detail-title text-muted">Date of birth</h6>
                <p className="detail info">{member?.dateOfBirth}</p>
              </section>
              <section className="detail detail__place-of-birth d-flex flex-column align-items-start justify-content-center">
                <h6 className="detail-title text-muted">Location</h6>
                <p className="detail info">{member?.location}</p>
              </section>
              <section className="detail detail__postal-code d-flex flex-column align-items-start justify-content-center">
                <h6 className="detail-title text-muted">Postal Code</h6>
                <p className="detail info">{member?.postcode}</p>
              </section>
              <section className="detail detail__occupation d-flex flex-column align-items-start justify-content-center">
                <h6 className="detail-title text-muted">Occupation</h6>
                <p className="detail info">{member?.occupation}</p>
              </section>
            </div>
            <header className="d-flex justify-content-start my-3 align-items-center py-2 border-bottom border-2 col-12">
              <ContactCard />
              <h6 className="text-muted m-0 ms-3">Contact Information</h6>
            </header>
            <section className="detail detail__home-address d-flex flex-column align-items-start justify-content-center">
              <h6 className="detail-title text-muted">Home Address</h6>
              <p className="detail info">{member?.homeAddress}</p>
            </section>
            <div className="d-flex">
              {member?.father && (
                <section className="detail detail__father d-flex flex-column align-items-start justify-content-center col-4">
                  <h6 className="detail-title ">Father</h6>
                  <p className="detail info">
                    {member?.father?.firstName}{" "}
                    {member?.father?.lastName?.[0]?.toUpperCase()}.
                  </p>
                </section>
              )}
              {member?.mother && (
                <section className="detail detail__mother d-flex flex-column align-items-start justify-content-center col-4">
                  <h6 className="detail-title ">Mother</h6>
                  <p className="detail info">
                    {member?.mother?.firstName}{" "}
                    {member?.mother?.lastName?.[0]?.toUpperCase()}.
                  </p>
                </section>
              )}
              {member?.partner && (
                <section className="detail detail__spouse d-flex flex-column align-items-start justify-content-center col-4">
                  <h6 className="detail-title ">Spouse</h6>
                  <p className="detail info">
                    {member?.partner?.firstName}{" "}
                    {member?.partner?.lastName?.[0]?.toUpperCase()}.
                  </p>
                </section>
              )}
            </div>
            <div>
              {(member?.father === undefined ||
                member?.mother === undefined ||
                member?.partner === undefined) && (
                <Link to="add-relative">
                  <p className="m-0 p-0 d-flex align-items-center flex-fill justify-content-center">
                    <GreenPlus />
                    <span className="border-start border-1 border-primary ps-2 ms-2 m-0 p-0">
                      Add a relative
                    </span>
                  </p>
                </Link>
              )}
            </div>
          </section>
        </div>

        <section className="units-and-sacrament py-1s d-flex flex-column ms-4 flex-fill align-items-start">
          <div className="d-flex align-items-center justify-content-between col-12">
            <p className="d-flex">
              <Link
                to={`/members/edit-member/${params.id}`}
                className="m-0 p-0 d-flex align-items-center me-4"
              >
                <GreenPen
                  size="1.7em"
                  className="text-success"
                  style={{
                    fontSize: "0.7rem",
                  }}
                />
                <span className="border-start border-1 border-primary ps-2 ms-2 m-0 p-0">
                  Edit Profile
                </span>
              </Link>
              <span
                style={{ pointer: "cursor" }}
                className="m-0 p-0 d-flex align-items-center"
                onClick={showDeleteModal}
              >
                <GreenPen
                  size="1.7em"
                  className="text-success text-danger"
                  style={{
                    fontSize: "0.7rem",
                  }}
                />
                <u className="text-primary">
                  <span className="underline border-start border-1 border-primary ps-2 ms-2 m-0 p-0">
                    Delete Profile
                  </span>
                </u>
              </span>
            </p>
            <Link to="/members" className="text-decoration-none">
              &lt; Back to Members Overview
            </Link>
          </div>

          <section className="units col-12">
            <div className="bg-white p-4 py-3 mt-3">
              <h6 className="m-0">Units</h6>
            </div>
            <div
              className="unit-summary-cards py-3"
              style={{
                display: "flex",
                gap: "1rem",
              }}
            >
              {member &&
                member.parishGroups.map((item, index) => {
                  return (
                    <section
                      key={index + 1}
                      className="unit bg-white rounded-3 py-3 col"
                    >
                      <div className="border-bottom p-3 pt-2 px-3 mb-3">
                        <h6 className="unit-title">{item.name}</h6>
                      </div>
                      <div className="d-flex align-items-center justify-content-start px-3">
                        <GreenFolder />
                        <Link
                          to={`/groups/view-group/${item.id}`}
                          className="border-start border-1 ps-2 ms-2 border-primary"
                        >
                          View Unit
                        </Link>
                      </div>
                    </section>
                  );
                })}
            </div>
          </section>

          <section className="sacrament py-1s flex-fill bg-white container-fluid px-0">
            <div className="border-bottom py-2 m-0 px-4 d-flex justify-content-between align-items-center">
              <h6 className="m-0">Sacraments</h6>
              <p className="m-0 p-0 d-flex align-items-center flex-fill justify-content-end">
                <GreenPlus />
                <Link
                  to={`add-sacrament`}
                  className="border-start border-1 border-primary ps-2 ms-2 m-0 p-0"
                >
                  Add a new Sacrament
                </Link>
              </p>
            </div>

            <section className="sacrment-view">
              {member &&
                member.sacraments.map((item, index) => {
                  return <Sacrament key={index} model={item} />;
                })}
            </section>
          </section>
        </section>
      </div>
      <footer className="d-flex align-items-center justify-content-center small">
        <small>
          &copy;2021
          <Link to="" className="text-decoration-none ms-3">
            &bull; Privacy Policy
          </Link>
          <Link to="" className="text-decoration-none ms-3">
            &bull; Terms &amp; Conditions
          </Link>
        </small>
      </footer>
      <DeleteProfileModal
        modalRef={deleteModalRef}
        memberId={params.id}
        handleDeleteFunc={deleteGroup}
      />
    </Layout>
  );
}

export default FilledState;
