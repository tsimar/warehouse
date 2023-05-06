import React, { useState } from "react";
// import DatePicker from "react-date-picker";
// import "./styleWarehouseWork/warehouse.css";
import { apiWarehouse } from "../../url/URL";
export const EditItemModuleWarehouse = ({
  editValue,
  handleCancelClick,
  handleEditFormChange,
  handleEditFormSubmit,
  handleDeleteClick,
  module,

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
  const objName = Object.keys(editValue);

  //   const handleEditChangeSelect = (e, name) => {
  //     const nameValue = e.target.value;
  //     const newFormData = { ...editSelect };
  //     newFormData[name] = nameValue;
  //     setEditSelect(newFormData);
  //     handleEditModuleSelect(name, nameValue);
  //   };

  const changeNameModuleById = (data) => {
    setEditSelect("");
    for (let index = 0; index < module.length; index++) {
      if (module[index].nameModule === data) {
        return (editSelectPutModule = module[index].id);
      } else {
        editSelectPutModule = module[0].id;
      }
    }
  };

  const handleSavelClick = (event) => {
    event.preventDefault();
    changeNameModuleById(editSelect);
    const editedContact = {
      idProject: editValue.idProject,
      idModule: editSelectPutModule,
      idElement: editValue.oldIdModule,
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
        <label htmlFor="project">module</label>
        <select
          value={editSelect.editSelectModule}
          onChange={(e) => setEditSelect(e.target.value)}
        >
          {data.map((item, index) => (
            <option key={index} value={item.nameModule}>
              {item.nameModule}
            </option>
          ))}
        </select>
      </div>
    );
  };

  return (
    <form onSubmit={handleEditFormSubmit}>
      <div className="div__div-get">
        {handleEditComboBox(module)}

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
          onClick={() => handleDeleteClick(editValue.id)}
        >
          Delete
        </button>
      </div>
    </form>
  );
};
