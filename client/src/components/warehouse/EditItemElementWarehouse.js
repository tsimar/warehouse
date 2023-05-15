import React, { useState } from "react";
// import DatePicker from "react-date-picker";
// import "./styleWarehouseWork/warehouse.css";
import { apiWarehouse } from "../../url/URL";
export const EditItemElementWarehouse = ({
  editValueElement,
  handleCancelClick,
  handleEditFormChange,
  handleEditFormSubmit,
  handleDeleteClick,
  module,
  element,
  editSelectProjectById,
  // editSelectUserById,
  // editSelectElementById,
  // editSelectDateById,
}) => {
  let editSelectPutModule = "";
  const [editSelect, setEditSelect] = useState("");

  const handleEditModuleSelect = (name, value) => {
    const newFormData = { ...editSelect };
    newFormData[name] = value;

    setEditSelect(newFormData);
  };
  const objName = Object.keys(editValueElement);

  const changeNameModuleById = (data) => {
    setEditSelect("");
    for (let index = 0; index < element.length; index++) {
      if (element[index].nameElement === data) {
        return (editSelectPutModule = element[index].id);
      } else {
        editSelectPutModule = element[0].id;
      }
    }
  };

  const handleSavelClick = (event) => {
    event.preventDefault();
    changeNameModuleById(editSelect);
    const editedContact = {
      idProject: editValueElement.idProject,
      idModule: editSelectPutModule,
      idElement: editValueElement.oldIdElement,
    };

    apiWarehouse
      .put("/editModule", editedContact)
      .then((response) => {
        // fetchGetWarehouse();
        handleCancelClick();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleEditComboBox = (data) => {
    return (
      <div className="container--project">
        <label htmlFor="project">element</label>
        <select
          value={editSelect}
          onChange={(e) => setEditSelect(e.target.value)}
        >
          {data.map((item, index) => (
            <option key={index} value={item.nameElement}>
              {item.nameElement}
            </option>
          ))}
        </select>
      </div>
    );
  };

  return (
    <form onSubmit={handleEditFormSubmit}>
      <div className="div__div-get">
        {handleEditComboBox(element)}

        <button className="size" name="save" onClick={handleSavelClick}>
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
          onClick={() => handleDeleteClick(editValueElement.id)}
        >
          Delete
        </button>
      </div>
    </form>
  );
};
