import React, { useState } from "react";

const ReadItemWarehouseWork = ({
  item,
  index,
  project,
  element,
  handleEditClick,
}) => {
  const objName = Object.keys(item);
  const [checked, setChecked] = useState(false);
  const addSpan = (data, obj) => {
    return data.map((item, index) => {
      return (index > 0) & (5 > index) ? (
        <span key={index}>{obj[data[index]]}</span>
      ) : null;
    });
  };

  const addProject = (warehouseWork, project) => {
    return project.map((item, index) => {
      return warehouseWork.idProject === item.id ? (
        <span key={index}>{item.nameProject}</span>
      ) : null;
    });
  };
  const addElement = (warehouseWork, element) => {
    return element.map((item, index) => {
      return warehouseWork.idElement === item.id ? (
        <span key={index}>{item.nameElement}</span>
      ) : null;
    });
  };

  console.log(checked);
  return (
    <div
      className="div__div-get"
      key={item.id}
      onClick={(e) => handleEditClick(e, item)}
    >
      <span>{index + 1}</span>
      {addProject(item, project)}
      {addElement(item, element)}
      {addSpan(objName, item)}
      <div key={index + 1}>
        <label className="fff" key={index + 1}>
          <input
            key={index + 1}
            type="checkbox"
            checked={checked}
            value="dsfsdfs"
            onChange={(e) => setChecked(e.target.checked)}
          />
        </label>
      </div>
    </div>
  );
};
export default ReadItemWarehouseWork;
