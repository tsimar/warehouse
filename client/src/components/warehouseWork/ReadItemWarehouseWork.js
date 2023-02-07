import React, { useState, useEffect, useReducer } from "react";
import SelectPositionWork from "./SelectPositionWork";
let k;
// let p;
const ReadItemWarehouseWork = ({
  item,
  index,
  project,
  element,
  handleEditClick,
  checked,
  handleButton,
  checkedFanucBaca,
  checkedLathe,
  checkedHeidenhain,
  checkedMillingMachineSmall,
  handleDeleteClick,
  showPdfFile,
}) => {
  const [nameFile, setNameFile] = useState("");
  // const [enableSaveEdit, setEnaleSaveEdit] = useState(false);
  const [propsElement, setPropsElement] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      nameElement: "",
      urlPicture: "",
    }
  );

  const addElement = (warehouse, element) => {
    element.map((item) =>
      warehouse.idElement === item.id
        ? setPropsElement(item)
        : setNameFile(item.urlPicture)
    );
  };

  useEffect(() => {
    addElement(item, element);
  }, [item]);

  const addProject = (warehouseWork, project) => {
    if (k !== warehouseWork.idProject) {
      return project.map((item, index) => {
        return warehouseWork.idProject === item.id ? (
          <span className="span--project" key={index}>
            {item.nameProject}
          </span>
        ) : null;
      });
    } else {
      console.log("k", k);
    }
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
    return <span className="span--date">{date}</span>;
  };
  const handleEditSubmit = (e) => {
    // e.preventDefault();
    console.log(e);
  };

  return (
    <div
      className="div__div-get"
      key={item.id}
      onDoubleClick={(e) => handleEditClick(e, item)}
      onDrag={() => handleDeleteClick(item.id)}
      draggable
    >
      <span className="span--id">{index + 1}</span>
      {addProject(item, project)}
      <span className="span--element" onClick={() => showPdfFile(propsElement)}>
        {propsElement.nameElement}
      </span>
      <span className="span--number">{item.number}</span>
      {handleChangeDate(item.dataStart)}
      {handleChangeDate(item.dataFinish)}
      <div className="div--button">
        <SelectPositionWork />
      </div>
      <div className="div--button">
        <SelectPositionWork />
      </div>
      <div className="div--button">
        <SelectPositionWork />
      </div>
      <div className="div--button">
        <SelectPositionWork />
      </div>{" "}
      <button type="submit">save</button>
    </div>
  );
};
export default ReadItemWarehouseWork;
