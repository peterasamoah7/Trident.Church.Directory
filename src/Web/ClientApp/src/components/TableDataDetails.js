import React from "react";

import BluePhone from "../Elements/svgs/BluePhone";
import BlueMail from "../Elements/svgs/BlueMail";

function DataDetails({
  name,
  role,
  phone,
  parish,
  birthDate,
  birthPlace,
  postalCode,
  occupation,
  homeAddress,
  father,
  mom,
  spouse,
}) {
  return (
    <div class="col d-flex justify-content-start align-items-center flex-column p-0">
      <section class="member-summary py-4 px-4 bg-white d-flex flex-column justify-content-start align-items-center col-12">
        <div class="d-flex align-items-center justify-content-start col-12">
          <h5 class="member-name m-0 col-6">{name}</h5>
          <a href={`tel:+${phone}`} class="p-0 btn col-1 me-2">
            <BluePhone />
          </a>
          <a href="mailto:email@example.com" class="p-0 btn col-1 me-2">
            <BlueMail />
          </a>
        </div>
        <div class="summary-info text-muted col-12 mt-3 text-muted d-flex align-items-center  ">
          <span class="is-member me-2">{role}</span>
          <span class="fs-5 me-1">&bull;</span>
          <span class="parish-name">{parish}</span>
        </div>
      </section>
      <section class="member-details  mt-1 p-3 px-4 bg-white flex-fill col-12">
        <section class="detail detail__date-of-birth d-flex flex-column align-items-start justify-content-center">
          <h6 class="detail-title ">Date of birth</h6>
          <p class="detail info text-muted">{birthDate}</p>
        </section>
        <section class="detail detail__place-of-birth d-flex flex-column align-items-start justify-content-center">
          <h6 class="detail-title">Place of birth</h6>
          <p class="detail info text-muted">{birthPlace}</p>
        </section>
        <section class="detail detail__postal-code d-flex flex-column align-items-start justify-content-center">
          <h6 class="detail-title">Postal Code</h6>
          <p class="detail info text-muted">{postalCode}</p>
        </section>
        <section class="detail detail__occupation d-flex flex-column align-items-start justify-content-center">
          <h6 class="detail-title">Occupation</h6>
          <p class="detail info text-muted">{occupation}</p>
        </section>
        <section class="detail detail__home-address d-flex flex-column align-items-start justify-content-center">
          <h6 class="detail-title">Home Address</h6>
          <p class="detail info text-muted">{homeAddress}</p>
        </section>
        <section class="detail detail__father d-flex flex-column align-items-start justify-content-center">
          <h6 class="detail-title">Father</h6>
          <p class="detail info text-muted">{father}</p>
        </section>
        <section class="detail detail__mother d-flex flex-column align-items-start justify-content-center">
          <h6 class="detail-title">Mother</h6>
          <p class="detail info text-muted">{mom}</p>
        </section>
        <section class="detail detail__spouse d-flex flex-column align-items-start justify-content-center">
          <h6 class="detail-title">Spouse</h6>
          <p class="detail info text-muted">{spouse}</p>
        </section>
      </section>
    </div>
  );
}

DataDetails.defaultProps = {
  name: "Peter Asamoah",
  role: "Member",
  parish: "Fountain of Life & Truth",
  birthDate: "02, January 1978",
  birthPlace: "Osu, Accra",
  postalCode: "GA184",
  occupation: "Banker",
  homeAddress: "No.F37/4, Anahor St. Nyaniba. Osu, Accra",
  father: "Kingsley A.",
  mom: "Esther A.",
  spouse: "Priscilla A.",
};

export default DataDetails;
