import React, { useState } from "react";
import DatePicker from "react-date-picker";

export const EditItemWarehouse = ({
  editValue,
  handleCancelClick,
  handleEditFormChange,
  handleEditFormSubmit,
  handleDeleteClick,
  project,
  element,
  user,
  handleEditSelect,
  editSelectProjectById,
  editSelectUserById,
  editSelectElementById,
  editSelectDateById,
}) => {
  // const [valueDate, OnChange] = useState(editValue.dateStart);
  if (editSelectDateById === "") {
    editSelectDateById = editValue.dataStart;
  }
  const [editSelect, setEditSelect] = useState({
    project: editSelectProjectById,
    element: editSelectElementById,
    user: editSelectUserById,
    dataStart: editSelectDateById,
  });

  const objName = Object.keys(editValue);

  const handleAddInput = (data, obj) => {
    return data.map((_, index) => {
      return (index > 0) &
        (data[index] !== "idProject") &
        (data[index] !== "idUser") &
        (data[index] !== "idElement") &
        (data[index] !== "dataStart") ? (
        <input
          key={index}
          id={data[index]}
          name={data[index]}
          type="text"
          placeholder={data[index]}
          required
          value={obj[data[index]]}
          onChange={handleEditFormChange}
        />
      ) : null;
    });
  };
  const handleEditChangeSelect = (e, name) => {
    const nameValue = e.target.value;
    const newFormData = { ...editSelect };
    newFormData[name] = nameValue;
    setEditSelect(newFormData);
    handleEditSelect(name, nameValue);
  };
  const handleEditChangeSelectDate = (value, name) => {
    console.log(value, name);
    const newFormData = { ...editSelect };
    newFormData[name] = value;
    setEditSelect(newFormData);
    handleEditSelect(name, value);
  };
  const handleEditComboBox = (data) => {
    return (
      <>
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
      </>
    );
  };
  const handleEditComboBoxEl = (data) => {
    return (
      <>
        <label htmlFor="element">element</label>
        <select
          value={editSelect.editSelectElement}
          onChange={(value) => handleEditChangeSelect(value, "element")}
        >
          {data.map((item, index) => (
            <option key={index} value={item.nameElement}>
              {item.nameElement}
            </option>
          ))}
        </select>
      </>
    );
  };
  const handleEditComboBoxUser = (data) => {
    return (
      <>
        <label htmlFor="user">pracownic</label>
        <select
          value={editSelect.editSelectUser}
          onChange={(e) => handleEditChangeSelect(e, "user")}
        >
          {data.map((item, index) => (
            <option key={index} value={item.nameUser}>
              {item.nameUser} {item.lastName}
            </option>
          ))}
        </select>
      </>
    );
  };
  return (
    <form onSubmit={handleEditFormSubmit}>
      <div className="div__div-get">
        {handleEditComboBox(project)}
        {handleEditComboBoxEl(element)}
        <DatePicker
          // defaultValue={new Date()}
          onChange={(e) => handleEditChangeSelectDate(e, "dataStart")}
          // onChange={(value) => OnChange(value)}
          value={editSelect.dataStart}
          dateFormat="dd-MM-yyyy"
        />

        {handleAddInput(objName, editValue)}
        {handleEditComboBoxUser(user)}
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
