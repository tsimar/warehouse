import React, { useState, useRef } from "react";
import { useEffect } from "react";
import DatePicker from "react-date-picker";

export const EditItemProjectWarehouseWork = ({
  editValue,
  handleCancelClick,
  handleDeleteClick,

  editEditFinishDateDB,
}) => {
  let date = 0;
  const [editSelectDate, setEditSelectDate] = useState(editValue.dateFinish);
  const dateRef = useRef();
  const handleEditChangeSelect = (e) => {
    console.log(e);
    setEditSelectDate(e);
    // handleEditSelect(e.target.value);
    date = e;
    console.log(dateRef.current);
  };
  useEffect(() => {
    dateRef.current = { ...editSelectDate };
  }, [editSelectDate]);

  const handleEditChangeSelectDate = (value, name) => {
    console.log(value, name);
    const newFormData = { ...editSelectDate };
    newFormData[name] = value;
    setEditSelectDate(newFormData);
  };

  return (
    <form>
      <div className="div__div-get">
        <DatePicker
          className="dateWarehouse"
          onChange={(e) => handleEditChangeSelect(e)}
          value={editSelectDate}
          dateFormat="dd-MM-yyyy"
        />
        <button
          className="size"
          name="save"
          onClick={(e) => editEditFinishDateDB(e, editSelectDate)}
        >
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
