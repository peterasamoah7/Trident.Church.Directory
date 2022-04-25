import React, { useState, useEffect, useContext } from "react";
import "../../styles/dist/table.css";
import { Link } from "react-router-dom";

import Layout from "../../components/Layout";

// icons
import CircledPlus from "../../Elements/svgs/CircledPlus";

// inputs
import SearchInput from "../../components/inputs/specialInputs/SearchInput";

import axios from "axios";
import EllipseNModal from "../../components/modal/EllipseNModal";
import { ErrorContext } from "../../context/ErrorContext";

function AdminUsersList(props) {
  const [adminUser, setAdminUsers] = useState(null);

  const controller = new AbortController();

  const { showError } = useContext(ErrorContext);

  useEffect(() => {
    axios
      .get("/api/account/getusers", { signal: controller.signal })
      .then((response) => {
        if (response.status === 200) {
          setAdminUsers(response.data);
        } else {
        }
      });

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const searchUser = (query) => {
    axios
      .get(`/api/account/getusers?query=${query}`, {
        signal: controller.signal,
      })
      .then((response) => {
        if (response.status === 200) {
          setAdminUsers(response.data);
        } else {
        }
      });
  };

  const deleteUser = async (id) => {
    try {
      const request = await axios.delete(`/api/account/deleteuser/${id}`);

      if (request.status === 200) {
        setAdminUsers((oldState) => ({
          ...oldState,
          data: oldState.data?.filter((user) => user.id !== id),
        }));
      }
    } catch (error) {
      showError("An unexpected error occurred");
    }
  };

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
                  deleteUserFunc={deleteUser}
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
  let { number, name, role, email, id, deleteUserFunc } = props;
  // const navigate = useNavigate();

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
        <EllipseNModal
          // onView={() => navigate(`/members/view-member/${id}`)}
          deletable={true}
          onDelete={async () => await deleteUserFunc(id)}
        />
      </td>
    </tr>
  );
}
