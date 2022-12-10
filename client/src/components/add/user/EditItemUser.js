import React, { useState } from "react";

export const EditItemUser = ({
  editValue,
  handleCancelClick,
  handleEditFormChange,
  handleEditFormSubmit,
  handleDeleteClick,
  position,
}) => {
  const [editSelectPosition, setEditSelectPosition] = useState("");
  const objName = Object.keys(editValue);

  const findPositionById = () => {
    for (let index = 0; index < position.length; index++) {
      if (position.id === editValue.idPosition) {
        setEditSelectPosition(position.position);
      }
    }
  };

  const handleAddInput = (data, obj) => {
    findPositionById(obj);
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
  const handleChangeSelect = (e) => {
    setEditSelectPosition(e.target.value);
  };
  const handleEditComboBox = (data) => {
    console.log(position.filter((e) => e.id === data));
    // let idSelect = position.filter((e) => e.id === data);
    // if (data == null) {
    //   idSelect = 1;
    // }
    // setEditSelectPosition(idSelect);
    return (
      <>
        <label htmlFor="position">stanowisko</label>
        <select value={editSelectPosition} onChange={handleChangeSelect}>
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
