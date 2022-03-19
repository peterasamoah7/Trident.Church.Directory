import React from "react";
import { Link } from "react-router-dom";

import GreenParish from "../../Elements/svgs/GreenParish";
import VioletPerson from "../../Elements/svgs/VioletPersonBg";
import YellowPeople from "../../Elements/svgs/YellowPeopleBg";
import LightBluePeopleChatting from "../../Elements/svgs/LightBluePeopleChatting";
import GreenFolder from "../../Elements/svgs/GreenFolder";

function SummaryCard(props) {
  let cardType = {
    parish: {
      name: "Parishes",
      linkName: "Parishes",
      link: "/parish",
      icon: <GreenParish />,
    },
    members: {
      name: "Members",
      linkName: "Members",
      link: "/members",
      icon: <VioletPerson />,
    },
    units: {
      name: "Units",
      linkName: "Units",
      link: "/units",
      icon: <YellowPeople />,
    },
    sacraments: {
      name: "Sacraments",
      linkName: "Parish",
      link: "/parish",
      icon: <LightBluePeopleChatting />,
    },
  };

  return (
    <section className="container-fluid summary-card bg-white p-5 rounded-3 border-1 border-muted border d-flex flex-column justify-content-center align-items-center ">
      <div className="mb-3">{cardType[props.type].icon}</div>

      <p className="summary-card__metric h2 fw-normal">{props.total}</p>
      <p
        className="summary-card__name"
        style={{
          color: "var(--bs-gray2) ",
          fontSize: "1.08rem",
        }}
      >
        {cardType[props.type].name}
      </p>

      <Link
        to={cardType[props.type].link}
        className="d-flex align-items-center "
      >
        <GreenFolder />
        <span className="border-start border-primary border-1 ms-3 ps-3">
          View {cardType[props.type].linkName}
        </span>
      </Link>
    </section>
  );
}

export default SummaryCard;
