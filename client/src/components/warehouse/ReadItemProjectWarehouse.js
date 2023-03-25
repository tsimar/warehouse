import React, { useState, useRef, useEffect } from "react";

const ReadItemProjectWarehouse = ({
  idProject,
  warehouse,
  project,
  count,
  handleEditClick,
  handleDeleteClick,
}) => {
  const [nameFile, setNameFile] = useState("");
  const [propsElement, setPropsElement] = useState([]);
  const warehouseRef = useRef(warehouse);
  console.log(idProject);
  const addProject = (itemsWarehouse, project) => {
    return project.map((item, index) => {
      return itemsWarehouse.idProject === item.id ? (
        <span key={index}>{item.nameProject}</span>
      ) : null;
    });
  };
  return (
    <div
      className="div__div-get"
      key={warehouse.id}
      onDoubleClick={(e) => handleEditClick(e, warehouse)}
      onDrag={() => handleDeleteClick(warehouse.id)}
      draggable
    >
      <span>{count + 1}</span>
      {/* {addProject(warehouseRef.current, project)} */}
      <span>{warehouse.idProject}</span>
    </div>
  );
};
export default ReadItemProjectWarehouse;
