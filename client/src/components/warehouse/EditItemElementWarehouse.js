import React, { useState } from "react";
import DatePicker from "react-date-picker";
// import "./styleWarehouseWork/warehouse.css";
import { apiWarehouse } from "../../url/URL";
export const EditItemElementWarehouse = ({
  editValueElement,
  handleCancelClick,
  handleEditFormChange,
  handleEditFormSubmit,
  handleDeleteClick,
  module,
  element,
  editSelectProjectById,
  // editSelectUserById,
  // editSelectElementById,
  // editSelectDateById,
}) => {
  let editSelectPutModule = "";
  const [editSelect, setEditSelect] = useState("");
  const [valueDate, OnChange] = useState(editValueElement.dataStart);
  const [elementNumber, setElementNumber] = useState(editValueElement.number);
  const [elementDate, setElementDate] = useState(editValueElement.dataStart);

  // console.log("editValueElement.number", editValueElement.number);
  // const handleEditModuleSelect = (name, value) => {
  //   const newFormData = { ...editSelect };
  //   newFormData[name] = value;

  //   setEditSelect(newFormData);
  // };
  // const objName = Object.keys(editValueElement);

  const changeNameModuleById = (data) => {
    setEditSelect("");
    for (let index = 0; index < element.length; index++) {
      if (element[index].nameElement === data) {
        return (editSelectPutModule = element[index].id);
      } else {
        editSelectPutModule = element[0].id;
      }
    }
  };

  const handleSavelClick = (event) => {
    event.preventDefault();
    changeNameModuleById(editSelect);
    const editedContact = {
      id: editValueElement.id,
      idProject: editValueElement.id,
      dataStart: valueDate,
      number: elementNumber,
      idOldElement: editValueElement.oldIdElement,
      idElement: editSelectPutModule,
    };

    apiWarehouse
      .put("/editElement", editedContact)
      .then((response) => {
        // fetchGetWarehouse();
        handleCancelClick();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChangeDate = (data) => {
    let date;
    let d;
    let m;
    let y;
    if (data === null) {
      date = new Date();
      d = date.getDate();
      m = date.getMonth() + 1;
      y = date.getFullYear();
    } else {
      date = data.split("-");
      d = date[2];
      m = date[1];
      y = date[0];
    }

    date = d + "-" + m + "-" + y;
    OnChange(date);
  };

  const handleEditComboBox = (data) => {
    return (
      <div className="container--project">
        <label htmlFor="project">element</label>

        <select
          value={editSelect}
          onChange={(e) => setEditSelect(e.target.value)}
        >
          {data.map((item, index) => (
            <option key={index} value={item.nameElement}>
              {item.nameElement}
            </option>
          ))}
        </select>
      </div>
    );
  };

  return (
    <form onSubmit={handleEditFormSubmit}>
      <div className="div__div-get">
        {handleEditComboBox(element)}
        <input
          type="number"
          onChange={(e) => setElementNumber(e.target.value)}
          value={elementNumber}
        />

        <section>
          <label htmlFor="data">date</label>
          <DatePicker
            dateFormat="dd-MM-yyyy"
            id="data"
            onChange={OnChange}
            value={valueDate}
          />
        </section>
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
          onClick={() => handleDeleteClick(editValueElement.id)}
        >
          Delete
        </button>
      </div>
    </form>
  );
};
