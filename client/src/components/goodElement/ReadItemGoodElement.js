import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const ReadItemWarehouse = ({
  item,
  index,
  project,
  element,
  user,
  handleEditClick,
  handleDeleteClick,
  showPdfFile,
}) => {
  const indexRefIn = useRef(0);
  const indexRefOut = useRef(0);

  const [nameFile, setNameFile] = useState("");
  const [propsElement, setPropsElement] = useState({
    nameElement: "",
    urlPicture: "",
  });
  // const addUser = (warehouse, user) => {
  //   return user.map((item, index) => {
  //     return warehouse.idUser === item.id ? (
  //       <span key={index}>
  //         {item.nameUser} {item.lastName}
  //       </span>
  //     ) : null;
  //   });
  // };

  useEffect(() => {
    // addElement(item, element);
  }, []);

  const addElement = (warehouse, element) => {
    return element.map((item, index) => {
      return warehouse.idElement === item.id ? (
        <span key={index}>{item.nameElement}</span>
      ) : null;
    });
  };

  const addProject = (warehouse, project) => {
    // event.preventDefault();
    console.log(warehouse);
    return project.map((item, index) => {
      return warehouse.idProject === item.id ? (
        <span key={index}>{item.nameProject}</span>
      ) : null;
    });
  };

  const handleOut = (data) => {
    // indexRefOut++;
    return (
      <>
        <span>{(indexRefOut.current = indexRefOut.current + 1)}</span>
        {addProject(data, project)}
        {addElement(data, element)}
        {handleChangeDate(data.dataFinish)}
        <span>{data.number}</span>
        <span>{data.warehouseOpen}</span>
      </>
    );
  };

  const handleIn = (data) => {
    // indexRefIn.current = indexRefIn.current + 1;
    return (
      <>
        <span>{(indexRefIn.current = indexRefIn.current + 1)}</span>
        {addProject(data, project)}
        {addElement(data, element)}
        {handleChangeDate(data.dataFinish)}
        <span>{data.number}</span>
        <span>{data.warehouseOpen}</span>
      </>
    );
  };

  const selectWarehouseGoodElement = (data) => {
    return data.warehouseOpen === 1 ? handleIn(data) : handleOut(data);
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
      key={item.id}
      onDoubleClick={(e) => handleEditClick(e, item)}
      onDrag={() => handleDeleteClick(item.id)}
      draggable
    >
      {selectWarehouseGoodElement(item)}
    </div>
  );
};
export default ReadItemWarehouse;
