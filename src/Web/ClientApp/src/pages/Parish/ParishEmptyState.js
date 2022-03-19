import React from 'react';

// Stylesheet
import "../../styles/dist/table.css"

// Components
import SearchInput from "../../components/inputs/specialInputs/SearchInput"
import DateSelect from "../../components/inputs/datePickers/DateSelect"

// Elements 
import CircledPlus from "../../Elements/svgs/CircledPlus"
import SelectionIllustration from "../../Elements/svgs/SelectionIllustration"
import GreenPlus from "../../Elements/svgs/GreenPlus"
import { Link } from 'react-router-dom';

function ParishEmptyState() {
  return ( 
  <main class="px-4">
  <header class="d-flex justify-content-between align-items-center py-2">
    <div class="d-flex flex-column align-items-start me-auto">
      <h4>Parish Overview</h4>
      <p class="text-muted">List of registered and approved parishes</p>
    </div>
    
    <div className="btn-group">
      <button className="btn btn-primary">Add Parish</button>
      <button className="btn btn-primary">
        <CircledPlus />
      </button>
    </div>
  </header>
  <div className="my-3 d-flex align-items-center justify-content-between">
				<div className="col-5">
					<SearchInput />
				</div>
				<div
					className="d-flex align-items-center"
					style={{
						gap: "5px",
					}}
				>
					<DateSelect placeholder="Date" />
					<select
						name="parish"
						id="parish"
						className="form-select"
						style={{
							width: "6rem",
						}}
					>
						<option value="">Parish</option>
					</select>
					<select
						name="parish"
						id="parish"
						className="form-select sort-select"
						style={{
							width: "6rem",
						}}
					>
						<option value="">Sort</option>
					</select>
				</div>
			</div>

  <table class="bg-white">
    <thead>
      <tr>
        <th><input type="checkbox" class="" disabled /></th>
        <th>Parish Name</th>
        <th>Location</th>
        <th>Associated Priest</th>
        <th>Creation Date</th>
        <th>Members</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr class="">
        <td class="illustration" colspan="7">
          <SelectionIllustration />
          <p class="text-muted">
            Oops, seems like you will need to create a new parish <br />
            Kindly click the button bellow to add a parish.
          </p>
          <div class="d-flex align-items-center justify-content-center">
             
            <Link to="" className='d-flex align-items-center '>
             <GreenPlus /> 
              <span className="ms-2 ps-2 border-start border-2 border-primary">Add a new parish</span></Link>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</main>)
}

export default ParishEmptyState;
