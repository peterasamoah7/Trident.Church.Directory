import React, { useRef, useState, useEffect, useContext } from "react";

import { Link } from "react-router-dom";
import Modal from "../../../components/modal/Modal";

//Elements
import GreenFolder from "../../../Elements/svgs/GreenFolder";
import RoundPerson from "../../../Elements/svgs/RoundPerson";
import BlueParish from "../../../Elements/svgs/BlueParish";
import axios from "axios";
import { ErrorContext } from "../../../context/ErrorContext";

function Sacrament({ model }) {
  const modalRef = useRef();
  const [sacrament, setSacrament] = useState({});
  const { showError } = useContext(ErrorContext);

  function handleCreate(e) {
    e.preventDefault();
    modalRef.current.classList.toggle("modal__hidden");
    // 	console.log(modalRef.current);
  }

  const fetchSacrament = async () => {
    try {
      const request = await axios.get(`/api/sacrament/get/${model.id}`);
      if (request.status === 200) {
        setSacrament(() => request.data);
      }
    } catch (error) {
      showError("An unexpected error occurred");
      modalRef.current.classList.toggle("modal__hidden");
    }
  };

  useEffect(() => {
    fetchSacrament();
  }, []);

  function convertDate(dateStr) {
    if (dateStr !== null) {
      if (dateStr.indexOf("T") >= 0) {
        dateStr = dateStr.split("T")[0];
      }
      if (dateStr.indexOf("+") >= 0) {
        dateStr = dateStr.split("+")[0];
      }
    }
    return new Date(dateStr);
  }

  return (
    <>
      <div className="sacrament py-1 d-flex border-bottom">
        <p className="date d-flex flex-column align-items-center justify-content-center col-2 border-end border-1 my-2">
          <span className="fs-5">{convertDate(model.createdOn).getDay()}</span>
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
          <section>
            {/* <p className="text-muted m-0">{parish}</p> */}
            <p className="m-0 p-0 d-flex align-items-center flex-fill justify-content-end">
              <GreenFolder />
              <span
                className="border-start border-1 border-primary ps-2 ms-2 m-0 p-0 text-primary text-decoration-underline"
                onClick={handleCreate}
                style={{
                  cursor: "pointer",
                }}
              >
                View Event
              </span>
            </p>
          </section>
        </div>
      </div>

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
            <h5>{convertDate(model.createdOn).getDay()}</h5>
            <p className="h5 lead text-muted text-uppercase">
              {convertDate(model.createdOn).toLocaleString("en-us", {
                month: "short",
              })}
            </p>
          </div>
          <div className=" py-3  ">
            <h5 className="text-capitalize">{model.type}</h5>
          </div>
          <div className=" py-3 px-4  d-flex flex-column justify-content-center align-items-center">
            <RoundPerson />
          </div>
          <div className=" py-3  ">
            <h5>{`${sacrament?.priest?.firstName} ${sacrament?.priest?.lastName}`}</h5>
            <p className="text-muted fw-lighter ">Sacrament Priest</p>
          </div>
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
