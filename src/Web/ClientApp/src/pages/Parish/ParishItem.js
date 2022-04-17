import React from "react";
import { useNavigate } from "react-router-dom";

// Components
import EllipseNModal from "../../components/modal/EllipseNModal";

function ParishItem(props) {
  const navigate = useNavigate();

  return (
    <>
      <tr>
        <td>{props.index}</td>
        <td>{props.name}</td>
        <td>{props.location}</td>
        <td>
          {props?.priest?.firstName} {props?.priest?.lastName}
        </td>
        <td>{props.memberCount}</td>
        <td>
          <EllipseNModal onView={() => navigate(`view-parish/${props.id}`)} />
        </td>
      </tr>
    </>
  );
}

export default ParishItem;
