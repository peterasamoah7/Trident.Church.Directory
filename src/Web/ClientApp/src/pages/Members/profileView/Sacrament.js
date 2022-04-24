import React, { useRef, useState, useEffect, useContext } from "react";

import Modal from "../../../components/modal/Modal";

//Elements
import GreenFolder from "../../../Elements/svgs/GreenFolder";
import RoundPerson from "../../../Elements/svgs/RoundPerson";
import BlueParish from "../../../Elements/svgs/BlueParish";
import axios from "axios";
import { ErrorContext } from "../../../context/ErrorContext";
import SvgRoundPen from "../../../Elements/svgs/RoundPen";
import DeleteSacramentModal from "../../../components/modal/DeleteSacramentModal";
// import { useNavigate } from "react-router-dom";

function Sacrament({ model, setMember }) {
  const modalRef = useRef();
  const [sacrament, setSacrament] = useState(null);
  const { showError } = useContext(ErrorContext);
  const [showModal, setShowModal] = useState(false);
  const deleteModalRef = useRef();
  // const navigate = useNavigate();

  function handleShowModal(e) {
    e.preventDefault();
    setShowModal((state) => !state);
    modalRef.current.classList.toggle("modal__hidden");
  }

  function handleShowDeleteModal(e) {
    e.preventDefault();
    deleteModalRef.current.classList.toggle("modal__hidden");
  }

  const controller = new AbortController();

  const fetchSacrament = async () => {
    try {
      const request = await axios.get(`/api/sacrament/get/${model.id}`, {
        signal: controller.signal,
      });
      if (request.status === 200) {
        setSacrament(() => request.data);
      }
    } catch (error) {
      showError("An unexpected error occurred");
      modalRef.current.classList.toggle("modal__hidden");
    }
  };

  useEffect(() => {
    if (showModal && sacrament === null) {
      fetchSacrament();
    }
    return () => {
      controller.abort();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showModal]);

  function convertDate(dateStr) {
    return new Date(dateStr);
  }

  const handleDeleteFunc = async () => {
    try {
      const request = await axios.delete(`/api/sacrament/delete/${model.id}`);
      if (request.status === 200) {
        // navigate(0);
        setMember((oldState) => ({
          ...oldState,
          sacraments: oldState.sacraments?.filter(
            (sacrament) => sacrament.id !== model.id
          ),
        }));
      }
    } catch (error) {
      showError("There was an unexpected error");
    }
  };

  return (
    <>
      <div className="sacrament py-1 d-flex border-bottom">
        <p className="date d-flex flex-column align-items-center justify-content-center col-2 border-end border-1 my-2">
          <span className="fs-5">{convertDate(model.createdOn).getDate()}</span>
          <span className="text-muted text-uppercase">
            {convertDate(model.createdOn).toLocaleString("en-us", {
              month: "short",
            })}{" "}
            {convertDate(model.createdOn).getFullYear()}
          </span>
        </p>
        <div className="d-flex align-items-center px-4 py-3 justify-content-between flex-fill">
          <section>
            <h6 className="m-0">{model.type}</h6>
          </section>
          <section className="d-flex">
            {/* <p className="text-muted m-0">{parish}</p> */}
            <p className="m-0 p-0 d-flex align-items-center flex-fill justify-content-end">
              <GreenFolder />
              <span
                className="border-start border-1 border-primary ps-2 ms-2 m-0 p-0 text-primary text-decoration-underline"
                onClick={handleShowModal}
                style={{
                  cursor: "pointer",
                }}
              >
                View Event
              </span>
            </p>

            <p className="m-0 ms-2 p-0 d-flex align-items-center flex-fill justify-content-end">
              <SvgRoundPen
                size="1.7em"
                className="text-success text-danger"
                style={{
                  fontSize: "0.7rem",
                }}
              />
              <span
                className="border-start border-1 border-primary ps-2 ms-2 m-0 p-0 text-primary text-decoration-underline"
                onClick={handleShowDeleteModal}
                style={{
                  cursor: "pointer",
                }}
              >
                Delete Event
              </span>
            </p>
          </section>
        </div>
      </div>

      <DeleteSacramentModal
        modalRef={deleteModalRef}
        sacramentId={model.id}
        handleDeleteFunc={handleDeleteFunc}
      />

      <Modal refer={modalRef}>
        <div
          className="modalGrid"
          style={{
            display: "grid",
            gridTemplateColumns: "0.2fr 1fr",
            gap: "0rem 1.3rem",
            alignItems: "flex-start",
          }}
        >
          <div className="d-flex flex-column border-end py-3 px-4 justify-content-center align-items-center">
            <h5>{convertDate(model.createdOn).getDate()}</h5>
            <p className="h5 lead text-muted text-uppercase">
              {convertDate(model.createdOn).toLocaleString("en-us", {
                month: "short",
              })}
            </p>
          </div>
          <div className=" py-3  ">
            <h5 className="text-capitalize">{model.type}</h5>
          </div>
          {sacrament?.priest ? (
            <>
              <div className=" py-3 px-4  d-flex flex-column justify-content-center align-items-center">
                <RoundPerson />
              </div>
              <div className=" py-3  ">
                <h5>{`${sacrament?.priest?.firstName} ${sacrament?.priest?.lastName}`}</h5>
                <p className="text-muted fw-lighter ">Sacrament Priest</p>
              </div>
            </>
          ) : (
            <>
              <div></div>
              <div></div>
            </>
          )}
          <div className=" py-3  px-4 d-flex flex-column justify-content-center align-items-center">
            <BlueParish />
          </div>
          <div className=" py-3  ">
            <h5>{sacrament?.parish?.name}</h5>
            <p className="text-muted fw-lighter ">Parish</p>
          </div>
          {sacrament?.godParent && (
            <>
              <div className=" py-3  px-4 d-flex flex-column justify-content-center align-items-center">
                <BlueParish />
              </div>
              <div className=" py-3  ">
                <h5>
                  {sacrament?.godParent?.firstName}{" "}
                  {sacrament?.godParent?.lastName}
                </h5>
                <p className="text-muted fw-lighter ">God Parent</p>
              </div>
            </>
          )}
        </div>
      </Modal>
    </>
  );
}

export default Sacrament;
