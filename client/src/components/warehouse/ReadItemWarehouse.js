import React from "react";

const ReadItemWarehouse = ({
  item,
  index,
  project,
  element,
  user,
  handleEditClick,
  handleDeleteClick,
}) => {
  const addUser = (warehouse, user) => {
    return user.map((item, index) => {
      return warehouse.idUser === item.id ? (
        <span key={index}>
          {item.nameUser} {item.lastName}
        </span>
      ) : null;
    });
  };
  const addElement = (warehouse, element) => {
    return element.map((item, index) => {
      return warehouse.idElement === item.id ? (
        <span key={index}>{item.nameElement}</span>
      ) : null;
    });
  };
  const addProject = (warehouse, project) => {
    console.log(warehouse);
    return project.map((item, index) => {
      return warehouse.idProject === item.id ? (
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

      {addUser(item, user)}
    </div>
  );
};
export default ReadItemWarehouse;
