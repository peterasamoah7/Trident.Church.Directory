import React from "react";
import { Route, Routes } from "react-router-dom";

// data from api

// Members
import Members from "../pages/Members/Members";
import MembersAddBasicInfo from "../pages/Members/AddMembers/BasicInformation";

// profile view
import FilledState from "../pages/Members/profileView/FilledState";
import AddRelative from "../pages/Members/AddFamilyRelatives";
import AddSacrament from "../pages/Members/AddSacrament";
import EditMember from "../pages/Members/AddMembers/EditMember";
import NotfoundPage from "../components/404";

function MembersRoute() {
  return (
    <Routes>
      <Route index element={<Members />} />
      <Route path="add-member">
        <Route index element={<MembersAddBasicInfo />} />
        {/* <Route path="contact-info" element={<MembersAddContactInfo />} /> */}
      </Route>

      <Route path="edit-member/:id" element={<EditMember />}></Route>
      <Route path="view-member/:id" element={<ViewMember />} />
      <Route path="view-member" element={<FilledState />} />
      <Route path="view-member/:id/add-relative" element={<AddRelative />} />
      <Route path="view-member/:id/add-sacrament" element={<AddSacrament />} />
      {/* Not Found Route */}
      <Route path="*" element={<NotfoundPage />} />
    </Routes>
  );
}

export default MembersRoute;

// function EditMembers() {
//   const params = useParams();

//   let info = undefined;

//   info = data.filter((value) => {
//     return value.id == params.id;
//   })[0];

//   return (
//     <Routes>
//       <Route index element={<MembersAddBasicInfo {...info} />} />
//       <Route path="contact-info" element={<MembersAddContactInfo />} />
//     </Routes>
//   );
// }

function ViewMember() {
  return <FilledState />;
}
