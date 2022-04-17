import React, { useState, useEffect } from "react";
import "../../styles/dist/table.css";
import { Link, useNavigate } from "react-router-dom";

import Layout from "../../components/Layout";

// icons
import CircledPlus from "../../Elements/svgs/CircledPlus";

// inputs
import SearchInput from "../../components/inputs/specialInputs/SearchInput";

import axios from "axios";
import EllipseNModal from "../../components/modal/EllipseNModal";

function AdminUsersList(props) {
  const [adminUser, setAdminUsers] = useState(null);

  useEffect(() => {
    axios.get("/api/account/getusers").then((response) => {
      if (response.status === 200) {
        setAdminUsers(response.data);
      } else {
      }
    });
  }, []);

  const searchUser = (query) => {
    axios.get(`/api/account/getusers?query=${query}`).then((response) => {
      if (response.status === 200) {
        setAdminUsers(response.data);
      } else {
      }
    });
  };

  // const deleteUser = (id) => {
  //   axios.delete(`/api/account/deleteuser/${id}`).then((response) => {
  //     if (response.status === 200) {
  //       setAdminUsers(response.data);
  //     } else {
  //     }
  //   });
  // };

  return (
    <Layout type={1}>
      <header className="d-flex align-items-center justify-content-between">
        <div>
          <h5>Users Overview</h5>
          <p className="text-muted m-0">
            List of registered and approved users
          </p>
        </div>
        <Link to="/invite" className="btn-group">
          <button className="btn btn-primary">Invite user</button>
          <button className="btn btn-primary">
            <CircledPlus />
          </button>
        </Link>
      </header>

      <div className="col-4 my-4">
        <SearchInput handleSearch={searchUser} />
      </div>

      <table className="shadow-sm border-muted">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>User Role</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {adminUser &&
            adminUser.data.map((item, index) => {
              return (
                <AdminUser
                  key={item.id}
                  name={item.fullName}
                  role={item.userRole}
                  email={item.email}
                  number={index + 1}
                  id={item.id}
                />
              );
            })}
        </tbody>
      </table>
    </Layout>
  );
}

export default AdminUsersList;

function AdminUser(props) {
  let { number, name, role, email, id } = props;
  const navigate = useNavigate();

  return (
    <tr className={props.class}>
      <td className="index text-center">{number}.</td>
      <td className="name">{name}</td>
      <td className="role">{role}</td>
      <td className="email">{email}</td>
      <td className="action">
        {" "}
        {/* <Ellipses
          className="btn fs-2 p-0"
          style={{
            cursor: "pointer",
          }}
          o
        /> */}
        <EllipseNModal onView={() => navigate(`/members/view-member/${id}`)} />
      </td>
    </tr>
  );
}
