import React from "react";

export const EditItem = ({
  editValue,
  handleCancelClick,
  handleEditFormChange,
  handleEditFormSubmit,
  handleDeleteClick,
}) => {
  const objName = Object.keys(editValue);

  const handleAddInput = (data, obj) => {
    return data.map((_, index) => {
      return index > 0 ? (
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

  return (
    <form onSubmit={handleEditFormSubmit}>
      <div className="div__div-get">
        {handleAddInput(objName, editValue)}

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
