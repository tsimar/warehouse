import React, { useState } from "react";
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
}) => {
  console.log(checkedFanucBaca);
  // const objName = Object.keys(item);
  // const count = useRef(null);
  //   const [addPosition, setAddPosition] = useReducer(
  //   (state, newState) => ({ ...state, ...newState }),
  //   {
  //     position: "",
  //     permission: "",
  //   }
  // );
  // const addSpan = (data, obj) => {
  //   return data.map((item, index) => {
  //     return (index > 0) & (5 > index) ? (
  //       <span key={index}>{obj[data[index]]}</span>
  //     ) : null;
  //   });
  // };
  // let index = 1;
  // useEffect(() => {
  //   console.log(checkedV);
  // }, [checked]);

  const addElement = (warehouse, element) => {
    return element.map((item, index) => {
      return warehouse.idElement === item.id ? (
        <span key={index}>{item.nameElement}</span>
      ) : null;
    });
  };

  const addProject = (warehouseWork, project) => {
    if (k !== warehouseWork.idProject) {
      return project.map((item, index) => {
        return warehouseWork.idProject === item.id ? (
          <span key={index}>{item.nameProject}</span>
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
    return <span>{date}</span>;
  };

  // const handleButton = (e, index) => {
  //   e.preventDefault();
  //   // const fieldName = e.tatrget.name;
  //   const fieldValue = e.target.innerText;
  //   if (fieldValue === "false"){
  //     fieldValue="true"
  //   } else {
  //     fieldValue = "false";
  //   }
  //   setCheckedV(fieldValue[index]);
  // };

  return (
    <div
      className="div__div-get"
      key={item.id}
      onDoubleClick={(e) => handleEditClick(e, item)}
      onDrag={() => handleDeleteClick(item.id)}
      draggable
    >
      <span>{index + 1}</span>
      {addProject(item, project)}
      {addElement(item, element)}

      <span>{item.number}</span>
      {handleChangeDate(item.dataStart)}
      {handleChangeDate(item.dataFinish)}
      <button onClick={(e) => handleButton(e, index)} name="bacaFanuc">
        {checkedFanucBaca}
      </button>
      <button onClick={(e) => handleButton(e, index)} name="lathe">
        {checkedLathe}
      </button>
      <button onClick={(e) => handleButton(e, index)} name="heidenhain">
        {checkedHeidenhain}
      </button>
      <button
        onClick={(e) => handleButton(e, index)}
        name="millingMachineSmall"
      >
        {checkedMillingMachineSmall}
      </button>
    </div>
  );
};
export default ReadItemWarehouseWork;
