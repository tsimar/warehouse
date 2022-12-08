import React from "react";

export const EditItem = ({
  editValue,
  handleCancelClick,
  handleEditFormChange,
  handleEditFormSubmit,
  handleDeleteClick,
  handleAddSubmit,
}) => {
  const objName = Object.keys(editValue);

  return (
    <form onSubmit={handleEditFormSubmit}>
      <div className="div__div-get">
        {/* <span>{editValue.id}</span> */}
        <input
          id="element"
          name={objName[1]}
          type="text"
          placeholder={objName[1]}
          required
          value={editValue[objName[1]]}
          onChange={handleEditFormChange}
        />
        <input
          id="urlPicture"
          name={objName[2]}
          type="text"
          // accept=".pdf"
          // onChange={(e) => setAddElement({ urlPicture: e.target.files })}
          onChange={handleEditFormChange}
          value={editValue[objName[2]]}
        />
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
