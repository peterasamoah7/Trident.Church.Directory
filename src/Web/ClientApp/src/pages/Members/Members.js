import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// style
import "../../styles/dist/table.css";

// components
import EllipseNModal from "../../components/modal/EllipseNModal";
import SearchInput from "../../components/inputs/specialInputs/SearchInput";

// Elements
import CircledPlus from "../../Elements/svgs/CircledPlus";
// data
import data from "./data.json";
import Layout from "../../components/Layout";
import axios from "axios";

function Members() {
  const [members, setMembers] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);

  useEffect(() => {
    let path = '';
    getMembers(path);
  }, [])

  const getMembers = (path) => {
    axios.get(`/api/parishioner/getall/${path}`)
      .then((response) => {
        if(response.status === 200){
          setMembers(response.data);
          setNextPage(response.data.nextPage);
          setPrevPage(response.data.previousPage);
        }else{
          //show error
        }
      })
  }

  const next = () => {
    getMembers(nextPage);
  };

  const prev = () => {
    getMembers(prevPage);
  };

  return (
    <Layout type={1}>
      <header className="d-flex justify-content-between align-items-center">
        <div>
          <h5>Members Overview</h5>
          <p className="text-muted m-0">List of members</p>
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
        <table class="bg-white">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Role</th>
              <th>Location</th>
              <th>Phone No.</th>
              <th>Occupation</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {members && members.data.map((item, index) => {
              return <MemberItem item={item} index={index + 1}/>
            })}
          </tbody>
          <tfoot>
              <tr>
                <td colSpan="7" className="small p-1">
                  <div className="d-flex align-items-center justify-content-end me-4">
                    <span className="col-5">Rows per page: </span>
                    <select
                      name="rowsPerPage"
                      id="rowsPerPage"
                      className="ms-5"
                    >
                      <option value="10" className="">
                        {members && members.data.length}
                      </option>
                    </select>
                    <div className="tableNav ms-4">
                      {prevPage && (
                        <button onClick={prev} className="btn border-none p-2">
                          &lt;
                        </button>
                      )}
                      {nextPage && (
                        <button onClick={next} className="btn border-none p-2">
                          &gt;
                        </button>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            </tfoot>
        </table>
      </div>
    </Layout>
  );
}

export default Members;

function MemberItem(props) {
  const navigate = useNavigate();

  return (
    <tr>
      <td class="num text-center">{props.index}.</td>
      <td>{props.item.firstName} {props.item.lastName}</td>
      <td>{props.item.type}</td>
      <td>{props.item.location}</td>
      <td>{props.item.phoneNumber}</td>
      <td>{props.item.occupation}</td>
      <td>
        <EllipseNModal
          onEdit={() => navigate(`edit-member/${props.item.id}`)}
          onView={() => navigate(`/members/view-member/${props.item.id}`)}
        />
      </td>
    </tr>
  );
}
