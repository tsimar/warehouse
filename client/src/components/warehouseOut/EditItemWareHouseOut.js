import React, { useState } from "react";

export const EditItemWarehouseOut = ({
  editValue,
  handleCancelClick,
  handleEditFormChange,
  handleEditFormSubmit,
  handleDeleteClick,
  position,
  handleEditSelect,
  editSelectPositionById,
}) => {
  const [editSelectPosition, setEditSelectPosition] = useState(
    editSelectPositionById
  );
  const objName = Object.keys(editValue);

  const handleAddInput = (data, obj) => {
    return data.map((_, index) => {
      return (index > 0) & (data[index] !== "idPosition") ? (
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
  const handleEditChangeSelect = (e) => {
    setEditSelectPosition(e.target.value);
    handleEditSelect(e.target.value);
  };
  const handleEditComboBox = (data) => {
    return (
      <>
        <label htmlFor="position">stanowisko</label>
        <select
          value={editSelectPosition}
          onChange={(e) => handleEditChangeSelect(e)}
        >
          {data.map((item, index) => (
            <option key={index} value={item.position}>
              {item.position}
            </option>
          ))}
        </select>
      </>
    );
  };
  return (
    <form onSubmit={handleEditFormSubmit}>
      <div className="div__div-get">
        {handleAddInput(objName, editValue)}
        {handleEditComboBox(position)}
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
