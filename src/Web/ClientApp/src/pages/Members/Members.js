import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// style
import "../../styles/dist/table.css";

// components
import EllipseNModal from "../../components/modal/EllipseNModal";
import SearchInput from "../../components/inputs/specialInputs/SearchInput";
import NotSelected from "../../components/TableItemNotSelected";
import DataDetails from "../../components/TableDataDetails";

// Elements
import CircledPlus from "../../Elements/svgs/CircledPlus";
import BluePhone from "../../Elements/svgs/BluePhone";
import BlueMail from "../../Elements/svgs/BlueMail";

// data
import data from "./data.json";
import Layout from "../../components/Layout";

function Members() {
  const [selectedRow, setSelectedRow] = useState(null);

  function handleSelect(e) {
    setSelectedRow((oldRow) => {
      if (oldRow === e) {
        return null;
      } else return e;
    });
  }

  return (
    <Layout type={1}>
      <header className="d-flex justify-content-between align-items-center">
        <div>
          <h5>Members Overview</h5>
          <p className="text-muted m-0">List of members and bio data</p>
        </div>
        <Link to="/members/add-member" className="btn-group">
          <button className="btn btn-primary ">Add Member</button>
          <button className="btn btn-primary py-0">
            <CircledPlus size={25} />
          </button>
        </Link>
      </header>
      <section className="my-5 d-flex align-items-center justify-content-between">
        <div className="col-4">
          <SearchInput />
        </div>
      </section>

      <div
        class="d-flex justify-content-between data-tables p-0 m-0 mt-4"
        style={{
          gap: "2rem",
        }}
      >
        <table class="bg-white col-8 mb-0">
          <thead>
            <tr>
              <th></th>
              <th>First Name</th>
              <th>Parish Name</th>
              <th>Role</th>
              <th>Phone No.</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => {
              return item.id === selectedRow ? (
                <MemberItem {...item} onSelect={handleSelect} selected />
              ) : (
                <MemberItem {...item} onSelect={handleSelect} />
              );
            })}
          </tbody>
        </table>
        {selectedRow !== null ? (
          <DataDetails
            {...data.filter((value) => {
              return value.id === selectedRow;
            })[0]}
          />
        ) : (
          <NotSelected />
        )}
      </div>
    </Layout>
  );
}

export default Members;

function MemberItem({ onSelect, name, parish, role, phone, id, selected }) {
  const navigate = useNavigate();

  return (
    <tr
      onClick={() => onSelect(id)}
      className={`${selected ? "selected" : ""}`}
      style={{
        cursor: "pointer",
      }}
    >
      <td class="num text-center">{id}.</td>
      <td>{name}</td>
      <td>{parish}</td>
      <td>{role}</td>
      <td>{phone}</td>
      <td>
        <EllipseNModal
          onEdit={() => navigate(`edit-member/${id}`)}
          onView={() => navigate(`/members/view-member/${id}`)}
        />
      </td>
    </tr>
  );
}
