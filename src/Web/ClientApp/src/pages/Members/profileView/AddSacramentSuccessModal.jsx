import React from 'react'
import { Link } from 'react-router-dom'
import Modal from '../../../components/modal/Modal'
import SvgBlueTick from '../../../Elements/svgs/BlueTick'
import SvgGreenChat from '../../../Elements/svgs/GreenChat'

const AddSacramentSuccessModal = ({
    modalRef,
    profileId,
    profileName
}) => {

    const nameCapitilized = profileName[0]?.toUpperCase() + profileName.slice(1, profileName?.length)
  return (
    <Modal refer={modalRef}>
          <div
            style={{
              gap: "1rem",
            }}
            className="py-3 text-center d-flex flex-column justify-content-center align-items-center"
          >
            <h5>Sacrament Successfully Added</h5>
            <SvgBlueTick />
            <p
              className="m-0"
              style={{
                color: " var(--bs-gray1)",
                width: "80%"
              }}
            >
              A new sacrament has successfully been added to {nameCapitilized}'s profile 
            </p>
            <Link
              to={`/groups/view-group/${profileId}`}
              className="d-flex align-items-center mt-3"
            >
              <SvgGreenChat />
              <span className="ms-3 ps-3 border-start border-1 border-primary">
                Back to {nameCapitilized}'s profile
              </span>
            </Link>
          </div>
        </Modal>
  )
}

export default AddSacramentSuccessModal