import React, { useState } from "react";


export const EditItemProjectWarehouse = ({
  editValue,
  handleCancelClick,
  handleEditFormChange,
  handleEditFormSubmit,
  handleDeleteClick,
  module,
  project,
  handleEditSelect,
  editSelectProjectById,
}) => {
  const [editSelect, setEditSelect] = useState({
    project: editSelectProjectById,
  });

  const objName = Object.keys(editValue);

  const handleEditChangeSelect = (e, name) => {
    const nameValue = e.target.value;
    const newFormData = { ...editSelect };
    newFormData[name] = nameValue;
    setEditSelect(newFormData);
    handleEditSelect(name, nameValue);
  };

  const handleEditComboBox = (data) => {
    return (
      <div className="container--project">
        <label htmlFor="project">project</label>
        <select
          value={editSelect.editSelectProject}
          onChange={(e) => handleEditChangeSelect(e, "project")}
        >
          {data.map((item, index) => (
            <option key={index} value={item.nameProject}>
              {item.nameProject}
            </option>
          ))}
        </select>
      </div>
    );
  };

  return (
    <form onSubmit={handleEditFormSubmit}>
      <div className="div__div-get">
        {handleEditComboBox(project)}

        <button className="size" name="save" type="submit">
          save
        </button>
        <button
          className="size"
          type="button"
          name="cancel"
          onClick={handleCancelClick}
        >
          cancel
        </button>
        <button
          className="size"
          type="button"
          onClick={() => handleDeleteClick(editValue.id)}
        >
          Delete
        </button>
      </div>
    </form>
  );
};
{
  /* <form onSubmit={handleEditFormSubmit}>
  <div className="div__div-get">
 
//     <button className="size" name="save" type="submit">
//       save
//     </button>
//     <button
//       className="size"
//       type="button"
//       name="cancel"
//       onClick={handleCancelClick}
//     >
//       cancel
//     </button>
//     <button
//       className="size"
//       type="button"
//       onClick={() => handleDeleteClick(editValue.id)}
//     >
//       Delete
//     </button>
//   </div>
// </form>; */
}
