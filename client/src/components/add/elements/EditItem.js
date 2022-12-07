import React from "react";

export const EditItem = ({
  editValue,
  handleCancelClick,
  handleEditFormChange,
  handleEditFormSubmit,
  handleDeleteClick,
  handleAddSubmit,
}) => {
  return (
    <form onSubmit={handleEditFormSubmit}>
      <div className="div__div-get">
        <span>{editValue.id}</span>
        <input
          id="element"
          name="nameElement"
          type="text"
          placeholder="element"
          required
          value={editValue.nameElement}
          onChange={handleEditFormChange}
        />
        <input
          id="urlPicture"
          name="urlPicture"
          type="text"
          // accept=".pdf"
          // onChange={(e) => setAddElement({ urlPicture: e.target.files })}
          onChange={handleEditFormChange}
          value={editValue.urlPicture}
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
