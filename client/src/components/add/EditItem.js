import React from "react";
import { Icon } from "react-icons-kit";
import { trash2 } from "react-icons-kit/feather/trash2";
import { slash } from "react-icons-kit/feather/slash";
import { tick } from "react-icons-kit/typicons/tick";

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
          <Icon icon={tick} size={20} />
        </button>
        <button
          className="size"
          type="button"
          name="cancel"
          onClick={handleCancelClick}
        >
          <Icon icon={slash} size={20} />
        </button>
        <button
          className="size"
          type="button"
          onClick={() => handleDeleteClick(editValue.id)}
        >
          <Icon icon={trash2} size={20} />
        </button>
      </div>
    </form>
  );
}; 
