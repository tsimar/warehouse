import React, { useState, useEffect } from "react";

const ReadItemWarehouseWork = ({
  item,
  index,
  project,
  element,
  handleEditClick,
}) => {
  const objName = Object.keys(item);
  const [checkedV, setCheckedV] = useState(new Array(item.length).fill(false));
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

  const addProject = (warehouseWork, project) => {
    return project.map((item, index) => {
      return warehouseWork === item.id ? (
        <span key={index}>{item.nameProject}</span>
      ) : null;
    });
  };
  const addElement = (warehouseWork, element) => {
    return element.map((item, index) => {
      return warehouseWork === item.id ? (
        <span key={index}>{item.nameElement}</span>
      ) : null;
    });
  };
  const handleOnChange = (data, position) => {
    // e.preventDefault();
    const updatedCheckedState = data.map((item1, index1) =>
      index1 === position ? !item1 : item1
    );

    const te = { ...checkedV };
    te[position] = true;
    console.log(updatedCheckedState);
    console.log(index, " = ", checkedV[index]);
    setCheckedV(te);

    console.log(index, " =index= ", ...checkedV);
  };

  // const mashinaObrobka = (name) => {
  //   if (name === null) {
  //     name = false;
  //   }

  //   return (
  //     <>
  //       <label>{checked[index]}</label>

  //     </>
  //   );
  // };

  return (
    <div
      className="div__div-get"
      key={item.id}
      onClick={(e) => handleEditClick(e, item)}
    >
      <span>{index + 1}</span>
      {/* {addProject(item.idProject, project)}
      {addElement(item.idElement, element)} */}

      <div key={index + 1}>
        <input
          id="baca"
          type="checkbox"
          checked={checkedV[index]}
          onChange={() => handleOnChange(checkedV, index)}
        />
        {/* <labal>position={index}</labal> */}
      </div>
    </div>
  );
};
export default ReadItemWarehouseWork;
