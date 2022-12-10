import React from "react";

export const EditItem = ({
  editValue,
  handleCancelClick,
  handleEditFormChange,
  handleEditFormSubmit,
  handleDeleteClick,
  handleEditComboBox,
}) => {
  const objName = Object.keys(editValue);
  let i = 0;
  const handleAddInput = (data, obj) => {
    return data.map((_, index) => {
      data[index] === "idPosition" ? (i = index) : (i = null);
      return (index > 0) & (data[index] !== "idPosition") ? (
        <input
          key={i}
          id={data[i]}
          name={data[i]}
          type="text"
          placeholder={data[i]}
          required
          value={obj[data[i]]}
          onChange={handleEditFormChange}
        />
      ) : null;
    });
  };

  return (
    <form onSubmit={handleEditFormSubmit}>
      <div className="div__div-get">
        {handleAddInput(objName, editValue)}
        {handleEditComboBox(editValue[objName[i]])}
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
