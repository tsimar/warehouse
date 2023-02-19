import React, { useState, useRef, useEffect } from "react";

const ReadItemWarehouse = ({
  warehouse,
  index,
  project,
  element,
  user,
  handleEditClick,
  handleDeleteClick,
  showPdfFile,
}) => {
  const [nameFile, setNameFile] = useState("");
  const [propsElement, setPropsElement] = useState([]);
  const warehouseRef = useRef(warehouse);

  const addUser = (warehouse, user) => {
    return user.map((item, index) => {
      return warehouse.idUser === item.id ? (
        <span key={index}>
          {item.nameUser} {item.lastName}
        </span>
      ) : null;
    });
  };

  // const addElement = (itemsWarehouse, element) => {
  //   element.map((data) => {
  //     if (itemsWarehouse.idElement === data.id) {
  //       setPropsElement(data);
  //       // setNameFile(data.urlPicture);
  //     }
  //   });
  // };
  const addElement = (itemsWarehouse, element) => {
    return element.map((item, index) => {
      return itemsWarehouse.idElement === item.id ? (
        <span key={index} onClick={() => showPdfFile(item)}>
          {item.nameElement}
        </span>
      ) : null;
    });
  };

  const addProject = (itemsWarehouse, project) => {
    return project.map((item, index) => {
      return itemsWarehouse.idProject === item.id ? (
        <span key={index}>{item.nameProject}</span>
      ) : null;
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
    return <span>{date}</span>;
  };
  return (
    <div
      className="div__div-get"
      key={warehouse.id}
      onDoubleClick={(e) => handleEditClick(e, warehouse)}
      onDrag={() => handleDeleteClick(warehouse.id)}
      draggable
    >
      <span>{index + 1}</span>
      {addProject(warehouseRef.current, project)}
      {addElement(warehouseRef.current, element)}

      <span>{warehouse.number}</span>
      {handleChangeDate(warehouse.dataStart)}

      {addUser(warehouse, user)}
    </div>
  );
};
export default ReadItemWarehouse;
