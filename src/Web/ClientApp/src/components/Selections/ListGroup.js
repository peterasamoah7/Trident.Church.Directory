import React from "react";

function ListGroup(props) {
  let { labels } = props;
  return (
    <div class="dropdown">
      <button
        class="btn dropdown-toggle"
        type="button"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Dropdown button
      </button>
      <section
        className="list-group dropdown-menu"
        aria-labelledby="dropdownMenuButton1"
      >
        {labels.map((item) => {
          return <label label={item} />;
        })}
      </section>
    </div>
  );
}

export default ListGroup;

// function ListItem(props) {
// 	const [check, setCheck] = useState(false);
// 	return (
// 		<label
// 			className="list-group-item"
// 			onClick={() => {
// 				setCheck(!check);
// 			}}
// 		>
// 			<input type="radio" className="form-check-input" checked={check} />
// 			{props.label}
// 		</label>
// 	);
// }
